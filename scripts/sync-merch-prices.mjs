import fs from "node:fs";
import Stripe from "stripe";
import { merch } from "../lib/data/merch.ts";
import { retailForMargin, usdCents } from "../lib/merch-policy.ts";

if (fs.existsSync(".env.local")) process.loadEnvFile(".env.local");
const apply = process.argv.includes("--apply");
if (process.env.PRINTFUL_STORE_ID !== "18904049" || !process.env.PRINTFUL_API_TOKEN) throw new Error("Expected Fee The Producer Printful store");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
if ((await stripe.accounts.retrieve()).id !== "acct_1TyVQUAuTxmRmIVI") throw new Error("Unexpected Stripe account");
async function printful(path, method = "GET", body) {
  const response = await fetch(`https://api.printful.com${path}`, {
    method, headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`, "X-PF-Store-Id": "18904049", "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Printful ${method} ${path} failed (${response.status})`);
  const data = await response.json();
  if (data.code !== 200) throw new Error("Printful returned an invalid response");
  return data.result;
}
const report = [];
for (const product of merch) {
  const data = await printful(`/store/products/${product.printfulProductId}`);
  if (data.sync_product.id !== product.printfulProductId) throw new Error("Unexpected product");
  const prices = new Map();
  for (const variant of data.sync_variants) {
    if (!variant.synced || variant.currency !== "USD" || variant.sync_product_id !== product.printfulProductId) throw new Error("Invalid variant binding");
    const { costs } = await printful("/orders/estimate-costs", "POST", {
      recipient: { address1: "19749 Dearborn St", city: "Chatsworth", state_code: "CA", country_code: "US", zip: "91311" },
      items: [{ sync_variant_id: variant.id, quantity: 1 }],
    });
    if (costs.currency !== "USD") throw new Error("Unexpected currency");
    const costCents = Math.round((Number(costs.subtotal) + Number(costs.additional_fee) + Number(costs.fulfillment_fee)) * 100);
    const retailCents = retailForMargin(costCents);
    report.push({ slug: product.slug, size: variant.size, syncVariantId: variant.id, costCents, retailCents, currentRetailCents: usdCents(variant.retail_price), digitization: costs.digitization, discountExcluded: costs.discount, checkedAt: new Date().toISOString() });
    if (apply && usdCents(variant.retail_price) !== retailCents) await printful(`/store/variants/${variant.id}`, "PUT", { retail_price: (retailCents / 100).toFixed(2) });
    if (apply && !prices.has(retailCents)) {
      const lookupKey = `ftp-merch-${product.slug}-${retailCents}`;
      let price = (await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 })).data[0];
      if (!price) price = await stripe.prices.create({ product: product.stripeProductId, currency: "usd", unit_amount: retailCents, lookup_key: lookupKey, metadata: { application: "feetheproducer-merch" } }, { idempotencyKey: lookupKey });
      if (price.product !== product.stripeProductId || price.unit_amount !== retailCents || price.currency !== "usd") throw new Error("Stripe price binding mismatch");
      prices.set(retailCents, price.id);
    }
  }
  if (apply) {
    await stripe.products.update(product.stripeProductId, { default_price: prices.get(Math.min(...prices.keys())) });
    const verified = await printful(`/store/products/${product.printfulProductId}`);
    for (const v of verified.sync_variants) if (usdCents(v.retail_price) !== report.find((r) => r.syncVariantId === v.id)?.retailCents) throw new Error("Price readback mismatch");
  }
  console.log(`${product.name}: ${data.sync_variants.length} variants ${apply ? "saved and verified" : "checked"}`);
}
fs.mkdirSync("test-results", { recursive: true });
fs.writeFileSync("test-results/merch-pricing-report.json", JSON.stringify({ mode: apply ? "apply" : "read-only", margin: .30, report }, null, 2));
console.log(`Report saved privately under test-results. ${apply ? "Paid orders retain their original Stripe prices." : "No prices changed. Use --apply to save these prices."}`);
