import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

import {
  isClerkConfigured,
  isStripeConfigured,
  isSupabaseAdminConfigured,
} from "@/lib/integrations/env";
import {
  badRequest,
  integrationUnavailable,
  json,
  serverError,
  unauthorized,
} from "@/lib/integrations/responses";
import { getStripeClient } from "@/lib/integrations/stripe";
import { getSupabaseAdminClient } from "@/lib/integrations/supabase";

export const dynamic = "force-dynamic";

interface CheckoutBody {
  productSlug?: unknown;
  quantity?: unknown;
}

/**
 * Starts a Stripe Checkout session for a signed-in visitor and records the
 * pending order.
 *
 * Prices are resolved from the Supabase `products` table, never from a catalog
 * committed to this public repository — commercial terms stay out of the repo.
 */
export async function POST(request: NextRequest) {
  if (!isClerkConfigured()) return integrationUnavailable("clerk");
  if (!isStripeConfigured()) return integrationUnavailable("stripe");
  if (!isSupabaseAdminConfigured()) return integrationUnavailable("supabase");

  const { userId } = await auth();
  if (!userId) return unauthorized();

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return badRequest("Expected a JSON body.");
  }

  const productSlug =
    typeof body.productSlug === "string" ? body.productSlug.trim() : "";
  if (!productSlug) return badRequest("`productSlug` is required.");

  const quantity =
    body.quantity === undefined ? 1 : Number.parseInt(String(body.quantity), 10);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return badRequest("`quantity` must be a whole number between 1 and 99.");
  }

  const supabase = getSupabaseAdminClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("slug, name, stripe_price_id, mode")
    .eq("slug", productSlug)
    .eq("active", true)
    .maybeSingle();

  if (productError) {
    console.error("product lookup failed", productError);
    return serverError("Could not load the product.");
  }
  if (!product) return badRequest(`Unknown or inactive product: ${productSlug}`);

  const origin = new URL(request.url).origin;

  try {
    const session = await getStripeClient().checkout.sessions.create({
      mode: product.mode === "subscription" ? "subscription" : "payment",
      line_items: [{ price: product.stripe_price_id, quantity }],
      client_reference_id: userId,
      metadata: { clerk_user_id: userId, product_slug: product.slug },
      success_url: `${origin}/?checkout=complete&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    const { error: orderError } = await supabase.from("orders").insert({
      clerk_user_id: userId,
      product_slug: product.slug,
      quantity,
      status: "pending",
      stripe_checkout_session_id: session.id,
    });

    if (orderError) {
      // The session already exists in Stripe; the webhook reconciles the order
      // from session metadata, so this is logged rather than surfaced.
      console.error("pending order insert failed", orderError);
    }

    if (!session.url) {
      return serverError("Stripe did not return a checkout URL.");
    }

    return json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("checkout session creation failed", error);
    return serverError("Could not start checkout.");
  }
}
