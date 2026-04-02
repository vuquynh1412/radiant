---
name: figma-accessibility-audit
description: Audit Figma screens and components for design-time accessibility issues. Use when Codex needs to review contrast, focus visibility, target sizes, state clarity, form readability, responsive reflow risks, or interaction coverage in a Figma page, frame, component, or screen proposal for web UI.
---

# Figma Accessibility Audit

Review a Figma design for accessibility risks that should be caught before implementation. Focus on what the design communicates and whether users can perceive, understand, and operate it.

## Audit workflow

1. Identify the interactive elements, reading order, and status signals.
2. Check text contrast, non-text contrast, and focus treatment.
3. Check target size and spacing for touch and pointer use.
4. Check form, navigation, and disclosure states.
5. Check responsive and reflow risk for narrow widths and zoom.

## Output format

- `Findings` ordered by severity
- `Why it matters`
- `Recommended fix`
- `Residual risk` when design alone cannot fully resolve the issue

## Audit defaults

- Use WCAG 2.2 as the baseline for design-relevant checks.
- Call out missing interaction states, not only visible color issues.
- Treat unclear hierarchy and ambiguous labels as usability and accessibility risks.

## Resource map

- Read [wcag-ui-checklist.md](references/wcag-ui-checklist.md) for the review checklist.
- Use [a11y-review-template.md](assets/a11y-review-template.md) for structured reports.
