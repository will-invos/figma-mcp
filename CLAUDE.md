# Project: @invos/ios-ui-kit

> Repo: `will-invos/iv-design-system` · npm 套件 `@invos/ios-ui-kit`

React + TypeScript + Vite，「發票存摺」共用 UI Kit 與 design tokens。搭配 Figma MCP 讓 AI 快速建立新頁面。

## 兩份規範文件分工

- **CLAUDE.md（本檔）** — AI 行為規則：**該用什麼元件**、Figma 整合流程、新頁面起手式
- **[design.md](./design.md)** — **長什麼樣**：完整 token、色彩 / 排版 / 間距 / 動效規格、anti-patterns、AI prompt 範本

> 寫程式時，元件選擇查本檔；視覺數值查 design.md。

## Platform Positioning

- **未來可能延伸原生 iOS app**（React Native 或 Swift）— token / text style 命名保留 `iOS/` 前綴
- **行動裝置優先**（mobile web + 未來 native）— 不加桌機 breakpoint、不假設滑鼠
- **Hover 為漸進增強**：`:hover` 必須包在 `@media (hover: hover)` 內，避免觸控 sticky hover（詳見 [design.md §6.1](./design.md)）
- **字體**：依賴系統預設，不指定中文字體名稱（詳見 [design.md §2.1](./design.md)）

## Tech Stack

- React 19、TypeScript、Vite
- No CSS framework — plain CSS with design token CSS variables
- No router library — hash-based routing in App.tsx

## UI Kit 結構

- 元件：`src/components/ui/`（每個元件配 `.css`）
- Token：`src/components/ui/tokens/`（colors / radius / shadows / spacing / typography）
- Stories：`src/pages/stories/`（各元件 props 範例）

## Component Decision Tree

下列場景 → 使用的元件。**永遠優先使用這些元件，不要用原生 HTML 或自製版本**。

| 需求 | 用哪個元件 |
|------|-----------|
| 主要動作按鈕 | `<Button variant="filled" colorType="primary">` |
| 次要動作按鈕 | `<Button variant="outline">` |
| 弱化動作（文字樣式） | `<Button variant="text">` 或 `<Button variant="ghost">` |
| 只有 icon 的點擊 | `<IconButton aria-label="...">` |
| 懸浮主要動作按鈕（FAB） | `<Fab aria-label="...">`（可加 `text` 顯示標籤） |
| 單行輸入欄位 | `<TextField>` |
| 多行輸入欄位 | `<TextArea>` |
| 下拉選單 | `<Select>` |
| 搜尋輸入 | `<SearchField>` |
| OTP / 驗證碼 | `<PinInput>` |
| 切換 on/off | `<Switch>` |
| 單選 | `<Radio>` |
| 多選 | `<Checkbox>` |
| 滑桿 | `<Slider>` |
| 表單分組容器 | `<FieldGroup>` + `<FieldGroupHeader>` + `<FieldGroupHelpText>` |
| 全螢幕對話（需使用者決策） | `<Dialog>` |
| 從底部滑上的面板（行動主要模式） | `<Sheet>` / 搭配 `<SheetHeader>` |
| 即時通知（中央短訊） | `<Toast>`（Provider 模式、`useToast()`）|
| 操作結果告知（底部、可含動作） | `<SnackBar>` |
| 頂部 push 通知（含 leading icon、可點擊跳轉） | `<InAppNotification>`（Provider 模式、`useInAppNotification()`） |
| 區塊內告示（警告、資訊） | `<Alert>` |
| 頁面頂部標題列 | `<NavigationBar>`（regular / large / home / search / tabs）|
| 底部 tab 導覽 | `<TabBar>` |
| 分頁切換（內容區） | `<Tabs>` |
| 列表項（設定、選單） | `<ListItem>` |
| 卡片（內容 + 描述） | `<CardItem>` |
| 列表的 header / footer | `<ListHeader>` / `<ListFooter>` |
| 分隔線 | `<Divider>` |
| 標籤（可多個） | `<Tag>` / 可選取的 chips 列用 `<ChipBar>` |
| 數字徽章（通知未讀數） | `<Badge>` |
| 使用者頭像 | `<Avatar>` |
| 載入指示器 | `<Spinner>` |
| 進度條 | `<ProgressBar>` / 多條用 `<ProgressGroup>` |
| 提示氣泡（簡短說明） | `<Tooltip>` |

**找不到對應？** 先查 `figma-tokens.json.componentKeys` 是否有 Figma 元件尚未實作；再考慮新增，避免自己組裝。

> Top 5 常踩的雷（完整 anti-patterns 與範例見 [design.md §7.1](./design.md)）：
> 1. 不要 hex / rgb / 命名色 → 用 `var(--color-*)` token
> 2. 不要寫 `var(--x, fallback)` → token 一定存在
> 3. 不要 `<div onClick>` 假按鈕 → 用 `<Button>` / `<IconButton>`
> 4. 不要 `:hover` 不包 `@media (hover: hover)`
> 5. 不要深層 import `'@/components/ui/Button'` → 用 barrel `'@/components/ui'`

## Figma Integration

### Design System

- **Figma file**: `zbdxaNIbxN4Iujx6Qi1DlI` (MCP-test)
- **Library**: 🧰 iOS - UI Kit 2025（components）、🧰 Design System 2025（variables、text styles）
- **Token reference**: `figma-tokens.json` — 完整 component / text style / variable collection keys

### Code Connect（目前未啟用）

Figma Code Connect publish 需要 Organization 以上方案，目前帳號不具備。本專案沒有 `.figma.tsx`；`get_design_context` 會回傳 Tailwind 或純 CSS，AI 需自行翻譯成本專案元件。

### Figma → Code workflow

當使用者貼 `https://www.figma.com/design/{fileKey}/...?node-id=123-456`：

1. 解析 fileKey 與 nodeId（**dash 轉 colon**：`123-456` → `123:456`）
2. 呼叫 `mcp__figma-remote__get_design_context` with `{ fileKey, nodeId }`
3. 對照 `figma-tokens.json.componentKeys` 找對應 React 元件
4. 翻譯成本專案元件：
   - 顏色：對照 `tokens/colors.css` 換成 `var(--color-*)`（raw hex 反查 semantic token）
   - 文字 style：換成 `tokens/typography.css` 的 `.text-*` class
   - 元件變體：套用上方 Component Decision Tree
5. **絕對不要** 直接產出 Tailwind class，即使 `get_design_context` 回傳的是 Tailwind
6. 沒對應元件 → 用最接近的元件頂替並在 plan 註記 TODO

### Code → Figma workflow

**Do NOT use `generate_figma_design` (HTML capture)** — 會丟失 variables、text styles、元件結構。

改用 `use_figma` Plugin API 直接組合 library 元件 instances：

1. 讀 `figma-tokens.json` 拿 component set keys 與 text style keys
2. `figma.importComponentSetByKeyAsync(setKey)` 匯入元件
3. 找正確 variant 建立 instance
4. `instance.setProperties({ '↳ PropName#id': 'value' })` 設文字 / 變體
5. `figma.importStyleByKeyAsync(key)` → `textNode.textStyleId = style.id` 套 text style
6. `figma.teamLibrary.getVariablesInLibraryCollectionAsync(collectionKey)` → `figma.variables.setBoundVariableForPaint()` 綁色彩變數

### Variable Collections（Design System 2025）

| Collection | Key |
|------------|-----|
| Semantic: Colors | `aca99ba7f5e3b863523761870ab4fa8d4b24c0be` |
| Semantic: Sizes | `b2b4d349ff3e569ea2799606edbc77e3b5c1aa60` |

### Figma 端 vs Code 端 text style

`figma-tokens.json` 的 text styles（如 `iOS/Body-CN/Large`）是 **Figma 設計端資料**，Plugin API 套對應 text style 用。Code 端只有一組通用 class（`.text-body-large` 等不分 EN/CN），靠 browser 智能選字。

### Fonts（Plugin API note）

PingFang TC 在 remote Figma Plugin API 不可用。直接修改文字（非透過 `setProperties`）時用 `Noto Sans TC` 作為 fallback，再用 `textNode.textStyleId` 套對應 text style。

## 新頁面起手式（給 AI）

1. 查 Component Decision Tree 找對應元件
2. 從 `'@/components/ui'` barrel import（**不要深層 import**）
3. **頁面 `max-width: 480px`**、viewport meta：`width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`
4. 結構：`NavigationBar` → 內容區（自由捲動）→ `TabBar`（可選）
5. 顏色 / 字級 / 間距 / 圓角 / 陰影 / 動效 → 用 token，不寫 magic number；完整規格見 [design.md](./design.md)
6. `:hover` 包 `@media (hover: hover)`
7. dark mode 不需特別處理（token 自動切換）
8. 測試：Chrome DevTools 裝置模擬器（iPhone 14 Pro）
