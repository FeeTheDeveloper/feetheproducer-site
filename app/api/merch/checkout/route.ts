import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { findMerch } from "@/lib/data/merch";
import { quoteMerch } from "@/lib/integrations/printful";
import { getStripeClient } from "@/lib/integrations/stripe";
import { merchQuantity, validCheckoutKey } from "@/lib/merch-policy";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Card-only hosted checkout. The merchant fulfills paid orders manually. */
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const localOrigin = request.nextUrl.hostname === "localhost" && origin === request.nextUrl.origin;
  if (origin !== SITE.url && !localOrigin) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return NextResponse.json({ error: "Request too large." }, { status: 413 });
  let form: FormData;
  try { form = await request.formData(); }
  catch { return NextResponse.json({ error: "Invalid form." }, { status: 400 }); }
  const slug = form.get("product");
  const variant = form.get("variant");
  const quantity = merchQuantity(form.get("quantity"));
  const requestKey = form.get("requestKey");
  const product = typeof slug === "string" ? findMerch(slug) : undefined;
  if (!product || typeof variant !== "string" || !/^\d{1,15}$/.test(variant) || !quantity || !validCheckoutKey(requestKey)) {
    return NextResponse.json({ error: "Invalid product selection." }, { status: 400 });
  }
  try {
    const quote = await quoteMerch(product, Number(variant), quantity);
    const stripe = getStripeClient();
    const stripeProduct = await stripe.products.retrieve(product.stripeProductId);
    if (stripeProduct.deleted || !stripeProduct.active || stripeProduct.metadata.application !== "feetheproducer-merch" ||
        stripeProduct.metadata.printful_product_id !== String(product.printfulProductId)) throw new Error("Product unavailable");
    const prices = await stripe.prices.list({ lookup_keys: [`ftp-merch-${product.slug}-${quote.priceCents}`], active: true, limit: 1 });
    const price = prices.data[0];
    if (!price || price.product !== product.stripeProductId || price.unit_amount !== quote.priceCents || price.currency !== "usd" || price.type !== "one_time") throw new Error("Price unavailable");
    const metadata = {
      application: "feetheproducer-merch", product_slug: product.slug,
      printful_store_id: "18904049", printful_product_id: String(product.printfulProductId),
      printful_sync_variant_id: String(quote.variant.id), printful_variant_id: String(quote.variant.variant_id),
      size: quote.variant.size, color: quote.variant.color, quantity: String(quantity),
      sku: quote.variant.sku, fulfillment: "manual_printful",
    };
    const idempotencyKey = createHash("sha256").update(JSON.stringify(["merch", product.slug, variant, quantity, requestKey])).digest("hex");
    const session = await stripe.checkout.sessions.create({
      mode: "payment", managed_payments: { enabled: false }, allowed_payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity }],
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [{ shipping_rate_data: { type: "fixed_amount", fixed_amount: { amount: quote.shippingCents, currency: "usd" }, display_name: "Standard US shipping" } }],
      custom_text: { submit: { message: `Size: ${quote.variant.size}. Color: ${quote.variant.color}. Made to order after review by Fee The Producer.` } },
      metadata, payment_intent_data: { metadata, description: `${product.name} / ${quote.variant.size} / ${quote.variant.color}` },
      success_url: `${SITE.url}/merch/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/merch/${product.slug}?checkout=cancelled`,
    }, { idempotencyKey });
    if (!session.url) throw new Error("Checkout unavailable");
    return NextResponse.redirect(session.url, 303);
  } catch {
    console.error("Merch checkout unavailable", { product: product.slug });
    return NextResponse.redirect(new URL(`/merch/${product.slug}?checkout=unavailable`, request.url), 303);
  }
}
