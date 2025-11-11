# docs/PHASE-07.md

# Phase 07 — Scroll Mirroring (Base → Overlay)

Goal
Keep overlay scrolled to the same coordinates as the base page.

Micro-Steps

- Base Content Script
  - On scroll, use `requestAnimationFrame` throttling to send `{type: "SCROLL", x: scrollX, y: scrollY}` to background.
- Overlay Content Script
  - Listen for `{x,y}` via background relay → `window.scrollTo(x, y)`.
- One-Way Rule
  - Only base sends; overlay only applies to avoid feedback loops.
- Stability
  - Use `history.scrollRestoration = 'manual'` in overlay to avoid auto-jumps.
  - Ignore messages while overlay is actively setting scroll (set a short-lived flag).

Prompts

- “content script messaging chrome.runtime”
- “Throttle vs debounce scroll events”
- “window.scrollTo performance”

Deliverable

- Scrolling/jumping in base stays matched.

Acceptance

- Flick wheel, PgDn, anchors — overlay never drifts.
