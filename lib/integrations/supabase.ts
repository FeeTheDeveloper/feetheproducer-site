import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { requireEnv } from "@/lib/integrations/env";

/**
 * Client that acts *as the signed-in Clerk user*. The Clerk session token is
 * forwarded to Supabase through the third-party auth integration, so every
 * query is filtered by the row level security policies in
 * `supabase/migrations`. Use this for anything a visitor reads about themselves.
 */
export function getSupabaseUserClient(
  accessToken: () => Promise<string | null>,
): SupabaseClient {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    { accessToken },
  );
}

/**
 * Service-role client. Bypasses row level security, so it is restricted to
 * trusted server paths: webhook fulfilment and catalog lookups. Never import
 * this from a client component.
 */
export function getSupabaseAdminClient(): SupabaseClient {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
