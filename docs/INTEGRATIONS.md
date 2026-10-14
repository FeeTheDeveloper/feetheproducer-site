# Clerk / Stripe / Supabase integration layer

Wired on 2026-10-13. This document covers what exists in the repository, what
still has to be provisioned outside it, and the boundary this layer respects.

## Boundary

`AGENTS.md` keeps private operations out of this public repository. This layer
is written to that rule:

- **No credentials.** Every secret is read from the environment. `.env.example`
  documents the names; `.env*.local` is git-ignored.
- **No customer data.** Profiles, orders, and entitlements live in Supabase.
  Nothing is written back into the repo.
- **No commercial terms.** Prices are resolved from the Supabase `products`
  table at request time, never from a catalog committed here.
- **Contact is untouched.** `/contact` still opens an email draft. No contact
  route was added, and nothing claims a message was sent or captured.
- **The public site is unaffected.** With no credentials present, the auth
  middleware passes through and each route answers `503`. The stream-first
  pages, reduced-motion behaviour, and no-JavaScript fallbacks are unchanged.

## Routes

| Route | Method | Purpose | Needs |
| --- | --- | --- | --- |
| `/api/health/integrations` | GET | Which integrations are configured. Names of missing variables only — never a value. | — |
| `/api/account` | GET | The signed-in visitor's profile, orders, and entitlements. | Clerk, Supabase |
| `/api/checkout` | POST | Creates a Stripe Checkout session and a pending order. Body: `{ productSlug, quantity? }`. | Clerk, Stripe, Supabase service role |
| `/api/webhooks/stripe` | POST | Settles orders and grants/revokes entitlements. Signature-verified, idempotent. | Stripe, Supabase service role |
| `/api/webhooks/clerk` | POST | Mirrors the Clerk account into `profiles`. Signature-verified. | Clerk signing secret, Supabase service role |

Supporting code lives in [lib/integrations/](../lib/integrations/):
`env.ts` (configuration guards), `stripe.ts`, `supabase.ts` (user-scoped and
service-role clients), `responses.ts` (shared JSON shapes).

### Degradation contract

No module throws at import time. A route whose integration has no credentials
returns `503 {"error":"integration_unavailable","integration":"…"}`. A signed-out
caller gets `401`. This is what `tests/integrations.spec.ts` asserts, and it is
why [middleware.ts](../middleware.ts) only engages Clerk when its keys exist —
without that guard, a deployment with no auth credentials would fail every
request, homepage included.

## Still to provision

None of the following can be completed from this repository:

1. **Supabase project.** The connected Supabase account currently has **no
   organization and no projects**, so one has to be created first. Then apply
   [supabase/migrations/0001_clerk_stripe_commerce.sql](../supabase/migrations/0001_clerk_stripe_commerce.sql)
   with `supabase db push` or the dashboard SQL editor.
2. **Clerk application.** The connected Clerk workspace holds one unrelated
   application (`Hutchrok Solutions Group`). Fee The Producer needs its own.
3. **Clerk ↔ Supabase third-party auth.** Row level security keys off the Clerk
   `sub` claim, which only arrives once the integration is connected: run
   Clerk's *Connect with Supabase* setup, then add Clerk as a Third-Party Auth
   provider in the Supabase dashboard. Until then `/api/account` returns no rows
   even with valid keys.
4. **Stripe account and products.** Create each price in Stripe, then insert the
   matching row in `products` (`slug`, `name`, `kind`, `mode`,
   `stripe_price_id`). The site reads prices from that table.
5. **Webhook endpoints.** Point Stripe at `/api/webhooks/stripe` and Clerk at
   `/api/webhooks/clerk`, then copy each signing secret into the environment.

## Local development

```bash
cp .env.example .env.local   # fill in what you have; partial is fine
npm run dev
curl localhost:3000/api/health/integrations
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Verification

```bash
npm run typecheck && npm run lint && npm run build && npm run test:e2e
```

`npm run test:e2e` serves a production build on port 3100 and reuses an existing
server if one is listening. A preview left running from an earlier build will
serve stale assets and fail the integration specs with `404`s — stop it and
rebuild first.

## Not built

The routes are the integration surface only. No storefront, account page,
sign-in UI, or gated download was added, so the public site is unchanged. The
checkout success and cancel URLs currently return to `/?checkout=complete` and
`/?checkout=cancelled`; give them dedicated pages when that UI lands.
