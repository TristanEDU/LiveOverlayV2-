# docs/PHASE-06.md

# Phase 06 — Zoom Mirroring

Goal
Overlay tab zoom always matches base tab zoom.

Micro-Steps

- Identify Tabs
  - Track `baseTabId` (active tab in base) and `overlayTabId` (tab inside popup).
- On Open
  - `chrome.tabs.getZoom(baseTabId)` → `chrome.tabs.setZoom(overlayTabId, zoom)`.
- Live Mirror
  - Listen `chrome.tabs.onZoomChange` (base) → set overlay zoom.
- Edge Cases
  - If base tab changes (user switches tabs), update `baseTabId` and mirror again.
  - If overlay tab navigates, reapply zoom when `chrome.tabs.onUpdated` status = complete.

Prompts

- “chrome.tabs.getZoom / setZoom”
- “chrome.tabs.onZoomChange MV3”

Deliverable

- Changing zoom in base mirrors to overlay.

Acceptance

- Test 90%, 100%, 125% — no drift.
