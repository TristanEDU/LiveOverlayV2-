# README.md

# Live Overlay V2 — Pixel-Perfect Overlay (Popup/Panel Approach)

A Chrome MV3 extension that opens a separate **popup** window aligned to the base tab’s **content area**, then mirrors **bounds, zoom, and scroll** for pixel-accurate visual comparison. Includes overlay controls (opacity, invert, grid, click-through) and per-OS/channel calibration.

## Quick Start (Dev)

1. Open `chrome://extensions` → Enable Developer Mode.
2. Click “Load unpacked” → choose this project folder.
3. Click the extension icon (or use the launcher) to open an overlay popup.

## Why a Popup Overlay?

- Sits in a separate Chrome window, not inside the page.
- Mirrors **window bounds**, **zoom**, and **scroll** to stay aligned.
- Lets you control opacity, grids, invert, and click-through without touching the base page.

## Capabilities

- Popup aligned to page content area (not Chrome UI).
- Live mirroring: move/resize, zoom, scroll.
- Overlay controls: opacity / invert / grid / click-through.
- Calibrations saved per OS/channel (fixes 1–2 px platform differences).

## Repository Structure

- `manifest.json` — MV3 manifest, background, action, permissions.
- `background.js` — Creates/updates overlay window, wires messages.
- `src/ui/overlay.html` / `overlay.css` / `overlay.js` — Overlay UI shell.
- `docs/` — Deep, step-by-step phase docs (micro-steps + acceptance).

## Start Here

- Read `docs/PHASE-00.md` then follow in order.
- Each phase ends with clear acceptance criteria and a “Done means done” checklist.

## Known Limitations

- Chrome can’t force true “always-on-top”. (Usual workflow: refocus base so overlay sits underneath or use quick toggles.)
- Per-platform chrome frame differences → use built-in calibration.

## License

MIT (or your choice)
