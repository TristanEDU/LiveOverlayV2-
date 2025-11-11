# docs/PHASE-03.md

# Phase 03 — Measure Content Area & Place Popup Exactly

Goal
Place the popup over the page content area (not the Chrome UI) using robust content script measurement.

Micro-Steps (Detailed)

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

Prompts

- “visualViewport MDN”
- “chrome.runtime.sendMessage content script MV3”

Deliverable

- Popup hugs the content area exactly across viewport changes and reloads.

Acceptance

- Turning DevTools on/off or changing viewport size re-aligns after re-measure.
