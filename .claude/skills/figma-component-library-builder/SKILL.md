---
name: figma-component-library-builder
description: Build reusable Figma component libraries for web UI. Use when Codex needs to create or refactor component sets, plan variant matrices, define component properties, set instance swap rules, document usage constraints, or prevent variant explosion while keeping components aligned to tokens and responsive layout rules.
---

# Figma Component Library Builder

Design reusable components with clean APIs, predictable variants, and token-driven styling. Focus on composability and maintenance, not only visual completion.

## Core outcomes

- Define a component anatomy before building variants.
- Create a variant matrix that covers meaningful differences without exploding in size.
- Use component properties for text, booleans, and instance swaps.
- Document state coverage, responsive behavior, and usage boundaries.

## Workflow

1. Clarify the component's job and supported contexts.
2. Define anatomy and slots.
3. Choose variant axes and reject axes that should be properties or separate components.
4. Map tokens, states, and property APIs.
5. Build and review the component set page.

## Variant rules

- Prefer one axis per real design or behavioral difference.
- Use boolean properties for optional affordances such as icon presence.
- Use instance swap for icons and interchangeable nested parts.
- Split the component when the matrix becomes hard to reason about or document.

## Resource map

- Read [component-anatomy.md](references/component-anatomy.md) for structure decisions.
- Read [variant-strategy.md](references/variant-strategy.md) for axis selection and split rules.
- Read [property-api-guidelines.md](references/property-api-guidelines.md) for component property design.
