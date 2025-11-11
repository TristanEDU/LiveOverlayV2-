# Phase 11 — Permissions & Options UI (Least Privilege)

Navigation: [← Prev Phase 10](./PHASE-10.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 12](./PHASE-12.md)

## Scope & Depth

- Least-privilege permission model and options UX
- Preset management and launcher integration
- Troubleshooting permission flows and options page wiring
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Micro-Steps](#micro-steps)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)
- [Prompts](#prompts)
- [Deliverable](#deliverable)
- [Acceptance](#acceptance)

## Goal
Trim permissions; add a simple Options page for presets.

## Micro-Steps

- Permissions
  - Use optional host permissions instead of `<all_urls>`.
  - Keep core: `windows`, `storage`, and `tabs` only if needed.
- Options Page
  - Save a list of production URLs + default overlay settings per site.
  - Provide “Launch with preset” in popup.
- UX
  - Add a button in popup to open Options (`chrome.runtime.openOptionsPage`).
  - Explain why host permissions are requested only when launching.

## Prerequisites

- Phase 10 complete (QA pass for multi-monitor and performance).

## Troubleshooting

- Host permission prompt not showing: ensure you requested via `chrome.permissions.request` for specific origins.
- Options page not opening: verify `options_page` (or `options_ui`) is declared in `manifest.json` and use the correct API.

## Prompts

- “optional_host_permissions MV3”
- “Chrome extension options page MV3”

## Deliverable

- Options page works; minimal permissions enforced.

## Acceptance

- You can overlay a site without enabling global `<all_urls>`.
