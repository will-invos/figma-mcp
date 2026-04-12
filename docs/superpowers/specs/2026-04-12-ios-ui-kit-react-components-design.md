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

### 2.3 Color Tokens (Light + Dark)

```css
:root {
  /* Content */
  --color-content-bold: #101119;
  --color-content-default: #3b3c43;
  --color-content-plain: #000000;
  --color-content-subtle: #737380;
  --color-content-subtlest: #9b9baa;
  --color-content-brand-default: #3560ff;
  --color-content-brand-bold: #2440b3;
  --color-content-brand-hover: #2d4edb;
  --color-content-brand-active: #2440b3;
  --color-content-brand-subtle: #8da4ff;
  --color-content-danger-default: #e5484d;
  --color-content-danger-bold: #c13438;
  --color-content-success-default: #30a46c;
  --color-content-success-bold: #1d7d4e;
  --color-content-inverse-bold: #ffffff;
  --color-content-inverse-plain: #f0f0f5;
  --color-content-inverse-subtle: #bbbbc8;
  --color-content-fixed-white: #ffffff;
  --color-content-fixed-black: #000000;
  --color-content-link-default: #3560ff;

  /* Background */
  --color-background-plain: #ffffff;
  --color-background-default: #ffffff;
  --color-background-brand-boldest: #1a2f8f;
  --color-background-brand-bold: #3560ff;
  --color-background-brand-default: #4d7aff;
  --color-background-brand-hover: #2d4edb;
  --color-background-brand-active: #2440b3;
  --color-background-brand-subtle: #e8eeff;
  --color-background-brand-subtlest: #f5f7ff;
  --color-background-danger-bold: #e5484d;
  --color-background-danger-hover: #d23b3f;
  --color-background-danger-subtle: #ffe5e5;
  --color-background-danger-subtlest: #fff5f5;
  --color-background-success-subtle: #ddf3e4;
  --color-background-success-subtlest: #f2fcf5;
  --color-background-warning-subtle: #fff0d1;
  --color-background-warning-subtlest: #fffbe5;
  --color-background-neutral-bold: #737380;
  --color-background-neutral-subtle: #f0f0f5;
  --color-background-neutral-subtle-hover: #e8e8f0;
  --color-background-neutral-subtle-active: #dddde8;
  --color-background-inverse-plain: #101119;
  --color-background-overlay-bold: rgba(0, 0, 0, 0.5);

  /* Border */
  --color-border-default: #bbbbc8;
  --color-border-bold: #9b9baa;
  --color-border-subtle: #edeff3;
  --color-border-brand: #3560ff;
  --color-border-danger: #e5484d;
  --color-border-success: #30a46c;
  --color-border-warning: #f5a623;
  --color-border-inverse-bold: #ffffff;
  --color-border-fixed-black: #000000;
  --color-border-fixed-white: #ffffff;

  /* Shadow */
  --color-shadow-bold: rgba(0, 0, 0, 0.12);
  --color-shadow-sheet: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  /* Content */
  --color-content-bold: #f0f0f5;
  --color-content-default: #dddde8;
  --color-content-plain: #ffffff;
  --color-content-subtle: #9b9baa;
  --color-content-subtlest: #737380;
  --color-content-brand-default: #8da4ff;
  --color-content-brand-bold: #a8bbff;
  --color-content-danger-default: #ff8589;
  --color-content-success-default: #5dd99a;
  --color-content-inverse-bold: #101119;
  --color-content-inverse-plain: #1c1c27;
  --color-content-link-default: #8da4ff;

  /* Background */
  --color-background-plain: #101119;
  --color-background-default: #101119;
  --color-background-brand-bold: #3560ff;
  --color-background-brand-default: #2d4edb;
  --color-background-brand-hover: #3560ff;
  --color-background-brand-active: #4d7aff;
  --color-background-brand-subtle: #1a2040;
  --color-background-brand-subtlest: #131828;
  --color-background-danger-bold: #e5484d;
  --color-background-danger-subtle: #3a1618;
  --color-background-danger-subtlest: #261314;
  --color-background-success-subtle: #132d1f;
  --color-background-warning-subtle: #332810;
  --color-background-neutral-bold: #9b9baa;
  --color-background-neutral-subtle: #1c1c27;
  --color-background-neutral-subtle-hover: #252533;
  --color-background-neutral-subtle-active: #2e2e40;
  --color-background-inverse-plain: #f0f0f5;
  --color-background-overlay-bold: rgba(0, 0, 0, 0.7);

  /* Border */
  --color-border-default: #3b3c50;
  --color-border-bold: #505068;
  --color-border-subtle: #252533;
  --color-border-brand: #5580ff;
  --color-border-danger: #ff8589;
  --color-border-success: #5dd99a;
  --color-border-warning: #ffc145;

  /* Shadow */
  --color-shadow-bold: rgba(0, 0, 0, 0.3);
  --color-shadow-sheet: rgba(0, 0, 0, 0.2);
}
```

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
- Chinese: `'PingFang TC', 'SF Pro TC', -apple-system, sans-serif`

Text style utility classes (iOS platform, from Figma):

| Class | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `.text-ios-display` | 28px | 700 | 36px | H1, page headline |
| `.text-ios-heading-large` | 20px | 600 | 28px | H3, dialog title, sheet headline |
| `.text-ios-body-xlarge` | 19px | 400 | 26px | Extra large body |
| `.text-ios-body-large` | 17px | 400 | 24px | Default body |
| `.text-ios-body-medium` | 15px | 400 | 22px | Caption, supporting text |
| `.text-ios-body-small` | 13px | 400 | 18px | Footnote, tag |
| `.text-ios-body-xsmall` | 11px | 400 | 16px | Tab title, badge |
| `.text-ios-label-large` | 17px | 600 | 24px | Button text |
| `.text-ios-label-medium` | 15px | 600 | 22px | Small button text |
| `.text-ios-label-small` | 13px | 600 | 18px | Extra small button |

Chinese variants (`-cn` suffix) use PingFang TC with adjusted letter-spacing.

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
