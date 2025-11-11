# Phase 06 — Zoom Mirroring

Navigation: [← Prev Phase 05](./PHASE-05.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 07](./PHASE-07.md)

## Scope & Depth

- Zoom identification, initial sync, and live mirroring
- Edge cases for tab switching and navigation
- Troubleshooting for sites that restrict zoom
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
Overlay tab zoom always matches base tab zoom.

## Micro-Steps

- Identify Tabs
  - Track `baseTabId` (active tab in base) and `overlayTabId` (tab inside popup).
- On Open
  - `chrome.tabs.getZoom(baseTabId)` → `chrome.tabs.setZoom(overlayTabId, zoom)`.
- Live Mirror
  - Listen `chrome.tabs.onZoomChange` (base) → set overlay zoom.
- Edge Cases
  - If base tab changes (user switches tabs), update `baseTabId` and mirror again.
  - If overlay tab navigates, reapply zoom when `chrome.tabs.onUpdated` status = complete.

## Prerequisites

- Phase 05 complete (overlay opens to target URL; have `overlayTabId`).

## Troubleshooting

- Zoom not applied: confirm extension has the right `tabId` and zoom permissions aren’t restricted by site policies (some chrome:// pages block it).
- Zoom snaps back: listen for base zoom changes and re-apply quickly; avoid loops by not responding to overlay’s own zoom events.

## Prompts

- “chrome.tabs.getZoom / setZoom”
- “chrome.tabs.onZoomChange MV3”

## Deliverable

- Changing zoom in base mirrors to overlay.

## Acceptance

- Test 90%, 100%, 125% — no drift.
