# Phase 04 — Live Bounds Mirroring (Move/Resize)

Navigation: [← Prev Phase 03](./PHASE-03.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 05](./PHASE-05.md)

## Scope & Depth

- Live mirroring via bounds listeners and re-measure
- Guards for loops, throttling strategies, cleanup patterns
- Troubleshooting jitter, missed updates, and event storms
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Micro-Steps (Detailed)](#micro-steps-detailed)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)
- [Prompts](#prompts)
- [Deliverable](#deliverable)
- [Acceptance](#acceptance)

## Goal
If the base window moves/resizes, overlay repositions/resizes immediately.

## Micro-Steps (Detailed)

- Track IDs
  - Store `baseWindowId` and `overlayWindowId` in background.
- Listen & Re-measure
  - `chrome.windows.onBoundsChanged` → when base changes:
    - Ask base content script to re-MEASURE (request message).
    - `chrome.windows.update(overlayWindowId, rect)`.
  - Throttle with `requestAnimationFrame` or ~16ms timeout to avoid jitter.
- Viewport Changes
  - Base content script: `visualViewport.onresize` → send MEASURE too (DevTools/emulation).
- Guards & Cleanup
  - Track `chrome.windows.onRemoved` to clear `overlayWindowId` if user closes it.
  - Use a boolean "isUpdating" to ignore your own update events to prevent loops.

## Prerequisites

- Phase 03 complete (content-rect measurement working).

## Troubleshooting

- Jitter or oscillation: throttle updates with `requestAnimationFrame` and guard against handling your own updates.
- Overlay not updating: verify you’re re-measuring on every bounds change and the message path returns a fresh rect.
- onBoundsChanged firing too often: coalesce multiple events within a single animation frame.

## Prompts

- “chrome.windows.onBoundsChanged MV3”
- “chrome.windows.update reposition”

## Deliverable

- Drag/resize base → overlay tracks with no visible lag.

## Acceptance

- Alignment remains pixel-accurate.
