# Project: @invos/design-system

> Repo: `will-invos/iv-design-system` · npm 套件 `@invos/design-system`

「發票存摺」行動端產品的設計系統，包含 UI Kit 與 design tokens。
搭配 Figma MCP 快速建立或直接透過 AI agent 建立 Prototype 頁面，並讓工程開發銜接 APP 元件及設計系統。

## 兩份規範文件分工

- **CLAUDE.md** — AI 行為規則：**該用什麼元件**、Figma 整合流程、新頁面起手式
- **[design.md](./design.md)** — 設計準則：完整 token、色彩 / 排版 / 間距 / 動效規格、anti-patterns、AI prompt 範本

## Tech Stack

- React 19、TypeScript、Vite
- No CSS framework — plain CSS with design token CSS variables
- No router library — hash-based routing in App.tsx

## UI Kit 結構

- 元件：`src/components/ui/`（每個元件配 `.css`）
- Token：`src/components/ui/tokens/`（colors / radius / shadows / spacing / typography）
- Stories：`src/pages/stories/`（各元件 props 範例）

## Component Decision Tree

下列場景 → 使用的元件。**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本**。

| 需求 | 用哪個元件 |
|------|-----------|
| 主要動作按鈕 | `<Button variant="filled" colorType="primary">` |
| 次要動作按鈕 | `<Button variant="filled" colorType="neutral">` 或 `<Button variant="outlibne">` |
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
| 區塊內告示（警告、資訊） | `<Banner>` |
| 整頁空狀態 / 錯誤狀態（斷線、無結果、404） | `<PageStatus status="...">` |
| 頁面頂部標題列 | `<NavigationBar>`（regular / large / home / search / tabs）|
| 底部 tab 導覽 | `<TabBar>` |
| 分頁切換（內容區） | `<Tabs>` |
| 上一頁 / 下一頁導覽（含置中標題） | `<PageNavigation>` |
| 日期選擇 | 原生 `<input type="date">`（已定案：雙平台採原生 picker，**不要自製、不要拿 `<Select>` 頂替**） |
| 列表項（設定、選單） | `<ListItem>` |
| 卡片（內容 + 描述） | `<CardItem>` |
| 列表的 header / footer | `<ListHeader>` / `<ListFooter>` |
| 分隔線 | `<Divider>` |
| 標籤（可多個） | `<Tag>` / 可選取的 chips 列用 `<ChipBar>` |
| 數字徽章（通知未讀數） | `<Badge>` |
| 使用者頭像 | `<Avatar>` |
| 載入指示器 | `<Spinner>` |
| 進度條 | `<ProgressBar>` / 多條用 `<ProgressGroup>` |
| 輪播 / 分頁位置指示點 | `<DottedController>`（照片上用 `type="overlap"`） |
| 提示氣泡（簡短說明） | `<Tooltip>` |

**找不到對應？** 先查 `figma-tokens.json.componentKeys` 是否有 Figma 元件尚未實作；再考慮新增，避免自己組裝。


## Figma Integration

### Design System

- **Figma file**: `zbdxaNIbxN4Iujx6Qi1DlI` (MCP-test)
- **Library**: 🧰 iOS - UI Kit 2025（components）、🧰 Design System 2025（variables、text styles）
- **Token reference**: `figma-tokens.json` — 完整 component / text style / variable collection keys

### Figma → Code workflow

當使用者貼 `figma.com/design/{fileKey}/...?node-id=123-456`：

1. 先載入 `figma:figma-design-to-code` skill（MCP 強制前置），由它負責解析 URL、呼叫 `mcp__figma__get_design_context`。注意 node-id 的 dash 要轉 colon：`123-456` → `123:456`。
2. 拿到設計後，**翻成本專案元件**（以下是 skill 不知道的專案規則）：
   - 元件：對照 `figma-tokens.json.componentKeys` 找已實作的 React 元件，再套用上方 Component Decision Tree
   - 顏色：raw hex 反查 `tokens/colors.css` 的 semantic token → `var(--color-*)`
   - 文字：換成 `tokens/typography.css` 的 `.text-*` class
3. **絕對不要** 直接輸出 Tailwind class，即使 `get_design_context` 回傳 Tailwind。
4. 沒對應元件 → 用最接近的頂替，並在 plan 註記 TODO。

### Code → Figma workflow

**別用 `generate_figma_design`（HTML capture）** — 會丟失 variables、text styles、元件結構。要把 code 端頁面 / 元件建進 Figma 時：

1. 先載入 `figma:figma-use` skill（呼叫 `use_figma` 的強制前置）；建整頁 / 多區塊版面另加 `figma:figma-generate-design`，建元件庫加 `figma:figma-generate-library`。這些 skill 負責 Plugin API 的實際操作（import 元件、`setProperties`、套 text style、綁 variable）。
2. 專案專屬：所有 key 都從 `figma-tokens.json` 拿 —— `componentKeys`（元件 set）、`textStyles`（文字樣式）、`variableCollections`（色彩 / 尺寸變數集，見下表）。

### Variable Collections（Design System 2025）

| Collection | Key |
|------------|-----|
| Semantic: Colors | `aca99ba7f5e3b863523761870ab4fa8d4b24c0be` |
| Semantic: Sizes | `b2b4d349ff3e569ea2799606edbc77e3b5c1aa60` |
| UI Kit Variables | `3f0026e1a1cdbbcf678f559cdc723a02f2f35530` |

### Figma 端 vs Code 端 text style

`figma-tokens.json` 的 text styles（如 `iOS/Body-CN/Large`）是 **Figma 設計端資料**，Plugin API 套對應 text style 用。Code 端只有一組通用 class（`.text-body-large` 等不分 EN/CN），靠 browser 智能選字。

### Fonts（Plugin API note）

PingFang TC 在 remote Figma Plugin API 不可用。直接修改文字（非透過 `setProperties`）時用 `Noto Sans TC` 作為 fallback，再用 `textNode.textStyleId` 套對應 text style。

## 新頁面起手式（給 AI）

**先從範本複製**，不要從零建頁面。範本在 `src/pages/templates/`，涵蓋預設建立格式（外框、結構、token 用法都已就位）：

| 場景 | 複製這份 | 預覽路由 |
|------|---------|---------|
| 一般頁面（起手式骨架） | `BlankTemplate.tsx` | `#/templates/blank` |
| 清單 / 設定 / 選單 | `ListTemplate.tsx` | `#/templates/list` |
| 新增 / 編輯表單 | `FormTemplate.tsx` | `#/templates/form` |
| 單筆資料詳情 | `DetailTemplate.tsx` | `#/templates/detail` |

`#/templates` 是範本索引頁。外框規則收斂在 `templates.css`（`.tpl-page` = max-width 480px 等）。複製後照下列規則調整：

1. 查 Component Decision Tree 找對應元件
2. 從 `'@/components/ui'` barrel import（**不要深層 import**）
3. **頁面 `max-width: 480px`**、viewport meta：`width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`
4. 結構：`NavigationBar` → 內容區（自由捲動）→ `TabBar`（可選）
5. 顏色 / 字級 / 間距 / 圓角 / 陰影 / 動效 → 用 token，不寫 magic number；完整規格見 [design.md](./design.md)
6. 金額（`$` 前綴）/ 發票期數（民國年 `115 年 7-8 月`）/ 日期（西元 `2026/07/31`）/ 時間（`18:30:25`）→ 照 [design.md §2.3](./design.md) 內容格式，不要自創
7. `:hover` 包 `@media (hover: hover)`
8. dark mode 不需特別處理（token 自動切換）
9. 測試：Chrome DevTools 裝置模擬器（iPhone 14 Pro）
