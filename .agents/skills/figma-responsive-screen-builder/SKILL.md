---
name: figma-responsive-screen-builder
description: Build responsive Figma web screens from briefs, wireframes, flows, or existing layouts. Use when Codex needs to create or update a screen with design-system components, variables, text and effect styles, section-by-section structure, and explicit desktop, tablet, and mobile behavior instead of freeform drawing.
---

# Figma Responsive Screen Builder

Create or update full screens in Figma using components, variables, styles, and responsive rules. Treat the screen as a set of sections with explicit behavior across breakpoints.

## Core outcomes

- Build page wrappers and sections in a stable order.
- Reuse design-system components before drawing primitives.
- Apply variables, text styles, and effect styles instead of local hardcoded values.
- State how the screen behaves on desktop, tablet, and mobile.

## Mandatory workflow

1. Understand the screen goal, key content, and primary actions.
2. Discover reusable components, variables, and styles in the target file or linked libraries.
3. Create the page wrapper before creating sections.
4. Build one section at a time with explicit layout behavior.
5. Check reflow, spacing, and interaction states before considering the screen complete.

## Output expectations

- `Screen Plan`
- `Section Structure`
- `Component Reuse Map`
- `Responsive Behavior`
- `Open Risks`

## Working rules

- Reuse existing library components first.
- Build sections directly inside the intended parent frame.
- Avoid decorative primitives unless they are required and documented.
- Treat empty, loading, hover, focus, pressed, disabled, and error states as part of the screen spec when relevant.

## Resource map

- Read [screen-composition.md](references/screen-composition.md) for section ordering and composition.
- Read [web-breakpoint-recipes.md](references/web-breakpoint-recipes.md) for responsive behavior patterns.
- Use [screen-spec-template.md](assets/screen-spec-template.md) when the user needs a structured plan or deliverable.
