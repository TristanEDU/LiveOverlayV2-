# Phase 09 — Calibration (Per OS/Channel)

Navigation: [← Prev Phase 08](./PHASE-08.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 10](./PHASE-10.md)

## Scope & Depth

- Per-OS/channel calibration model and UI
- Persistence schema and application order
- Troubleshooting cross-monitor differences
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
Eliminate tiny platform chrome differences (±1–2 px) by saving per-OS/channel nudges.

## Micro-Steps (Detailed)

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

## Prerequisites

- Phase 08 complete (controls functional; core overlay pipeline working).

## Troubleshooting

- Differences across monitors: save nudges per OS/channel; multi-monitor DPI is addressed in Phase 10.
- Nudge doesn’t apply: check storage keys and that background reads and applies before `windows.create/update`.

## Prompts

- “navigator.platform / userAgentData (brand/channel)”
- “Persist per key in storage”

## Deliverable

- Nudge values persist and apply automatically.

## Acceptance

- After one calibration, overlays open pixel-true every time.
