# docs/PHASE-04.md

# Phase 04 — Live Bounds Mirroring (Move/Resize)

Goal
If the base window moves/resizes, overlay repositions/resizes immediately.

Micro-Steps (Detailed)

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

Prompts

- “chrome.windows.onBoundsChanged MV3”
- “chrome.windows.update reposition”

Deliverable

- Drag/resize base → overlay tracks with no visible lag.

Acceptance

- Alignment remains pixel-accurate.
