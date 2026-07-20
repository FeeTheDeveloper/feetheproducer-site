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
- App Router API routes for subscribe and contact capture

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
    contact/route.ts
    subscribe/route.ts
  beats/
    [id]/page.tsx
    page.tsx
  about/page.tsx
  contact/page.tsx
  layout.tsx
  licensing/page.tsx
  page.tsx
  releases/page.tsx
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
  `/releases`, per-release pages, and the sitemap all derive from that array
- Add or update beat entries in `lib/data/beats.ts`
- Use public paths such as `/audio/koolin-it-preview.mp3` and
  `/images/covers/koolin-it-cover.png`

### Release-day runbook

1. Set the release `status` to `"live"` and paste store links into `links[]`
   as they resolve (the DistroKid HyperFollow link in `presaveUrl` stays the
   primary CTA and auto-routes to every store).
2. Commit, push, verify the Vercel deploy.
3. When a new record clears DistroKid processing, set its `releaseDate` and
   add its links the same way.

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
4. No environment variables are required right now.
5. Deploy.

## Current Platform Notes

- Audio playback is native HTML audio with one-track-at-a-time control.
- Contact and subscribe endpoints log submissions and are ready for future
  Resend / ConvertKit / Mailchimp integration.
- Payment and cart checkout are intentionally not integrated yet.
