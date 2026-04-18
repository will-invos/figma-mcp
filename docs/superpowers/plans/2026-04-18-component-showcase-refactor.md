# Component Showcase Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the Components showcase page from a long scrolling list into a Storybook-style 3-column interactive system with sidebar navigation, live preview, and controls panel.

**Architecture:** Self-built Storybook-like system using hash routing. Each UI component gets a story definition file that declares its controllable props. A generic Controls component auto-generates form controls from prop definitions. Preview renders the component with current prop values. Sidebar groups components by category.

**Tech Stack:** React 19, TypeScript, plain CSS with design tokens, hash-based routing (no new dependencies)

---

## File Structure

```
src/
├── App.tsx                          ← Modify: route /components/* to Components page
└── pages/
    ├── Components.tsx               ← Rewrite: 3-column layout shell
    ├── Components.css               ← Rewrite: 3-column layout styles
    └── stories/
        ├── types.ts                 ← Create: StoryDef, PropDef types
        ├── registry.ts              ← Create: all stories grouped by category
        ├── Sidebar.tsx              ← Create: tree-style category nav
        ├── Sidebar.css              ← Create
        ├── Controls.tsx             ← Create: auto-generated prop controls
        ├── Controls.css             ← Create
        ├── Preview.tsx              ← Create: live preview container + dark mode toggle
        ├── Preview.css              ← Create
        ├── icons.tsx                ← Create: shared placeholder icons
        ├── NavigationBar.story.tsx  ← Create (one per component, 30 total)
        ├── TabBar.story.tsx
        ├── Divider.story.ts
        ├── Button.story.ts
        ├── IconButton.story.tsx
        ├── TextField.story.tsx
        ├── TextArea.story.ts
        ├── Select.story.ts
        ├── Checkbox.story.ts
        ├── Radio.story.ts
        ├── Switch.story.ts
        ├── Slider.story.ts
        ├── SearchField.story.ts
        ├── DatePicker.story.ts
        ├── MonthPicker.story.ts
        ├── Tag.story.ts
        ├── TagBar.story.tsx
        ├── Badge.story.ts
        ├── Avatar.story.ts
        ├── ListItem.story.tsx
        ├── ListHeader.story.ts
        ├── ListFooter.story.ts
        ├── CardItem.story.tsx
        ├── CardBanner.story.tsx
        ├── Alert.story.ts
        ├── Spinner.story.ts
        ├── ProgressBar.story.ts
        ├── CircularProgress.story.ts
        ├── ProgressGroup.story.ts
        ├── Toast.story.tsx
        ├── SnackBar.story.tsx
        ├── Tooltip.story.tsx
        ├── Dialog.story.tsx
        ├── BottomSheet.story.tsx
        └── SheetHeader.story.tsx
```

Notes on file extensions:
- `.ts` — stories with only data (no JSX in `render` / `fixedProps`)
- `.tsx` — stories that use JSX (custom `Render` component, icon fixedProps)

---

### Task 1: Foundation — types + icons + App.tsx routing

**Files:**
- Create: `src/pages/stories/types.ts`
- Create: `src/pages/stories/icons.tsx`
- Modify: `src/App.tsx:43`

- [ ] **Step 1: Create `src/pages/stories/types.ts`**

```ts
import type React from 'react'

export type PropDef =
  | { type: 'enum'; options: string[]; default: string }
  | { type: 'boolean'; default: boolean }
  | { type: 'string'; default: string }
  | { type: 'number'; default: number; min?: number; max?: number; step?: number }

export interface StoryDef {
  component: React.ComponentType<any>
  name: string
  category: string
  props: Record<string, PropDef>
  fixedProps?: Record<string, any>
  /** Custom render component for stories needing extra state or wrappers (e.g. Dialog, Toast).
   *  Receives current controlled prop values. Omit for default: <Component {...fixedProps} {...values} /> */
  Render?: React.ComponentType<{ values: Record<string, any> }>
}

export interface StoryCategory {
  name: string
  stories: StoryDef[]
}
```

- [ ] **Step 2: Create `src/pages/stories/icons.tsx`**

Shared placeholder icons used across multiple story files (extracted from current Components.tsx):

```tsx
export const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
export const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 17s-7-4.35-7-9a5 5 0 0 1 9.21-2.66A5 5 0 0 1 17 8c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
)
export const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12l9-8 9 8M5 11v9h14v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const ReceiptIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 3v18l3-2 3 2 3-2 3 2V3l-3 2-3-2-3 2-3-2zM9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
export const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7.25v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
export const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
)
export const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>
)
export const SearchIconBig = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75"/><path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
)
export const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v12M12 4l-4 4M12 4l4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.8"/><path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
export const WarningCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.8"/><path d="M10 6v5M10 13.5v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
)
```

- [ ] **Step 3: Update App.tsx routing**

In `src/App.tsx`, change line 43 from exact match to prefix match so `/components/Button` etc. are routed to the Components page:

```tsx
// Before:
if (route === '/' || route === '/components') return <Components />

// After:
if (route === '/' || route.startsWith('/components')) return <Components />
```

Also update `PUBLIC_ROUTES` to handle the prefix:

```tsx
// Before:
const PUBLIC_ROUTES = new Set(['/', '/components'])

// After — change isPublicRoute check:
const isPublicRoute = route === '/' || route.startsWith('/components')
```

And remove the `PUBLIC_ROUTES` set usage in the auth guard, replacing `isPublicRoute` with the new variable.

- [ ] **Step 4: Commit**

```bash
git add src/pages/stories/types.ts src/pages/stories/icons.tsx src/App.tsx
git commit -m "feat(showcase): add foundation types, icons, and routing"
```

---

### Task 2: Sidebar component

**Files:**
- Create: `src/pages/stories/Sidebar.tsx`
- Create: `src/pages/stories/Sidebar.css`

- [ ] **Step 1: Create `src/pages/stories/Sidebar.css`**

```css
.cs-sidebar {
  width: 220px;
  min-width: 220px;
  height: 100vh;
  overflow-y: auto;
  padding: var(--space-400) var(--space-300);
  background: var(--color-background-sunken);
  border-right: 1px solid var(--color-border-subtle);
  box-sizing: border-box;
}

.cs-sidebar__title {
  margin: 0 0 var(--space-400);
  padding: 0 var(--space-200);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-content-bold);
}

.cs-sidebar__group {
  margin-bottom: var(--space-300);
}

.cs-sidebar__group-label {
  display: block;
  padding: var(--space-100) var(--space-200);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-content-subtlest);
}

.cs-sidebar__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--space-150) var(--space-200) var(--space-150) var(--space-400);
  border: none;
  border-radius: var(--radius-150);
  background: transparent;
  font-size: 13px;
  font-family: var(--font-family);
  color: var(--color-content-default);
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.cs-sidebar__item:hover {
  background: var(--color-background-neutral-subtle);
}

.cs-sidebar__item--active {
  background: var(--color-background-brand-subtlest);
  color: var(--color-content-brand-default);
  font-weight: 500;
}
```

- [ ] **Step 2: Create `src/pages/stories/Sidebar.tsx`**

```tsx
import type { StoryCategory } from './types'
import './Sidebar.css'

interface SidebarProps {
  categories: StoryCategory[]
  activeStory: string
  onSelect: (name: string) => void
}

export default function Sidebar({ categories, activeStory, onSelect }: SidebarProps) {
  return (
    <nav className="cs-sidebar" aria-label="Components">
      <h1 className="cs-sidebar__title">UI Kit</h1>
      {categories.map((cat) => (
        <div key={cat.name} className="cs-sidebar__group">
          <span className="cs-sidebar__group-label">{cat.name}</span>
          {cat.stories.map((story) => (
            <button
              key={story.name}
              type="button"
              className={[
                'cs-sidebar__item',
                story.name === activeStory && 'cs-sidebar__item--active',
              ].filter(Boolean).join(' ')}
              onClick={() => onSelect(story.name)}
            >
              {story.name}
            </button>
          ))}
        </div>
      ))}
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/stories/Sidebar.tsx src/pages/stories/Sidebar.css
git commit -m "feat(showcase): add Sidebar component"
```

---

### Task 3: Controls component

**Files:**
- Create: `src/pages/stories/Controls.tsx`
- Create: `src/pages/stories/Controls.css`

- [ ] **Step 1: Create `src/pages/stories/Controls.css`**

```css
.cs-controls {
  width: 280px;
  min-width: 280px;
  height: 100vh;
  overflow-y: auto;
  padding: var(--space-400) var(--space-400);
  background: var(--color-background-sunken);
  border-left: 1px solid var(--color-border-subtle);
  box-sizing: border-box;
}

.cs-controls__title {
  margin: 0 0 var(--space-400);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-content-subtlest);
}

.cs-controls__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  margin-bottom: var(--space-300);
}

.cs-controls__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-content-subtle);
}

.cs-controls__select,
.cs-controls__input {
  width: 100%;
  padding: var(--space-150) var(--space-200);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-150);
  background: var(--color-background-default);
  font-size: 13px;
  font-family: var(--font-family);
  color: var(--color-content-default);
  box-sizing: border-box;
  outline: none;
}

.cs-controls__select:focus,
.cs-controls__input:focus {
  border-color: var(--color-border-brand);
}

.cs-controls__checkbox-row {
  display: flex;
  align-items: center;
  gap: var(--space-200);
  margin-bottom: var(--space-300);
}

.cs-controls__checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--color-content-brand-default);
}

.cs-controls__checkbox-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-content-subtle);
}

.cs-controls__reset {
  display: block;
  width: 100%;
  padding: var(--space-150);
  margin-top: var(--space-400);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-150);
  background: transparent;
  font-size: 12px;
  font-family: var(--font-family);
  color: var(--color-content-subtle);
  cursor: pointer;
  transition: background-color 0.15s;
}

.cs-controls__reset:hover {
  background: var(--color-background-neutral-subtle);
}
```

- [ ] **Step 2: Create `src/pages/stories/Controls.tsx`**

```tsx
import type { PropDef } from './types'
import './Controls.css'

interface ControlsProps {
  propDefs: Record<string, PropDef>
  values: Record<string, any>
  onChange: (key: string, value: any) => void
  onReset: () => void
}

export default function Controls({ propDefs, values, onChange, onReset }: ControlsProps) {
  const entries = Object.entries(propDefs)

  return (
    <aside className="cs-controls">
      <h2 className="cs-controls__title">Controls</h2>

      {entries.map(([key, def]) => {
        switch (def.type) {
          case 'enum':
            return (
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <select
                  className="cs-controls__select"
                  value={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.value)}
                >
                  {def.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )

          case 'boolean':
            return (
              <div key={key} className="cs-controls__checkbox-row">
                <input
                  type="checkbox"
                  className="cs-controls__checkbox"
                  id={`ctrl-${key}`}
                  checked={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.checked)}
                />
                <label className="cs-controls__checkbox-label" htmlFor={`ctrl-${key}`}>{key}</label>
              </div>
            )

          case 'string':
            return (
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <input
                  type="text"
                  className="cs-controls__input"
                  value={values[key] ?? def.default}
                  onChange={(e) => onChange(key, e.target.value)}
                />
              </div>
            )

          case 'number':
            return (
              <div key={key} className="cs-controls__field">
                <label className="cs-controls__label">{key}</label>
                <input
                  type="number"
                  className="cs-controls__input"
                  value={values[key] ?? def.default}
                  min={def.min}
                  max={def.max}
                  step={def.step}
                  onChange={(e) => onChange(key, Number(e.target.value))}
                />
              </div>
            )

          default:
            return null
        }
      })}

      <button type="button" className="cs-controls__reset" onClick={onReset}>
        Reset to defaults
      </button>
    </aside>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/stories/Controls.tsx src/pages/stories/Controls.css
git commit -m "feat(showcase): add Controls component"
```

---

### Task 4: Preview component

**Files:**
- Create: `src/pages/stories/Preview.tsx`
- Create: `src/pages/stories/Preview.css`

- [ ] **Step 1: Create `src/pages/stories/Preview.css`**

```css
.cs-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.cs-preview__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-300) var(--space-400);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-background-default);
}

.cs-preview__name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-content-bold);
}

.cs-preview__theme-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-200);
  padding: var(--space-100) var(--space-200);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-150);
  background: transparent;
  font-size: 12px;
  font-family: var(--font-family);
  color: var(--color-content-subtle);
  cursor: pointer;
  transition: background-color 0.15s;
}

.cs-preview__theme-toggle:hover {
  background: var(--color-background-neutral-subtle);
}

.cs-preview__canvas {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-800);
  overflow: auto;
  background: var(--color-background-default);
  transition: background-color 0.2s;
}

.cs-preview__canvas[data-theme="dark"] {
  background: var(--color-background-default);
}
```

- [ ] **Step 2: Create `src/pages/stories/Preview.tsx`**

```tsx
import { useState } from 'react'
import type { StoryDef } from './types'
import './Preview.css'

interface PreviewProps {
  story: StoryDef
  values: Record<string, any>
}

export default function Preview({ story, values }: PreviewProps) {
  const [dark, setDark] = useState(false)

  const mergedProps = { ...story.fixedProps, ...values }
  const Component = story.component

  return (
    <main className="cs-preview">
      <div className="cs-preview__toolbar">
        <h2 className="cs-preview__name">{story.name}</h2>
        <button
          type="button"
          className="cs-preview__theme-toggle"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? '☀ Light' : '● Dark'}
        </button>
      </div>

      <div
        className="cs-preview__canvas"
        data-theme={dark ? 'dark' : undefined}
      >
        {story.Render
          ? <story.Render values={mergedProps} />
          : <Component {...mergedProps} />
        }
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/stories/Preview.tsx src/pages/stories/Preview.css
git commit -m "feat(showcase): add Preview component with dark mode toggle"
```

---

### Task 5: Story definitions — Chrome (NavigationBar, TabBar, Divider)

**Files:**
- Create: `src/pages/stories/NavigationBar.story.tsx`
- Create: `src/pages/stories/TabBar.story.tsx`
- Create: `src/pages/stories/Divider.story.ts`

- [ ] **Step 1: Create NavigationBar story**

```tsx
import NavigationBar from '@/components/ui/NavigationBar'
import IconButton from '@/components/ui/IconButton'
import Avatar from '@/components/ui/Avatar'
import { ArrowLeftIcon, MoreIcon } from './icons'
import type { StoryDef } from './types'

export const NavigationBarStory: StoryDef = {
  component: NavigationBar,
  name: 'NavigationBar',
  category: 'Chrome',
  props: {
    title:     { type: 'string', default: '頁面標題' },
    titleSize: { type: 'enum', options: ['regular', 'large'], default: 'regular' },
    type:      { type: 'enum', options: ['default', 'home'], default: 'default' },
    divider:   { type: 'boolean', default: true },
  },
  fixedProps: {
    leading: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>,
    trailing: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多"><MoreIcon /></IconButton>,
  },
}
```

- [ ] **Step 2: Create TabBar story**

```tsx
import TabBar from '@/components/ui/TabBar'
import { HomeIcon, ReceiptIcon, UserIcon } from './icons'
import type { StoryDef } from './types'
import { useState } from 'react'

const TabBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [active, setActive] = useState('home')
  return (
    <TabBar
      activeKey={active}
      onChange={setActive}
      items={[
        { key: 'home', label: '首頁', icon: <HomeIcon /> },
        { key: 'invoice', label: '發票', icon: <ReceiptIcon />, badge: 3 },
        { key: 'me', label: '我的', icon: <UserIcon /> },
      ]}
    />
  )
}

export const TabBarStory: StoryDef = {
  component: TabBar,
  name: 'TabBar',
  category: 'Chrome',
  props: {},
  Render: TabBarRender,
}
```

- [ ] **Step 3: Create Divider story**

```ts
import Divider from '@/components/ui/Divider'
import type { StoryDef } from './types'

export const DividerStory: StoryDef = {
  component: Divider,
  name: 'Divider',
  category: 'Chrome',
  props: {
    orientation: { type: 'enum', options: ['horizontal', 'vertical'], default: 'horizontal' },
  },
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/stories/NavigationBar.story.tsx src/pages/stories/TabBar.story.tsx src/pages/stories/Divider.story.ts
git commit -m "feat(showcase): add Chrome category stories"
```

---

### Task 6: Story definitions — Forms (Button, IconButton, TextField, TextArea, Select, Checkbox, Radio, Switch, Slider, SearchField)

**Files:**
- Create: 10 story files in `src/pages/stories/`

- [ ] **Step 1: Create Button + IconButton stories**

`Button.story.ts`:
```ts
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const ButtonStory: StoryDef = {
  component: Button,
  name: 'Button',
  category: 'Forms',
  props: {
    children:  { type: 'string', default: 'Label' },
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost', 'text'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'white', 'inverse', 'secondary'], default: 'primary' },
    size:      { type: 'enum', options: ['large', 'medium', 'small'], default: 'medium' },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
}
```

`IconButton.story.tsx`:
```tsx
import IconButton from '@/components/ui/IconButton'
import { PlusIcon } from './icons'
import type { StoryDef } from './types'

export const IconButtonStory: StoryDef = {
  component: IconButton,
  name: 'IconButton',
  category: 'Forms',
  props: {
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation'], default: 'primary' },
    size:      { type: 'enum', options: ['large', 'medium', 'small', 'xsmall'], default: 'medium' },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
  fixedProps: {
    'aria-label': 'action',
    children: <PlusIcon />,
  },
}
```

- [ ] **Step 2: Create TextField + TextArea + Select stories**

`TextField.story.tsx`:
```tsx
import TextField from '@/components/ui/TextField'
import { InfoIcon } from './icons'
import type { StoryDef } from './types'

export const TextFieldStory: StoryDef = {
  component: TextField,
  name: 'TextField',
  category: 'Forms',
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: 'Email' },
    placeholder: { type: 'string', default: 'name@example.com' },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    helpText:    { type: 'string', default: '' },
  },
  fixedProps: {
    helpIcon: <InfoIcon />,
  },
}
```

`TextArea.story.ts`:
```ts
import TextArea from '@/components/ui/TextArea'
import type { StoryDef } from './types'

export const TextAreaStory: StoryDef = {
  component: TextArea,
  name: 'TextArea',
  category: 'Forms',
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: '備註' },
    placeholder: { type: 'string', default: '請輸入內容' },
    status:      { type: 'enum', options: ['default', 'error'], default: 'default' },
    disabled:    { type: 'boolean', default: false },
  },
}
```

`Select.story.ts`:
```ts
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

export const SelectStory: StoryDef = {
  component: Select,
  name: 'Select',
  category: 'Forms',
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: '部門' },
    placeholder: { type: 'string', default: '請選擇' },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
  fixedProps: {
    options: [
      { label: 'Design', value: 'design' },
      { label: 'Engineering', value: 'engineering' },
      { label: 'Product', value: 'product' },
    ],
  },
}
```

- [ ] **Step 3: Create Checkbox + Radio + Switch + Slider + SearchField stories**

`Checkbox.story.ts`:
```ts
import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'

export const CheckboxStory: StoryDef = {
  component: Checkbox,
  name: 'Checkbox',
  category: 'Forms',
  props: {
    children: { type: 'string', default: '同意條款' },
    checked:  { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    status:   { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
}
```

`Radio.story.ts`:
```ts
import Radio from '@/components/ui/Radio'
import type { StoryDef } from './types'

export const RadioStory: StoryDef = {
  component: Radio,
  name: 'Radio',
  category: 'Forms',
  props: {
    children: { type: 'string', default: '選項 A' },
    checked:  { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    status:   { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
}
```

`Switch.story.ts`:
```ts
import Switch from '@/components/ui/Switch'
import type { StoryDef } from './types'

export const SwitchStory: StoryDef = {
  component: Switch,
  name: 'Switch',
  category: 'Forms',
  props: {
    checked:  { type: 'boolean', default: true },
    disabled: { type: 'boolean', default: false },
  },
}
```

`Slider.story.ts`:
```ts
import Slider from '@/components/ui/Slider'
import type { StoryDef } from './types'

export const SliderStory: StoryDef = {
  component: Slider,
  name: 'Slider',
  category: 'Forms',
  props: {
    value:    { type: 'number', default: 40, min: 0, max: 100, step: 1 },
    disabled: { type: 'boolean', default: false },
  },
}
```

`SearchField.story.ts`:
```ts
import SearchField from '@/components/ui/SearchField'
import type { StoryDef } from './types'

export const SearchFieldStory: StoryDef = {
  component: SearchField,
  name: 'SearchField',
  category: 'Forms',
  props: {
    placeholder: { type: 'string', default: '搜尋發票' },
    showCancel:  { type: 'boolean', default: false },
    cancelLabel: { type: 'string', default: '取消' },
  },
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/stories/Button.story.ts src/pages/stories/IconButton.story.tsx src/pages/stories/TextField.story.tsx src/pages/stories/TextArea.story.ts src/pages/stories/Select.story.ts src/pages/stories/Checkbox.story.ts src/pages/stories/Radio.story.ts src/pages/stories/Switch.story.ts src/pages/stories/Slider.story.ts src/pages/stories/SearchField.story.ts
git commit -m "feat(showcase): add Forms category stories"
```

---

### Task 7: Story definitions — Pickers (DatePicker, MonthPicker)

**Files:**
- Create: `src/pages/stories/DatePicker.story.ts`
- Create: `src/pages/stories/MonthPicker.story.ts`

- [ ] **Step 1: Create stories**

`DatePicker.story.ts`:
```ts
import DatePicker from '@/components/ui/DatePicker'
import type { StoryDef } from './types'

export const DatePickerStory: StoryDef = {
  component: DatePicker,
  name: 'DatePicker',
  category: 'Pickers',
  props: {
    value:  { type: 'string', default: '2026-04-18' },
    status: { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
}
```

`MonthPicker.story.ts`:
```ts
import MonthPicker from '@/components/ui/MonthPicker'
import type { StoryDef } from './types'

export const MonthPickerStory: StoryDef = {
  component: MonthPicker,
  name: 'MonthPicker',
  category: 'Pickers',
  props: {
    value:  { type: 'string', default: '2026-04' },
    status: { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/stories/DatePicker.story.ts src/pages/stories/MonthPicker.story.ts
git commit -m "feat(showcase): add Pickers category stories"
```

---

### Task 8: Story definitions — Display (Tag, TagBar, Badge, Avatar, ListItem, ListHeader, ListFooter, CardItem, CardBanner)

**Files:**
- Create: 9 story files in `src/pages/stories/`

- [ ] **Step 1: Create Tag + TagBar + Badge + Avatar stories**

`Tag.story.ts`:
```ts
import Tag from '@/components/ui/Tag'
import type { StoryDef } from './types'

export const TagStory: StoryDef = {
  component: Tag,
  name: 'Tag',
  category: 'Display',
  props: {
    children:  { type: 'string', default: 'Tag' },
    variant:   { type: 'enum', options: ['light', 'bold'], default: 'light' },
    colorType: { type: 'enum', options: ['neutral', 'primary', 'success', 'danger', 'warning', 'prize'], default: 'neutral' },
    size:      { type: 'enum', options: ['medium', 'small'], default: 'medium' },
  },
}
```

`TagBar.story.tsx`:
```tsx
import TagBar from '@/components/ui/TagBar'
import type { StoryDef } from './types'
import { useState } from 'react'

const TagBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [active, setActive] = useState('all')
  return (
    <TagBar
      activeKey={active}
      onChange={setActive}
      scrollable={values.scrollable}
      items={[
        { key: 'all', label: '全部' },
        { key: 'unused', label: '未對獎' },
        { key: 'won', label: '中獎' },
        { key: 'cashed', label: '已兌領' },
      ]}
    />
  )
}

export const TagBarStory: StoryDef = {
  component: TagBar,
  name: 'TagBar',
  category: 'Display',
  props: {
    scrollable: { type: 'boolean', default: true },
  },
  Render: TagBarRender,
}
```

`Badge.story.ts`:
```ts
import Badge from '@/components/ui/Badge'
import type { StoryDef } from './types'

export const BadgeStory: StoryDef = {
  component: Badge,
  name: 'Badge',
  category: 'Display',
  props: {
    variant: { type: 'enum', options: ['dot', 'number'], default: 'dot' },
    size:    { type: 'enum', options: ['small', 'medium', 'large'], default: 'medium' },
    count:   { type: 'number', default: 3, min: 0, max: 999 },
  },
}
```

`Avatar.story.ts`:
```ts
import Avatar from '@/components/ui/Avatar'
import type { StoryDef } from './types'

export const AvatarStory: StoryDef = {
  component: Avatar,
  name: 'Avatar',
  category: 'Display',
  props: {
    name:  { type: 'string', default: 'Will Huang' },
    size:  { type: 'enum', options: ['xsmall', 'small', 'medium', 'large', 'xlarge'], default: 'medium' },
    shape: { type: 'enum', options: ['circle', 'square'], default: 'circle' },
  },
}
```

- [ ] **Step 2: Create ListItem + ListHeader + ListFooter stories**

`ListItem.story.tsx`:
```tsx
import ListItem from '@/components/ui/ListItem'
import type { StoryDef } from './types'
import { useState } from 'react'

const ListItemRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  return (
    <div style={{ width: 393, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
      <ListItem
        {...values}
        trailingChecked={checked}
        onTrailingChange={setChecked}
        onClick={values.trailing === 'drill-in' ? () => {} : undefined}
        showDivider={false}
      />
    </div>
  )
}

export const ListItemStory: StoryDef = {
  component: ListItem,
  name: 'ListItem',
  category: 'Display',
  props: {
    headline:    { type: 'string', default: 'Headline' },
    description: { type: 'string', default: '描述文字' },
    type:        { type: 'enum', options: ['default', 'has-description', 'compact'], default: 'default' },
    trailing:    { type: 'enum', options: ['none', 'drill-in', 'text', 'text-button', 'switch', 'checkbox', 'spinner'], default: 'drill-in' },
    trailingText:{ type: 'string', default: '詳情' },
    disabled:    { type: 'boolean', default: false },
  },
  Render: ListItemRender,
}
```

`ListHeader.story.ts`:
```ts
import ListHeader from '@/components/ui/ListHeader'
import type { StoryDef } from './types'

export const ListHeaderStory: StoryDef = {
  component: ListHeader,
  name: 'ListHeader',
  category: 'Display',
  props: {
    title: { type: 'string', default: '區段標題' },
    size:  { type: 'enum', options: ['small', 'medium', 'large'], default: 'small' },
  },
}
```

`ListFooter.story.ts`:
```ts
import ListFooter from '@/components/ui/ListFooter'
import type { StoryDef } from './types'

export const ListFooterStory: StoryDef = {
  component: ListFooter,
  name: 'ListFooter',
  category: 'Display',
  props: {
    text: { type: 'string', default: '綁定帳戶用於自動匯款中獎獎金，請確認帳號正確。' },
  },
}
```

- [ ] **Step 3: Create CardItem + CardBanner stories**

`CardItem.story.tsx`:
```tsx
import CardItem from '@/components/ui/CardItem'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const CardItemStory: StoryDef = {
  component: CardItem,
  name: 'CardItem',
  category: 'Display',
  props: {
    title:   { type: 'string', default: '兌獎期限提醒' },
    divider: { type: 'boolean', default: true },
  },
  fixedProps: {
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=160&fit=crop',
    descriptions: [
      { text: '您有 1 張發票即將過期' },
      { text: '截止日 2026/05/15' },
    ],
    action: <Button size="small">查看</Button>,
  },
}
```

`CardBanner.story.tsx`:
```tsx
import CardBanner from '@/components/ui/CardBanner'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const CardBannerStory: StoryDef = {
  component: CardBanner,
  name: 'CardBanner',
  category: 'Display',
  props: {
    title:       { type: 'string', default: '限時好禮' },
    aspectRatio: { type: 'string', default: '3 / 1' },
  },
  fixedProps: {
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&h=240&fit=crop',
    descriptions: [
      { text: '登錄發票即抽好禮' },
      { text: '活動至 2026/06/30' },
    ],
    action: <Button size="small">參加</Button>,
  },
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/stories/Tag.story.ts src/pages/stories/TagBar.story.tsx src/pages/stories/Badge.story.ts src/pages/stories/Avatar.story.ts src/pages/stories/ListItem.story.tsx src/pages/stories/ListHeader.story.ts src/pages/stories/ListFooter.story.ts src/pages/stories/CardItem.story.tsx src/pages/stories/CardBanner.story.tsx
git commit -m "feat(showcase): add Display category stories"
```

---

### Task 9: Story definitions — Feedback (Alert, Spinner, ProgressBar, CircularProgress, ProgressGroup, Toast, SnackBar, Tooltip)

**Files:**
- Create: 8 story files in `src/pages/stories/`

- [ ] **Step 1: Create Alert + Spinner + Progress stories**

`Alert.story.ts`:
```ts
import Alert from '@/components/ui/Alert'
import type { StoryDef } from './types'

export const AlertStory: StoryDef = {
  component: Alert,
  name: 'Alert',
  category: 'Feedback',
  props: {
    children:  { type: 'string', default: 'This is an alert message' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger', 'prize'], default: 'neutral' },
    variant:   { type: 'enum', options: ['default', 'full-width'], default: 'default' },
  },
}
```

`Spinner.story.ts`:
```ts
import Spinner from '@/components/ui/Spinner'
import type { StoryDef } from './types'

export const SpinnerStory: StoryDef = {
  component: Spinner,
  name: 'Spinner',
  category: 'Feedback',
  props: {
    size:  { type: 'enum', options: ['xsmall', 'small', 'medium', 'large'], default: 'medium' },
    color: { type: 'enum', options: ['primary', 'neutral', 'inverse'], default: 'primary' },
  },
}
```

`ProgressBar.story.ts`:
```ts
import ProgressBar from '@/components/ui/ProgressBar'
import type { StoryDef } from './types'

export const ProgressBarStory: StoryDef = {
  component: ProgressBar,
  name: 'ProgressBar',
  category: 'Feedback',
  props: {
    value:         { type: 'number', default: 50, min: 0, max: 100 },
    label:         { type: 'string', default: '50%' },
    indeterminate: { type: 'boolean', default: false },
    colorType:     { type: 'enum', options: ['primary', 'success', 'warning', 'danger', 'prize'], default: 'primary' },
    size:          { type: 'enum', options: ['small', 'medium'], default: 'medium' },
  },
}
```

`CircularProgress.story.ts`:
```ts
import CircularProgress from '@/components/ui/CircularProgress'
import type { StoryDef } from './types'

export const CircularProgressStory: StoryDef = {
  component: CircularProgress,
  name: 'CircularProgress',
  category: 'Feedback',
  props: {
    value:         { type: 'number', default: 50, min: 0, max: 100 },
    indeterminate: { type: 'boolean', default: false },
    size:          { type: 'enum', options: ['small', 'medium', 'large'], default: 'medium' },
    colorType:     { type: 'enum', options: ['primary', 'success', 'warning', 'danger', 'prize'], default: 'primary' },
    showLabel:     { type: 'boolean', default: false },
  },
}
```

`ProgressGroup.story.ts`:
```ts
import ProgressGroup from '@/components/ui/ProgressGroup'
import type { StoryDef } from './types'

export const ProgressGroupStory: StoryDef = {
  component: ProgressGroup,
  name: 'ProgressGroup',
  category: 'Feedback',
  props: {
    value:        { type: 'number', default: 50, min: 0, max: 100 },
    textPosition: { type: 'enum', options: ['top', 'aside'], default: 'top' },
    leadingText:  { type: 'string', default: '50%' },
    trailingText: { type: 'string', default: '100/200' },
  },
}
```

- [ ] **Step 2: Create Toast + SnackBar + Tooltip stories**

`Toast.story.tsx`:
```tsx
import type { StoryDef } from './types'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui'

const ToastRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show, dismiss } = useToast()
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="small" variant="outline" onClick={() => show({ message: values.message })}>
        Show Toast
      </Button>
      <Button size="small" variant="outline" onClick={() => show({ message: values.message, action: { label: '確定', onClick: () => {} } })}>
        With Action
      </Button>
      <Button size="small" variant="outline" onClick={() => {
        const id = show({ type: 'loading' })
        setTimeout(() => dismiss(id), 2500)
      }}>
        Loading
      </Button>
    </div>
  )
}

export const ToastStory: StoryDef = {
  component: Button, // placeholder — Render handles everything
  name: 'Toast',
  category: 'Feedback',
  props: {
    message: { type: 'string', default: '已儲存' },
  },
  Render: ToastRender,
}
```

`SnackBar.story.tsx`:
```tsx
import SnackBar from '@/components/ui/SnackBar'
import { CheckCircleIcon } from './icons'
import type { StoryDef } from './types'

export const SnackBarStory: StoryDef = {
  component: SnackBar,
  name: 'SnackBar',
  category: 'Feedback',
  props: {
    text:       { type: 'string', default: '已成功儲存' },
    trailing:   { type: 'enum', options: ['none', 'button', 'spinner'], default: 'none' },
    buttonText: { type: 'string', default: 'Button' },
  },
  fixedProps: {
    icon: <CheckCircleIcon />,
  },
}
```

`Tooltip.story.tsx`:
```tsx
import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

const TooltipRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  return (
    <Tooltip
      content={values.content}
      placement={values.placement}
      align={values.align}
    >
      <Button size="small" variant="outline">Hover me</Button>
    </Tooltip>
  )
}

export const TooltipStory: StoryDef = {
  component: Tooltip,
  name: 'Tooltip',
  category: 'Feedback',
  props: {
    content:   { type: 'string', default: 'Tooltip text' },
    placement: { type: 'enum', options: ['top', 'bottom', 'left', 'right'], default: 'top' },
    align:     { type: 'enum', options: ['start', 'center', 'end'], default: 'center' },
  },
  Render: TooltipRender,
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/stories/Alert.story.ts src/pages/stories/Spinner.story.ts src/pages/stories/ProgressBar.story.ts src/pages/stories/CircularProgress.story.ts src/pages/stories/ProgressGroup.story.ts src/pages/stories/Toast.story.tsx src/pages/stories/SnackBar.story.tsx src/pages/stories/Tooltip.story.tsx
git commit -m "feat(showcase): add Feedback category stories"
```

---

### Task 10: Story definitions — Overlay (Dialog, BottomSheet, SheetHeader)

**Files:**
- Create: `src/pages/stories/Dialog.story.tsx`
- Create: `src/pages/stories/BottomSheet.story.tsx`
- Create: `src/pages/stories/SheetHeader.story.tsx`

- [ ] **Step 1: Create Dialog story**

```tsx
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'
import { useState } from 'react'

const DialogRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        type={values.type}
        cta={values.cta}
        title={values.title}
        description={values.description}
        actions={[
          { label: '取消', onClick: () => setOpen(false), colorType: 'neutral' },
          { label: '確認', onClick: () => setOpen(false), colorType: values.type === 'danger' ? 'danger' : 'primary' },
        ]}
      />
    </>
  )
}

export const DialogStory: StoryDef = {
  component: Dialog,
  name: 'Dialog',
  category: 'Overlay',
  props: {
    title:       { type: 'string', default: '確認動作' },
    description: { type: 'string', default: '確定要執行此動作嗎？此動作無法復原。' },
    type:        { type: 'enum', options: ['default', 'danger'], default: 'default' },
    cta:         { type: 'enum', options: ['2-buttons', '2-buttons-straight', '1-button'], default: '2-buttons' },
  },
  Render: DialogRender,
}
```

- [ ] **Step 2: Create BottomSheet story**

```tsx
import BottomSheet from '@/components/ui/BottomSheet'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'
import { useState } from 'react'

const BottomSheetRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)}>Open BottomSheet</Button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={values.title}
        titleSize={values.titleSize}
        showHandle={values.showHandle}
        footer={<Button onClick={() => setOpen(false)}>確定</Button>}
      >
        <p style={{ padding: '16px 0' }}>BottomSheet 從底部滑出。</p>
      </BottomSheet>
    </>
  )
}

export const BottomSheetStory: StoryDef = {
  component: BottomSheet,
  name: 'BottomSheet',
  category: 'Overlay',
  props: {
    title:      { type: 'string', default: '選項' },
    titleSize:  { type: 'enum', options: ['large', 'regular'], default: 'regular' },
    showHandle: { type: 'boolean', default: true },
  },
  Render: BottomSheetRender,
}
```

- [ ] **Step 3: Create SheetHeader story**

```tsx
import SheetHeader from '@/components/ui/SheetHeader'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const SheetHeaderStory: StoryDef = {
  component: SheetHeader,
  name: 'SheetHeader',
  category: 'Overlay',
  props: {
    title:      { type: 'string', default: '頁面標題' },
    showHandle: { type: 'boolean', default: true },
    divider:    { type: 'boolean', default: true },
  },
  fixedProps: {
    trailing: <Button variant="text" size="small">完成</Button>,
  },
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/stories/Dialog.story.tsx src/pages/stories/BottomSheet.story.tsx src/pages/stories/SheetHeader.story.tsx
git commit -m "feat(showcase): add Overlay category stories"
```

---

### Task 11: Registry — import and group all stories

**Files:**
- Create: `src/pages/stories/registry.ts`

- [ ] **Step 1: Create registry**

```ts
import type { StoryCategory, StoryDef } from './types'

// Chrome
import { NavigationBarStory } from './NavigationBar.story'
import { TabBarStory } from './TabBar.story'
import { DividerStory } from './Divider.story'

// Forms
import { ButtonStory } from './Button.story'
import { IconButtonStory } from './IconButton.story'
import { TextFieldStory } from './TextField.story'
import { TextAreaStory } from './TextArea.story'
import { SelectStory } from './Select.story'
import { CheckboxStory } from './Checkbox.story'
import { RadioStory } from './Radio.story'
import { SwitchStory } from './Switch.story'
import { SliderStory } from './Slider.story'
import { SearchFieldStory } from './SearchField.story'

// Pickers
import { DatePickerStory } from './DatePicker.story'
import { MonthPickerStory } from './MonthPicker.story'

// Display
import { TagStory } from './Tag.story'
import { TagBarStory } from './TagBar.story'
import { BadgeStory } from './Badge.story'
import { AvatarStory } from './Avatar.story'
import { ListItemStory } from './ListItem.story'
import { ListHeaderStory } from './ListHeader.story'
import { ListFooterStory } from './ListFooter.story'
import { CardItemStory } from './CardItem.story'
import { CardBannerStory } from './CardBanner.story'

// Feedback
import { AlertStory } from './Alert.story'
import { SpinnerStory } from './Spinner.story'
import { ProgressBarStory } from './ProgressBar.story'
import { CircularProgressStory } from './CircularProgress.story'
import { ProgressGroupStory } from './ProgressGroup.story'
import { ToastStory } from './Toast.story'
import { SnackBarStory } from './SnackBar.story'
import { TooltipStory } from './Tooltip.story'

// Overlay
import { DialogStory } from './Dialog.story'
import { BottomSheetStory } from './BottomSheet.story'
import { SheetHeaderStory } from './SheetHeader.story'

export const categories: StoryCategory[] = [
  {
    name: 'Chrome',
    stories: [NavigationBarStory, TabBarStory, DividerStory],
  },
  {
    name: 'Forms',
    stories: [ButtonStory, IconButtonStory, TextFieldStory, TextAreaStory, SelectStory, CheckboxStory, RadioStory, SwitchStory, SliderStory, SearchFieldStory],
  },
  {
    name: 'Pickers',
    stories: [DatePickerStory, MonthPickerStory],
  },
  {
    name: 'Display',
    stories: [TagStory, TagBarStory, BadgeStory, AvatarStory, ListItemStory, ListHeaderStory, ListFooterStory, CardItemStory, CardBannerStory],
  },
  {
    name: 'Feedback',
    stories: [AlertStory, SpinnerStory, ProgressBarStory, CircularProgressStory, ProgressGroupStory, ToastStory, SnackBarStory, TooltipStory],
  },
  {
    name: 'Overlay',
    stories: [DialogStory, BottomSheetStory, SheetHeaderStory],
  },
]

/** Flat lookup: story name → StoryDef */
export const storyMap: Record<string, StoryDef> = Object.fromEntries(
  categories.flatMap((cat) => cat.stories.map((s) => [s.name, s]))
)

/** First story name (default route) */
export const defaultStoryName: string = categories[0].stories[0].name
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/stories/registry.ts
git commit -m "feat(showcase): add story registry"
```

---

### Task 12: Rewrite Components.tsx + Components.css

**Files:**
- Rewrite: `src/pages/Components.tsx`
- Rewrite: `src/pages/Components.css`

- [ ] **Step 1: Rewrite `src/pages/Components.css`**

Replace entire file content:

```css
.cs-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
```

- [ ] **Step 2: Rewrite `src/pages/Components.tsx`**

Replace entire file content:

```tsx
import { useState, useCallback, useMemo } from 'react'
import { categories, storyMap, defaultStoryName } from './stories/registry'
import Sidebar from './stories/Sidebar'
import Preview from './stories/Preview'
import Controls from './stories/Controls'
import type { PropDef } from './stories/types'
import './Components.css'

function getStoryNameFromHash(): string {
  // #/components/Button → Button
  const hash = window.location.hash.replace(/^#/, '')
  const match = hash.match(/^\/components\/(.+)$/)
  return match ? match[1] : ''
}

function getDefaults(propDefs: Record<string, PropDef>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(propDefs).map(([key, def]) => [key, def.default])
  )
}

export default function Components() {
  const initialName = getStoryNameFromHash() || defaultStoryName
  const [activeStory, setActiveStory] = useState(initialName)

  const story = storyMap[activeStory] ?? storyMap[defaultStoryName]

  const [values, setValues] = useState<Record<string, any>>(() => getDefaults(story.props))

  const handleSelect = useCallback((name: string) => {
    setActiveStory(name)
    window.location.hash = `#/components/${name}`
    const next = storyMap[name]
    if (next) setValues(getDefaults(next.props))
  }, [])

  const handleChange = useCallback((key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setValues(getDefaults(story.props))
  }, [story])

  return (
    <div className="cs-layout">
      <Sidebar
        categories={categories}
        activeStory={activeStory}
        onSelect={handleSelect}
      />
      <Preview story={story} values={values} />
      <Controls
        propDefs={story.props}
        values={values}
        onChange={handleChange}
        onReset={handleReset}
      />
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Components.tsx src/pages/Components.css
git commit -m "feat(showcase): rewrite Components page with 3-column layout"
```

---

### Task 13: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify in browser**

Open the app and check:
1. Sidebar renders all 6 categories with 30 components
2. Clicking a component in sidebar updates Preview and Controls
3. Controls auto-generate correct input types (select, checkbox, text, number)
4. Changing Controls updates the Preview in real time
5. Dark mode toggle in Preview switches `data-theme="dark"` and components render correctly
6. Hash routing works: navigate to `#/components/Button` directly, verify it loads Button
7. Special components work: Dialog opens via trigger button, Toast shows notification, Tooltip appears on hover
8. Reset button in Controls resets all values to defaults

- [ ] **Step 3: Fix any issues found**

Address any visual or functional issues discovered during verification.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix(showcase): address issues from visual verification"
```
