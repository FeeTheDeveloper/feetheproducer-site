# Fee The Producer site

Next.js 15 artist site for Fee The Producer. The public experience features the current Apple Music catalog, the owner-selected YouTube channel, production services, and an email draft contact flow.

[Portfolio evidence and truth boundary](docs/PORTFOLIO_CASE_STUDY.md)

The homepage also includes a stadium-style viewing room for the owner-supplied Payroll Giovanni / Bylugphonics performance, with Fee The Producer's drum credit, four archive photos, and links to the full Tubi episode and the band. The 62-second local clip is an excerpt from the final captured passage, not a complete final song. See [performance provenance and limitations](docs/LIVE_PERFORMANCE.md).

## Signature Room rebuild

The gold/silver/black visual system, dimensional emblem scene, and stylized studio character are documented in [DESIGN.md](DESIGN.md). See [asset provenance and scope](docs/REBUILD_ASSETS.md). The supplied logo is preserved unchanged. Motion can be paused and respects the OS reduced-motion preference. The scene uses CSS depth with raster artwork; the character is not a rigged 3D model.

For browser verification, run `npx playwright install chromium` once, then `npm run test:e2e`. Test output and screenshots are kept in ignored `test-results/`.

## Local checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

## Catalog

Edit `lib/data/releases.ts` for release pages and `lib/site.ts` for site destinations. The October 13, 2026 snapshot contains five Apple Music releases; source metadata and artwork provenance are in `docs/CATALOG_SOURCE.json`. Refresh official source metadata before changes. The canonical artist page is `https://music.apple.com/us/artist/fee-the-producer/1896424385`. Videos and content route to `https://www.youtube.com/channel/UC9UgxU4WyYxVZzhVYeLyc_Q`.

## Repository workflows

Read [AGENTS.md](AGENTS.md) for the four local workflows under `.agents/skills/`: Site Autopilot, Site Studio, Web 3D Motion, and Site Catalog. They adapt Plugin Autopilot and Fee The Producer guidance for this repository. They do not install providers or create a separate website plugin. Host discovery may require a new session; the files can also be opened explicitly.

Keep full audio, private project files, contracts, and credentials out of `public/` and this public repository. A future paid download flow needs confirmed distribution rights, private storage, a provider-backed delivery check, and a separate reviewed release.

## Merch

The Core Collection is at `/merch`, backed by the Fee The Producer Printful store and Stripe Checkout. Pricing uses a 30% product gross margin; checkout is US-only and production orders are fulfilled manually. See [merch setup, pricing refresh and order handling](docs/MERCH.md). Product artwork and private pricing reports are not stored in this public repository.

## Contact

The contact form opens a draft in the visitor's email app. The visitor must send it. There is no server-side inbox or newsletter provider configured; the site must not claim that a message or signup was captured.

## Deployment

Production runs on the Cloudflare Worker `feetheproducer-site`, serving the apex and `www` hosts. See [Cloudflare build, deployment and recovery](docs/CLOUDFLARE_DEPLOYMENT.md). This repository is not yet connected for automatic Git deployments; a push alone does not update production.
