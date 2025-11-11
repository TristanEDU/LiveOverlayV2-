# docs/PHASE-09.md

# Phase 09 — Calibration (Per OS/Channel)

Goal
Eliminate tiny platform chrome differences (±1–2 px) by saving per-OS/channel nudges.

Micro-Steps (Detailed)

- Calibrate Panel
  - Provide Top/Left/Width/Height ±1, ±10 px steppers.
  - Show current platform + browser brand/channel in the UI.
  - Buttons: Apply now, Reset to zero, Save default for {OS}/{Channel}.
- Persist
  - Save `{top, left, width, height}` by key `{platform}:{brandOrChannel}` in storage.
  - Store last applied timestamp to assist debugging.
- Apply on Measure
  - Background adds saved nudge to rect before creating/updating popup.
  - Log applied nudge for visibility during QA.

Prompts

- “navigator.platform / userAgentData (brand/channel)”
- “Persist per key in storage”

Deliverable

- Nudge values persist and apply automatically.

Acceptance

- After one calibration, overlays open pixel-true every time.
