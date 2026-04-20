---
name: figma-to-code
description: Convert a Figma design into a React component following project conventions (tokens, typography classes, BEM CSS, forwardRef pattern)
---

# Figma to Code

Create a new React UI component from a Figma design, producing `.tsx` + `.css` + `index.ts` export + App.tsx demo.

## Prerequisites

The user must provide one of:
- A Figma URL (e.g., `figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/...?node-id=...`)
- A file key + node ID

## Step 1 — Get the design

1. Parse the Figma URL to extract `fileKey` and `nodeId`
2. Call `get_design_context` (figma-remote MCP) with the node ID and file key
3. Review the returned Code Connect snippets, screenshot, and annotations

## Step 2 — Analyze the design

1. Identify the component's variants, states, and sizes from the design
2. Compare with the screenshot to confirm visual structure
3. Check `src/components/ui/` for existing components that can be reused or composed
4. Read token files to find matching values:
   - `src/components/ui/tokens/colors.css` — color tokens
   - `src/components/ui/tokens/typography.css` — typography classes
   - `src/components/ui/tokens/radius.css` — border-radius tokens
   - `src/components/ui/tokens/spacing.css` — spacing tokens
   - `src/components/ui/tokens/shadows.css` — shadow tokens

## Step 3 — Create `.tsx`

Follow the established component pattern:

```tsx
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  // Define props matching Figma variants
}

const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ prop1, prop2, className, ...rest }, ref) => {
    // Map size/variant to typography class
    const typographyClass = {
      large: 'text-label-large',
      medium: 'text-label-medium',
      small: 'text-label-small',
    }[size];

    const classes = [
      'ui-component-name',
      `ui-component-name--${variant}`,
      typographyClass,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {/* content */}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';

export default ComponentName;
export type { ComponentNameProps };
```

### Rules

- **Typography**: Do NOT define `font-size`, `line-height`, or `font-weight` in CSS. Instead, compose typography classes from `typography.css` in the `.tsx` file.
- **forwardRef**: Always use `React.forwardRef` with proper generic types.
- **displayName**: Always set `ComponentName.displayName`.
- **Exports**: Both `export default` and `export type { Props }`.

## Step 4 — Create `.css`

```css
/* Base */
.ui-component-name {
  /* layout properties */
}

/* Variants */
.ui-component-name--variant {
  /* variant-specific styles */
}
```

### Strict token rules

- **Colors**: Only `var(--color-*)`. Never `#hex`, `rgb()`, `rgba()`, or named colors.
- **Border radius**: Only `var(--radius-*)`.
- **Spacing** (padding, margin, gap): Only `var(--space-*)` or `0`.
- **Shadows**: Only `var(--shadow-*)`.
- **No `var()` fallbacks**: Write `var(--color-background-brand-default)`, never `var(--color-background-brand-default, #3560ff)`.
- **Font**: Typography is handled via classes in `.tsx`, not in CSS. If `font-family` is needed, use `var(--font-family)`.
- **Class naming**: BEM-style with `ui-{component-name}` prefix.

## Step 5 — Update index.ts + App.tsx demo

### 5a. Update `src/components/ui/index.ts`

Add both default and type exports in the appropriate category section:

```tsx
export { default as ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 5b. Update `src/App.tsx` demo (via `src/pages/Components.tsx`)

1. Read `src/pages/Components.tsx` to understand the existing showcase pattern
2. Import the new component
3. Add a new `<Section>` block demonstrating key variants and states
4. Add the section to `TOC_ITEMS` for navigation
5. Follow the existing demo style — keep it consistent with other component showcases

## Checklist before finishing

- [ ] `.tsx` uses `forwardRef`, `displayName`, type export
- [ ] `.tsx` composes typography classes instead of CSS font properties
- [ ] `.css` uses only design token variables (colors, radius, spacing, shadows)
- [ ] `.css` has no `var()` fallbacks
- [ ] `index.ts` exports both default and type
- [ ] `Components.tsx` has demo section with key variants
