# Signature Room asset provenance

## Canonical emblem

- User supplied: `Luxury FP Music Production Emblem.png`, October 13, 2026.
- Repository copy: `public/brand/fp-luxury-emblem.png`.
- Original bytes preserved. No generated replacement, recoloring, or extraction.
- Used in navigation, hero, about, footer, and social metadata.

## Studio character

- Built-in image generation, October 13, 2026; owner selected **Stylized studio characters**.
- Repository copy: `public/images/studio/studio-character.png`.
- Fictional, faceless studio character. Display caption: “Original digital artwork.”
- This is a rendered image with CSS scene motion. It is not an articulated model, a portrait of the owner, a real studio photograph, or a connected agent.

Prompt:

> Use case: stylized-concept. Asset type: premium music producer website studio character artwork. Create an exceptionally polished three-dimensional rendered original fictional studio character, not a real person. A stylish faceless charcoal-black humanoid wearing a sculptural black bomber jacket, oversized champagne-gold and brushed-silver headphones, seated on a low black studio stool at a small elegant black and gold music production console. Smooth dark oval face with one subtle gold horizontal visor, no eyes, no mouth, no lettering. One hand delicately adjusting a gold rotary knob, the other resting on a compact keyboard. Collectible high-end designer art toy proportions but mature and sophisticated, not childish. Three-quarter view, entire head and upper body and hands visible, strong sculptural silhouette. Black seamless background #0b0b0a with warm gold rim lighting and soft silver key light, tactile satin metal, pebbled leather and fine brushed surfaces. Console in lower third. Square composition, subject centered with generous dark breathing space around entire silhouette. Editorial luxury music studio mood. Grounded contact shadows, cinematic physically based render, very detailed, no glow rings, no neon, no purple, no blue, no text, no logos, no watermark. This is illustrative brand artwork, not a photograph of an actual studio.

## Music artwork

`Rolling` uses the existing repository cover. Three previously removed cover files are not restored. Their cards use code-authored branded sleeves and are described as branded record sleeves in accessible text, not original cover art.

## Source review

- Base repository: `FeeTheDeveloper/feetheproducer-site`, commit `a3384b75abba818f38b17698cadaa4b59752e5f4`; matched remote HEAD before implementation.
- Existing public experience inspected at https://feetheproducer.com/ on October 13, 2026. Existing catalog and destination links retained; this work is not a new rights or release-metadata audit.
- Fee The Developer design-engineering, frontend-design, frontend-design-premium, and web-3d-motion guidance used with Fee The Producer command/repository guidance.
- Mobbin tools were unavailable; no external screen references or Mobbin research results are claimed. Visual direction derives from the supplied emblem.

## Recovery

All work is isolated on `codex/fp-luxury-rebuild-20261013`. No commit, push, provider mutation, or deployment is part of this initial rebuild. Review the diff against the base before publishing. The base itself lacks shared shell/components; returning to it does not restore a buildable site. A production rollback must use the actual previously verified deployment.
