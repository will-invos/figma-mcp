# Agent & Skill 設計規格

## 概述

為 figma-mcp 專案建立 3 個 Claude Code 擴充，標準化開發與驗收流程：

- **ui-reviewer** (Agent) — 檢查元件是否符合 coding rules
- **figma-to-code** (Skill) — 從 Figma 設計稿建立 React 元件
- **code-connect** (Skill) — 為元件建立 `.figma.tsx` Code Connect 映射檔

## 檔案結構

```
.claude/
├── agents/
│   └── ui-reviewer.md
└── skills/
    ├── figma-to-code.md
    └── code-connect.md
```

---

## 1. ui-reviewer (Agent)

### 基本資訊

| 欄位 | 值 |
|---|---|
| 類型 | Agent（獨立 context，回傳摘要） |
| 工具 | `Read, Glob, Grep`（唯讀） |
| Model | `sonnet`（節省成本） |
| 觸發方式 | 手動，針對單一元件（例：`@ui-reviewer 檢查 Avatar`） |

### 檢查清單（9 項）

#### 1. 禁止 hardcoded colors

- **範圍**：元件 `.css` 檔
- **違規 pattern**：`#hex`、`rgb()`、`rgba()`、named colors（`white`、`black`、`red` 等）
- **例外**：`tokens/colors.css` 是唯一允許原始色值的檔案
- **正確做法**：`var(--color-*)`

#### 2. 禁止 `var()` fallback

- **違規 pattern**：`var(--any-token, <fallback>)`
- **正確做法**：`var(--color-background-brand-default)`，不帶第二個參數

#### 3. Typography 必須對應 Figma text style

- **違規 pattern**：元件 CSS 中直接定義 `font-size`、`line-height`、`font-weight`
- **正確做法**：在 `.tsx` 中組合 `typography.css` 的 class，確保與 Figma text style 一對一對應
- **參考**：讀取 `src/components/ui/tokens/typography.css` 取得可用 class

#### 4. 字體用 token

- **違規 pattern**：CSS 中直接寫 `font-family: 'PingFang TC'` 或其他字體名稱
- **正確做法**：`var(--font-family)` 或 `var(--font-family-code)`
- **備註**：此項與第 3 項互補——如果已使用 typography class，就不需要額外設定 font-family

#### 5. 圓角嚴格用 radius token

- **違規 pattern**：`border-radius` 值不是 `var(--radius-*)`
- **正確做法**：使用 `var(--radius-*)` token
- **參考**：讀取 `src/components/ui/tokens/radius.css` 取得可用 token

#### 6. 間距嚴格用 spacing token

- **違規 pattern**：`padding`、`margin`、`gap` 的值不是 `var(--space-*)` 或 `0`
- **正確做法**：使用 `var(--space-*)` token
- **參考**：讀取 `src/components/ui/tokens/spacing.css` 取得可用 token

#### 7. 陰影嚴格用 shadow token

- **違規 pattern**：`box-shadow` 值不是 `var(--shadow-*)`
- **正確做法**：使用 `var(--shadow-*)` token
- **參考**：讀取 `src/components/ui/tokens/shadows.css` 取得可用 token

#### 8. 元件結構一致性

- `.tsx` 使用 `React.forwardRef`
- 設定 `Component.displayName`
- export `default` + export `type { ComponentProps }`
- import 對應的 `.css` 檔

#### 9. index.ts export

- 確認元件的 default export 和 type export 都已加入 `src/components/ui/index.ts`

### 輸出格式

```
## Review: {ComponentName}

### ✅ 通過
- [列出通過的項目]

### ❌ 不通過
- [規則名稱] — {file}:{line} — {說明}
  建議：{修正方式}

### 總結
{N}/9 項通過
```

---

## 2. figma-to-code (Skill)

### 基本資訊

| 欄位 | 值 |
|---|---|
| 類型 | Skill（載入主對話，互動式流程指引） |
| 觸發方式 | `/figma-to-code` |

### 流程步驟

#### Step 1 — 取得設計稿

- 需要使用者提供 Figma URL 或 node ID + file key
- 呼叫 `get_design_context`（figma-remote MCP）
- 取得 Code Connect snippet、截圖、設計 annotation

#### Step 2 — 分析設計

- 辨識元件的 variant/state/size
- 比對截圖，確認視覺結構
- 檢查是否有可複用的既有元件

#### Step 3 — 建立 `.tsx`

遵循既有 pattern：

```tsx
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  // props with JSDoc only when non-obvious
}

const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ ...props }, ref) => {
    // 組合 typography class（從 typography.css）
    // 組合 variant/state class
    return (/* JSX */);
  }
);

ComponentName.displayName = 'ComponentName';

export default ComponentName;
export type { ComponentNameProps };
```

#### Step 4 — 建立 `.css`

規則：

- Class prefix：`ui-{component-name}`（BEM 風格）
- 顏色：只用 `var(--color-*)`
- 圓角：只用 `var(--radius-*)`
- 間距：只用 `var(--space-*)`
- 陰影：只用 `var(--shadow-*)`
- 字體樣式：不在 CSS 中定義 font-size/line-height/font-weight，改在 `.tsx` 組合 typography class

#### Step 5 — 更新 `index.ts`

在 `src/components/ui/index.ts` 加入：

```tsx
export { default as ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

放在對應的分類區塊中。

---

## 3. code-connect (Skill)

### 基本資訊

| 欄位 | 值 |
|---|---|
| 類型 | Skill（載入主對話，模板化流程指引） |
| 觸發方式 | `/code-connect` |

### 流程步驟

#### Step 1 — 分析元件 props

- 讀取目標元件的 `.tsx`
- 列出所有 props 及其型別（enum、boolean、string）

#### Step 2 — 取得 Figma 元件資訊

- 讀取 `figma-tokens.json` 找到對應的 component set key
- 用 `get_design_context` 或 `get_metadata` 取得 Figma 端的 variant property 名稱和值

#### Step 3 — 建立映射

根據 prop 型別選擇對應的 figma helper：

| React prop 型別 | Figma helper | 範例 |
|---|---|---|
| union / enum | `figma.enum('PropertyName', { FigmaValue: 'reactValue' })` | variant、colorType、size |
| boolean | `figma.boolean('PropertyName', { true: value, false: undefined })` | leadingIcon、disabled |
| string (文字內容) | `figma.string('↳ PropertyName')` | children、label、placeholder |

#### Step 4 — 撰寫 `.figma.tsx`

模板：

```tsx
import figma from '@figma/code-connect'
import ComponentName from './ComponentName'

figma.connect(ComponentName, '{figma-url-with-node-id}', {
  props: {
    // Step 3 的映射
  },
  example: ({ ...mappedProps }) => (
    <ComponentName {...mappedProps} />
  ),
})
```

#### 參考範本

以 [Button.figma.tsx](src/components/ui/Button.figma.tsx) 作為標準參考，包含：
- `figma.enum` 映射 variant/colorType
- `figma.boolean` 映射 icon 開關
- `figma.string` 映射文字內容
- `example` 展示完整用法
