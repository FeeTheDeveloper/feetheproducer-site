---
name: fee-producer-web-3d-motion
description: Design and implement purposeful 3D depth, objects, motion, and studio-character scenes for Fee The Producer websites. Use with site creation or redesign and when changing animation, interaction, performance, or accessible static fallbacks.
---

# Fee The Producer web 3D motion

Build one memorable spatial idea from the artist or client's world: a record sleeve, instrument, production console, room, or approved character. Adapt Fee The Developer's purposeful motion principles without copying another client's identity. Motion must support orientation, feedback, storytelling, or brand recognition.

## Specify the experience

Record purpose, spatial signature, foreground/content/background depth, duration and easing, pointer/touch/keyboard behavior, loading strategy, performance budget, and static composition. Choose quiet depth for dense forms or tools, editorial motion for artist/service sites, or cinematic motion for an explicitly immersive experience.

Prefer CSS transforms, perspective, layering, opacity, and responsive artwork. Reuse an existing animation system for choreography. Add GSAP, Three.js, React Three Fiber, or another renderer only when the concept requires its capabilities and the dependency cost is justified. CSS depth and rendered images are not articulated 3D models.

For true 3D assets, record model source, permitted use, file size, textures, materials, rig and clips, camera framing, lighting, quality tiers, and disposal ownership. Provide a lightweight poster or composed static scene. Lazy-load heavy scenes; clamp pixel ratio and adapt quality. Do not block server rendering, the main content, or the primary action on WebGL.

## Implementation invariants

- Keep headings, controls, status, and navigation in the semantic DOM. Decorative canvas or imagery is not the sole carrier of information.
- Favor transforms and opacity. Avoid continuous layout work, scroll hijacking, pointer traps, and hover-only access.
- Clamp pointer movement; touch and keyboard need deliberate equivalents. Reserve geometry to prevent content shifts.
- Pause ambient work offscreen and when the document is hidden. Cancel frames, remove listeners, disconnect observers, kill timelines/triggers, and dispose renderer resources on unmount and route changes.
- Under reduced motion, remove continuous parallax, rotation, scrubbing, large camera moves, and nonessential entrance travel. Show a strong static composition immediately. Honor dynamic preference changes.
- Provide a visible pause control for continuing decorative motion; persist preference when storage is available. OS reduced motion takes priority.
- Keep focus visible, text readable, targets usable, and navigation/forms operable. Avoid flashes and rapid oscillation.
- Audio is visitor-initiated. A looping visual does not authorize autoplay music, voice cloning, likeness use, external uploads, or a conversational avatar.

## Evidence

Verify desktop and narrow mobile including 320px, keyboard, coarse pointer, reduced motion, pause persistence, resize, back/forward, route remount, no-JavaScript content, and graphics failure when WebGL is used. Inspect offscreen/hidden-tab behavior and lifecycle cleanup. Capture the signature and static state.

Compare bundle weight and observable performance to an actual baseline when available. Do not invent LCP, CLS, INP, frame-rate, device, or assistive-technology results. Clearly name checks not performed. The visual is complete only when code and observed UI support the claimed behavior.
