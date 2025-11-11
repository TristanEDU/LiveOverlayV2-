# Phase 05 — Load a Real Production URL in the Overlay

Navigation: [← Prev Phase 04](./PHASE-04.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 06](./PHASE-06.md)

## Scope & Depth

- Launching with real URLs and managing permissions
- Tracking overlay window/tab IDs for future mirroring
- Troubleshooting permission prompts and popup creation
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Micro-Steps](#micro-steps)
- [Prompts](#prompts)
- [Deliverable](#deliverable)
- [Acceptance](#acceptance)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)

## Goal
Open the **production** site directly in the popup (no iframe).

## Micro-Steps
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

## Prompts
- “Chrome extension host_permissions MV3”
- “Request optional host permissions”

## Deliverable
- Popup displays the production URL at the measured content bounds.

## Acceptance
- Site loads successfully; no permission errors.

## Prerequisites

- Phase 04 complete (overlay mirrors bounds reliably).

## Troubleshooting

- Permission prompt appears unexpectedly: confirm you’re requesting host permission only on explicit launch.
- New tab opens instead of popup: ensure `chrome.windows.create({ type: 'popup', url })` is used and not `chrome.tabs.create`.
- Pop-up blocked: Chrome windows created by extension actions are allowed; test from the extension UI, not from a regular page script.
