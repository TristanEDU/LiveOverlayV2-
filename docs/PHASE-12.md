# Phase 12 — Packaging & Docs

Navigation: [← Prev Phase 11](./PHASE-11.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 13](./PHASE-13.md)

## Scope & Depth

- Packaging steps, icons, and store-prep checklist
- README guidance with clear install/use flow
- Troubleshooting store lint warnings and asset sizes
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
Anyone can install and use in under a minute.

## Micro-Steps

- README
  - What & why (popup overlay vs iframe).
  - Install: “Load Unpacked” steps with screenshot/GIF.
  - Use: toolbar click → URL → controls & hotkeys → calibrate once.
  - Limits: no always-on-top; calibration note.
- Zip
  - Zip the folder for backup or future Web Store submission.
- Store Prep (Optional)
  - Add icons (16/32/48/128) and update `manifest.json` `icons`.
  - Provide a short/long description and usage GIF in `README.md`.

## Prerequisites

- Phase 11 complete (permissions trimmed; options UX in place).

## Troubleshooting

- Web Store linting warnings: validate manifest fields and icons sizes; remove dev-only keys.
- README/GIF too large: optimize GIF size and compress images for repo friendliness.

## Prompts

- “Publish Chrome extension checklist”

## Deliverable

- README + zipped build.

## Acceptance

- Fresh install to pixel alignment in <60 seconds following README.
