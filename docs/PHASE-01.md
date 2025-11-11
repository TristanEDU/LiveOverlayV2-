# Phase 01 — MV3 Skeleton (Hello Extension)

Navigation: [← Prev Phase 00](./PHASE-00.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 02](./PHASE-02.md)

## Scope & Depth

- Micro-step checklists for manifest, background, and action wiring
- Prerequisites and environment validation
- Troubleshooting for common MV3 load issues
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Micro-Steps (Detailed)](#micro-steps-detailed)
- [Prompts](#prompts)
- [Deliverable](#deliverable)
- [Acceptance](#acceptance)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)

## Goal
Create a minimal MV3 extension that loads cleanly, with verified background logs and action wiring.

## Micro-Steps (Detailed)

- Manifest
  - Create `manifest.json` with: `manifest_version: 3`, `name`, `version`.
  - Add `"background": { "service_worker": "background.js" }`.
  - Add `"action"` (no default popup yet, unless you already have one).
  - Add `"permissions": ["storage"]` (expand in later phases).
  - Validate JSON (VS Code JSON schema or quick lint) to prevent load errors.
- Background
  - Implement `console.log("Service worker ready!")` in `background.js`.
  - Add a no-op message listener to confirm messaging wiring compiles.
- Load
  - Load Unpacked and confirm:
    - No red error badges on the extension.
    - Service worker shows as “Running”; click “service worker” → Inspect.
    - Console displays the ready log.
- Quick Action Check
  - Click toolbar icon (should do nothing) and verify no errors in console.
  - Reload extension and ensure service worker restarts cleanly (no stuck old SW).

## Prompts

- “manifest_version 3 example”
- “Chrome extension action MV3”

## Deliverable

- Extension appears with no red errors; background logs show up.

## Acceptance

- Extension loads without errors; background logs appear; toolbar click causes no errors.

## Prerequisites

- Phase 00 complete (Chrome/VS Code set up; basic MV3 familiarity).

## Troubleshooting

- “Unrecognized manifest key”: confirm MV3 schema and property names (e.g., `background.service_worker`).
- Background not running: reload in `chrome://extensions` and open the service worker console.
- Toolbar icon hidden: pin the extension in the Chrome toolbar from the puzzle icon menu.
