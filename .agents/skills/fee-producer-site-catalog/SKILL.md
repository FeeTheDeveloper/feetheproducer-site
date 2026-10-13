---
name: fee-producer-site-catalog
description: Refresh Fee The Producer website releases, artwork, Apple Music destinations, and the YouTube video funnel from current owner-approved sources. Use when adding or removing catalog entries or external media links.
---

# Fee The Producer public catalog

## Identity and source

The owner-selected Apple Music artist is Fee The Producer, artist ID `1896424385`:
https://music.apple.com/us/artist/fee-the-producer/1896424385

The owner-selected video/content channel is:
https://www.youtube.com/channel/UC9UgxU4WyYxVZzhVYeLyc_Q

The October 13, 2026 site direction is Apple Music for listed releases and that YouTube channel for videos/content. Do not restore old tracks, social destinations, presaves, search links, or arbitrary YouTube videos from historical snapshots. A later explicit owner instruction can change this direction.

## Refresh procedure

1. Read current repository instructions, `lib/data/releases.ts`, `lib/site.ts`, routes, sitemap, tests, and any `docs/CATALOG_SOURCE.json`. Those paths describe the owner's site; map equivalents before editing another project.
2. Fetch current public artist metadata with the available Apple Music connector or official page. Cross-check exact artist ID and relationship to each release. Search results with matching names alone are insufficient.
3. Preserve full official titles, featured-artist spelling, explicit flags, release dates, artwork URLs, and canonical destination URLs. Distinguish a song from its album/single container. Never imply listening from metadata access.
4. Record the source, verification date, artist/song IDs, selected public fields, and unresolved differences. Do not export private library membership, user favorites, access tokens, or unrelated results.
5. Reconcile the displayed catalog to the requested current source. Remove obsolete cards, routes, metadata, sitemap entries, and external links consistently. Do not delete permanent rights/operations records or unrelated assets under a website cleanup request.
6. Use the supplied YouTube channel as the funnel. Verify its displayed identity when possible. An empty channel remains a valid owner-selected destination; do not fabricate uploads, embeds, watch counts, or a featured video.
7. Keep internal navigation and business contact destinations unless the user requests their removal. No audio downloads, checkout, licensing claims, or rights transfers arise from a streaming catalog update.
8. Check rendered titles/artwork, current release routes, removed-route behavior, sitemap, and the complete external-link set. Record verified results and stale or unreachable sources separately.

Public catalog metadata is not proof of composition/master ownership, splits, licenses, contributor approval, or clearance. Rights and private operational records belong in the verified private operations target, not this public website repository.
