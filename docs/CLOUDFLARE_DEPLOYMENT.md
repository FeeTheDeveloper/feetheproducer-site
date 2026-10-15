# Cloudflare deployment

This application runs on Cloudflare Workers through OpenNext 1.20.12.

- Account: Fee@feethedeveloper.com's Account (`62738e2bb751720449f1cd904f6d175f`)
- Worker: `feetheproducer-site`
- Production: https://feetheproducer.com
- Custom domains: `feetheproducer.com` and `www.feetheproducer.com`
- Recovery URL: https://feetheproducer-site.fee-627.workers.dev

## Build and release

Use Node 24 and the committed npm lockfile. Install with `npm ci`, then run
the existing type/lint/unit checks and the Next production build.
On Windows, build Next directly before `npx opennextjs-cloudflare build --skipNextBuild`,
then run `node scripts/cloudflare-runtime-env.mjs`. Runner Gang uses `npm run build -- --webpack`.
Next is configured for standalone output. Original image assets are served
directly; no paid image optimization resource is provisioned.

For a brand-new Worker, `npm run cf:bootstrap` creates it with all public routing
disabled. `npm run cf:upload` stages later versions without changing traffic.
`npm run cf:secrets` prints only the names of the allowlisted runtime bindings;
`npm run cf:secrets -- --apply` stages those values from ignored `.env.local`
using stdin. Deploy the resulting version at 100% with
`wrangler versions deploy <version-id>@100% -y`.
The first release also needs workers.dev enabled and
`wrangler triggers deploy` to attach the declared custom domains.

Runtime secrets are limited to the Clerk, Supabase, Stripe webhook, and Printful variables used by this application. The existing merch release and manual fulfillment policy are preserved.

Cloudflare deployment credentials belong in the local CLI environment or CI
secrets. Never sync the entire local environment into the Worker.
The build/upload scripts clear OpenNext's generated local environment defaults
before deployment, preventing local provider credentials from becoming runtime
fallbacks. Only explicit Worker bindings are available in production.
NEXT_PUBLIC variables must also be present during the Next build.

## Verification and recovery

Check both hostnames, homepage imagery, account access, configuration health,
signed-out API denial, and rejection of unsigned webhooks. No purchase,
subscription, provider import, or fulfillment is needed for deployment checks.

Retain a healthy Worker version and use `wrangler versions deploy` to restore
it if a later release fails. Code rollback does not roll back provider data.
A deleted Vercel project is not a usable fallback.

Provider documentation:
[OpenNext setup](https://opennext.js.org/cloudflare/get-started),
[environment variables](https://opennext.js.org/cloudflare/howtos/env-vars).

Git pushes do not deploy automatically until a Cloudflare Builds or external CI
integration has separately been configured and verified.

## Cutover receipt: 2026-10-15

Production version: `890b99d1-3b8b-424f-9879-9fc282195428` at 100% traffic.
Both hostnames are Worker custom domains; `www` redirects permanently to the apex.
The two unproxied CNAMEs targeting `7d6f9d0b9fc7f312.vercel-dns-016.com`
were replaced. Mail, Clerk, and verification records were preserved.

Next production build, OpenNext bundle, typecheck, lint, and seven unit tests
passed. The production dependency audit reports zero vulnerabilities.
Generated Worker code and client assets contain no local privileged credential
values after the environment-default cleanup.

Live checks passed for homepage, streaming, release detail, studio, merch,
product detail, sign-in, sitemap, and the supplied video. The integration health
route reports all four integrations configured. The account API rejects an
anonymous caller with 401, and the Stripe webhook rejects unsigned requests
with 400. No transaction or fulfillment was created.

Chrome rendered the live homepage and six-product merch collection. Further
browser verification was interrupted by another extension UI; final HTTP checks
were performed against the custom domains at the Cloudflare edge.
