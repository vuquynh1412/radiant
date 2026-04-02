# Nested Layout Recipes

## Marketing or landing page

- Page wrapper: vertical, centered content area.
- Each section: vertical parent with its own internal stack.
- Hero content: one horizontal parent on desktop, stacked vertical on narrow screens.

## Dashboard

- Page wrapper: vertical.
- Header: horizontal, wrapped when controls grow.
- Main content: horizontal on wide screens, vertical stack on narrow screens.
- Cards: grid or wrapped horizontal flow depending on count and density.

## Form page

- Page wrapper: vertical.
- Form body: vertical group with clear field clusters.
- Label + field + helper or error text should share one local vertical frame.

## Modal or drawer

- Outer container: vertical.
- Header, body, footer are separate nested groups.
- Footer actions may switch from horizontal to vertical on narrow widths.
