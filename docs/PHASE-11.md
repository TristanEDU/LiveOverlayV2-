# docs/PHASE-11.md

# Phase 11 — Permissions & Options UI (Least Privilege)

Goal
Trim permissions; add a simple Options page for presets.

Micro-Steps

- Permissions
  - Use optional host permissions instead of `<all_urls>`.
  - Keep core: `windows`, `storage`, and `tabs` only if needed.
- Options Page
  - Save a list of production URLs + default overlay settings per site.
  - Provide “Launch with preset” in popup.
- UX
  - Add a button in popup to open Options (`chrome.runtime.openOptionsPage`).
  - Explain why host permissions are requested only when launching.

Prompts

- “optional_host_permissions MV3”
- “Chrome extension options page MV3”

Deliverable

- Options page works; minimal permissions enforced.

Acceptance

- You can overlay a site without enabling global `<all_urls>`.
