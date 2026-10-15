import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";
import { execFileSync } from "node:child_process";

const allowed = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "CLERK_WEBHOOK_SIGNING_SECRET",
  "PRINTFUL_API_TOKEN",
  "PRINTFUL_STORE_ID"
];
const values = parseEnv(readFileSync(new URL("../.env.local", import.meta.url), "utf8"));
const selected = Object.fromEntries(allowed.filter((key) => values[key]?.trim()).map((key) => [key, values[key]]));
const missing = allowed.filter((key) => !selected[key]);
if (missing.length) throw new Error(`Missing runtime configuration: ${missing.join(", ")}`);
console.log(`Staging ${allowed.length} allowlisted runtime bindings: ${allowed.join(", ")}`);
if (!process.argv.includes("--apply")) {
  console.log("Dry run. Add --apply to stage a Worker version with these secrets.");
  process.exit(0);
}
execFileSync(process.execPath, ["node_modules/wrangler/bin/wrangler.js", "versions", "secret", "bulk"], {
  input: JSON.stringify(selected),
  stdio: ["pipe", "inherit", "inherit"],
});
