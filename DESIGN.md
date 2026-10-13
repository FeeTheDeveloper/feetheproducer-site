# Fee The Producer — Signature Room

Approved brief: rebuild the public artist site around the supplied gold/silver FP headphones emblem, with 3D objects, motion, and stylized studio characters. Scope is local implementation and review.

## Direction

A listening room: grooved records, metallic edges, black studio equipment, editorial typography, and generous space. The supplied logo remains the canonical identity; do not redraw, crop, recolor, or replace it with generated artwork.

The first screen pairs a large editorial headline with a dimensional logo sleeve and record. Selected music follows, then a studio character and production offerings. Music and contact remain the main visitor actions. No splash screen, scroll hijacking, invented metrics, autonomous assistant claims, or autoplay audio.

## Tokens and typography

Canonical colors live in `app/globals.css`; Tailwind references its RGB custom properties for gold and ink.

| Token | Value | Role |
| --- | --- | --- |
| Ink | #0A0A09 | Background |
| Surface | #151513 | Form and studio surfaces |
| Champagne | #DABA7F | Brand accent and emphasis |
| Gold light | #F1DFB8 | Primary action and highlights |
| Silver | #C8C5BF | Secondary foreground |
| Paper | #F2EEE5 | Primary text |
| Muted | #A5A29B | Body and supporting text |

Georgia/Times New Roman for expressive headings and record titles; Arial/Helvetica for body and small labels. System fonts avoid remote requests and font-swap layout shifts. Serif italics echo the dimensional lettering without imitating the logo. Borders are subtle, corners restrained, and visual hierarchy comes from size and spacing.

## Motion specification

- Intensity: editorial motion, with a cinematic studio composition.
- Signature: the unmodified emblem on a CSS 3D sleeve, offset from a grooved record. This is layered CSS geometry and raster artwork, not a WebGL model.
- Depth: record/background plane, sleeve at 55–65px, foreground copy in the document flow. Pointer rotation is clamped to 4/5 degrees on fine pointers.
- Timing: 200–600ms interaction transitions; restrained 9–12s decorative drift. CSS transforms only for continuous motion.
- Pause: a visible control near the hero and in the footer; preference persists when storage is available. The OS reduced-motion setting takes priority.
- Lifecycle: IntersectionObserver and document visibility gate ambient work; pointer frames/listeners are cleaned up on pause, offscreen state, and unmount. Touch users never depend on hover.
- Fallback: server-rendered copy, images, links, and a composed static scene; native mobile disclosure works without JavaScript. No WebGL dependency. Video is loaded only when requested.
- Asset budget: original PNGs are retained; Next Image serves responsive optimized derivatives. Character is lazy-loaded, emblem is the hero priority image. No animation library added.

## Content and boundaries

The current repository removed several cover images before this work. Preserve those removals. Missing covers use clearly labeled brand-designed record sleeves; retained Rolling artwork remains unchanged. The catalog's artist identity and existing streaming destinations remain the source of truth. Generated character art is explicitly illustrative and does not represent Fee, an employee, or a live assistant.

Contact prepares a mailto draft; visitors must send it. No inbox provider, checkout, downloadable audio, avatar voice, chat, or account integration is provisioned. Native select semantics and platform-owned popup geometry are intentional.

## Verification

Production build, typecheck, lint; desktop and 320/390px layouts; all page routes and local image assets; keyboard navigation, disclosure Escape, motion pause persistence, OS reduced motion, offscreen/hidden-tab cleanup; no-JS navigation; contact validation/draft behavior; click-to-load video boundary; automated axe accessibility checks. Capture representative screenshots in ignored `test-results/`.
