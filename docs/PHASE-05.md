# docs/PHASE-05.md

# Phase 05 — Load a Real Production URL in the Overlay

Goal
Open the **production** site directly in the popup (no iframe).

Micro-Steps
- URL Source
  - Option A: Read from your launcher UI field.
  - Option B: Simple Options page to store presets.
- Create Popup with URL
  - `chrome.windows.create({ url: prodUrl, type: "popup", ...rect })`.
- Permissions
  - Prefer optional `host_permissions` and request on demand.
  - Handle denied permission: show an instructional toast and skip injection features.
- Overlay Tab Tracking
  - Capture created window/tab IDs from `chrome.windows.create` callback.
  - Save `overlayTabId` for zoom/scroll mirroring in later phases.

Prompts
- “Chrome extension host_permissions MV3”
- “Request optional host permissions”

Deliverable
- Popup displays the production URL at the measured content bounds.

Acceptance
- Site loads successfully; no permission errors.
