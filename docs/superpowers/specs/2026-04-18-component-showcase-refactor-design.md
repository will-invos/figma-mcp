# Component Showcase 重構設計規格

## 概述

將現有的 Components 展示頁從「長捲動式列表」重構為 **Storybook 風格的三欄互動式展示系統**，提升元件的閱讀性與操作性。

### 現狀問題

- 30 個元件擠在一個 905 行的長頁面，滾動瀏覽效率差
- Demo 只有固定展示，無法即時調整 props
- 沒有分類層級，TOC 是扁平的錨點列表

### 目標

- 左側樹狀分類選單，點選切換元件
- 中央 Preview 即時預覽
- 右側 Controls Panel，每個 prop 可互動調整
- 用 hash route 定位元件，支援直接分享連結

## 佈局

```
┌────────────┬──────────────────────────┬──────────────┐
│  Sidebar   │  Component Preview       │  Controls    │
│  (樹狀選單) │  (即時預覽區)              │  Panel       │
│            │                          │  (prop 控制)  │
└────────────┴──────────────────────────┴──────────────┘
```

- **Sidebar**：固定寬度（~220px），分類展開/收合
- **Preview**：填滿剩餘空間，垂直水平置中展示元件
- **Controls**：固定寬度（~280px），可捲動

## 架構

### 檔案結構

```
src/pages/
├── Components.tsx          ← 重構：三欄佈局 + routing
├── Components.css          ← 重構：三欄 layout 樣式
└── stories/
    ├── types.ts            ← StoryDef 型別定義
    ├── registry.ts         ← 所有 story 的 registry + 分類
    ├── Controls.tsx        ← 通用 Controls 元件
    ├── Controls.css
    ├── Preview.tsx         ← Preview 容器
    ├── Preview.css
    ├── Sidebar.tsx         ← 樹狀選單
    ├── Sidebar.css
    ├── Button.story.ts     ← 各元件的 story 定義
    ├── IconButton.story.ts
    ├── TextField.story.ts
    └── ...                 ← 每個 UI 元件一個 story 檔
```

### 核心型別

```tsx
// types.ts

type PropDef =
  | { type: 'enum'; options: string[]; default: string }
  | { type: 'boolean'; default: boolean }
  | { type: 'string'; default: string }
  | { type: 'number'; default: number; min?: number; max?: number; step?: number }

interface StoryDef {
  component: React.ComponentType<any>
  name: string            // 顯示名稱，例如 'Button'
  category: string        // 分類，例如 'Forms'
  props: Record<string, PropDef>
  // 固定 props，不顯示在 Controls 中但會傳入元件
  // 用途：icon placeholder、children 為 ReactNode 時的固定內容
  fixedProps?: Record<string, any>
  // 自訂渲染函式，用於需要額外 state 或 wrapper 的元件（如 Dialog, Toast）
  // 省略時使用預設渲染：<Component {...fixedProps} {...currentProps} />
  render?: (Component: React.ComponentType<any>, props: Record<string, any>) => React.ReactNode
}
```

### 元件分類

| 分類 | 元件 |
|---|---|
| Chrome | NavigationBar, TabBar, Divider |
| Forms | Button, IconButton, TextField, TextArea, Select, Checkbox, Radio, Switch, Slider, SearchField |
| Pickers | DatePicker, MonthPicker |
| Display | Tag, TagBar, Badge, Avatar, ListItem, ListHeader, ListFooter, CardItem, CardBanner |
| Feedback | Alert, Spinner, ProgressBar, CircularProgress, ProgressGroup, Toast, SnackBar, Tooltip |
| Overlay | Dialog, BottomSheet, SheetHeader |

### Story 定義範例

```tsx
// stories/Button.story.ts
import Button from '@/components/ui/Button'

export const ButtonStory: StoryDef = {
  component: Button,
  name: 'Button',
  category: 'Forms',
  props: {
    children:  { type: 'string', default: 'Label' },
    variant:   { type: 'enum', options: ['filled', 'outline', 'ghost', 'text'], default: 'filled' },
    colorType: { type: 'enum', options: ['primary', 'neutral', 'danger', 'prize', 'donation', 'white'], default: 'primary' },
    size:      { type: 'enum', options: ['large', 'medium', 'small'], default: 'medium' },
    disabled:  { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
  },
}
```

```tsx
// stories/Checkbox.story.ts
import Checkbox from '@/components/ui/Checkbox'

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

### Controls 自動生成

`Controls` 元件根據 `StoryDef.props` 自動渲染控制項：

| PropDef type | 控制項 |
|---|---|
| `enum` | `<select>` 下拉選單 |
| `boolean` | toggle checkbox |
| `string` | text input |
| `number` | number input（帶 min/max/step） |

Controls 狀態管理：用 `useState` 存每個 prop 的當前值，初始值來自 `default`。當切換元件時 reset 為新元件的預設值。

### Preview 元件

- 接收 `StoryDef.component` + Controls 當前值 + `fixedProps`
- 動態渲染：`<story.component {...fixedProps} {...currentValues} />`
- 背景可切換亮/暗底（用 toggle 在 Preview 區域頂部）

### Sidebar 元件

- 以分類為 group，展開顯示元件列表
- 點選元件名稱 → 更新 hash route → 切換 Preview + Controls
- 當前選中的元件高亮顯示
- 預設全部展開

### Routing

延續現有的 hash routing：

- `/components` → 預設顯示第一個元件（NavigationBar）
- `/components/Button` → 直接跳到 Button
- `Components.tsx` 解析 hash 找到對應 story，渲染三欄佈局

### 特殊元件處理

部分元件需要特殊處理，因為它們不是簡單的「渲染一個元件」：

| 元件 | 處理方式 |
|---|---|
| Dialog, BottomSheet | Controls 中有 `open` boolean，點 toggle 開啟 overlay |
| Toast | fixedProps 提供一個 trigger button，呼叫 `useToast().show()` |
| Tooltip | fixedProps 提供 trigger button 作為 children |
| NavigationBar | fixedProps 提供 leading/trailing icon placeholders |
| TabBar | fixedProps 提供 items array |
| TagBar | fixedProps 提供 items array |
| ListItem | 外層包一個固定寬度的容器模擬列表 |
| CardItem, CardBanner | fixedProps 提供 thumbnail/image URL |

對於這些元件，story 定義可以額外提供一個 `render` function 來覆蓋預設的渲染邏輯：

```tsx
// 例：Dialog story
export const DialogStory: StoryDef = {
  component: Dialog,
  name: 'Dialog',
  category: 'Overlay',
  props: {
    title:       { type: 'string', default: '確認動作' },
    description: { type: 'string', default: '確定要執行此動作嗎？' },
  },
  // 自訂渲染：加入 trigger button + open state
  render: (Component, props) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Component
          {...props}
          open={open}
          onClose={() => setOpen(false)}
          actions={[
            { label: '取消', onClick: () => setOpen(false), colorType: 'neutral' },
            { label: '確認', onClick: () => setOpen(false), colorType: 'primary' },
          ]}
        />
      </>
    )
  },
}
```

沒有 `render` 的 story 使用預設渲染：`<Component {...currentProps} />`。`fixedProps` 用於簡單的固定值注入（如 icon placeholder）。`render` 用於需要額外 state 或 wrapper 的複雜情況。

## 樣式規則

- 所有新的 CSS 使用 `cs-` prefix（延續現有慣例）
- 顏色只用 `var(--color-*)` token
- 圓角只用 `var(--radius-*)` token
- 間距只用 `var(--space-*)` token
- 字體用 typography.css class
- Sidebar 和 Controls 使用 `var(--color-background-sunken)` 作為背景，Preview 使用 `var(--color-background-default)`

## 不做的事

- 不加 Code Snippet
- 不加 Props API table
- 不引入外部依賴（Storybook、highlight.js 等）
- 不做 mobile responsive（展示頁以桌面使用為主）
- 不支援 dark mode toggle（只在 Preview 區域提供暗底切換給 inverse 元件用）
