# docs/PHASE-10.md

# Phase 10 — Multi-Monitor, DPI & Performance QA

Goal
Bulletproof behavior across monitors and DPI; keep scroll sync smooth.

Micro-Steps

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

Prompts

- “window.devicePixelRatio multi-monitor”
- “requestAnimationFrame throttling”

Deliverable

- QA checklist with passes/fixes.

Acceptance

- No visible lag; no drift after monitor moves or DPI changes.
