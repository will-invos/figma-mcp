# Project: figma-mcp

React + TypeScript + Vite 專案，內含一套以行動網頁為主的 UI Kit 與 design tokens。可供內部多個專案共用，並搭配 Figma MCP 讓 AI 快速建立新頁面。

## Platform Positioning

- **未來可能延伸原生 iOS app**（React Native 或 Swift）— 這是為什麼 token / text style 命名保留 `iOS/` 前綴。
- **不是桌機優先** — 不要預設 hover 互動、不要加桌機 breakpoint、不要假設滑鼠。
- **字體** — 使用各平台系統預設字體（不指定特定中文字體名稱），見下方「Font Family」章節。

## Tech Stack
- React 19, TypeScript, Vite
- No CSS framework (plain CSS with design token CSS variables)
- No router library (hash-based routing in App.tsx)

## UI Kit
All components live in `src/components/ui/` with matching `.css` files.
Design tokens: `src/components/ui/tokens/` (colors, radius, shadows, spacing, typography).

### Component Decision Tree

給 AI：下列場景 → 使用的元件。**永遠優先使用這些元件，不要用原生 HTML 或自製版本**。

| 需求 | 用哪個元件 |
|------|-----------|
| 主要動作按鈕 | `<Button variant="filled" colorType="primary">` |
| 次要動作按鈕 | `<Button variant="outline">` |
| 弱化動作（文字樣式） | `<Button variant="text">` 或 `<Button variant="ghost">` |
| 只有 icon 的點擊 | `<IconButton aria-label="...">` |
| 單行輸入欄位 | `<TextField>` |
| 多行輸入欄位 | `<TextArea>` |
| 下拉選單 | `<Select>` |
| 搜尋輸入 | `<SearchField>` |
| 切換 on/off | `<Switch>` |
| 單選 | `<Radio>` |
| 多選 | `<Checkbox>` |
| 滑桿 | `<Slider>` |
| 表單分組容器 | `<FieldGroup>` + `<FieldGroupHeader>` + `<FieldGroupHelpText>` |
| 全螢幕對話（需使用者決策） | `<Dialog>` |
| 從底部滑上來的面板（行動主要模式） | `<Sheet>` / 搭配 `<SheetHeader>` |
| 即時通知（短訊） | `<Toast>`（Provider 模式、`useToast()`）|
| 操作結果告知（可含動作按鈕） | `<SnackBar>` |
| 區塊內告示（警告、資訊） | `<Alert>` |
| 頁面頂部標題列 | `<NavigationBar>`（支援 regular / large / home / search / tabs）|
| 底部 tab 導覽 | `<TabBar>` |
| 列表項（設定、選單） | `<ListItem>` |
| 卡片（內容 + 描述） | `<CardItem>` |
| 列表的 header / footer | `<ListHeader>` / `<ListFooter>` |
| 分隔線 | `<Divider>` |
| 標籤（可多個） | `<Tag>` / 多個並排用 `<TagBar>` |
| 數字徽章（通知未讀數） | `<Badge>` |
| 使用者頭像 | `<Avatar>` |
| 載入指示器 | `<Spinner>` |
| 進度條 | `<ProgressBar>` / 多條用 `<ProgressGroup>` |
| 提示氣泡（簡短說明） | `<Tooltip>` |

**找不到對應？** 先看 `figma-tokens.json.componentKeys` 是否有對應 Figma 元件尚未實作，再考慮新增；避免自己組裝。

### Coding Rules

- **No hard-coded colors.** Never use hex (`#fff`), `rgb()`, `rgba()`, or named colors (`white`, `black`) directly in component CSS. Always reference a design token CSS variable (`var(--color-*)`). If a needed token doesn't exist, add it to `tokens/colors.css` first, then reference it.
  - ✅ `color: var(--color-content-fixed-white);`
  - ❌ `color: white;` / `color: #ffffff;` / `color: rgba(255,255,255,0.2);`
  - The only file allowed to contain raw color values is `tokens/colors.css` (token definitions).
- **No fallback values in `var()`.** Tokens are always defined; fallback hex is dead code that can silently diverge. Write `var(--color-background-brand-default)`, not `var(--color-background-brand-default, #3560ff)`.
- **Use typography tokens.** Use `var(--font-family)` for UI text and `var(--font-family-code)` for monospace. Typography classes live in `tokens/typography.css`.

### Anti-patterns（AI 禁止產出）

| ❌ 不要 | ✅ 改用 |
|---------|--------|
| `<button onClick={...}>` 原生 button | `<Button>` / `<IconButton>` |
| `<input type="text">` 原生 input | `<TextField>` |
| 自己寫 modal / overlay / backdrop | `<Dialog>`（全螢幕決策）或 `<Sheet>`（底部滑上） |
| 自己寫 toast / snackbar 動畫 | `<Toast>` 配 `ToastProvider` / `<SnackBar>` |
| `style={{ color: '#...' }}` inline | CSS class + `var(--color-*)` |
| `color: #fff`、`rgb()`、命名色 | `var(--color-*)` token |
| `var(--color-x, #fallback)` 兩參數 fallback | `var(--color-x)` 直接引用 |
| `@media (min-width: 768px)` 桌機 breakpoint | Mobile-first，不加桌機斷點（除非真的要做響應式） |
| `:hover` 作為主要互動（行動裝置無 hover） | 用 `:active` 或 `:focus-visible` |
| `position: fixed` 自製 BottomSheet | `<Sheet>` 或 `<BottomSheet>` |
| 從 `@/components/ui/Button` 深層 import | 從 `@/components/ui` 匯入（index barrel） |
| 用 `<div onClick>` 當按鈕 | `<Button variant="text">` 或 `<IconButton>` |

### Font Family (system default)

**策略：不指定特定中文字體名稱**，完全依賴各平台的系統預設字體。`tokens/typography.css` 的 `--font-family` 定義如下：

```css
--font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

原因：
- **Apple（iOS/macOS）** `-apple-system` / `BlinkMacSystemFont` 會自動選擇 SF Pro（英文）+ PingFang TC（中文）
- **Android** `system-ui` 會用 Roboto + Noto Sans CJK
- **Windows** `system-ui` 會用 Segoe UI + Microsoft JhengHei
- **不列舉** `'PingFang TC'`、`'Noto Sans TC'`、`'Microsoft JhengHei'` — 讓 OS 挑最合適的字體，避免硬指定導致字體檔不存在時跳回 sans-serif

**規則**：
- ❌ 不要在任何元件或新 token 裡自己寫 `font-family: 'PingFang TC', ...`
- ❌ 不要在 `--font-family` 加任何中文字體字串
- ✅ 永遠透過 `var(--font-family)` 或 `var(--font-family-code)` 引用

> figma-tokens.json 的 text styles 裡仍有 `iOS/Body-CN/*` 等條目，那是 Figma 設計系統的**設計端資料**，讓 Figma Plugin API 能套對應 text style。Code 這邊實作只保留一組通用 class（不分 EN/CN），靠 browser 智能選字。

## Figma Integration

### Design System
- **Figma file**: `zbdxaNIbxN4Iujx6Qi1DlI` (MCP-test)
- **Library**: 🧰 iOS - UI Kit 2025 (components), 🧰 Design System 2025 (variables, text styles)
- **Token reference**: `figma-tokens.json` — contains all component keys, text style keys, and variable collection keys

### Code Connect（目前未啟用）

Figma Code Connect 可以讓 Dev Mode 直接顯示 React 呼叫（取代預設的 Tailwind），但 **publish 需要 Organization 以上方案**，目前帳號不具備。因此本專案**沒有 `.figma.tsx` 映射檔**，AI 讀 Figma 時會拿到 Tailwind 或純 CSS 預設輸出，需自行翻譯成本專案元件。

未來若升級方案，可重建 `.figma.tsx` + `figma.config.json` 走 `npx figma connect publish`。

### Figma → Code workflow（現行流程）

1. 呼叫 `mcp__figma-remote__get_design_context` with `{ fileKey, nodeId }`
2. 回傳通常是 Tailwind / 原生 CSS 的 reference code
3. **AI 必須自己翻譯**：
   - 對照下方 `figma-tokens.json.componentKeys` 找出 Figma 元件對應哪個 React 元件
   - 套用上方「Component Decision Tree」挑選正確元件與變體
   - 顏色對照 `tokens/colors.css`，換成 `var(--color-*)`
   - Text style 對照 `tokens/typography.css` 的 class（`.text-display`、`.text-body-large` 等）
4. **絕對不要**直接產出 Tailwind class 到本專案程式碼

### Code → Figma workflow (IMPORTANT)
**Do NOT use `generate_figma_design` (HTML capture).** It loses variables, text styles, and component structure.

Instead, use `use_figma` Plugin API to directly assemble library component instances:
1. Read `figma-tokens.json` for component set keys and text style keys
2. Import components via `figma.importComponentSetByKeyAsync(setKey)`
3. Find the correct variant, create instances
4. Set text overrides via `instance.setProperties({ '↳ PropName#id': 'value' })`
5. Import and apply text styles via `figma.importStyleByKeyAsync(key)` → `textNode.textStyleId = style.id`
6. Import and bind variables via `figma.teamLibrary.getVariablesInLibraryCollectionAsync(collectionKey)` → `figma.variables.setBoundVariableForPaint()`

### Text Styles (from Design System 2025)
| Style                  | Font                      | Usage                          |
|------------------------|---------------------------|--------------------------------|
| iOS/Label/Large        | SF Pro Medium 16          | Field labels, section headers  |
| iOS/Body-CN/Large      | PingFang TC Regular 16    | Input placeholders, body text  |
| iOS/Body-CN/Medium     | PingFang TC Regular 14    | Descriptions, secondary text   |
| iOS/Body-CN/Small      | PingFang TC Regular 12    | Help text, captions            |
| iOS/Label-CN/Large     | PingFang TC Medium 16     | Nav title, button text         |

### Variable Collections
| Collection       | Key                                        | Library              |
|------------------|--------------------------------------------|----------------------|
| Semantic: Colors | `aca99ba7f5e3b863523761870ab4fa8d4b24c0be` | Design System 2025   |
| Sementic: Sizes  | `b2b4d349ff3e569ea2799606edbc77e3b5c1aa60` | Design System 2025   |

### Fonts (Figma Plugin API note)
PingFang TC is NOT available in the remote Figma Plugin API. When modifying text directly (not via `setProperties`), use `Noto Sans TC` as a fallback, then re-apply the correct text style via `textNode.textStyleId`.

## Do / Don't Examples

### Colors
```tsx
/* ❌ Don't */
<div style={{ color: '#3560ff', background: 'rgba(53, 96, 255, 0.1)' }}>...</div>

/* ✅ Do — in CSS */
.my-box {
  color: var(--color-content-brand-default);
  background: var(--color-background-brand-subtle);
}
```

### Typography
```tsx
/* ❌ Don't */
<h1 style={{ fontSize: 24, fontWeight: 600, fontFamily: 'PingFang TC' }}>Title</h1>

/* ✅ Do — apply the text style class */
<h1 className="text-heading-cn-large">Title</h1>
```

### Spacing
```css
/* ❌ Don't — magic numbers */
padding: 12px 16px;
gap: 8px;

/* ✅ Do — use spacing tokens */
padding: var(--space-150) var(--space-200);
gap: var(--space-100);
```

### Structure
```tsx
/* ❌ Don't — depth imports + hand-rolled modal */
import Button from '@/components/ui/Button'
function MyModal() {
  return <div style={{ position: 'fixed', inset: 0 }}>...</div>
}

/* ✅ Do — barrel import + Dialog primitive */
import { Button, Dialog } from '@/components/ui'
function MyModal() {
  return <Dialog title="..." actions={[...]}>...</Dialog>
}
```

## 新頁面起手式（給 AI）

1. **確認需求類型** → 查「Component Decision Tree」找對應元件
2. **確認字型 / 顏色** → 查 `tokens/typography.css` 與 `tokens/colors.css`；如果需要新 token，**先**加到 tokens 檔，再在元件引用
3. **參考既有結構** → 可從 `src/pages/stories/` 底下的故事檔看每個元件的 props 範例
4. **必用 barrel import** → `import { Button, TextField, Dialog } from '@/components/ui'`
5. **必用行動網頁尺寸** → 頁面 max-width 設 `428px`，viewport meta 設 `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`
6. **測試時** → 用 Chrome DevTools 裝置模擬器（iPhone 14 Pro）確認

## Figma URL → 程式碼實作流程範例

當使用者貼 `https://www.figma.com/design/zbdxaNIbxN4Iujx6Qi1DlI/MCP-test?node-id=123-456` 時：

1. **解析 URL** → fileKey `zbdxaNIbxN4Iujx6Qi1DlI`、nodeId `123:456`（dash 轉 colon）
2. **呼叫 `mcp__figma-remote__get_design_context`** with `{ fileKey, nodeId }`
3. **讀回傳**：
   - 若有 Code Connect 映射 → 直接使用回傳的 React 呼叫
   - 若有 CSS variables → 對照 `tokens/colors.css`，用對應 `var(--color-*)`
   - 若回傳 raw hex → 去 `tokens/colors.css` 反查對應 semantic token
4. **若是新增元件** → 先查 `figma-tokens.json.componentKeys` 是否有對應；沒有就在 plan 中註記，先用最接近的現有元件頂替
5. **永遠不要** 產出 Tailwind class，即使 `get_design_context` 回傳的是 Tailwind — 要翻譯回本專案的 CSS class + `var(--color-*)` 系統
