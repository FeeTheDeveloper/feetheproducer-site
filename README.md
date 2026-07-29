# Fee The Producer Official Site

Next.js App Router site for **Fee The Producer LLC**. A Vercel-ready artist
site built around a data-driven release catalog, with audio previews, official
video embeds, per-release pages, lead capture, licensing content, and contact
flows.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- App Router API routes for subscribe, contact, and Stripe checkout

## Local Development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run build
npm run typecheck
```

## Project Structure

```text
app/
  api/
    checkout/route.ts
    contact/route.ts
    download/route.ts
    subscribe/route.ts
  beats/
    [id]/page.tsx
    page.tsx
  downloads/
    success/page.tsx
    cancel/page.tsx
    page.tsx
  streaming/
    [slug]/page.tsx
    page.tsx
  about/page.tsx
  contact/page.tsx
  layout.tsx
  licensing/page.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  cards/
  contact/
  forms/
  layout/
  music/
  sections/
  seo/
  ui/
lib/
  data/
    beats.ts
    licensing.ts
    releases.ts
  format.ts
  site.ts
public/
  audio/
  brand/
  images/
    covers/
```

## Media Workflow

- Put audio previews in `public/audio/` — 30-second clips only, never full
  unreleased tracks
- Put cover art in `public/images/covers/` (1024x1024)
- Add or update releases in `lib/data/releases.ts` — the homepage hero,
  `/streaming`, per-release streaming pages, and the sitemap all derive from
  that array
- Add or update beat entries in `lib/data/beats.ts`
- Add or update sellable singles in `lib/data/downloads.ts` — see the Stripe
  section below
- Use public paths such as `/audio/koolin-it-preview.mp3` and
  `/images/covers/koolin-it-cover.png`

### Release-day runbook

1. Set the release `status` to `"live"` and paste store links into `links[]`
   as they resolve (the DistroKid HyperFollow link in `presaveUrl` stays the
   primary CTA and auto-routes to every store).
2. Commit, push, verify the Vercel deploy.
3. When a new record clears DistroKid processing, set its `releaseDate` and
   add its links the same way.

## Stripe (Downloads)

`/downloads` sells each single directly via Stripe Checkout; `/streaming`
only carries streaming platform links, no purchase flow. To go live:

1. In the Stripe dashboard, create a Product + Price (one-time, not
   subscription) for each single.
2. Set `STRIPE_SECRET_KEY` in your environment (Vercel project settings
   locally in `.env.local`). Use a test key (`sk_test_...`) until you're
   ready to charge real cards, then swap to the live key.
3. Paste each Price ID (`price_...`) into that track's `stripePriceId` field
   in `lib/data/downloads.ts`. Until a track has a `stripePriceId`, its card
   shows "Checkout Coming Soon" instead of a Buy button.
4. To change a price later, edit the Price in Stripe — the site fetches the
   live amount on each request (`getDisplayPrice` in `lib/stripe.ts`) and
   shows it automatically, no deploy needed. The `price` field in
   `downloads.ts` is only the fallback shown before Stripe is wired up.
5. `/api/checkout` creates the Checkout Session and redirects to Stripe.
   `/api/download` verifies the completed session with Stripe before
   streaming the file back with a `Content-Disposition: attachment` header.

Known limitation: the audio files live under `public/audio`, which Next.js
serves to anyone who knows or guesses the path, regardless of payment. The
paid-download flow gates the polished experience (checkout → verified
download), but it isn't a hard technical barrier against someone finding the
direct file URL. Moving source files to private storage (e.g. an S3/R2
bucket with signed URLs) would close that gap if it matters for a given
release.

## Vercel Deployment

This repo is configured for Vercel with:

- `vercel.json` using the Next.js framework preset
- `npm ci` for installs
- `npm run build` for production builds
- `package.json` engine range set to `>=20 <25`

Deployment steps:

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Keep the root directory as the repository root.
4. Set `STRIPE_SECRET_KEY` as an environment variable to enable `/downloads`
   checkout (see the Stripe section above). No other environment variables
   are required.
5. Deploy.

## Current Platform Notes

- Audio playback is native HTML audio with one-track-at-a-time control.
- Contact and subscribe endpoints log submissions and are ready for future
  Resend / ConvertKit / Mailchimp integration.
- Singles are sold through Stripe Checkout (see the Stripe section above);
  custom beat licensing and placements still route through `/contact`.
