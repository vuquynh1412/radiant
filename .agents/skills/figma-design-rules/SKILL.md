---
name: figma-design-rules
description: Define and enforce Figma-first design-system rules for web UI. Use when Codex needs to set up or audit tokens, variables, modes, spacing scales, typography, layout grids, naming conventions, responsive rules, or resizing decisions before building screens or components in Figma.
---

# Figma Design Rules

Establish the design rules that every downstream Figma workflow should follow. Use this skill before creating screens, components, or QA reports so the design stays token-driven, responsive, and implementation-ready.

## Core outcomes

- Produce a token plan covering color, spacing, radius, typography, elevation, and sizing.
- Define naming conventions for variables, styles, component pages, and variants.
- Set responsive defaults for web app layouts before drawing detailed screens.
- Decide when layers should use `hug`, `fill`, `fixed`, and `min/max` constraints.

## Working rules

1. Inspect the file and reuse existing variables, styles, and naming patterns before introducing new ones.
2. Prefer variables for color, spacing, radius, typography, and effects. Do not hardcode values when a token can represent the intent.
3. Define primitives first, then semantic aliases, then component-level usage rules.
4. Treat responsive behavior as part of the design spec, not a later QA step.
5. Make every rule easy for a downstream screen-builder or component-builder skill to follow.

## Deliverables

Produce these sections when the user asks for a ruleset or standard:

- `Token Plan`
- `Naming Plan`
- `Responsive Rules`
- `Layout and Resizing Rules`
- `Accessibility Baseline`
- `Open Questions` only when a missing product decision blocks a clean standard

## Decision defaults

- Use web app assumptions unless the user explicitly switches platform.
- Prefer an 8-point spacing rhythm, allowing 4-point increments for dense or inline UI.
- Prefer semantic color tokens over component-specific colors.
- Prefer auto layout for dynamic content containers and reusable components.
- Prefer text and effect styles that map cleanly to developer handoff.

## Resource map

- Read [figma-layout-rules.md](references/figma-layout-rules.md) for layout, auto layout, and resizing guidance.
- Read [token-architecture.md](references/token-architecture.md) for token layers, naming, and variable rules.
- Read [responsive-rules-web.md](references/responsive-rules-web.md) for web breakpoint and reflow defaults.
- Read [accessibility-baseline.md](references/accessibility-baseline.md) for design-time accessibility requirements.
