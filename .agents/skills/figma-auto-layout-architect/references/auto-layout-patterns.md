# Auto Layout Patterns

## Choose the flow

- Use vertical flow for page stacks, forms, section wrappers, sidebars, drawers, and content lists.
- Use horizontal flow for nav rows, toolbar groups, inline controls, stat rows, and side-by-side content.
- Use grid flow when the content is naturally multi-dimensional and should reflow by rows and columns.

## Use nested frames

- Create one parent for the page or section.
- Create child frames for local layout responsibilities.
- Separate content grouping from visual styling when the distinction helps resizing.

## Wrap and density

- Prefer wrap for chip rows, filter bars, icon action groups, and card grids when content count varies.
- Do not fake wrap with multiple manual rows unless the row boundaries are semantically meaningful.

## Resizing heuristics

- Parent sections usually `fill` width inside a page wrapper.
- Text blocks often `hug` height and use either fixed or max-constrained width.
- Buttons often `hug` unless the pattern requires full-width mobile actions.
- Cards often use fixed or min/max widths with `hug` height.

## Smells

- One frame contains the entire screen with no nested logic.
- Children are fixed only because the author avoided deciding resize behavior.
- Decorative layers break the layout because they were not isolated from content.
