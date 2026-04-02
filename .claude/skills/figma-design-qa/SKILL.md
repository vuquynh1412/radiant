---
name: figma-design-qa
description: Compare Figma designs against code, specs, screenshots, or related frames to find consistency gaps. Use when Codex needs to detect spacing drift, typography mismatches, missing states, inconsistent token usage, broken responsive behavior, or implementation differences between intended and actual web UI.
---

# Figma Design QA

Compare intended design against another artifact and identify the gaps that matter. Use this skill after design updates, before handoff, or after implementation.

## Comparison targets

- Figma versus code screenshots
- Figma versus approved spec
- One Figma frame versus another
- A component instance versus its library definition

## Output format

- `Findings` ordered by severity
- `Expected`
- `Observed`
- `Impact`
- `Recommended fix`

## Working rules

- Focus on user-visible behavior and system consistency first.
- Call out spacing, type scale, state, and responsive mismatches before cosmetic micro-differences.
- Note whether the mismatch looks like a design drift, code drift, or missing specification.

## Resource map

- Read [consistency-checklist.md](references/consistency-checklist.md) for the comparison rubric.
- Use [design-qa-template.md](assets/design-qa-template.md) when producing a structured QA pass.
