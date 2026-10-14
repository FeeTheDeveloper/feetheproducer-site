# Signature Room asset provenance

## Canonical emblem

- User supplied: `Luxury FP Music Production Emblem.png`, October 13, 2026.
- Repository copy: `public/brand/fp-luxury-emblem.png`.
- Original bytes preserved. No generated replacement, recoloring, or extraction.
- Used in navigation, hero, footer, and social metadata.

## Owner-supplied artist photographs

The owner supplied `IMG_2705 1.jpg` and `IMG_2706.jpg` on October 14, 2026 and explicitly identified the subject as Fee The Producer. The original files remain untouched in the owner's source folder. These are real studio photographs, separate from the fictional studio character below.

| Original | SHA-256 | Enhanced website asset |
| --- | --- | --- |
| `IMG_2705 1.jpg` | `05faa1df95aeb68b887672807390a9e7208833b0601c948ef14251e06c0b32b2` | `public/images/artist/fee-studio-console-enhanced.png` |
| `IMG_2706.jpg` | `d67f2ec27ee8ca66b39bdec5b3ce795eee304ebd3d25f7e5f4dd3abb3f395bef` | `public/images/artist/fee-studio-portrait-enhanced.png` |

Enhancement used the built-in imagegen tool with each original as its own reference. The request preserved identity, pose, clothing, and studio setting while improving exposure, color balance, and clarity, reducing compression noise, and removing the screenshot border. AI restoration can reconstruct fine details; these outputs are presentation derivatives, not unaltered documentary originals. No new biography or studio ownership claim is inferred from the photographs.

The console image is on the homepage's artist section. The closer portrait is on About. Next Image serves responsive sizes; descriptive alt text, visible captions, and static presentation work without motion. The About portrait uses a responsive crop positioned toward the subject.

Console prompt: "Create one enhanced restoration of this exact owner-supplied photograph of Fee The Producer in a recording studio. Preserve his real identity and facial structure, skin tone, build, green cap, black Adidas shirt, jewelry, stance and original camera angle. Preserve the real console, monitors and recording-studio setting and their arrangement. Natural professional documentary photography, restrained warm color grade with accurate skin tones, gently recover shadow detail, balance highlights, reduce compression noise, improve clarity without waxy skin or oversharpening. Remove only the thin screenshot-like brown border along the bottom by cropping; keep the entire person and useful console composition within a wide landscape image. Do not invent facial detail, equipment, logos, text, objects, scenery, or changes to expression. No illustration, beautification or new branding. This is a faithful photo enhancement, not a new scene. Output a clean landscape photograph suitable for an artist's official website."

Portrait prompt: "Enhance this exact owner-supplied studio photograph of Fee The Producer for his official website. Preserve the real person's precise identity, facial features and proportions, beard, skin tone, build, green flat-brim cap, black Adidas shirt, silver necklace, looking-down expression and pose, and actual recording studio window setting. Restrained, natural professional documentary photo restoration: reduce compression noise, gently clarify existing detail, recover shadow detail around the face while maintaining its original lighting, neutralize muddy color with warm authentic skin tones, controlled contrast. Remove the thin brown screenshot border bands at top and bottom by cropping only. Keep the existing landscape framing, head, shoulders and torso, with studio surroundings. Do not add or replace objects, invent logos or text, change clothing or face, beautify, stylize, or create a new pose/background. Retain believable skin texture and photographic softness rather than aggressive AI reconstruction."

## Studio character

- Built-in image generation, October 13, 2026; owner selected **Stylized studio characters**.
- Repository copy: `public/images/studio/studio-character.png`.
- Fictional, faceless studio character. Display caption: “Original digital artwork.”
- This is a rendered image with CSS scene motion. It is not an articulated model, a portrait of the owner, a real studio photograph, or a connected agent.

Prompt:

> Use case: stylized-concept. Asset type: premium music producer website studio character artwork. Create an exceptionally polished three-dimensional rendered original fictional studio character, not a real person. A stylish faceless charcoal-black humanoid wearing a sculptural black bomber jacket, oversized champagne-gold and brushed-silver headphones, seated on a low black studio stool at a small elegant black and gold music production console. Smooth dark oval face with one subtle gold horizontal visor, no eyes, no mouth, no lettering. One hand delicately adjusting a gold rotary knob, the other resting on a compact keyboard. Collectible high-end designer art toy proportions but mature and sophisticated, not childish. Three-quarter view, entire head and upper body and hands visible, strong sculptural silhouette. Black seamless background #0b0b0a with warm gold rim lighting and soft silver key light, tactile satin metal, pebbled leather and fine brushed surfaces. Console in lower third. Square composition, subject centered with generous dark breathing space around entire silhouette. Editorial luxury music studio mood. Grounded contact shadows, cinematic physically based render, very detailed, no glow rings, no neon, no purple, no blue, no text, no logos, no watermark. This is illustrative brand artwork, not a photograph of an actual studio.

## Music artwork

Five official cover images were downloaded from the artwork URLs supplied by the Apple Music connector on October 13, 2026. Sources, canonical track URLs, dates, explicit flags, and artist/song IDs are recorded in `CATALOG_SOURCE.json`. Local copies are `public/images/covers/apple-*.jpg`; original bytes are kept and Next Image serves responsive derivatives. No full audio was downloaded. Public catalog metadata and artwork availability do not establish ownership or licensing rights.

Historical Koolin It, L.R.A., and I'm Gone pages and links have been removed from the displayed catalog and sitemap. Their old routes return 404. Other streaming/social links have been removed. The supplied Apple Music artist and YouTube channel remain, alongside internal navigation and contact.

## Source review

- Base repository: `FeeTheDeveloper/feetheproducer-site`, commit `a3384b75abba818f38b17698cadaa4b59752e5f4`; matched remote HEAD before implementation.
- Existing public experience inspected at https://feetheproducer.com/ on October 13, 2026. The owner then designated the current Apple Music catalog and exact YouTube channel. Canonical metadata was verified through Apple Music and cross-checked against its artist profile; the supplied YouTube channel identity was inspected in Chrome. No rights audit or media-listening claim is made.
- Fee The Developer design-engineering, frontend-design, frontend-design-premium, and web-3d-motion guidance used with Fee The Producer command/repository guidance.
- Mobbin tools were unavailable; no external screen references or Mobbin research results are claimed. Visual direction derives from the supplied emblem.

## Recovery

Site work is isolated on `codex/fp-luxury-rebuild-20261013`. An external commit `75505a2` captured the initial rebuild during the session; it was preserved. Final refinements and repository workflows remain in the working tree. This agent did not commit, push, mutate a site provider, or deploy the site. Review both the branch diff against `a3384b7` and remaining working-tree changes before publishing. The base itself lacks shared shell/components; returning to it does not restore a buildable site. A production rollback must use the actual previously verified deployment.
