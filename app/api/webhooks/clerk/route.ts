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
  } catch {
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

        const { error } = await supabase.rpc("process_clerk_profile_event", {
          p_type: event.type,
          p_timestamp: event.timestamp,
          p_profile: {
            id: user.id,
            email: primaryEmail?.email_address ?? null,
            first_name: user.first_name,
            last_name: user.last_name,
            image_url: user.image_url,
          },
        });
        if (error) throw error;
        break;
      }

      case "user.deleted": {
        const userId = event.data.id;
        if (!userId) break;

        // Soft delete: paid orders stay auditable after the account is gone.
        const { error } = await supabase.rpc("process_clerk_profile_event", {
          p_type: event.type, p_timestamp: event.timestamp, p_profile: { id: userId },
        });
        if (error) throw error;
        break;
      }

      default:
        break;
    }
  } catch {
    console.error(`clerk handler failed for ${event.type}`);
    return serverError("Handler failed.");
  }

  return json({ received: true, type: event.type });
}
