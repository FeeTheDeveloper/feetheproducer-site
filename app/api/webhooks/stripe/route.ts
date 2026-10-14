import type { NextRequest } from "next/server";
import type Stripe from "stripe";

import {
  isStripeConfigured,
  isSupabaseAdminConfigured,
} from "@/lib/integrations/env";
import {
  badRequest,
  integrationUnavailable,
  json,
  serverError,
} from "@/lib/integrations/responses";
import {
  getStripeClient,
  getStripeWebhookSecret,
} from "@/lib/integrations/stripe";
import { getSupabaseAdminClient } from "@/lib/integrations/supabase";

export const dynamic = "force-dynamic";

const UNIQUE_VIOLATION = "23505";

/**
 * Stripe event sink: verifies the signature over the raw body, records the
 * event id to stay idempotent across redelivery, then settles the order and
 * grants or revokes the entitlement.
 */
export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) return integrationUnavailable("stripe");
  if (!isSupabaseAdminConfigured()) return integrationUnavailable("supabase");

  const signature = request.headers.get("stripe-signature");
  if (!signature) return badRequest("Missing `stripe-signature` header.");

  // Raw body: parsing it first would invalidate the signature.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(
      payload,
      signature,
      getStripeWebhookSecret(),
    );
  } catch (error) {
    console.error("stripe signature verification failed", error);
    return badRequest("Invalid signature.");
  }

  const supabase = getSupabaseAdminClient();

  const { error: seenError } = await supabase
    .from("stripe_webhook_events")
    .insert({ id: event.id, type: event.type });

  if (seenError) {
    if (seenError.code === UNIQUE_VIOLATION) {
      return json({ received: true, duplicate: true });
    }
    console.error("webhook event log failed", seenError);
    return serverError("Could not record the event.");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId =
          session.metadata?.clerk_user_id ?? session.client_reference_id;
        const productSlug = session.metadata?.product_slug;
        if (!userId || !productSlug) break;

        const { data: order } = await supabase
          .from("orders")
          .update({
            status: "paid",
            amount_total: session.amount_total,
            currency: session.currency,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_checkout_session_id", session.id)
          .select("id")
          .maybeSingle();

        await supabase.from("entitlements").upsert(
          {
            clerk_user_id: userId,
            product_slug: productSlug,
            order_id: order?.id ?? null,
            revoked_at: null,
          },
          { onConflict: "clerk_user_id,product_slug" },
        );
        break;
      }

      case "checkout.session.expired": {
        await supabase
          .from("orders")
          .update({ status: "expired", updated_at: new Date().toISOString() })
          .eq("stripe_checkout_session_id", event.data.object.id);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        const paymentIntentId =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : null;
        if (!paymentIntentId) break;

        const { data: refunded } = await supabase
          .from("orders")
          .update({ status: "refunded", updated_at: new Date().toISOString() })
          .eq("stripe_payment_intent_id", paymentIntentId)
          .select("id, clerk_user_id, product_slug");

        for (const order of refunded ?? []) {
          await supabase
            .from("entitlements")
            .update({ revoked_at: new Date().toISOString() })
            .eq("clerk_user_id", order.clerk_user_id)
            .eq("product_slug", order.product_slug);
        }
        break;
      }

      default:
        break;
    }
  } catch (error) {
    // Drop the idempotency record so Stripe's retry is processed rather than
    // skipped as a duplicate.
    console.error(`stripe handler failed for ${event.type}`, error);
    await supabase.from("stripe_webhook_events").delete().eq("id", event.id);
    return serverError("Handler failed.");
  }

  return json({ received: true, type: event.type });
}
