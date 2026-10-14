import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Owner-run tool. Defaults to a read-only plan; credentials stay in the environment.
const env = { ...parseEnv(readFileSync(".env.local", "utf8")), ...process.env };
const apply = process.argv.includes("--apply");
if (process.argv.slice(2).some(arg => arg !== "--apply")) throw new Error("Usage: npm run catalog:sync -- [--apply]");
for (const key of ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])
  if (!env[key]) throw new Error(`Missing ${key}`);
const stripe = new Stripe(env.STRIPE_SECRET_KEY);
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } });

try {
  const account = await stripe.accounts.retrieve();
  if (account.id !== "acct_1TyVQUAuTxmRmIVI" || new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname !== "pvxfykvcxfjavdqqjvvn.supabase.co")
    throw new Error("Provider identity mismatch. Review the intended accounts before running this tool.");
  const rows = [];
  const slugs = new Set();
  for await (const product of stripe.products.list({ active: true, limit: 100, expand: ["data.default_price"] })) {
    if (product.metadata.site !== "feetheproducer.com") continue;
    const slug = product.metadata.site_slug;
    const kind = product.metadata.site_kind;
    const price = product.default_price;
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100 || slugs.has(slug))
      throw new Error(`Missing, duplicate, or invalid site_slug on product ${product.id}`);
    if (!["download", "license"].includes(kind) || !price || typeof price === "string" || !price.active || price.type !== "one_time")
      throw new Error(`Product ${product.id} needs site_kind=download|license and an active one-time default price`);
    slugs.add(slug);
    rows.push({ slug, name: product.name, kind, mode: "payment", stripe_price_id: price.id, active: true });
  }
  console.log(JSON.stringify({ mode: apply ? "apply" : "plan", products: rows.map(({ slug, name, kind }) => ({ slug, name, kind })) }, null, 2));
  if (apply && rows.length) {
    const { error } = await supabase.from("products").upsert(rows, { onConflict: "slug" });
    if (error) throw new Error(`Catalog update failed (${error.code})`);
    console.log(`Saved ${rows.length} product(s).`);
  } else if (!rows.length) console.log("No opted-in active products. Catalog unchanged.");
} catch (error) {
  // Do not dump SDK request/response objects or environment values.
  console.error(error instanceof Error ? error.message : "Catalog sync failed");
  process.exitCode = 1;
}
