# Roadmap: “Window Overlay Mode” Chrome Extension (MV3)

Purpose: Build from scratch a Chrome extension that opens a second window on top of your current Chrome window, loads a production site, and provides UI controls (opacity, invert, grid, nudge, click-through) to achieve pixel-perfect matching. No iframes.

Notes:

- We’ll keep tasks bite-sized, with research prompts, concrete deliverables, and acceptance criteria.
- No code in this doc—just what to do, in order.

---

## Phase 0 — Foundations & Setup

Goal: Be ready to build/run a Manifest V3 (MV3) extension.

Tasks:

1. Install tooling
   - Install Chrome (or Edge), VS Code, and Git (optional).
   - Create a working folder for the project.
2. Learn the minimum basics
   - HTML/CSS (elements, classes, positioning, filters).
   - JavaScript essentials (modules, events, async messaging).
   - Chrome Extension concepts: `manifest.json`, service worker (background), content scripts.

Research prompts:

- “Chrome Extensions Manifest V3 overview”
- “Chrome extensions background service worker vs content script”
- “How to load unpacked extension chrome://extensions”

Deliverable:

- Empty project folder with a README that lists tools installed and links to the docs you skimmed.

Acceptance:

- You can open `chrome://extensions`, toggle Developer Mode, and feel comfortable loading a blank placeholder extension later.

---

## Phase 1 — Hello Extension (MV3 Skeleton)

Goal: Create a minimal MV3 extension that loads successfully.

Tasks:

1. Create `manifest.json` with:
   - `manifest_version`: 3
   - `name`, `version`
   - `"action"` (toolbar icon)
   - `"background"` service worker file
   - Minimal `"permissions"`: `storage` for now
2. Add a simple `background.js` (or `background.ts` if you prefer TS later) that logs “service worker ready”.
3. Load the unpacked extension in `chrome://extensions`.

Research prompts:

- “manifest_version 3 example”
- “Chrome extension action button MV3”

Deliverable:

- An extension that loads with no errors; clicking the toolbar icon does nothing yet.

Acceptance:

- The extension shows up with your chosen name and no red errors in the Extensions page.

---

## Phase 2 — Overlay Window: Create & Match Base Window Bounds

Goal: Open a popup window from the extension and match size/position to the current Chrome window.

Tasks:

1. Add `"permissions": ["windows", "activeTab"]` to the manifest.
2. Implement a click handler (action button) in the background to:
   - Get the current window’s bounds (left/top/width/height).
   - Create a new window of type `"popup"` with a placeholder URL (e.g. your extension’s `overlay.html`) using the exact bounds.
3. Add a command/hotkey (optional) to trigger opening the overlay.

Research prompts:

- “chrome.windows.create popup MV3”
- “chrome.windows.getCurrent bounds”
- “Chrome extension commands (keyboard shortcuts)”

Deliverable:

- Click toolbar → A popup window appears perfectly covering the base window.

Acceptance:

- Popup aligns exactly (no noticeable offsets) with your base window on your main monitor.

---

## Phase 3 — Load a Real Production URL in the Overlay Window

Goal: Load an external site directly in the overlay window (no iframe).

Tasks:

1. Decide where the production URL comes from: prompt dialog or a simple options page.
2. Update `chrome.windows.create({ url: prodUrl, type: 'popup', ... })`.
3. Add `"host_permissions"` for the site(s) you’ll overlay. Prefer requesting host permission on demand if you want least privilege.

Research prompts:

- “Chrome extension host_permissions MV3”
- “Request optional host permissions MV3”

Deliverable:

- Overlay popup now shows the real production site you enter.

Acceptance:

- The production site loads successfully inside the popup window you created.

---

## Phase 4 — Live Bounds Mirroring (Move/Resize Sync)

Goal: Keep overlay window always aligned with the base Chrome window (no OS always-on-top needed).

Tasks:

1. Store the `baseWindowId` and `overlayWindowId` in background state.
2. Listen to `chrome.windows.onBoundsChanged`.
3. When the base window changes, update the overlay window via `chrome.windows.update` with the new bounds.

Research prompts:

- “chrome.windows.onBoundsChanged MV3”
- “chrome.windows.update reposition window”

Deliverable:

- Drag/resize the base window → overlay moves/resizes to match immediately.

Acceptance:

- Smooth tracking with minimal lag on your test machine; alignment remains pixel-accurate.

---

## Phase 5 — Zoom Mirroring

Goal: Ensure the overlay and base tab use the same zoom level (critical for pixel accuracy).

Tasks:

1. Identify `baseTabId` (active tab in base window) and `overlayTabId` (tab in the overlay window).
2. On overlay open, get base zoom with `chrome.tabs.getZoom` and set overlay zoom with `chrome.tabs.setZoom`.
3. Listen to `chrome.tabs.onZoomChange` for the base tab and mirror it to the overlay tab.

Research prompts:

- “chrome.tabs.getZoom / setZoom MV3”
- “chrome.tabs.onZoomChange MV3”

Deliverable:

- Changing zoom (Ctrl+ / Ctrl-) in base tab updates overlay tab to the same zoom.

Acceptance:

- 90%, 100%, 110%, 125% tests show the overlay still lines up perfectly.

---

## Phase 6 — Scroll Mirroring

Goal: Keep overlay scrolled to the exact same coordinates as the base page.

Tasks:

1. Inject a **base content script** (matches your **build site**) to capture scroll events (`scrollX`, `scrollY`).
2. Throttle or `requestAnimationFrame` the messages to background for performance.
3. Inject an **overlay content script** (matches your **production site**) to call `window.scrollTo(x, y)` when it receives sync messages from background.
4. Avoid feedback loops: only base sends scroll; overlay only listens and sets scroll.

Research prompts:

- “MV3 content scripts messaging chrome.runtime”
- “Throttling scroll events in JavaScript”
- “window.scrollTo behavior & performance”

Deliverable:

- Scrolling the base page syncs the overlay page precisely.

Acceptance:

- Test fast scrolls, page jumps, and mouse-wheel: overlay never drifts.

---

## Phase 7 — Overlay Controls (Opacity, Invert, Grid, Nudge, Click-Through)

Goal: Add a small floating toolbar injected into the overlay page to control visual alignment.

Tasks:

1. Inject a toolbar UI (HTML/CSS) via the overlay content script:
   - Opacity slider: update a full-screen “veil” element’s `opacity`.
   - Invert toggle: apply `filter: invert(1)` to `html` or a top-level wrapper you inject.
   - Grid toggle: show/hide a fixed-position grid overlay (e.g., 8px/4px/48px as you prefer).
   - Nudge controls: arrow buttons and keyboard arrows to adjust `scrollTo` or a `transform: translate()` offset layer by a few pixels.
   - Click-through toggle: set your UI and veil to `pointer-events:none` to interact with the base page underneath; provide a hotkey to restore.
2. Persist settings with `chrome.storage.local` (opacity, invert state, grid on/off, last nudge).
3. Provide quick keyboard shortcuts (e.g., `Alt+O` for opacity panel, `Alt+I` for invert, `Alt+G` for grid, `Alt+V` for visibility toggle).

Research prompts:

- “CSS filters invert”
- “Fixed overlay veil CSS, pointer-events none”
- “chrome.storage.local MV3 basics”
- “Keyboard event handling in content scripts”

Deliverable:

- Toolbar appears on the production page; all controls work and persist between sessions.

Acceptance:

- You can line up two pages, tweak opacity/invert/grid, nudge by 1px/10px, and temporarily click through.

---

## Phase 8 — Ergonomics & Stability

Goal: Ensure the workflow feels smooth in daily use.

Tasks:

1. Multi-monitor/DPI testing:
   - Verify bounds alignment when the base window is on monitor #2/#3.
   - Confirm high DPI scaling still matches.
2. Performance tuning:
   - Throttle scroll messages (16ms–50ms window); avoid spamming background.
   - Avoid layout thrash in the overlay (minimize reflows).
3. Edge cases:
   - Overlay window closed manually → clean up IDs and allow reopening.
   - Base tab/window changes → update listeners and target IDs.
4. Optional quality-of-life:
   - Status indicator (tiny indicator that sync is active).
   - “Center & maximize overlay” command for quick realignment.

Research prompts:

- “window.devicePixelRatio behavior multi-monitor”
- “Debounce vs throttle in UI”

Deliverable:

- A checklist of what you tested and any fixes you applied.

Acceptance:

- No visible lag, no misalignment after moving across monitors or changing zoom.

---

## Phase 9 — Permissions Hardening & Options UI

Goal: Keep the extension safe and user-friendly.

Tasks:

1. Reduce permissions to the minimum:
   - Use optional host permissions for the production sites you target.
   - Keep core permissions limited to `windows`, `tabs` (if used), `storage`.
2. Options page:
   - Let the user pre-save a set of production URLs.
   - Default opacity/grid preferences per site.

Research prompts:

- “optional_host_permissions MV3”
- “Chrome extension options page MV3”

Deliverable:

- Options page that lists saved sites and defaults; manifest uses least-privilege permissions.

Acceptance:

- You can run the extension against a site without enabling `<all_urls>`.

---

## Phase 10 — Packaging & Basic Docs

Goal: Make it easy for you (or someone else) to install and use.

Tasks:

1. Write a concise README:
   - What it does / Why overlay vs iframe
   - How to install (Load Unpacked)
   - How to use (steps + hotkeys)
   - Known limitations
2. Zip the folder for backup or future web store submission (optional).

Research prompts:

- “Publish Chrome extension checklist” (even if not publishing yet)

Deliverable:

- README.md with screenshots/GIFs and a zipped build.

Acceptance:

- You can follow the README and get to pixel alignment in under 60 seconds.

---

## Phase 11 (Optional) — Advanced Enhancements

Goal: Add power features after core works.

Ideas:

1. Focus-follow: focus overlay when a hotkey is pressed; hide/show quickly.
2. Dual-sync: allow overlay → base scroll mirroring (rarely needed, but possible).
3. Per-site profiles & quick switching.
4. Color-diff or blink-compare mode (rapid toggle overlay visibility to spot differences).
5. Screenshot tools (manual capture and compare outside the extension).
6. Native helper (far future): true OS-level “always-on-top” (requires native app; not needed for your stated use).

Research prompts:

- “chrome.commands focus window”
- “Pixel diff techniques (outside extension)”

Deliverable:

- Pick 1–2 enhancements and spec them before building.

Acceptance:

- Doesn’t compromise simplicity; remains fast and reliable.

---

# Milestones Summary (You Can Check Off)

- [x] Phase 0: Tools installed, basics reviewed
- [ ] Phase 1: MV3 skeleton loads
- [ ] Phase 2: Popup overlay matches base bounds on open
- [ ] Phase 3: Overlay loads real production URL
- [ ] Phase 4: Bounds mirror on move/resize
- [ ] Phase 5: Zoom mirror working both ways
- [ ] Phase 6: Scroll mirror (base → overlay) stable
- [ ] Phase 7: Toolbar (opacity/invert/grid/nudge/click-through) + persistence
- [ ] Phase 8: Multi-monitor/DPI/perf QA complete
- [ ] Phase 9: Permissions trimmed; Options page for saved sites
- [ ] Phase 10: README & packaged zip
- [ ] Phase 11: (Optional) Enhancements

---
