# Roadmap (Consolidated)

This roadmap summarizes each phase’s goal, core micro-steps, prompts, and acceptance. For the full deep-dive (including navigation, prerequisites, troubleshooting, and validation checklists), open the corresponding phase guide.

Contents
- [Phase 00 — Foundations & Setup](./PHASE-00.md)
- [Phase 01 — MV3 Skeleton (Hello Extension)](./PHASE-01.md)
- [Phase 02 — Popup Overlay: Match Base Window Bounds](./PHASE-02.md)
- [Phase 03 — Measure Content Area & Place Popup Exactly](./PHASE-03.md)
- [Phase 04 — Live Bounds Mirroring (Move/Resize)](./PHASE-04.md)
- [Phase 05 — Load a Real Production URL in the Overlay](./PHASE-05.md)
- [Phase 06 — Zoom Mirroring](./PHASE-06.md)
- [Phase 07 — Scroll Mirroring (Base → Overlay)](./PHASE-07.md)
- [Phase 08 — Overlay Controls (Opacity, Invert, Grid, Click-Through, Nudge)](./PHASE-08.md)
- [Phase 09 — Calibration (Per OS/Channel)](./PHASE-09.md)
- [Phase 10 — Multi-Monitor/DPI & Performance QA](./PHASE-10.md)
- [Phase 11 — Permissions & Options UI (Least Privilege)](./PHASE-11.md)
- [Phase 12 — Packaging & Docs](./PHASE-12.md)
- [Phase 13 (Optional) — Advanced Enhancements](./PHASE-13.md)

See also: [PHASE-00 → PHASE-13](./PHASE-00.md)

## Phase 00 — Foundations & Setup

Full guide → [PHASE-00.md](./PHASE-00.md)

Goal
Be ready to build/run an MV3 extension and reload iteratively.

Micro-Steps
- Tools
  - Install Chrome (or Edge), VS Code, and Git.
  - Create a folder for the project and open it in VS Code.
- Chrome Extensions Basics
  - Skim what MV3 is (service worker vs content scripts).
  - Learn how to load an unpacked extension from `chrome://extensions`.
- Workspace Prep
  - Create empty files: `manifest.json`, `background.js`, `README.md`.
  - Pin `chrome://extensions` with Developer Mode on.

Prompts
- “Chrome Extensions Manifest V3 overview”
- “Load unpacked extension chrome://extensions”

Deliverable
- Folder opens as an unpacked extension (even if minimal).

Acceptance
- You can reload the extension and see background logs in the service worker console.

## Phase 01 — MV3 Skeleton (Hello Extension)

Full guide → [PHASE-01.md](./PHASE-01.md)

Goal
Create a minimal MV3 extension that loads cleanly.

Micro-Steps
- Manifest
  - Set `manifest_version: 3`, `name`, `version`.
  - Add `"background": { "service_worker": "background.js" }`.
  - Add `"action"` (we’ll wire it later).
  - Add `"permissions": ["storage"]` (expand later).
- Background
  - In `background.js`, log “Service worker ready”.
- Load
  - Load unpacked at `chrome://extensions` and confirm no errors.

Prompts
- “manifest_version 3 example”
- “Chrome extension action MV3”

Deliverable
- Extension appears with no red errors; background logs show up.

Acceptance
- Clicking toolbar icon does nothing yet (that’s fine).

## Phase 02 — Popup Overlay: Match Base Window Bounds

Full guide → [PHASE-02.md](./PHASE-02.md)

Goal
Clicking the toolbar opens a popup that matches the base window’s bounds (for now).

Micro-Steps
- Permissions
  - Add `"windows", "activeTab"` to `manifest.json` permissions.
- Action Click → Create Popup
  - In `background.js`, handle action click (or a message from popup) to:
    - `chrome.windows.getCurrent()` → read `{left, top, width, height}`.
    - `chrome.windows.create({ type: "popup", url: "src/ui/overlay.html", left, top, width, height })`.
- UI Shell
  - Ensure `src/ui/overlay.html` loads without errors (CSS/JS linked).

Prompts
- “chrome.windows.create popup MV3”
- “chrome.windows.getCurrent bounds”

Deliverable
- Toolbar click creates a popup perfectly covering your base window.

Acceptance
- No visible gaps on your main monitor.

## Phase 03 — Measure Content Area & Place Popup Exactly

Full guide → [PHASE-03.md](./PHASE-03.md)

Goal
Place the popup over the page content area (not the Chrome UI). Use content script measurement.

Micro-Steps
- Base Content Script
  - Add a content script (matches your build site).
  - On load and on `visualViewport.onresize`, compute:
    - `visualViewport.width/height`
    - `window.screenX/screenY`, `outerWidth/outerHeight`, `innerWidth/innerHeight`
  - Derive content rect (DIP):
    - `w = visualViewport.width`, `h = visualViewport.height`
    - `left = screenX + (outerWidth - innerWidth)/2`
    - `top = screenY + (outerHeight - innerHeight - bottomFrame?)`
  - Send `{type: "MEASURE", rect}` to background.
- Background
  - On `MEASURE`, create/update popup with `rect` instead of full window.
- Safety
  - Don’t hardcode frame sizes. Calibrate in Phase 09.

Prompts
- “visualViewport MDN”
- “chrome.runtime.sendMessage content script MV3”

Deliverable
- Popup now sits exactly over the web content area.

Acceptance
- No overlap on tab strip or browser UI.

## Phase 04 — Live Bounds Mirroring (Move/Resize)

Full guide → [PHASE-04.md](./PHASE-04.md)

Goal
Overlay tracks base window movements/resizes.

Micro-Steps
- IDs
  - Keep `baseWindowId` and `overlayWindowId` in background state.
- Listener
  - Subscribe to `chrome.windows.onBoundsChanged` for `baseWindowId`.
- Update
  - Re-measure content rect (Phase 03) and `chrome.windows.update(overlayWindowId, rect)`.
- Edge Cases
  - If overlay closed, clear IDs and allow clean reopen.

Deliverable
- Drag/resize base → overlay tracks with no visible lag.

Acceptance
- Alignment remains pixel-accurate.

## Phase 05 — Load a Real Production URL in the Overlay

Full guide → [PHASE-05.md](./PHASE-05.md)

Goal
Open the production site directly in the popup (no iframe).

Micro-Steps
- URL Source
  - Option A: Read from your launcher UI field.
  - Option B: Options page presets.
- Create Popup with URL
  - `chrome.windows.create({ url: prodUrl, type: "popup", ...rect })`.
- Permissions
  - Use `"host_permissions"` or request optional host permission at launch.

Prompts
- “Chrome extension host_permissions MV3”
- “Request optional host permissions”

Deliverable
- Popup displays the production URL at the measured content bounds.

Acceptance
- Site loads successfully; no permission errors.

## Phase 06 — Zoom Mirroring

Full guide → [PHASE-06.md](./PHASE-06.md)

Goal
Overlay tab zoom always matches base tab zoom.

Micro-Steps
- Identify Tabs
  - Track `baseTabId` (active tab in base) and `overlayTabId` (tab inside popup).
- On Open
  - `chrome.tabs.getZoom(baseTabId)` → `chrome.tabs.setZoom(overlayTabId, zoom)`.
- Live Mirror
  - Listen `chrome.tabs.onZoomChange` (base) → set overlay zoom.

Prompts
- “chrome.tabs.getZoom / setZoom”
- “chrome.tabs.onZoomChange MV3”

Deliverable
- Changing zoom in base mirrors to overlay.

Acceptance
- Test 90%, 100%, 125% — no drift.

## Phase 07 — Scroll Mirroring (Base → Overlay)

Full guide → [PHASE-07.md](./PHASE-07.md)

Goal
Keep overlay scrolled to the same coordinates as the base page.

Micro-Steps
- Base Content Script
  - On scroll, use `requestAnimationFrame` throttling to send `{type: "SCROLL", x: scrollX, y: scrollY}` to background.
- Overlay Content Script
  - Listen for `{x,y}` via background relay → `window.scrollTo(x, y)`.
- One-Way Rule
  - Only base sends; overlay only applies to avoid feedback loops.

Prompts
- “content script messaging chrome.runtime”
- “Throttle vs debounce scroll events”
- “window.scrollTo performance”

Deliverable
- Scrolling/jumping in base stays matched.

Acceptance
- Flick wheel, PgDn, anchors — overlay never drifts.

## Phase 08 — Overlay Controls (Opacity, Invert, Grid, Click-Through, Nudge)

Full guide → [PHASE-08.md](./PHASE-08.md)

Goal
Hands-on overlay controls for alignment finesse.

Micro-Steps
- UI Hooks (Overlay Page)
  - Opacity: range → update veil element’s `opacity`.
  - Invert: toggle → `filter: invert(1)` on a wrapper or `html`.
  - Grid: toggle → show/hide fixed grid layer.
  - Click-through: toggle → `pointer-events: none` on overlay layers/UI; provide a hotkey to restore.
  - Nudge: arrow keys for ±1 / ±10 px via `transform` or scroll.
- Persistence
  - Save settings via `chrome.storage.local`.
- Hotkeys
  - Add keyboard shortcuts (e.g., Alt+O Alt+I Alt+G Alt+V).

Deliverable
- Toolbar visible; settings persist; quick toggles work.

Acceptance
- You can line up two pages in seconds using controls.

## Phase 09 — Calibration (Per OS/Channel)

Full guide → [PHASE-09.md](./PHASE-09.md)

Goal
Store small per-OS/channel adjustments to perfect alignment.

Micro-Steps
- UI
  - Add a Calibration card to tweak ±px for top/left/width/height.
- Persist
  - Save by key: `{platform}:{browserBrandOrChannel}`.
- Apply
  - Add saved nudge to rect before create/update.

Deliverable
- Nudge values persist and apply automatically.

Acceptance
- After one calibration, overlays open pixel-true every time.

## Phase 10 — Multi-Monitor, DPI & Performance QA

Full guide → [PHASE-10.md](./PHASE-10.md)

Goal
Bulletproof behavior across monitors and DPI; keep scroll sync smooth.

Micro-Steps
- Multi-Monitor/DPI
  - Move base window to another monitor → re-measure and update.
  - Verify `devicePixelRatio` changes don’t break alignment (DIP only).
- Performance
  - Throttle scroll sync to ~16–33ms (60–30 FPS).
  - Ensure grid/veil are fixed/composited to avoid layout thrash.
- Edge Handling
  - If overlay closed manually, clear IDs and allow clean reopen.

Prompts
- “window.devicePixelRatio multi-monitor”
- “requestAnimationFrame throttling”

Deliverable
- QA checklist with passes/fixes.

Acceptance
- No visible lag; no drift after monitor moves or DPI changes.

## Phase 11 — Permissions & Options UI (Least Privilege)

Full guide → [PHASE-11.md](./PHASE-11.md)

Goal
Trim permissions; add a simple Options page for presets.

Micro-Steps
- Permissions
  - Use optional host permissions instead of `<all_urls>`.
  - Keep core: `windows`, `storage`, and `tabs` only if needed.
- Options Page
  - Save a list of production URLs + default overlay settings per site.
  - Provide “Launch with preset” in popup.

Prompts
- “optional_host_permissions MV3”
- “Chrome extension options page MV3”

Deliverable
- Options page works; minimal permissions enforced.

Acceptance
- You can overlay a site without enabling global `<all_urls>`.

## Phase 12 — Packaging & Docs

Full guide → [PHASE-12.md](./PHASE-12.md)

Goal
Anyone can install and use in under a minute.

Micro-Steps
- README
  - What & why (popup overlay vs iframe).
  - Install: “Load Unpacked” steps with screenshot/GIF.
  - Use: toolbar click → URL → controls & hotkeys → calibrate once.
  - Limits: no always-on-top; calibration note.
- Zip
  - Zip the folder for backup or future Web Store submission.

Prompts
- “Publish Chrome extension checklist”

Deliverable
- README + zipped build.

Acceptance
- Fresh install to pixel alignment in <60 seconds following README.

## Phase 13 (Optional) — Advanced Enhancements

Full guide → [PHASE-13.md](./PHASE-13.md)

Goal
Add power features without hurting simplicity.

Ideas
- Focus-follow: hotkey to focus overlay; quick hide/show.
- Dual-sync (overlay → base) when explicitly enabled.
- Per-site profiles & quick switching.
- Blink-compare mode (rapid visibility toggle).
- Screenshot helpers (external compare).

Acceptance
- Enhancements don’t introduce drift or add friction.
