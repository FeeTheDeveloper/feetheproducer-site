import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Throws if STRIPE_SECRET_KEY isn't configured yet — callers decide whether
 * that means "show a fallback" (display price) or "block the action" (checkout).
 */
export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment to enable Stripe checkout."
    );
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Resolves the price shown on the site from the live Stripe Price object, so
 * updating a price in the Stripe dashboard updates the site with no deploy.
 * Falls back to the static label in lib/data/downloads.ts until a real
 * stripePriceId is wired up (or if the Stripe lookup fails for any reason).
 */
export async function getDisplayPrice(
  priceId: string | undefined,
  fallback: string
): Promise<string> {
  if (!priceId || !isStripeConfigured()) {
    return fallback;
  }

  try {
    const stripe = getStripeClient();
    const price = await stripe.prices.retrieve(priceId);

    if (typeof price.unit_amount !== "number") {
      return fallback;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency.toUpperCase(),
      maximumFractionDigits: price.unit_amount % 100 === 0 ? 0 : 2
    }).format(price.unit_amount / 100);
  } catch {
    return fallback;
  }
}
