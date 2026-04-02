# Token Architecture

## Token layers

1. Primitive tokens
   Examples: raw grays, brand hues, spacing steps, radii, elevation levels.
2. Semantic tokens
   Examples: `color/bg/default`, `color/text/subtle`, `space/container/padding`.
3. Usage rules
   Examples: which semantic token a button, card, input, or page section should consume.

## Variable guidance

- Create collections by domain when that improves clarity: `color`, `spacing`, `radius`, `typography`, `effect`.
- Use modes for themes or appearance systems such as light and dark.
- Alias semantic variables to primitives instead of duplicating values.
- Set scopes intentionally; do not leave everything effectively global.
- Set code syntax for tokens whenever the file will hand off to developers.

## Naming defaults

- Use slash-separated names.
- Prefer intent over implementation: `color/text/default`, not `gray-900-for-body`.
- Keep primitive names raw and semantic names meaning-based.
- Keep component tokens rare; prefer semantic tokens unless a component truly needs a local abstraction.

## Typography tokens

- Separate family, size, line height, letter spacing, and weight if the design system needs detailed code mapping.
- If the system is small, define text styles and document the mapping to typography tokens.

## Token quality checks

- No duplicate semantic meaning under different names.
- No hardcoded local values when a reusable token already exists.
- No component depends directly on primitive colors unless explicitly documented.
