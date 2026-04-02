# Property API Guidelines

## Use the right property type

- Text property for labels, helper copy, badges, counters, and short content overrides.
- Boolean property for optional icons, helper text presence, selection markers, and status affordances.
- Instance swap for icons and replaceable nested sub-components.

## API quality checks

- Property names should be stable and readable.
- Properties should express intent, not implementation trivia.
- A downstream designer should understand how to use the component without inspecting every child layer.

## State guidance

- Define default, hover, focus, pressed, disabled, selected, error, and success only when relevant to the component.
- Prefer documentation over unused states if the product does not actually support them.
