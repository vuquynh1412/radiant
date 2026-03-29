# Responsive Rules For Web

## Design intent

Design for reflow, hierarchy, and readable line lengths. Responsive design is not only scaling widths; it includes stacking rules, wrap behavior, and content priority.

## Breakpoint defaults

- Desktop: 1280 and above
- Tablet: 768 to 1279
- Mobile: below 768

Use these as planning defaults unless the product already has established breakpoints.

## Reflow rules

- Stack columns when a two-column layout stops preserving readable width.
- Convert multi-column card grids into fewer columns before shrinking card content too far.
- Keep primary actions visible without relying on horizontal scrolling.
- Preserve logical reading order when a layout collapses.

## Layout priorities

- Keep headings, key actions, and status content high in the visual hierarchy.
- Defer supplemental panels, filters, or metadata when space becomes limited.
- Prefer wrapping controls before shrinking tap areas below a usable size.

## Width and content rules

- Constrain long-form text blocks with reasonable max widths.
- Let navigation, filter rows, and chip groups wrap when appropriate.
- Promote vertical rhythm over trying to preserve desktop adjacency on narrow screens.

## Accessibility tie-in

- Design so content can reflow without loss of information or function at narrow widths and high zoom.
- For web, treat WCAG reflow guidance for 320 CSS pixels as a design-time guardrail.
