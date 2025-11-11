# Phase 02 — Popup Overlay: Match Base Window Bounds

Navigation: [← Prev Phase 01](./PHASE-01.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 03](./PHASE-03.md)

## Scope & Depth

- Micro-steps for permissions, triggers, bounds, and verification
- Prerequisites and environment checks
- Troubleshooting for popup sizing/stacking issues
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
Clicking the toolbar (or popup launcher) opens a popup that matches the base window’s bounds (for now).

## Micro-Steps (Detailed)

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

## Prerequisites

- Phase 01 complete (working MV3 skeleton with background and action/popup wiring).

## Troubleshooting

- Popup offset or wrong size: log `{left, top, width, height}` from `chrome.windows.getCurrent()` to confirm values.
- Popup opens behind the base window: immediately focus the base window after creating the overlay if you want the base on top.
- Multiple popups: track and reuse a single `overlayWindowId`; close or update existing instead of creating new ones.

## Prompts

- “chrome.windows.create popup MV3”
- “chrome.windows.getCurrent bounds”

## Deliverable

- Toolbar click creates a popup perfectly covering your base window.

## Acceptance

- No visible gaps on your main monitor.
