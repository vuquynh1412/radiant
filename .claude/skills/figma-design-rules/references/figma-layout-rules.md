# Figma Layout Rules

## Layout goals

- Make frames resilient to content change.
- Preserve predictable spacing and alignment.
- Keep the structure understandable for design QA and developer handoff.

## Auto layout defaults

- Use auto layout for containers with dynamic content, repeated items, cards, dialogs, forms, nav bars, and stacked sections.
- Avoid absolute positioning except for decorative layers, badges, overlays, and intentionally freeform artwork.
- Prefer nested auto layout instead of one flat frame with many siblings.

## Resizing rules

- Use `hug` for text-driven items, pills, buttons, chips, tags, inline controls, and content sections whose size should follow content.
- Use `fill` for children that should absorb remaining room inside a parent auto layout.
- Use `fixed` only when a stable width or height is essential for meaning, scanning, or media rendering.
- Use `min/max` rules when a container should grow but stay readable, especially for text columns, modals, and cards.

## Spacing rules

- Default to an 8-point spacing rhythm.
- Allow 4-point steps for dense UI, icon-to-label spacing, and compact controls.
- Keep section spacing larger than intra-component spacing.
- Maintain one spacing intent per level: item gap, group gap, section gap, page gap.

## Alignment rules

- Favor left alignment for content-heavy web layouts.
- Center only when the section is intentionally promotional, onboarding-focused, or extremely simple.
- Align labels, helper text, and validation text to the same content edge.

## Grid and structure

- Use a page wrapper frame before building sections.
- Treat header, main content, sidebar, panel groups, and footer as explicit layout regions.
- Avoid mixing unrelated layout patterns in one frame when separate nested frames would clarify behavior.

## Figma references

- Figma auto layout overview and flow guides in the Help Center are the primary source for flow, nesting, and responsive layout behavior.
