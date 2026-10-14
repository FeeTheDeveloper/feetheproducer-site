import { auth } from "@clerk/nextjs/server";
import { createHash, randomUUID } from "node:crypto";
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
import { checkoutQuantity, checkoutRequestKey } from "@/lib/integrations/commerce-policy";
import { SITE } from "@/lib/site";

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

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return badRequest("Expected a JSON object.");
  }
  const productSlug =
    typeof body.productSlug === "string" ? body.productSlug.trim() : "";
  if (!productSlug) return badRequest("`productSlug` is required.");

  const quantity = checkoutQuantity(body.quantity);
  if (quantity === null) {
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
    console.error("product lookup failed", { code: productError.code });
    return serverError("Could not load the product.");
  }
  if (!product) return badRequest(`Unknown or inactive product: ${productSlug}`);

  if (product.mode !== "payment") {
    return badRequest("Subscription checkout is not enabled.");
  }
  const suppliedKey = request.headers.get("idempotency-key");
  const requestKey = suppliedKey ? checkoutRequestKey(suppliedKey) : randomUUID();
  if (!requestKey) return badRequest("Invalid Idempotency-Key.");
  const idempotencyKey = createHash("sha256")
    .update(JSON.stringify([userId, productSlug, quantity, requestKey]))
    .digest("hex");

  try {
    const stripe = getStripeClient();
    const price = await stripe.prices.retrieve(product.stripe_price_id, { expand: ["product"] });
    if (!price.active || price.type !== "one_time" || typeof price.product === "string" || price.product.deleted || !price.product.active) {
      return badRequest("This product is unavailable.");
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: product.stripe_price_id, quantity }],
      client_reference_id: userId,
      metadata: { application: "feetheproducer-site", clerk_user_id: userId, product_slug: product.slug, stripe_price_id: price.id },
      success_url: `${SITE.url}/?checkout=complete&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/?checkout=cancelled`,
    }, { idempotencyKey });

    const { error: orderError } = await supabase.from("orders").upsert({
      clerk_user_id: userId,
      product_slug: product.slug,
      quantity,
      status: "pending",
      stripe_checkout_session_id: session.id,
    }, { onConflict: "stripe_checkout_session_id", ignoreDuplicates: true });

    if (orderError) {
      console.error("pending order insert failed", { code: orderError.code });
      if (session.status === "open") await stripe.checkout.sessions.expire(session.id);
      return serverError("Could not record the order. Please try again.");
    }

    if (!session.url) {
      return serverError("Stripe did not return a checkout URL.");
    }

    return json({ url: session.url, sessionId: session.id });
  } catch {
    console.error("checkout session creation failed");
    return serverError("Could not start checkout.");
  }
}
