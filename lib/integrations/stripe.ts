import Stripe from "stripe";

import { requireEnv } from "@/lib/integrations/env";

let client: Stripe | null = null;

/**
 * Lazily constructed Stripe client. The API version is left at the version the
 * installed SDK pins so the two can never drift apart.
 */
export function getStripeClient(): Stripe {
  if (!client) {
    client = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
      typescript: true,
      appInfo: { name: "feetheproducer-site" },
    });
  }
  return client;
}

export function getStripeWebhookSecret(): string {
  return requireEnv("STRIPE_WEBHOOK_SECRET");
}
