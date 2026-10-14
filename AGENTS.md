# Fee The Producer public website

This repository is `FeeTheDeveloper/feetheproducer-site`. Read the current user request, `DESIGN.md`, `README.md`, and applicable nested instructions before editing. Verify origin, branch, working changes, and scripts; preserve unrelated work.

## Repository-local workflows

- `.agents/skills/fp-site-autopilot/SKILL.md`: discovery, scoped implementation, validation, and reviewable delivery using Plugin Autopilot principles.
- `.agents/skills/fee-producer-site-studio/SKILL.md`: site design and implementation, canonical branding, responsive UI, and stylized character artwork.
- `.agents/skills/fee-producer-web-3d-motion/SKILL.md`: spatial objects, motion lifecycle, reduced-motion/static fallbacks, and browser evidence.
- `.agents/skills/fee-producer-site-catalog/SKILL.md`: verified Apple Music releases and the owner-selected YouTube channel.

These files are portable instructions. They do not install connectors, dispatch agents, grant permissions, or update installed account plugins. If the host does not discover them, open the applicable file explicitly. For Claude Code, use this same workflow map; avoid unsynchronized copies.

## Site contracts

Preserve the supplied logo at `public/brand/fp-luxury-emblem.png`. Keep colors and motion aligned with `DESIGN.md`. Generated studio characters are illustrative artwork, not real people or live agents. All content and primary actions must work with reduced motion and without advanced graphics.

Use `docs/CATALOG_SOURCE.json` and current official source verification for catalog changes. Apple Music artist `1896424385` supplies listed releases; YouTube channel `UC9UgxU4WyYxVZzhVYeLyc_Q` is the video/content funnel. Historical tracks and links are not current authority.

The later October 13 owner request also approves the Payroll Giovanni performance excerpt, its Tubi episode link, and Bylugphonics Instagram on the homepage. See `docs/LIVE_PERFORMANCE.md` for the exact supplied-media cut, owner-reported credit, fictional arena treatment, and remaining caption/source-coverage limitations. Preserve these separately from the release catalog.

Private operations belong in the separately verified `FeeTheDeveloper/ftp_os` target. Do not add contracts, credentials, private catalog/rights records, unreleased audio, or customer data to this public repository. Contact opens an email draft; never claim a message was sent or captured.

## Verification and release

Inspect `package.json` before commands. Run the production build, typecheck, lint, and relevant browser tests for material UI changes. `npm run test:e2e` uses a production build on port 3100; rebuild/restart if an existing preview serves stale assets. Check current/removed routes, links, screenshots, 320px layouts, keyboard navigation, and motion fallback. Review `git diff --check` and the final diff.

Report local, committed, pushed, deployed, and production-verified states separately. Local site work does not imply production release authorization. Reuse existing scoped authorization; prepare concrete reviewable work before any necessary release approval.
