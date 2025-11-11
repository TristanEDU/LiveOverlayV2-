# Phase 07 — Scroll Mirroring (Base → Overlay)

Navigation: [← Prev Phase 06](./PHASE-06.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 08](./PHASE-08.md)

## Scope & Depth

- One-way scroll sync design and throttling
- Stabilization tactics (manual restoration, anti-looping)
- Troubleshooting drift under heavy input
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Micro-Steps](#micro-steps)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)
- [Prompts](#prompts)
- [Deliverable](#deliverable)
- [Acceptance](#acceptance)

## Goal
Keep overlay scrolled to the same coordinates as the base page.

## Micro-Steps

- Base Content Script
  - On scroll, use `requestAnimationFrame` throttling to send `{type: "SCROLL", x: scrollX, y: scrollY}` to background.
- Overlay Content Script
  - Listen for `{x,y}` via background relay → `window.scrollTo(x, y)`.
- One-Way Rule
  - Only base sends; overlay only applies to avoid feedback loops.
- Stability
  - Use `history.scrollRestoration = 'manual'` in overlay to avoid auto-jumps.
  - Ignore messages while overlay is actively setting scroll (set a short-lived flag).

## Prerequisites

- Phase 06 complete (zoom mirrored; base/overlay tab IDs tracked).

## Troubleshooting

- Drift during fast scrolls: throttle with rAF and use latest message wins; avoid queuing many scroll events.
- Scroll blocked by sticky headers: consider offsetting grid overlay or using visual markers that ignore page chrome.

## Prompts

- “content script messaging chrome.runtime”
- “Throttle vs debounce scroll events”
- “window.scrollTo performance”

## Deliverable

- Scrolling/jumping in base stays matched.

## Acceptance

- Flick wheel, PgDn, anchors — overlay never drifts.
