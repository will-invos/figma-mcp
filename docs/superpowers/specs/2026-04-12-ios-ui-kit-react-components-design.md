# iOS UI Kit — React Component Library Design

> Date: 2026-04-12
> Source: [Figma iOS UI Kit 2025](https://www.figma.com/design/8pE8KHl50y72IP7JseLH55/)
> Design Tokens: [Figma Design System 2025](https://www.figma.com/design/FcUQOflk2OdZ2z2imVEcIw/)

---

## 1. Overview

Build a React component library that mirrors the Figma iOS UI Kit 2025, Phase 1 (core components). The library lives inside a Vite + React + TypeScript project at `/Users/willhuang/Downloads/figma-mcp/`.

**Tech stack:** React 18+ · TypeScript · CSS Variables (vanilla CSS modules)
**Architecture:** Flat components in `src/components/ui/`
**Scope:** Phase 1 — 15 components + design token system

---

## 2. Design Token System

CSS Variables mapped 1:1 from Figma Design System 2025 semantic tokens. Supports light and dark mode via `data-theme` attribute on `<html>`.

### 2.1 File Structure

```
src/components/ui/tokens/
  colors.css       — Semantic color tokens (light default + dark override)
  spacing.css      — space/* gap tokens
  radius.css       — radius/* corner radius tokens
  typography.css   — Font family definitions + text style utility classes
  shadows.css      — Shadow effect styles
  index.css        — Aggregated import entry
```

### 2.2 Naming Convention

Figma token path → CSS variable, `/` becomes `-`:

| Figma Token | CSS Variable |
|---|---|
| `color/content/bold` | `--color-content-bold` |
| `color/background/brand/default` | `--color-background-brand-default` |
| `space/400` | `--space-400` |
| `radius/300` | `--radius-300` |

### 2.3 Color Token Inventory (142 tokens)

The complete list of semantic color tokens from the Figma "Semantic: Colors" variable collection. All 142 tokens must be defined as CSS variables in `colors.css` for both `:root` (light) and `[data-theme="dark"]`.

> **Note:** Hex values below are light-mode defaults extracted from Figma. Dark-mode values will be extracted during implementation via `get_variable_defs` on relevant Figma nodes.

#### Content tokens (53) — scope: TEXT_FILL, SHAPE_FILL

```
/* Base */
color/content/bold
color/content/default
color/content/plain
color/content/subtle
color/content/subtlest

/* Brand */
color/content/brand/active
color/content/brand/bold
color/content/brand/default
color/content/brand/gradient/primary
color/content/brand/gradient/secondary
color/content/brand/hover
color/content/brand/subtle

/* Danger */
color/content/danger/active
color/content/danger/bold
color/content/danger/default
color/content/danger/hover
color/content/danger/subtle

/* Donation */
color/content/donation/active
color/content/donation/bold
color/content/donation/default
color/content/donation/hover
color/content/donation/subtle

/* Fixed */
color/content/fixed/black
color/content/fixed/bold
color/content/fixed/brand
color/content/fixed/default
color/content/fixed/white

/* Inverse */
color/content/inverse/bold
color/content/inverse/brand
color/content/inverse/default
color/content/inverse/plain
color/content/inverse/subtle

/* Link */
color/content/link/active
color/content/link/default
color/content/link/hover

/* Neutral */
color/content/neutral/active
color/content/neutral/default
color/content/neutral/hover

/* Prize */
color/content/prize/active
color/content/prize/bold
color/content/prize/default
color/content/prize/hover
color/content/prize/subtle

/* Success */
color/content/success/active
color/content/success/bold
color/content/success/default
color/content/success/hover
color/content/success/subtle

/* Warning */
color/content/warning/active
color/content/warning/bold
color/content/warning/default
color/content/warning/hover
color/content/warning/subtle
```

#### Background tokens (66) — scope: FRAME_FILL, SHAPE_FILL, EFFECT_COLOR

```
/* Base */
color/background/default
color/background/disable
color/background/elevated-brand
color/background/plain
color/background/skeleton
color/background/sunken
color/background/toast

/* Brand */
color/background/brand/active
color/background/brand/bold
color/background/brand/boldest
color/background/brand/default
color/background/brand/hover
color/background/brand/subtle
color/background/brand/subtlest

/* Danger */
color/background/danger/active
color/background/danger/bold
color/background/danger/boldest
color/background/danger/default
color/background/danger/hover
color/background/danger/subtle
color/background/danger/subtlest

/* Donation */
color/background/donation/active
color/background/donation/bold
color/background/donation/boldest
color/background/donation/default
color/background/donation/hover
color/background/donation/subtle
color/background/donation/subtlest

/* Fixed */
color/background/fixed/black
color/background/fixed/transparent/black
color/background/fixed/transparent/white
color/background/fixed/white

/* Inverse */
color/background/inverse/default
color/background/inverse/plain
color/background/inverse/sunken

/* Neutral */
color/background/neutral/active
color/background/neutral/bold
color/background/neutral/bold-hover
color/background/neutral/default
color/background/neutral/hover
color/background/neutral/subtle

/* Overlay */
color/background/overlay/bold
color/background/overlay/default

/* Prize */
color/background/prize/active
color/background/prize/bold
color/background/prize/boldest
color/background/prize/default
color/background/prize/hover
color/background/prize/subtle
color/background/prize/subtlest

/* Success */
color/background/success/active
color/background/success/bold
color/background/success/boldest
color/background/success/default
color/background/success/hover
color/background/success/subtle
color/background/success/subtlest

/* Transparent */
color/background/transparent/active
color/background/transparent/default
color/background/transparent/hover

/* Warning */
color/background/warning/active
color/background/warning/bold
color/background/warning/boldest
color/background/warning/default
color/background/warning/hover
color/background/warning/subtle
color/background/warning/subtlest
```

#### Border tokens (18) — scope: STROKE

```
color/border/bold
color/border/boldest
color/border/brand
color/border/brand-subtle
color/border/danger
color/border/default
color/border/divider
color/border/donation
color/border/fixed/black
color/border/fixed/bold
color/border/inverse/bold
color/border/inverse/divider
color/border/inverse/plain
color/border/plain
color/border/prize
color/border/subtle
color/border/success
color/border/warning
```

#### Shadow tokens (5) — scope: ALL_SCOPES

```
color/shadow/bold
color/shadow/default
color/shadow/fixed/bold
color/shadow/glow/default
color/shadow/sheet
```

#### Implementation approach for hex values

During implementation, extract actual hex values for both light and dark modes by:
1. Using `get_variable_defs` on Figma nodes that consume these tokens
2. Cross-referencing with the Figma color swatch page (node `330:98801`)
3. Each token becomes `--{token-path-with-dashes}` in CSS, e.g. `color/content/brand/default` → `--color-content-brand-default`

### 2.4 Spacing Tokens

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

### 2.5 Radius Tokens

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

### 2.6 Typography

Font families:
- English: `'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`
- Chinese: `'PingFang TC', -apple-system, sans-serif`

#### iOS Text Styles — English (SF Pro)

Values extracted from Figma `get_variable_defs`:

| Figma Style | Class | Family | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|---|
| `iOS/Display` | `.text-ios-display` | SF Pro | 28px | Medium (510) | 36px | 0 | H1, page headline, large nav title |
| `iOS/Display-Regular` | `.text-ios-display-regular` | SF Pro | 28px | Regular (400) | 36px | 0 | H1 regular weight |
| `iOS/Heading/Large` | `.text-ios-heading-large` | SF Pro | 24px | Semibold (590) | 32px | 0 | H3, page subtitle, dialog title |
| `iOS/Heading/Medium` | `.text-ios-heading-medium` | SF Pro | 20px | Semibold (590) | 28px | 0 | H4, section title |
| `iOS/Heading/Small` | `.text-ios-heading-small` | SF Pro | 18px | Semibold (590) | 26px | 0 | H5, section subtitle |
| `iOS/Body/XLarge` | `.text-ios-body-xlarge` | SF Pro | 18px | Regular (400) | 26px | 0 | Extra large body |
| `iOS/Body/Large` | `.text-ios-body-large` | SF Pro | 16px | Regular (400) | 24px | 0 | Default body |
| `iOS/Body/Medium` | `.text-ios-body-medium` | SF Pro | 14px | Regular (400) | 22px | 0 | Caption, supporting text |
| `iOS/Body/Small` | `.text-ios-body-small` | SF Pro | 12px | Regular (400) | 18px | 0 | Footnote, supporting text, tag |
| `iOS/Body/XSmall` | `.text-ios-body-xsmall` | SF Pro | 10px | Regular (400) | 16px | 0 | Tab title, badge, tag |
| `iOS/Label/Large` | `.text-ios-label-large` | SF Pro | 16px | Medium (510) | 24px | 0 | Button |
| `iOS/Label/Medium` | `.text-ios-label-medium` | SF Pro | 14px | Medium (510) | 22px | 0 | Small button |
| `iOS/Label/Small` | `.text-ios-label-small` | SF Pro | 12px | Medium (510) | 18px | 0 | Extra small button |
| `iOS/Label/XSmall` | `.text-ios-label-xsmall` | SF Pro | 10px | Medium (510) | 16px | 0 | Micro label |

> CN (PingFang TC) text styles are excluded from this component library scope. Only EN (SF Pro) styles are implemented. Total: **14 text styles**.

### 2.7 Shadows

```css
:root {
  --shadow-small: 0 1px 3px var(--color-shadow-bold);
  --shadow-medium: 0 4px 12px var(--color-shadow-bold);
  --shadow-bold: 0 8px 24px var(--color-shadow-bold);
  --shadow-large: 0 16px 48px var(--color-shadow-bold);
  --shadow-sheet: 0 -4px 24px var(--color-shadow-sheet);
}
```

---

## 3. Component Specifications

All components follow these conventions:
- Props map 1:1 to Figma variant axes
- CSS classes use BEM-like naming: `.ui-button`, `.ui-button--filled`, `.ui-button--primary`
- State styling via `data-*` attributes: `data-state="hovered"`, `data-loading="true"`
- All interactive states: enabled, hovered, pressed, disabled, loading (where applicable)
- Components extend relevant HTML element props via `ComponentPropsWithoutRef`

### 3.1 Button

**File:** `Button.tsx` + `Button.css`

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost' | 'text';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation' | 'white' | 'inverse' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
}
```

| Size | Height | Font |
|---|---|---|
| large | 48px | label-large (17px/600) |
| medium | 38px | label-medium (15px/600) |
| small | 30px | label-small (13px/600) |

Constraints:
- `text` variant only: primary, secondary, inverse
- `white` colorType only: filled variant
- `inverse` colorType: ghost and text variants only
- `loading` replaces content with Spinner, keeps button width

### 3.2 IconButton

**File:** `IconButton.tsx` + `IconButton.css`

```tsx
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  'aria-label': string; // required for accessibility
}
```

| Size | Dimensions | Icon Size |
|---|---|---|
| large | 52×52px | 24px |
| medium | 40×40px | 20px |
| small | 32×32px | 16px |
| xsmall | 24×24px | 14px |

### 3.3 TextField

**File:** `TextField.tsx` + `TextField.css`

```tsx
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
}
```

- Height: 56px
- Border radius: radius/300 (12px)
- Border: 1.5px solid, default → brand on focus, danger on error
- Disabled state: reduced opacity, no interaction
- Help text appears below, turns danger color on error

### 3.4 Select

**File:** `Select.tsx` + `Select.css`

```tsx
interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
}
```

- Same visual style as TextField
- Trailing chevron-down icon
- Native `<select>` under the hood for accessibility

### 3.5 Checkbox

**File:** `Checkbox.tsx` + `Checkbox.css`

```tsx
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  status?: 'default' | 'error';
  children?: React.ReactNode; // label
}
```

- 24×24px checkbox indicator
- Checked state: brand background + white checkmark
- Error state: danger border
- Label text: body-large (17px)

### 3.6 Radio

**File:** `Radio.tsx` + `Radio.css`

```tsx
interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  status?: 'default' | 'error';
  children?: React.ReactNode;
}
```

- Same sizing and states as Checkbox
- Circular indicator with inner dot when selected

### 3.7 Switch

**File:** `Switch.tsx` + `Switch.css`

```tsx
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
```

- iOS-style toggle
- Track: 51×31px, pill-shaped (radius-full)
- Thumb: 27×27px circle
- On: brand background, thumb right
- Off: neutral border, thumb left

### 3.8 Tag

**File:** `Tag.tsx` + `Tag.css`

```tsx
interface TagProps {
  variant?: 'light' | 'bold';
  colorType?: 'neutral' | 'primary' | 'success' | 'danger' | 'warning' | 'prize';
  size?: 'medium' | 'small';
  children: React.ReactNode;
}
```

| Size | Height | Font |
|---|---|---|
| medium | 24px | body-small (13px) |
| small | 20px | body-xsmall (11px) |

- `light`: tinted background + colored text
- `bold`: solid colored background + white text
- Border radius: radius-full (pill)

### 3.9 Badge

**File:** `Badge.tsx` + `Badge.css`

```tsx
interface BadgeProps {
  variant?: 'dot' | 'number';
  count?: number;
  size?: 'small' | 'medium' | 'large';
}
```

- `dot`: small colored circle (no text)
- `number`: circle/pill with count text
- Max display: 99+ for large numbers
- Color: danger background (red)

### 3.10 Alert

**File:** `Alert.tsx` + `Alert.css`

```tsx
interface AlertProps {
  colorType?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'prize';
  variant?: 'default' | 'full-width';
  icon?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}
```

- `default`: rounded container with left icon
- `full-width`: edge-to-edge, no border radius
- Each colorType maps to its semantic background-subtle + content color

### 3.11 Dialog

**File:** `Dialog.tsx` + `Dialog.css`

```tsx
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
```

- Centered modal with overlay (background-overlay-bold)
- Max width: 320px
- Border radius: radius/600 (24px)
- Shadow: shadow-large
- Renders via React portal to `document.body`
- Traps focus, closes on Escape

### 3.12 Sheet

**File:** `Sheet.tsx` + `Sheet.css`

```tsx
interface SheetProps {
  open: boolean;
  onClose: () => void;
  headerType?: 'grabber' | 'default';
  title?: string;
  titleSize?: 'large' | 'regular';
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

- Slides up from bottom with overlay
- Grabber: centered 36×5px pill (radius-full), neutral-bold color
- Max height: 90vh
- Border radius: radius/600 top-left + top-right
- Renders via React portal
- Shadow: shadow-sheet

### 3.13 Toast

**File:** `Toast.tsx` + `Toast.css`

```tsx
interface ToastMessage {
  id: string;
  message: string;
  type?: 'rich' | 'loading';
  duration?: number; // ms, default 3000
}

// Provider
<ToastProvider>{children}</ToastProvider>

// Hook
const toast = useToast();
toast.show({ message: '儲存成功' });
toast.show({ message: '上傳中...', type: 'loading' });
toast.dismiss(id);
```

- Appears at top-center with slide-down animation
- Auto-dismiss after duration (except `loading`)
- Shadow: shadow-medium
- Border radius: radius/300

### 3.14 ListItem

**File:** `ListItem.tsx` + `ListItem.css`

```tsx
interface ListItemProps {
  headline: string;
  description?: string;
  contentSize?: '1-line' | '2-lines' | 'compact';
  trailing?: 'none' | 'drill-in' | 'text' | 'switch' | 'checkbox' | 'icon' | 'spinner';
  trailingText?: string;
  trailingChecked?: boolean;
  onTrailingChange?: (value: boolean) => void;
  leading?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
```

- Full-width, min-height: 48px (compact) / 56px (1-line) / 72px (2-lines)
- Left padding: space/600 (24px)
- Bottom border: 1px solid border-subtle
- Trailing elements render based on `trailing` prop

### 3.15 Spinner

**File:** `Spinner.tsx` + `Spinner.css`

```tsx
interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'brand' | 'white' | 'neutral';
}
```

- CSS animation (rotate), no JS animation needed
- small: 16px, medium: 24px, large: 32px

---

## 4. Project Setup

Vite + React + TypeScript project in `/Users/willhuang/Downloads/figma-mcp/`.

```
figma-mcp/
  src/
    components/ui/
      tokens/
        colors.css
        spacing.css
        radius.css
        typography.css
        shadows.css
        index.css
      Button.tsx + Button.css
      IconButton.tsx + IconButton.css
      TextField.tsx + TextField.css
      Select.tsx + Select.css
      Checkbox.tsx + Checkbox.css
      Radio.tsx + Radio.css
      Switch.tsx + Switch.css
      Tag.tsx + Tag.css
      Badge.tsx + Badge.css
      Alert.tsx + Alert.css
      Dialog.tsx + Dialog.css
      Sheet.tsx + Sheet.css
      Toast.tsx + Toast.css
      ListItem.tsx + ListItem.css
      Spinner.tsx + Spinner.css
      index.ts
    App.tsx          — demo / preview page
    main.tsx
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  docs/
  design-system.md
  ios-ui-kit.md
```

### 4.1 Key Dependencies

- `react` + `react-dom` (18+)
- `typescript` (5+)
- `vite` + `@vitejs/plugin-react`

No additional UI libraries. All styling is vanilla CSS with CSS Variables.

### 4.2 Path Alias

`@/` maps to `src/` via tsconfig paths + vite resolve alias.

---

## 5. Conventions

1. **Props naming:** Use `variant` for style axis, `colorType` for color/semantic axis (avoids conflict with HTML `style` and `type` attributes)
2. **CSS class naming:** `.ui-{component}`, `.ui-{component}--{modifier}`
3. **Dark mode:** All color references use CSS variables only; `[data-theme="dark"]` overrides in `colors.css`
4. **Accessibility:** All interactive components include proper `role`, `aria-*` attributes, keyboard navigation
5. **Forwarded refs:** All components use `React.forwardRef` for ref forwarding
6. **No internal state for controlled components:** Form controls are controlled by default, uncontrolled with `defaultValue`/`defaultChecked` optional
