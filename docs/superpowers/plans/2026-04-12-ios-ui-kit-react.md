# iOS UI Kit React Component Library — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React + TypeScript component library with 15 UI components and a complete design token system, mapped 1:1 from the Figma iOS UI Kit 2025.

**Architecture:** Flat component files in `src/components/ui/`, CSS Variables for all design tokens with light/dark mode support, vanilla CSS (no CSS modules, no CSS-in-JS). BEM-like class naming `.ui-{component}--{modifier}`.

**Tech Stack:** Vite · React 18 · TypeScript 5 · CSS Variables

**Spec:** `docs/superpowers/specs/2026-04-12-ios-ui-kit-react-components-design.md`

---

## File Structure

```
src/
  components/ui/
    tokens/
      colors.css        — 142 semantic color tokens (:root + [data-theme="dark"])
      spacing.css       — 14 space tokens
      radius.css        — 13 radius tokens
      typography.css    — 14 text style utility classes
      shadows.css       — 5 shadow composite styles
      index.css         — @import aggregator
    Spinner.tsx         — CSS rotate animation, 3 sizes, 3 colors
    Spinner.css
    Button.tsx          — Text button: 4 variants × 8 colorTypes × 3 sizes
    Button.css
    IconButton.tsx      — Icon button: 3 variants × 5 colorTypes × 4 sizes
    IconButton.css
    TextField.tsx       — Input with label, status, helpText
    TextField.css
    Select.tsx          — Native select with same visual style as TextField
    Select.css
    Checkbox.tsx        — 24×24 indicator + label
    Checkbox.css
    Radio.tsx           — 24×24 circular indicator + label
    Radio.css
    Switch.tsx          — iOS-style 51×31 toggle
    Switch.css
    Tag.tsx             — Pill tag: 2 variants × 6 colorTypes × 2 sizes
    Tag.css
    Badge.tsx           — Dot or number badge, 3 sizes
    Badge.css
    Alert.tsx           — Inline alert: 6 colorTypes × 2 variants
    Alert.css
    ListItem.tsx        — List row with 7 trailing element types
    ListItem.css
    Dialog.tsx          — Modal dialog via portal, focus trap
    Dialog.css
    Sheet.tsx           — Bottom sheet via portal
    Sheet.css
    Toast.tsx           — ToastProvider + useToast hook
    Toast.css
    index.ts            — barrel re-exports
  App.tsx               — demo page showcasing all components
  main.tsx              — entry point
index.html
package.json
tsconfig.json
vite.config.ts
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1: Initialize Vite project**

```bash
cd /Users/willhuang/Downloads/figma-mcp
npm create vite@latest . -- --template react-ts
```

If prompted about existing files, choose to overwrite. This creates the base project structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Configure path alias in tsconfig.json**

In `tsconfig.json` (or `tsconfig.app.json` depending on Vite version), add inside `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
}
```

- [ ] **Step 4: Configure path alias in vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 5: Create UI component directories**

```bash
mkdir -p src/components/ui/tokens
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server runs on localhost with default React page.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript project with path alias"
```

---

### Task 2: Design Tokens — Colors

**Files:**
- Create: `src/components/ui/tokens/colors.css`

This is the largest token file. It contains all 142 semantic color tokens for light mode (`:root`) and dark mode (`[data-theme="dark"]`).

- [ ] **Step 1: Create colors.css with all light-mode tokens**

Create `src/components/ui/tokens/colors.css`. Use the Figma MCP tool `get_variable_defs` on multiple nodes from the iOS UI Kit file (`8pE8KHl50y72IP7JseLH55`) to extract the actual hex values. The spec lists all 142 token paths in section 2.3.

Structure:

```css
:root {
  /* ===== Content (53) ===== */
  /* Base */
  --color-content-bold: /* extract from Figma */;
  --color-content-default: /* extract from Figma */;
  --color-content-plain: /* extract from Figma */;
  --color-content-subtle: /* extract from Figma */;
  --color-content-subtlest: /* extract from Figma */;

  /* Brand */
  --color-content-brand-active: /* ... */;
  --color-content-brand-bold: /* ... */;
  --color-content-brand-default: /* ... */;
  /* ... all 53 content tokens ... */

  /* ===== Background (66) ===== */
  /* ... all 66 background tokens ... */

  /* ===== Border (18) ===== */
  /* ... all 18 border tokens ... */

  /* ===== Shadow (5) ===== */
  /* ... all 5 shadow tokens ... */
}
```

Naming rule: Figma path `color/content/brand/default` → CSS `--color-content-brand-default`.

Known values already extracted from Figma:
- `--color-content-bold: #101119`
- `--color-content-default: #3b3c43`
- `--color-content-plain: #000000`
- `--color-content-subtle: #737380`
- `--color-content-subtlest: #9b9baa`
- `--color-content-brand-default: #3560ff`
- `--color-content-brand-bold: #2b38c8`
- `--color-content-brand-hover: #2f4be6`
- `--color-content-brand-active: #2b38c8`
- `--color-content-danger-bold: #b30913`
- `--color-content-danger-default: #f4252d`
- `--color-content-success-bold: #007746`
- `--color-content-prize-bold: #9c6a05`
- `--color-content-warning-bold: #a54200`
- `--color-content-fixed-white: #ffffff`
- `--color-content-fixed-bold: #101119`
- `--color-content-fixed-brand: #3560ff`
- `--color-content-fixed-default: #3b3c43`
- `--color-content-inverse-bold: #f7f8f9`
- `--color-content-link-default: #3560ff`
- `--color-content-neutral-default: #737380`
- `--color-content-neutral-hover: #575762`
- `--color-content-neutral-active: #3b3c43`
- `--color-background-default: #ffffff`
- `--color-background-plain: #ffffff`
- `--color-background-sunken: #f7f8f9`
- `--color-background-brand-default: #3560ff`
- `--color-background-brand-hover: #2f4be6`
- `--color-background-brand-active: #2b38c8`
- `--color-background-brand-subtlest: #d6e5ff`
- `--color-background-danger-default: #f4252d`
- `--color-background-danger-hover: #dd0815`
- `--color-background-danger-active: #b30913`
- `--color-background-danger-subtlest: #ffdede`
- `--color-background-success-default: #00bd64`
- `--color-background-success-subtlest: #d5fbe5`
- `--color-background-warning-subtlest: #ffedcd`
- `--color-background-prize-default: #ffc423`
- `--color-background-prize-hover: #f1ad00`
- `--color-background-prize-active: #c78b07`
- `--color-background-prize-subtlest: #fff1cd`
- `--color-background-donation-default: #f61372`
- `--color-background-donation-hover: #d60c5f`
- `--color-background-donation-active: #a3094a`
- `--color-background-neutral-bold: #737380`
- `--color-background-neutral-default: #bbbbc8`
- `--color-background-neutral-subtle: #edeff3`
- `--color-background-neutral-subtle-hover: #dcdee5`
- `--color-background-neutral-subtle-active: #bbbbc8`
- `--color-background-transparent-default: #00000000`
- `--color-background-transparent-hover: #0000001a`
- `--color-background-transparent-active: #00000033`
- `--color-background-overlay-default: #0000004d`
- `--color-background-fixed-white: #ffffff`
- `--color-background-fixed-black: #000000`
- `--color-background-disable: /* extract */`
- `--color-border-default: #b8bdc7`
- `--color-border-subtle: #edeff3`
- `--color-border-brand: #3560ff`
- `--color-border-divider: #0000001a`
- `--color-shadow-default: #16191d33`

For any token not listed above, use Figma MCP `get_variable_defs` on additional nodes, or `search_design_system` to find the value. Every token MUST have a real hex value — no placeholders.

- [ ] **Step 2: Add dark mode overrides**

Add `[data-theme="dark"]` block at the bottom of the same file. Dark mode values need to be extracted from Figma by examining dark-mode variant nodes or the Design System's dark color set.

For tokens where dark values are not yet known, use reasonable dark-mode inversions based on the semantic naming (e.g., `content/bold` in dark = light color, `background/default` in dark = dark color). These will be refined when Figma dark-mode values are extracted.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/tokens/colors.css
git commit -m "feat: add 142 semantic color tokens with light/dark mode"
```

---

### Task 3: Design Tokens — Spacing, Radius, Typography, Shadows

**Files:**
- Create: `src/components/ui/tokens/spacing.css`
- Create: `src/components/ui/tokens/radius.css`
- Create: `src/components/ui/tokens/typography.css`
- Create: `src/components/ui/tokens/shadows.css`
- Create: `src/components/ui/tokens/index.css`

- [ ] **Step 1: Create spacing.css**

```css
:root {
  --space-0: 0px;
  --space-25: 1px;
  --space-50: 2px;
  --space-100: 4px;
  --space-150: 6px;
  --space-200: 8px;
  --space-250: 10px;
  --space-300: 12px;
  --space-400: 16px;
  --space-500: 20px;
  --space-600: 24px;
  --space-700: 28px;
  --space-800: 32px;
  --space-900: 36px;
}
```

- [ ] **Step 2: Create radius.css**

```css
:root {
  --radius-0: 0px;
  --radius-50: 2px;
  --radius-100: 4px;
  --radius-150: 6px;
  --radius-200: 8px;
  --radius-250: 10px;
  --radius-300: 12px;
  --radius-400: 16px;
  --radius-500: 20px;
  --radius-600: 24px;
  --radius-800: 32px;
  --radius-1000: 40px;
  --radius-full: 9999px;
}
```

- [ ] **Step 3: Create typography.css**

```css
:root {
  --font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

.text-ios-display {
  font-family: var(--font-family);
  font-size: 28px;
  font-weight: 510;
  line-height: 36px;
  letter-spacing: 0;
}

.text-ios-display-regular {
  font-family: var(--font-family);
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0;
}

.text-ios-heading-large {
  font-family: var(--font-family);
  font-size: 24px;
  font-weight: 590;
  line-height: 32px;
  letter-spacing: 0;
}

.text-ios-heading-medium {
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 590;
  line-height: 28px;
  letter-spacing: 0;
}

.text-ios-heading-small {
  font-family: var(--font-family);
  font-size: 18px;
  font-weight: 590;
  line-height: 26px;
  letter-spacing: 0;
}

.text-ios-body-xlarge {
  font-family: var(--font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0;
}

.text-ios-body-large {
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
}

.text-ios-body-medium {
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
}

.text-ios-body-small {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
}

.text-ios-body-xsmall {
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
}

.text-ios-label-large {
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 510;
  line-height: 24px;
  letter-spacing: 0;
}

.text-ios-label-medium {
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 510;
  line-height: 22px;
  letter-spacing: 0;
}

.text-ios-label-small {
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 510;
  line-height: 18px;
  letter-spacing: 0;
}

.text-ios-label-xsmall {
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 510;
  line-height: 16px;
  letter-spacing: 0;
}
```

- [ ] **Step 4: Create shadows.css**

```css
:root {
  --shadow-small: 0 1px 3px var(--color-shadow-default);
  --shadow-medium: 0 4px 8px var(--color-shadow-default);
  --shadow-bold: 0 8px 24px var(--color-shadow-bold);
  --shadow-large: 0 16px 48px var(--color-shadow-bold);
  --shadow-sheet: 0 -4px 24px var(--color-shadow-sheet);
}
```

- [ ] **Step 5: Create index.css aggregator**

```css
@import './colors.css';
@import './spacing.css';
@import './radius.css';
@import './typography.css';
@import './shadows.css';
```

- [ ] **Step 6: Import tokens in main.tsx**

Add at the top of `src/main.tsx`:

```tsx
import '@/components/ui/tokens/index.css'
```

- [ ] **Step 7: Verify tokens load**

Start dev server (`npm run dev`), open browser devtools, confirm CSS variables are available on `:root`.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/tokens/
git commit -m "feat: add spacing, radius, typography, shadow tokens"
```

---

### Task 4: Spinner Component

Spinner is a dependency for Button loading state, so it comes first.

**Files:**
- Create: `src/components/ui/Spinner.tsx`
- Create: `src/components/ui/Spinner.css`

- [ ] **Step 1: Create Spinner.css**

```css
@keyframes ui-spinner-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ui-spinner {
  display: inline-block;
  border-radius: 50%;
  border-style: solid;
  border-color: transparent;
  border-top-color: currentColor;
  animation: ui-spinner-rotate 0.6s linear infinite;
}

.ui-spinner--small {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.ui-spinner--medium {
  width: 24px;
  height: 24px;
  border-width: 2.5px;
}

.ui-spinner--large {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.ui-spinner--brand {
  color: var(--color-content-brand-default);
}

.ui-spinner--white {
  color: var(--color-content-fixed-white);
}

.ui-spinner--neutral {
  color: var(--color-content-subtle);
}
```

- [ ] **Step 2: Create Spinner.tsx**

```tsx
import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'brand' | 'white' | 'neutral';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'medium', color = 'brand' }, ref) => {
    return (
      <div
        ref={ref}
        className={`ui-spinner ui-spinner--${size} ui-spinner--${color}`}
        role="status"
        aria-label="Loading"
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
export type { SpinnerProps };
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Spinner.tsx src/components/ui/Spinner.css
git commit -m "feat: add Spinner component (3 sizes, 3 colors)"
```

---

### Task 5: Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.css`

- [ ] **Step 1: Create Button.css**

Define all variant × colorType × state combinations. The CSS uses the pattern `.ui-button--{variant}-{colorType}` for color mapping and `data-loading` attribute for loading state.

Key dimensions from spec:
- Large: height 48px, padding 0 20px, font label-large (16px/510)
- Medium: height 38px, padding 0 16px, font label-medium (14px/510)
- Small: height 30px, padding 0 12px, font label-small (12px/510)
- Border radius: radius/300 (12px) for large/medium, radius/200 (8px) for small
- Border: 1.5px solid for outline variant

Color mappings per colorType (filled variant example):
- `primary`: bg=brand/default, hover=brand/hover, active=brand/active, text=fixed/white
- `neutral`: bg=neutral/subtle, hover=neutral/subtle-hover, active=neutral/subtle-active, text=content/default
- `danger`: bg=danger/default, hover=danger/hover, active=danger/active, text=fixed/white
- `prize`: bg=prize/default, hover=prize/hover, active=prize/active, text=fixed/bold
- `donation`: bg=donation/default, hover=donation/hover, active=donation/active, text=fixed/white
- `white`: bg=fixed/white, text=content/brand/default
- Ghost variant: bg=transparent, hover=transparent/hover, active=transparent/active
- Outline variant: bg=transparent, border=border/brand, hover adds tinted bg
- Text variant: no bg, no border, just colored text
- Disabled: opacity 0.4, pointer-events none
- Loading: content replaced by Spinner (white for filled, brand for others)

This file will be large (~200-300 lines). Build it systematically — base styles first, then size modifiers, then each variant×colorType combo.

- [ ] **Step 2: Create Button.tsx**

```tsx
import React from 'react';
import { Spinner } from './Spinner';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost' | 'text';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation' | 'white' | 'inverse' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      colorType = 'primary',
      size = 'large',
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const spinnerColor =
      variant === 'filled' && colorType !== 'neutral' ? 'white' : 'brand';

    const spinnerSize = size === 'small' ? 'small' : size === 'medium' ? 'small' : 'medium';

    return (
      <button
        ref={ref}
        className={[
          'ui-button',
          `ui-button--${size}`,
          `ui-button--${variant}`,
          `ui-button--${variant}-${colorType}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? (
          <Spinner size={spinnerSize} color={spinnerColor} />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
```

- [ ] **Step 3: Verify in App.tsx**

Replace `src/App.tsx` content to preview the Button:

```tsx
import { Button } from '@/components/ui/Button';

function App() {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2>Buttons</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button>Primary</Button>
        <Button colorType="neutral">Neutral</Button>
        <Button colorType="danger">Danger</Button>
        <Button colorType="prize">Prize</Button>
        <Button colorType="donation">Donation</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="text">Text</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button size="large">Large</Button>
        <Button size="medium">Medium</Button>
        <Button size="small">Small</Button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.css src/App.tsx
git commit -m "feat: add Button component with all variants, sizes, and states"
```

---

### Task 6: IconButton Component

**Files:**
- Create: `src/components/ui/IconButton.tsx`
- Create: `src/components/ui/IconButton.css`

- [ ] **Step 1: Create IconButton.css**

Key dimensions: large=52px, medium=40px, small=32px, xsmall=24px. Square, centered icon. Same color token mappings as Button filled/outline/ghost variants, but only for primary/neutral/danger/prize/donation colorTypes. Border radius: radius/300 for large/medium, radius/200 for small, radius/150 for xsmall.

- [ ] **Step 2: Create IconButton.tsx**

```tsx
import React from 'react';
import { Spinner } from './Spinner';
import './IconButton.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  'aria-label': string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'filled',
      colorType = 'primary',
      size = 'medium',
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const spinnerColor =
      variant === 'filled' && colorType !== 'neutral' ? 'white' : 'brand';

    const spinnerSize = size === 'xsmall' || size === 'small' ? 'small' : 'small';

    return (
      <button
        ref={ref}
        className={[
          'ui-icon-button',
          `ui-icon-button--${size}`,
          `ui-icon-button--${variant}`,
          `ui-icon-button--${variant}-${colorType}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? <Spinner size={spinnerSize} color={spinnerColor} /> : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/IconButton.tsx src/components/ui/IconButton.css
git commit -m "feat: add IconButton component (4 sizes, 3 variants)"
```

---

### Task 7: TextField Component

**Files:**
- Create: `src/components/ui/TextField.tsx`
- Create: `src/components/ui/TextField.css`

- [ ] **Step 1: Create TextField.css**

Key styles:
- Height: 56px, border-radius: radius/300 (12px), border: 1.5px solid border/default
- Focus: border-color → border/brand
- Error: border-color → border/danger
- Disabled: opacity 0.4, pointer-events none
- Label: body-medium (14px/400), color content/bold, margin-bottom space/150 (6px)
- Help text: body-small (12px/400), color content/subtle; error → content/danger/default
- Placeholder: color content/subtlest
- Input text: body-large (16px/400), color content/default

- [ ] **Step 2: Create TextField.tsx**

```tsx
import React, { useId } from 'react';
import './TextField.css';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, status = 'default', helpText, className, id: idProp, ...props }, ref) => {
    const autoId = useId();
    const id = idProp || autoId;
    const helpId = helpText ? `${id}-help` : undefined;

    return (
      <div className={`ui-text-field ui-text-field--${status} ${className || ''}`}>
        {label && (
          <label htmlFor={id} className="ui-text-field__label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className="ui-text-field__input"
          disabled={status === 'disabled'}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helpId}
          {...props}
        />
        {helpText && (
          <span id={helpId} className="ui-text-field__help">
            {helpText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };
export type { TextFieldProps };
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/TextField.tsx src/components/ui/TextField.css
git commit -m "feat: add TextField component with label, status, helpText"
```

---

### Task 8: Select Component

**Files:**
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Select.css`

- [ ] **Step 1: Create Select.css**

Same visual styling as TextField. Additional styles for the chevron-down icon (SVG background-image or pseudo-element) on the right side. Hide native select arrow with `appearance: none`.

- [ ] **Step 2: Create Select.tsx**

```tsx
import React, { useId } from 'react';
import './Select.css';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'disabled'> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, placeholder, options, status = 'default', helpText, className, id: idProp, value, ...props }, ref) => {
    const autoId = useId();
    const id = idProp || autoId;
    const helpId = helpText ? `${id}-help` : undefined;

    return (
      <div className={`ui-select ui-select--${status} ${className || ''}`}>
        {label && (
          <label htmlFor={id} className="ui-select__label">
            {label}
          </label>
        )}
        <div className="ui-select__wrapper">
          <select
            ref={ref}
            id={id}
            className="ui-select__input"
            disabled={status === 'disabled'}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={helpId}
            value={value}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg className="ui-select__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {helpText && (
          <span id={helpId} className="ui-select__help">
            {helpText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
export type { SelectProps, SelectOption };
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Select.tsx src/components/ui/Select.css
git commit -m "feat: add Select component with native select and chevron icon"
```

---

### Task 9: Checkbox, Radio, Switch Components

**Files:**
- Create: `src/components/ui/Checkbox.tsx` + `Checkbox.css`
- Create: `src/components/ui/Radio.tsx` + `Radio.css`
- Create: `src/components/ui/Switch.tsx` + `Switch.css`

- [ ] **Step 1: Create Checkbox.css + Checkbox.tsx**

Checkbox indicator: 24×24px, border-radius radius/150 (6px), border 1.5px solid border/default. Checked: bg brand/default, white checkmark SVG. Error: border danger. Disabled: opacity 0.4. Label uses body-large (16px/400).

```tsx
import React, { useId } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  status?: 'default' | 'error';
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, disabled, status = 'default', children }, ref) => {
    const id = useId();
    return (
      <label
        htmlFor={id}
        className={`ui-checkbox ui-checkbox--${status} ${disabled ? 'ui-checkbox--disabled' : ''}`}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="ui-checkbox__input"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
        />
        <span className="ui-checkbox__indicator" />
        {children && <span className="ui-checkbox__label">{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
```

- [ ] **Step 2: Create Radio.css + Radio.tsx**

Same structure as Checkbox but circular (border-radius: 50%). Selected: inner filled circle (8px) in brand color. Uses visually-hidden native radio input.

```tsx
import React, { useId } from 'react';
import './Radio.css';

interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  status?: 'default' | 'error';
  name?: string;
  value?: string;
  children?: React.ReactNode;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ checked, onChange, disabled, status = 'default', name, value, children }, ref) => {
    const id = useId();
    return (
      <label
        htmlFor={id}
        className={`ui-radio ui-radio--${status} ${disabled ? 'ui-radio--disabled' : ''}`}
      >
        <input
          ref={ref}
          id={id}
          type="radio"
          className="ui-radio__input"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          name={name}
          value={value}
        />
        <span className="ui-radio__indicator" />
        {children && <span className="ui-radio__label">{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };
export type { RadioProps };
```

- [ ] **Step 3: Create Switch.css + Switch.tsx**

Track: 51×31px, border-radius radius-full. Thumb: 27×27px circle. Off: bg neutral/default border, thumb left. On: bg brand/default, thumb right. Transition: 0.2s ease. Disabled: opacity 0.4.

```tsx
import React, { useId } from 'react';
import './Switch.css';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onChange, disabled }, ref) => {
    const id = useId();
    return (
      <label
        htmlFor={id}
        className={`ui-switch ${disabled ? 'ui-switch--disabled' : ''}`}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className="ui-switch__input"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          aria-checked={checked}
        />
        <span className="ui-switch__track">
          <span className="ui-switch__thumb" />
        </span>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Checkbox.tsx src/components/ui/Checkbox.css \
        src/components/ui/Radio.tsx src/components/ui/Radio.css \
        src/components/ui/Switch.tsx src/components/ui/Switch.css
git commit -m "feat: add Checkbox, Radio, Switch form controls"
```

---

### Task 10: Tag + Badge Components

**Files:**
- Create: `src/components/ui/Tag.tsx` + `Tag.css`
- Create: `src/components/ui/Badge.tsx` + `Badge.css`

- [ ] **Step 1: Create Tag.css + Tag.tsx**

Pill shape (radius-full). Medium: height 24px, padding 0 10px, font body-small (12px). Small: height 20px, padding 0 8px, font body-xsmall (10px).

Light variant color mapping (background-{type}-subtlest + content-{type}-bold):
- primary: bg brand/subtlest, text brand/bold
- success: bg success/subtlest, text success/bold
- danger: bg danger/subtlest, text danger/bold
- warning: bg warning/subtlest, text warning/bold
- prize: bg prize/subtlest, text prize/bold
- neutral: bg neutral/subtle, text content/default

Bold variant: bg {type}/default, text fixed/white (except prize → fixed/bold, neutral → fixed/white).

- [ ] **Step 2: Create Badge.css + Badge.tsx**

Dot variant: just a circle. Number variant: min-width = height, pill shape, centered text.
- small: 8×8 dot or 16px height number
- medium: 10×10 dot or 20px height number
- large: 12×12 dot or 24px height number
- Color: bg danger/default, text fixed/white
- Number: font label-xsmall (10px/510)
- If count > 99, display "99+"

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Tag.tsx src/components/ui/Tag.css \
        src/components/ui/Badge.tsx src/components/ui/Badge.css
git commit -m "feat: add Tag and Badge components"
```

---

### Task 11: Alert Component

**Files:**
- Create: `src/components/ui/Alert.tsx`
- Create: `src/components/ui/Alert.css`

- [ ] **Step 1: Create Alert.css + Alert.tsx**

Default variant: border-radius radius/200 (8px), padding space/300 (12px) space/400 (16px). Full-width: no border-radius. Color mapping same as Tag light variant (subtlest bg + bold content). Optional close button (IconButton ghost, xsmall) on the right. Left icon slot.

```tsx
import React from 'react';
import './Alert.css';

interface AlertProps {
  colorType?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'prize';
  variant?: 'default' | 'full-width';
  icon?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ colorType = 'primary', variant = 'default', icon, onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`ui-alert ui-alert--${variant} ui-alert--${colorType}`}
        {...props}
      >
        {icon && <span className="ui-alert__icon">{icon}</span>}
        <div className="ui-alert__content">{children}</div>
        {onClose && (
          <button className="ui-alert__close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
export type { AlertProps };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Alert.tsx src/components/ui/Alert.css
git commit -m "feat: add Alert component (6 colorTypes, 2 variants)"
```

---

### Task 12: ListItem Component

**Files:**
- Create: `src/components/ui/ListItem.tsx`
- Create: `src/components/ui/ListItem.css`

- [ ] **Step 1: Create ListItem.css + ListItem.tsx**

Trailing elements rendered conditionally based on `trailing` prop. The ListItem imports Switch, Checkbox, Spinner internally for those trailing types. Drill-in renders a chevron-right SVG. Text renders `trailingText`. Switch/Checkbox use `trailingChecked` and `onTrailingChange`.

Min-heights: compact=48px, 1-line=56px, 2-lines=72px. Horizontal padding: space/600 (24px). Bottom border: 1px solid border/divider. Headline: body-large (16px), Description: body-medium (14px) color subtle.

```tsx
import React from 'react';
import { Switch } from './Switch';
import { Checkbox } from './Checkbox';
import { Spinner } from './Spinner';
import './ListItem.css';

interface ListItemProps {
  headline: string;
  description?: string;
  contentSize?: '1-line' | '2-lines' | 'compact';
  trailing?: 'none' | 'drill-in' | 'text' | 'switch' | 'checkbox' | 'icon' | 'spinner';
  trailingText?: string;
  trailingChecked?: boolean;
  onTrailingChange?: (value: boolean) => void;
  trailingIcon?: React.ReactNode;
  leading?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      headline,
      description,
      contentSize = '1-line',
      trailing = 'none',
      trailingText,
      trailingChecked,
      onTrailingChange,
      trailingIcon,
      leading,
      disabled,
      onClick,
    },
    ref
  ) => {
    const renderTrailing = () => {
      switch (trailing) {
        case 'drill-in':
          return (
            <svg className="ui-list-item__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          );
        case 'text':
          return <span className="ui-list-item__trailing-text">{trailingText}</span>;
        case 'switch':
          return <Switch checked={trailingChecked} onChange={onTrailingChange} disabled={disabled} />;
        case 'checkbox':
          return <Checkbox checked={trailingChecked} onChange={onTrailingChange} disabled={disabled} />;
        case 'icon':
          return <span className="ui-list-item__trailing-icon">{trailingIcon}</span>;
        case 'spinner':
          return <Spinner size="small" color="neutral" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={`ui-list-item ui-list-item--${contentSize} ${disabled ? 'ui-list-item--disabled' : ''} ${onClick ? 'ui-list-item--clickable' : ''}`}
        onClick={disabled ? undefined : onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
      >
        {leading && <span className="ui-list-item__leading">{leading}</span>}
        <div className="ui-list-item__content">
          <span className="ui-list-item__headline">{headline}</span>
          {description && contentSize === '2-lines' && (
            <span className="ui-list-item__description">{description}</span>
          )}
        </div>
        {trailing !== 'none' && (
          <span className="ui-list-item__trailing">{renderTrailing()}</span>
        )}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem };
export type { ListItemProps };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ListItem.tsx src/components/ui/ListItem.css
git commit -m "feat: add ListItem component with 7 trailing element types"
```

---

### Task 13: Dialog Component

**Files:**
- Create: `src/components/ui/Dialog.tsx`
- Create: `src/components/ui/Dialog.css`

- [ ] **Step 1: Create Dialog.css + Dialog.tsx**

Renders via `createPortal` to `document.body`. Overlay: bg overlay/default. Dialog box: max-width 320px, bg default, radius/600 (24px), shadow-large, padding space/600 (24px). Title: heading-large (24px/590). Description: body-large (16px/400) color subtle. Actions: flex row of Buttons, gap space/200 (8px). Focus trap: on open, focus first action button; on Tab, cycle within dialog; on Escape, call onClose.

```tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import './Dialog.css';

interface DialogAction {
  label: string;
  onClick: () => void;
  colorType?: 'primary' | 'danger' | 'neutral';
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  type?: 'default' | 'danger';
  title: string;
  description?: string;
  actions: DialogAction[];
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, type = 'default', title, description, actions }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && dialogRef.current) {
      const firstButton = dialogRef.current.querySelector('button');
      firstButton?.focus();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="ui-dialog-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className={`ui-dialog ui-dialog--${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className="ui-dialog__title">{title}</h2>
        {description && <p className="ui-dialog__description">{description}</p>}
        <div className="ui-dialog__actions">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={i === actions.length - 1 ? 'filled' : 'ghost'}
              colorType={action.colorType || (type === 'danger' && i === actions.length - 1 ? 'danger' : 'primary')}
              size="medium"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export { Dialog };
export type { DialogProps, DialogAction };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Dialog.tsx src/components/ui/Dialog.css
git commit -m "feat: add Dialog component with portal, overlay, focus trap"
```

---

### Task 14: Sheet Component

**Files:**
- Create: `src/components/ui/Sheet.tsx`
- Create: `src/components/ui/Sheet.css`

- [ ] **Step 1: Create Sheet.css + Sheet.tsx**

Similar portal pattern to Dialog. Slides up from bottom. Overlay same as Dialog. Sheet container: bg default, border-radius radius/600 (24px) top corners, max-height 90vh, shadow-sheet. Grabber: centered 36×5px pill, bg neutral/bold, margin-top space/200 (8px). Title: heading-large or body-large based on titleSize. Footer: sticky bottom with border-top.

Structure mirrors Dialog but positioned at bottom with slide-up transition (`transform: translateY(100%)` → `translateY(0)`).

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Sheet.tsx src/components/ui/Sheet.css
git commit -m "feat: add Sheet component with bottom slide-up animation"
```

---

### Task 15: Toast Component

**Files:**
- Create: `src/components/ui/Toast.tsx`
- Create: `src/components/ui/Toast.css`

- [ ] **Step 1: Create Toast.css + Toast.tsx**

ToastProvider wraps app, manages toast state via Context. `useToast()` returns `{ show, dismiss }`. Toast container fixed at top-center. Each toast: bg toast (token), shadow-medium, radius/300 (12px), slide-down animation. Auto-dismiss after duration (default 3000ms, skip for `loading` type). Loading type shows Spinner inline.

```tsx
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from './Spinner';
import './Toast.css';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'rich' | 'loading';
  duration?: number;
}

interface ToastContextValue {
  show: (opts: Omit<ToastMessage, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (opts: Omit<ToastMessage, 'id'>) => {
      const id = `toast-${++counterRef.current}`;
      const toast: ToastMessage = { id, ...opts };
      setToasts((prev) => [...prev, toast]);

      if (opts.type !== 'loading') {
        const duration = opts.duration ?? 3000;
        setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {createPortal(
        <div className="ui-toast-container">
          {toasts.map((t) => (
            <div key={t.id} className={`ui-toast ui-toast--${t.type || 'rich'}`} role="status">
              {t.type === 'loading' && <Spinner size="small" color="brand" />}
              <span className="ui-toast__message">{t.message}</span>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export type { ToastMessage };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Toast.tsx src/components/ui/Toast.css
git commit -m "feat: add Toast with ToastProvider and useToast hook"
```

---

### Task 16: Barrel Export + Demo Page

**Files:**
- Create: `src/components/ui/index.ts`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create barrel export index.ts**

```ts
export { Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';

export { TextField } from './TextField';
export type { TextFieldProps } from './TextField';

export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { Radio } from './Radio';
export type { RadioProps } from './Radio';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { Tag } from './Tag';
export type { TagProps } from './Tag';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Alert } from './Alert';
export type { AlertProps } from './Alert';

export { ListItem } from './ListItem';
export type { ListItemProps } from './ListItem';

export { Dialog } from './Dialog';
export type { DialogProps, DialogAction } from './Dialog';

export { Sheet } from './Sheet';
export type { SheetProps } from './Sheet';

export { ToastProvider, useToast } from './Toast';
export type { ToastMessage } from './Toast';
```

- [ ] **Step 2: Update main.tsx to wrap with ToastProvider**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from '@/components/ui';
import '@/components/ui/tokens/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
```

- [ ] **Step 3: Build App.tsx demo page**

Create a comprehensive demo page that showcases every component in every major variant. Organized by sections matching the spec. Include a dark mode toggle at the top that sets `data-theme="dark"` on `document.documentElement`.

- [ ] **Step 4: Verify all components render correctly**

Run `npm run dev`, visually check each component section in the demo page. Toggle dark mode to verify token switching works.

- [ ] **Step 5: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/index.ts src/App.tsx src/main.tsx
git commit -m "feat: add barrel export and demo page with all 15 components"
```

---

### Task 17: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Verify the production build works correctly.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify production build passes"
```
