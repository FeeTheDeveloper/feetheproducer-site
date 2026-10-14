/**
 * Environment contract for the Clerk / Stripe / Supabase layer.
 *
 * Nothing here throws at import time. The public stream-first site has to build
 * and serve with none of these credentials present, so every route checks the
 * matching guard and degrades with a 503 instead of crashing the deployment.
 */

export type IntegrationName = "clerk" | "stripe" | "supabase";

const CLERK_KEYS = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
] as const;

const STRIPE_KEYS = ["STRIPE_SECRET_KEY"] as const;

const SUPABASE_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
] as const;

export function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export function requireEnv(name: string): string {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function missing(keys: readonly string[]): string[] {
  return keys.filter((key) => !readEnv(key));
}

export function isClerkConfigured(): boolean {
  return missing(CLERK_KEYS).length === 0;
}

export function isStripeConfigured(): boolean {
  return missing(STRIPE_KEYS).length === 0;
}

/** Read access through RLS with a Clerk session token. */
export function isSupabaseConfigured(): boolean {
  return missing(SUPABASE_KEYS).length === 0;
}

/** Service-role writes, used only by webhook handlers and catalog reads. */
export function isSupabaseAdminConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(readEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

/**
 * Configuration report. Returns key *names* only — never a value, so this is
 * safe to expose on the health route.
 */
export function integrationStatus() {
  return {
    clerk: {
      configured: isClerkConfigured(),
      missing: missing(CLERK_KEYS),
      webhookReady: Boolean(readEnv("CLERK_WEBHOOK_SIGNING_SECRET")),
    },
    stripe: {
      configured: isStripeConfigured(),
      missing: missing(STRIPE_KEYS),
      webhookReady: Boolean(readEnv("STRIPE_WEBHOOK_SECRET")),
    },
    supabase: {
      configured: isSupabaseConfigured(),
      missing: missing(SUPABASE_KEYS),
      serviceRoleReady: isSupabaseAdminConfigured(),
    },
  } as const;
}
