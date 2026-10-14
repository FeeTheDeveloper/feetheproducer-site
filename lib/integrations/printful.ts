import "server-only";
import { requireEnv, readEnv } from "./env";
import { retailForMargin, usdCents } from "@/lib/merch-policy";
import type { MerchProduct } from "@/lib/data/merch";

const STORE_ID = "18904049";
export function isPrintfulConfigured() {
  return Boolean(readEnv("PRINTFUL_API_TOKEN")) && readEnv("PRINTFUL_STORE_ID") === STORE_ID;
}

interface SyncVariant {
  id: number; sync_product_id: number; variant_id: number; synced: boolean;
  size: string; color: string; currency: string; retail_price: string;
  availability_status: string; is_ignored: boolean; sku: string;
  files: { status: string; type: string }[];
}
interface SyncProduct { sync_product: { id: number; is_ignored: boolean }; sync_variants: SyncVariant[] }
export interface ShopVariant { id: number; size: string; color: string; priceCents: number }

async function printful<T>(path: string, body?: object, fresh = false): Promise<T> {
  if (!isPrintfulConfigured()) throw new Error("Printful unavailable");
  const response = await fetch(`https://api.printful.com${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${requireEnv("PRINTFUL_API_TOKEN")}`, "X-PF-Store-Id": STORE_ID, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(fresh || body ? { cache: "no-store" as const } : { next: { revalidate: 120 } }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error("Printful request failed");
  const data = await response.json();
  if (data.code !== 200 || !data.result) throw new Error("Invalid Printful response");
  return data.result as T;
}

function usable(variant: SyncVariant, product: MerchProduct) {
  return variant.sync_product_id === product.printfulProductId && variant.synced && !variant.is_ignored &&
    variant.currency === "USD" && variant.availability_status === "active" &&
    variant.files.some((file) => file.type !== "preview" && file.status === "ok") &&
    variant.files.every((file) => file.status === "ok");
}

async function loadProduct(product: MerchProduct, fresh = false) {
  const data = await printful<SyncProduct>(`/store/products/${product.printfulProductId}`, undefined, fresh);
  if (data.sync_product.id !== product.printfulProductId || data.sync_product.is_ignored) throw new Error("Product unavailable");
  return data;
}

export async function shopVariants(product: MerchProduct): Promise<ShopVariant[]> {
  try {
    const data = await loadProduct(product);
    return data.sync_variants.filter((v) => usable(v, product)).flatMap((v) => {
      const priceCents = usdCents(v.retail_price);
      return priceCents && priceCents > 0 ? [{ id: v.id, size: v.size, color: v.color, priceCents }] : [];
    }).sort((a, b) => ["XS", "S", "M", "L", "XL", "2XL", "3XL"].indexOf(a.size) - ["XS", "S", "M", "L", "XL", "2XL", "3XL"].indexOf(b.size));
  } catch { return []; }
}

/** Live stock, stored retail price and actual configured decoration costs. No orders are created. */
export async function quoteMerch(product: MerchProduct, variantId: number, quantity: number) {
  const data = await loadProduct(product, true);
  const variant = data.sync_variants.find((v) => v.id === variantId && usable(v, product));
  if (!variant) throw new Error("Variant unavailable");
  const priceCents = usdCents(variant.retail_price);
  if (!priceCents) throw new Error("Invalid price");
  const catalog = await printful<{ variants: { id: number; in_stock: boolean }[] }>(`/products/${product.catalogProductId}`, undefined, true);
  if (!catalog.variants.some((v) => v.id === variant.variant_id && v.in_stock)) throw new Error("Variant out of stock");
  const [estimate, rates] = await Promise.all([
    // Printful's documented example address is used only to estimate configured
    // manufacturing cost. Actual customer shipping details stay in Stripe.
    printful<{ costs: { currency: string; subtotal: number; additional_fee: number; fulfillment_fee: number } }>("/orders/estimate-costs", {
      recipient: { address1: "19749 Dearborn St", city: "Chatsworth", state_code: "CA", country_code: "US", zip: "91311" },
      items: [{ sync_variant_id: variant.id, quantity: 1 }],
    }),
    printful<{ id: string; name: string; rate: string; currency: string }[]>("/shipping/rates", {
      recipient: { country_code: "US", state_code: "CA" }, items: [{ variant_id: variant.variant_id, quantity }], currency: "USD",
    }),
  ]);
  const cost = estimate.costs;
  const costCents = Math.round((Number(cost.subtotal) + Number(cost.additional_fee) + Number(cost.fulfillment_fee)) * 100);
  if (cost.currency !== "USD" || priceCents < retailForMargin(costCents)) throw new Error("Price requires refresh");
  const rate = rates.find((r) => r.id === "STANDARD" && r.currency === "USD");
  const shippingCents = rate && usdCents(rate.rate);
  if (shippingCents === undefined || shippingCents === null || shippingCents < 0) throw new Error("Shipping unavailable");
  return { variant, priceCents, shippingCents };
}
