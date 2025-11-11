# docs/PHASE-08.md

# Phase 08 — Overlay Controls (Opacity, Invert, Grid, Click-Through, Nudge)

Goal
Hands-on overlay controls for alignment finesse.

Micro-Steps

- UI Hooks (Overlay Page)
  - Opacity: range → update veil element’s `opacity`.
  - Invert: toggle → `filter: invert(1)` on a wrapper or `html`.
  - Grid: toggle → show/hide fixed grid layer.
  - Click-through: toggle → `pointer-events: none` on overlay layers/UI; provide a hotkey to restore.
  - Nudge: arrow keys for ±1 / ±10 px via small `transform` or scroll offset.
- Persistence
  - Save settings via `chrome.storage.local`.
- Hotkeys
  - Add keyboard shortcuts (e.g., Alt+O Alt+I Alt+G Alt+V).
- Safety & UX
  - Always provide a clear “Restore control” hotkey (e.g., Esc) when click-through is enabled.
  - Clamp opacity bounds and show current value text next to the slider.
  - Debounce storage writes to avoid thrashing.

Prompts

- “CSS filters invert”
- “pointer-events none overlay”
- “chrome.storage.local MV3”

Deliverable

- Toolbar visible; settings persist; quick toggles work.

Acceptance

- You can line up two pages in seconds using controls.
