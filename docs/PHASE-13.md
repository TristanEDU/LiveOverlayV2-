# Phase 13 (Optional) — Advanced Enhancements

Navigation: [← Prev Phase 12](./PHASE-12.md) · [Roadmap](./ROADMAP.md)

## Scope & Depth

- Advanced feature ideation with flags and guardrails
- Impact assessment on alignment/perf UX
- Troubleshooting complexity creep and regressions
- Deliverables and acceptance tests

On this page
- [Scope & Depth](#scope--depth)
- [Goal](#goal)
- [Ideas](#ideas)
- [Prerequisites](#prerequisites)
- [Troubleshooting](#troubleshooting)
- [Acceptance](#acceptance)

## Goal
Add power features without hurting simplicity.

## Ideas

- Focus-follow: hotkey to focus overlay; quick hide/show.
- Dual-sync (overlay → base) when explicitly enabled.
- Per-site profiles & quick switching.
- Blink-compare mode (rapid visibility toggle).
- Screenshot helpers (external compare).
- Feature Flags
  - Gate advanced features behind settings to keep default simple.
  - Provide safe defaults; clearly label experimental items.

## Prerequisites

- Phase 12 complete (packaging/docs in good shape).

## Troubleshooting

- Complexity creep: gate new features behind flags and keep defaults minimal; ensure no drift or performance regressions.

## Acceptance

- Enhancements don’t introduce drift or add friction.
