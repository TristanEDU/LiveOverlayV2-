# Phase 03 — Measure Content Area & Place Popup Exactly

Navigation: [← Prev Phase 02](./PHASE-02.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 04](./PHASE-04.md)

## Scope & Depth

- VisualViewport-based measurement with DIP math
- Prerequisites and setup for content scripts/messaging
- Troubleshooting for offsets and zoom-related drift
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Micro-Steps (Detailed)](#micro-steps-detailed)
- [Prompts](#prompts)
- [Deliverable](#deliverable)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)
- [Acceptance](#acceptance)

## Goal
Place the popup over the page content area (not the Chrome UI) using robust content script measurement.

## Micro-Steps (Detailed)

- Base Content Script
  - Add a content script (matches your build site) via manifest or `chrome.scripting.registerContentScripts`.
  - On load and on `visualViewport.onresize`, compute:
    - `visualViewport.width/height/pageLeft/pageTop`
    - `window.screenX/screenY`, `outerWidth/outerHeight`, `innerWidth/innerHeight`
  - Derive content rect (DIP):
    - `w = Math.round(visualViewport.width)`; `h = Math.round(visualViewport.height)`
    - `left = Math.round(screenX + (outerWidth - innerWidth)/2 + visualViewport.pageLeft)`
    - `top  = Math.round(screenY + (outerHeight - innerHeight) - bottomFrameGuess + visualViewport.pageTop)`
    - Start with `bottomFrameGuess = 0`; defer exact chrome frame to Phase 09.
  - Send `{type: 'MEASURE', rect, dpr: devicePixelRatio}` to background (throttle to rAF).
- Background
  - On first `MEASURE`, create popup with `rect` and save `overlayWindowId`.
  - On subsequent `MEASURE`, `chrome.windows.update(overlayWindowId, rect)`.
  - Guard: ignore bounds events caused by your own updates to prevent loops.
- Safety
  - Avoid magic numbers; rely on measure + calibration later.
  - Use DIP consistently; Chrome bounds APIs use CSS pixels.

## Prompts

- “visualViewport MDN”
- “chrome.runtime.sendMessage content script MV3”

## Deliverable

- Popup hugs the content area exactly across viewport changes and reloads.

## Prerequisites

- Phase 02 complete (basic overlay popup created with window bounds).

## Troubleshooting

- Numbers look right but small offset remains: this is expected; handle via Phase 09 calibration nudges.
- `visualViewport` undefined: ensure the content script runs in all frames or fallback to `innerWidth/innerHeight`.
- Coordinates drift on pinch zoom: use `visualViewport.pageLeft/pageTop` and keep all math in DIP (CSS px).

## Acceptance

- Turning DevTools on/off or changing viewport size re-aligns after re-measure.
