import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

import {
  isSupabaseAdminConfigured,
  readEnv,
} from "@/lib/integrations/env";
import {
  badRequest,
  integrationUnavailable,
  json,
  serverError,
} from "@/lib/integrations/responses";
import { getSupabaseAdminClient } from "@/lib/integrations/supabase";

export const dynamic = "force-dynamic";

/**
 * Clerk event sink: mirrors the account record into Supabase so orders and
 * entitlements have a profile row to join against.
 *
 * Only identity fields are mirrored. Nothing here is written to the repository.
 */
export async function POST(request: NextRequest) {
  if (!readEnv("CLERK_WEBHOOK_SIGNING_SECRET")) {
    return integrationUnavailable("clerk");
  }
  if (!isSupabaseAdminConfigured()) return integrationUnavailable("supabase");

  let event: Awaited<ReturnType<typeof verifyWebhook>>;
  try {
    event = await verifyWebhook(request);
  } catch (error) {
    console.error("clerk signature verification failed", error);
    return badRequest("Invalid signature.");
  }

  const supabase = getSupabaseAdminClient();

  try {
    switch (event.type) {
      case "user.created":
      case "user.updated": {
        const user = event.data;
        const primaryEmail =
          user.email_addresses.find(
            (address) => address.id === user.primary_email_address_id,
          ) ?? user.email_addresses[0];

        const { error } = await supabase.from("profiles").upsert(
          {
            clerk_user_id: user.id,
            email: primaryEmail?.email_address ?? null,
            first_name: user.first_name,
            last_name: user.last_name,
            image_url: user.image_url,
            deleted_at: null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "clerk_user_id" },
        );
        if (error) throw error;
        break;
      }

      case "user.deleted": {
        const userId = event.data.id;
        if (!userId) break;

        // Soft delete: paid orders stay auditable after the account is gone.
        const { error } = await supabase
          .from("profiles")
          .update({
            deleted_at: new Date().toISOString(),
            email: null,
            first_name: null,
            last_name: null,
            image_url: null,
            updated_at: new Date().toISOString(),
          })
          .eq("clerk_user_id", userId);
        if (error) throw error;
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error(`clerk handler failed for ${event.type}`, error);
    return serverError("Handler failed.");
  }

  return json({ received: true, type: event.type });
}
