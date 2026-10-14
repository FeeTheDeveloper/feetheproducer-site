# Accounts, payments, and database

Updated October 14, 2026. Production is https://feetheproducer.com.
Clerk owns visitor identity; Supabase stores profiles, catalog mappings, orders,
and entitlements; Stripe owns prices and payment state. Secrets and customer
records stay outside this public repository.

## Implemented behavior

- `/sign-up` and `/sign-in` use Clerk. `/account` requires a signed-in visitor.
  Google sign-in is disabled in the production Clerk application.
- Clerk domain records are verified. The enabled Supabase integration trusts
  `https://clerk.feetheproducer.com`.
- Supabase policies permit visitors to read only their own profile, orders, and
  entitlements, plus active products. Client writes and execution of fulfillment
  functions are denied. Service-only database functions handle privileged writes.
- `/api/checkout` accepts `{ productSlug, quantity? }`, requires authentication,
  validates an active one-time Stripe price, and creates a pending order.
  Quantity must be an integer from 1 through 99. An optional `Idempotency-Key`
  is scoped to the user and request contents. Return URLs use the canonical site.
- `/api/webhooks/stripe` verifies signatures and mode, retrieves current Stripe
  state, and commits receipts and fulfillment in one database transaction.
  Pending payments do not grant access. Duplicate/reordered events cannot
  downgrade paid orders or resurrect refunded purchases. Full refunds revoke
  that purchase; another paid purchase retains access. Partial refunds retain
  access. Subscriptions are not enabled.
- `/api/webhooks/clerk` verifies signatures and mirrors profile lifecycle events.
  Monotonic timestamps reject stale updates; deletion tombstones prevent late
  create/update events from restoring deleted profiles.
- `/api/health/integrations` reports presence and missing variable names, never
  credential values. It is a configuration check, not a payment test.
- Contact continues to open an email draft; it does not submit a message.

## Adding digital products

The four old download products and their prices were archived at the owner's
request. The active digital catalog was empty when checked October 14.

Create an active, one-time product and default price in Fee The Producer's Stripe
account. Add product metadata `site=feetheproducer.com`,
`site_slug=your-lowercase-product-slug`, and `site_kind=download` (or `license`).
Run `npm run catalog:sync` to review, then `npm run catalog:sync -- --apply`.
The script verifies the account/project, validates opted-in products, and upserts
mappings. It leaves unrelated existing rows unchanged.

There is no public product-management interface or downloadable-file delivery
implementation yet. Physical Printful merchandise needs separate variant,
shipping, tax, and fulfillment mapping; do not use digital entitlement checkout.

## Provider configuration and deployment

Eight application variables are listed in `.env.example`; values live in ignored
`.env.local` and Vercel production configuration. The Vercel project was recreated
after owner deletion, with Next.js, Node 24, `npm ci`, and `npm run build`.
The apex domain serves the app; `www` redirects to the apex.

Stripe subscribes to checkout completion, async success/failure, expiration, and
refund events. Clerk subscribes to user creation, update, and deletion. Their
signing secrets are independent. Endpoints were enabled after deploying the
routes and verifying signed harmless ignored-event probes.

All three migrations in `supabase/migrations` were applied through the Supabase
SQL editor, not CLI migration tracking. Reconcile migration history before
`supabase db push`; do not blindly reapply the baseline. Both suites in
`supabase/tests` use rollback-only fixtures.

## Verification and limits

Run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:unit`, and
`npm run test:e2e`. Playwright serves a production build at localhost:3100;
rebuild and restart stale previews. Provider evidence stays in ignored
`test-results/provider-evidence`, separate from Playwright output.

Validation includes 16 browser tests, five unit tests, both SQL suites, live
route/image checks, signed harmless ignored-event probes, and rejection of
unsigned webhook requests. Real visitor registration and a paid purchase have
not been performed by the agent. No charge, refund, or fulfillment order was
placed as a test.

Install the CLI with `npm i -g vercel` for `vercel env pull`, `vercel deploy`, and
`vercel logs`. Verify the linked project/team before deploying. Preserve an
owner-maintained environment file before pulling remote variables over it.

