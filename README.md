# Fee The Producer — Official Site

The official marketing site for **Fee The Producer LLC**, a veteran-owned music
production brand. Built for selling beats, promoting releases, licensing, and
acting as the brand's professional hub.

## Stack

- Next.js 15 (App Router) with TypeScript
- Tailwind CSS (dark luxury studio theme — black, deep red, metallic gold)
- React 19
- Mobile-first, fully responsive, SEO metadata baked in
- No backend payment wiring yet — placeholder data for beats and releases

## Structure

```
app/
  layout.tsx         # Root layout, navbar + footer, global SEO
  page.tsx           # Home page
  beats/             # Beat catalog
  releases/          # Music release cards
  licensing/         # Pricing tiers + FAQ
  about/             # Brand story
  contact/           # Contact form
  globals.css        # Tailwind + brand tokens
  sitemap.ts
  robots.ts
components/
  layout/            # Navbar, Footer
  ui/                # Button, Section, SectionHeading, Badge, Logo
  cards/             # BeatCard, ReleaseCard, PricingCard
  sections/          # Hero, EmailCapture, LicensingTeaser, BookingCta
  contact/           # ContactForm
lib/
  cn.ts              # Tailwind class merge helper
  site.ts            # Site constants + nav
  data/              # Placeholder beats, releases, licensing data
```

## Brand

| Token         | Value     |
| ------------- | --------- |
| Black         | `#050505` |
| Deep Red      | `#B00000` |
| Bright Red    | `#D00000` |
| Metallic Gold | `#D4AF37` |
| Warm Gold     | `#F5C542` |
| White         | `#FFFFFF` |

## Scripts

```bash
npm install
npm run dev        # local dev
npm run build      # production build
npm run start      # serve built app
npm run typecheck  # type check
```
