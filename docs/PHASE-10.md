# Phase 10 — Multi-Monitor, DPI & Performance QA

Navigation: [← Prev Phase 09](./PHASE-09.md) · [Roadmap](./ROADMAP.md) · [Next → Phase 11](./PHASE-11.md)

## Scope & Depth

- Multi-monitor/DPI behaviors and DIP-only math
- Performance budgeting and instrumentation
- Troubleshooting post-move misalignment and resize stutter
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
Bulletproof behavior across monitors and DPI; keep scroll sync smooth.

## Micro-Steps

- Multi-Monitor/DPI
  - Move base window to a different monitor → force re-MEASURE and update.
  - Verify `devicePixelRatio` changes don’t break alignment (DIP only).
- Performance
  - Throttle scroll sync to ~16–33ms (60–30 FPS).
  - Ensure grid/veil are fixed/composited to avoid layout thrash.
- Edge Handling
  - If overlay closed manually, clear IDs and allow clean reopen.
- Instrumentation
  - Add lightweight timing logs around remeasure→update to spot jank.
  - Use `performance.now()` diffs to keep total under ~16ms per cycle.

## Prerequisites

- Phase 09 complete (calibration in place).

## Troubleshooting

- Misalignment after moving between monitors: force re-measure on monitor change (track dPR changes or bounds jumps).
- Stutters during resize: confirm throttling is active and work within a single animation frame for measure→update.

## Prompts

- “window.devicePixelRatio multi-monitor”
- “requestAnimationFrame throttling”

## Deliverable

- QA checklist with passes/fixes.

## Acceptance

- No visible lag; no drift after monitor moves or DPI changes.
