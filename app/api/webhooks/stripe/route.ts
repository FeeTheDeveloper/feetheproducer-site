import type { NextRequest } from "next/server";
import type Stripe from "stripe";
import { isStripeConfigured, isSupabaseAdminConfigured, readEnv } from "@/lib/integrations/env";
import { badRequest, integrationUnavailable, json, serverError } from "@/lib/integrations/responses";
import { getStripeClient, getStripeWebhookSecret } from "@/lib/integrations/stripe";
import { getSupabaseAdminClient } from "@/lib/integrations/supabase";
import { checkoutStatus } from "@/lib/integrations/commerce-policy";

export const dynamic = "force-dynamic";
const CHECKOUT_EVENTS = new Set([
  "checkout.session.completed", "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed", "checkout.session.expired",
]);

/** Verify first; receipts and fulfillment commit in the same DB transaction. */
export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !readEnv("STRIPE_WEBHOOK_SECRET")) return integrationUnavailable("stripe");
  if (!isSupabaseAdminConfigured()) return integrationUnavailable("supabase");
  const signature = request.headers.get("stripe-signature");
  if (!signature) return badRequest("Missing stripe-signature header.");
  const payload = await request.text();
  const stripe = getStripeClient();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, getStripeWebhookSecret());
  } catch {
    return badRequest("Invalid signature.");
  }
  if (event.account || event.livemode !== Boolean(readEnv("STRIPE_SECRET_KEY")?.includes("_live_"))) {
    return badRequest("Unexpected Stripe account or mode.");
  }
  if (!CHECKOUT_EVENTS.has(event.type) && event.type !== "charge.refunded") {
    return json({ received: true, ignored: true });
  }
  if (!("id" in event.data.object) || typeof event.data.object.id !== "string") {
    return badRequest("Missing Stripe object ID.");
  }
  const supabase = getSupabaseAdminClient();
  try {
    let order: Record<string, unknown> | null = null;
    let refundPaymentIntent: string | null = null;
    if (CHECKOUT_EVENTS.has(event.type)) {
      const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items.data.price", "payment_intent.latest_charge"],
      });
      if (session.metadata?.application !== "feetheproducer-site") return json({ received: true, ignored: true });
      const userId = session.metadata.clerk_user_id;
      const productSlug = session.metadata.product_slug;
      const line = session.line_items?.data[0];
      if (session.mode !== "payment" || !userId || !productSlug || session.client_reference_id !== userId ||
          session.line_items?.has_more || session.line_items?.data.length !== 1 || !line?.price ||
          !Number.isInteger(line.quantity) || line.quantity! < 1 || line.quantity! > 99) {
        throw new Error("Invalid checkout binding");
      }
      // Bind fulfillment to the price chosen by our server when checkout began.
      // A later catalog price change must not prevent a paid order from completing.
      if (session.metadata.stripe_price_id !== line.price.id) throw new Error("Unknown checkout price");
      const intent = typeof session.payment_intent === "object" ? session.payment_intent : null;
      const charge = intent && typeof intent.latest_charge === "object" ? intent.latest_charge : null;
      order = {
        session_id: session.id, user_id: userId, product_slug: productSlug, quantity: line.quantity,
        status: checkoutStatus({ paymentStatus: session.payment_status, sessionStatus: session.status,
          eventType: event.type, fullyRefunded: charge?.refunded === true }),
        amount_total: session.amount_total, currency: session.currency,
        payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : intent?.id ?? null,
      };
    } else {
      const charge = await stripe.charges.retrieve(event.data.object.id);
      // Partial refunds retain access; full refunds revoke only this purchase.
      if (!charge.refunded) return json({ received: true, ignored: true });
      refundPaymentIntent = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id ?? null;
      if (!refundPaymentIntent) return json({ received: true, ignored: true });
    }
    const { data, error } = await supabase.rpc("process_stripe_event", {
      p_event_id: event.id, p_event_type: event.type, p_order: order,
      p_refund_payment_intent: refundPaymentIntent,
    });
    if (error) {
      console.error("stripe event transaction failed", { eventId: event.id, code: error.code });
      return serverError("Could not process the event.");
    }
    return json({ received: true, ...data });
  } catch {
    console.error("stripe event processing failed", { eventId: event.id, type: event.type });
    return serverError("Could not process the event.");
  }
}
