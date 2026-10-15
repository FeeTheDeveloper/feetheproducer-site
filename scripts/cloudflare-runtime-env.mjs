import { writeFileSync, readFileSync } from "node:fs";

// OpenNext embeds every local .env value as a server-side default. Production
// uses Cloudflare bindings exclusively, including values read via dynamic keys.
const file = new URL("../.open-next/cloudflare/next-env.mjs", import.meta.url);
const empty = "export const production = {};\nexport const development = {};\nexport const test = {};\n";
writeFileSync(file, empty);
if (readFileSync(file, "utf8") !== empty) throw new Error("Runtime environment cleanup failed");
console.log("Worker environment defaults cleared; runtime values must come from Cloudflare bindings.");
