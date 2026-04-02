---
name: figma-dev-handoff-spec
description: Generate implementation-ready handoff specs from approved Figma screens or components. Use when Codex needs to translate design intent into spacing, sizing, states, breakpoints, tokens, variable usage, fixed-value exceptions, and behavior notes that frontend engineers can implement consistently for web UI.
---

# Figma Dev Handoff Spec

Turn approved designs into implementation-ready notes for frontend teams. Explain not just what the UI looks like, but which parts are token-driven, responsive, stateful, or intentionally fixed.

## Deliverables

- `Component or Screen Summary`
- `Tokens and Styles`
- `Layout and Spacing`
- `States and Behaviors`
- `Responsive Rules`
- `Fixed Value Exceptions`
- `Implementation Notes`

## Working rules

- Distinguish between semantic tokens and local one-off values.
- Document interaction states explicitly.
- Explain which elements should wrap, stack, fill, or remain fixed.
- Flag any design ambiguity that could produce divergent implementation.

## Resource map

- Read [dev-mode-handoff.md](references/dev-mode-handoff.md) for handoff conventions.
- Use [handoff-template.md](assets/handoff-template.md) when generating structured specs.
