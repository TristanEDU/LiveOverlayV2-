# Phase 00 — Foundations & Setup

Navigation: [Roadmap](./ROADMAP.md) · [Next → Phase 01](./PHASE-01.md)

## Scope & Depth

- Micro-step checklists with concrete actions
- Prerequisites and setup notes
- Troubleshooting for common pitfalls
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
Be ready to build/run an MV3 extension and iterate quickly with reliable reloads and logs.

## Micro-Steps (Detailed)

- Tools
  - Install Chrome (or Edge), VS Code, and Git.
  - Verify Chrome version (Settings → About) and enable automatic updates.
  - Create a workspace folder and open it in VS Code.
- Chrome Extensions Basics
  - Skim MV3 concepts: background service worker vs content scripts vs action popup.
  - Open `chrome://extensions`, enable Developer Mode, pin this page.
  - Learn how to view service worker logs (Service Worker → Inspect views).
- Workspace Prep
  - Create baseline files: `manifest.json`, `background.js`, `README.md`.
  - Add a `.gitignore` (node_modules, .DS_Store) and initialize git (optional).
  - Create a simple README checklist for how to reload the extension.
- Sanity Checks
  - Load Unpacked (empty shell) and confirm no fatal manifest errors.
  - Practice “Reload” + watch background service worker start/stop in logs.

## Prompts

- “Chrome Extensions Manifest V3 overview”
- “Load unpacked extension chrome://extensions”

## Deliverable

- Folder opens as an unpacked extension; background console is accessible.

## Acceptance

- You can reload the extension, see start/stop, and console.log output reliably.

## Prerequisites

- None (start here).

## Troubleshooting

- Extension fails to load: open `chrome://extensions`, check “Errors” for JSON issues in `manifest.json`.
- No background logs: click the “Service worker” link under your extension to open its console; reload and watch for logs.
- Service worker not starting: ensure `manifest_version` is 3 and `background.service_worker` is set correctly.
