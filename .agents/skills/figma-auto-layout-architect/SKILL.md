---
name: figma-auto-layout-architect
description: Convert Figma screens or components into clear auto layout structures with explicit resize behavior. Use when Codex needs to plan or refactor layout trees, decide vertical or horizontal or grid flows, assign padding and gaps, define nesting, or explain hug, fill, fixed, and min-max sizing for responsive web UI.
---

# Figma Auto Layout Architect

Turn a brief, wireframe, screenshot, or existing frame into an explicit auto layout tree. Focus on structure and resizing behavior first, then visual polish.

## Core outcomes

- Define the layout tree section by section.
- Choose the correct flow for every parent container.
- Assign padding, gap, alignment, and wrapping rules.
- Document resize behavior for each important child.

## Workflow

1. Identify the major regions of the screen or component.
2. Decide which regions need auto layout and which can stay freeform.
3. Build a nested layout tree from page wrapper down to leaf components.
4. Assign `hug`, `fill`, `fixed`, and `min/max` rules to every important frame.
5. Flag likely failure points such as over-nesting, flat structures, or hidden wrap requirements.

## Output format

- `Layout Tree`
- `Flow Decisions`
- `Spacing and Alignment`
- `Resize Rules`
- `Failure Risks`

## Resource map

- Read [auto-layout-patterns.md](references/auto-layout-patterns.md) for flow selection rules.
- Read [nested-layout-recipes.md](references/nested-layout-recipes.md) for common web layout recipes.
- Use [layout-decision-checklist.md](assets/layout-decision-checklist.md) as the final QA pass.
