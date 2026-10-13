# Initial Signature Room rebuild — verification

Date: October 13, 2026. Branch: `codex/fp-luxury-rebuild-20261013`.

Status: implemented locally, production build verified, preview running at http://127.0.0.1:3100/. No commit, push, or production deployment performed.

## Completed checks

- `npm run build`: passed on Next.js 15.5.27. Fifteen static pages generated; homepage First Load JS is 113 kB. No WebGL/animation library added.
- `npm run typecheck`: passed.
- `npm run lint`: passed with no lint warnings/errors. Next reports that the `next lint` command itself is deprecated; migrating that tool is a separate maintenance item.
- `npm run test:e2e`: **8 passed**, 32.8 seconds, Chromium.
- `npm audit --omit=dev`: **zero vulnerabilities** after compatible Next/source-map-js updates.
- `git diff --check`: passed.
- Supplied logo and installed copy have identical SHA-256: `6C4F0C1336E10B20840D986B3BC255C774295F05E5A0753D1ED789ACB18B3271`.
- Chrome visual review completed; the local homepage is left open as the review deliverable.

## Browser coverage

1. Ten public routes return 200, all local image elements load, one H1 per route, no uncaught page errors. Unknown releases/beats and removed downloads/checkout return 404.
2. Homepage, catalog, studio, contact, release detail, and about checked at 1440, 768, 390, and 320 pixels without horizontal overflow. Desktop and mobile screenshots saved.
3. Keyboard skip link, native mobile disclosure, Escape focus return, and navigation close behavior pass.
4. Motion pause/resume, saved preference across reload, dynamic OS reduced-motion changes, offscreen suspension, and navigation/remount pass.
5. With JavaScript disabled, content and mobile navigation remain usable; the contact email link remains available and draft controls stay disabled to avoid accidental URL submission of personal data.
6. Contact validation and draft feedback pass; no POST occurs. Synthetic test values only, no message sent.
7. Video loads no provider iframe before interaction. Its requested YouTube URL is verified through an intercepted response; playback itself is not claimed as tested.
8. Automated axe scans find no WCAG A/AA violations on six routes at desktop and mobile sizes. This is not a certification or a full assistive-technology audit.

Screenshots are in ignored `test-results/site-desktop-mobile-and-na-064f1-have-no-horizontal-overflow/`: `hero-1440.png`, `hero-390.png`, `hero-320.png`, and corresponding `homepage-*` full-page images.

## Limits and maintenance

- CSS 3D scenes and rendered character artwork are implemented. Articulated/rigged avatar models, lip sync, voice, and conversational agents are not implemented.
- Full `npm audit` still reports nine development-tool advisories (seven high, two moderate), in the existing Tailwind/ESLint glob/parser chain. Runtime dependencies are clean. A forced Tailwind major migration/ESLint downgrade was not mixed into the visual rebuild.
- The original checkout was missing its shared shell and several dependencies/components. No valid local pre-rebuild performance baseline exists, and no field LCP/CLS/INP claim is made.
- Hidden-tab event cleanup is present in code; real background-tab throttling and low-power device performance need wider device testing. Automated browser evidence is Chromium only.
- Existing public catalog links and artist copy were carried forward; a new rights/credits/catalog audit was not part of this work. Several cover files had been removed in the base commit; brand-designed sleeves are used without restoring those files.
- Contact remains a mailto draft flow. The character is labeled digital artwork and does not impersonate the owner or imply a live assistant.
- No deployment is authorized by this local rebuild. Provider/project/deployment state must be verified at release time. See `REBUILD_ASSETS.md` for provenance and recovery boundaries.
