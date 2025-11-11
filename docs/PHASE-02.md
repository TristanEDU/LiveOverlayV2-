# docs/PHASE-02.md

# Phase 02 — Popup Overlay: Match Base Window Bounds

Goal
Clicking the toolbar (or popup launcher) opens a popup that matches the base window’s bounds (for now).

Micro-Steps (Detailed)

- Permissions
  - Add `"windows", "activeTab"` to `manifest.json` permissions.
  - Reload and confirm no warnings about missing permissions.
- Trigger
  - Option A: `chrome.action.onClicked` in background to open the overlay.
  - Option B: A popup page button sends `chrome.runtime.sendMessage({action:'openOverlay'})` to background.
- Bounds
  - Read current base bounds via `chrome.windows.getCurrent({populate:false})`.
  - Use exact `{left, top, width, height}` in `chrome.windows.create({type:'popup', ...})`.
  - Store `overlayWindowId` for later tracking.
- UI Shell
  - Point the popup at a placeholder URL (`overlay.html` for now) and verify CSS/JS load.
- Verification
  - Compare edges visually; ensure no taskbar/OS UI overlaps.
  - Close overlay; ensure state cleans up (remove any stale ids).

Prompts

- “chrome.windows.create popup MV3”
- “chrome.windows.getCurrent bounds”

Deliverable

- Toolbar click creates a popup perfectly covering your base window.

Acceptance

- No visible gaps on your main monitor.
