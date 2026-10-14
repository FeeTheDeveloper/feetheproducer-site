import { auth } from "@clerk/nextjs/server";

import { isClerkConfigured, isSupabaseConfigured } from "@/lib/integrations/env";
import {
  integrationUnavailable,
  json,
  serverError,
  unauthorized,
} from "@/lib/integrations/responses";
import { getSupabaseUserClient } from "@/lib/integrations/supabase";

export const dynamic = "force-dynamic";

/**
 * The signed-in visitor's own profile, orders, and entitlements.
 *
 * Reads go through the Clerk session token, so row level security — not this
 * handler — is what keeps one account from seeing another's rows.
 */
export async function GET() {
  if (!isClerkConfigured()) return integrationUnavailable("clerk");

  const { userId, getToken } = await auth();
  if (!userId) return unauthorized();

  if (!isSupabaseConfigured()) return integrationUnavailable("supabase");

  const supabase = getSupabaseUserClient(() => getToken());

  const [profile, orders, entitlements] = await Promise.all([
    supabase
      .from("profiles")
      .select("clerk_user_id, email, first_name, last_name, image_url")
      .eq("clerk_user_id", userId)
      .maybeSingle(),
    supabase
      .from("orders")
      .select("id, product_slug, quantity, status, amount_total, currency, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("entitlements")
      .select("id, product_slug, granted_at, revoked_at")
      .is("revoked_at", null),
  ]);

  const failure = [profile, orders, entitlements].find((result) => result.error);
  if (failure?.error) {
    console.error("account read failed", failure.error);
    return serverError("Could not load account data.");
  }

  return json({
    userId,
    profile: profile.data ?? null,
    orders: orders.data ?? [],
    entitlements: entitlements.data ?? [],
  });
}
