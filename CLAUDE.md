# Project: @invos/design-system

> Repo: `will-invos/iv-design-system` · npm 套件 `@invos/design-system`

「發票存摺」行動端產品的設計系統，包含 UI Kit 與 design tokens。可搭配 Figma MCP 快速建立或直接透過 AI agent 建立 Prototype 頁面，並讓工程開發銜接 APP 元件及設計系統。

- 本檔為指引該使用什麼元件與新頁面的範本。
- 設計準則請參考 [design.md](./design.md)：完整 token、色彩 / 排版 / 間距 / 動效規格、anti-patterns。
- 元件的內部實作規格另見 [docs/component-internals.md](./docs/component-internals.md)。

## Tech Stack

- React 19、TypeScript、Vite
- No CSS framework — plain CSS with design token CSS variables
- No router library — component explorer uses lightweight hash navigation in src/pages/Components.tsx.

## UI Kit 結構

- 元件：`src/components/ui/`（每個元件配 `.css`）
- Token：`src/components/ui/tokens/`（colors / radius / shadows / spacing / typography）
- Stories：`src/pages/stories/`（各元件 props 及頁面範例）

**新增元件時一併註冊**，否則元件不會出現在 component explorer：

1. `src/components/ui/index.ts` 補 default 與 type 兩個出口
2. 新增 `src/pages/stories/{Component}.story.tsx`，export `{Component}Story`（`StoryDef` 型別）
3. 在 `src/pages/stories/registry.ts` import 它，並放進 `sections` 對應分類

## Component Decision Tree

下列場景 → 使用的元件。**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本**。

| 需求 | 用哪個元件 |
|------|-----------|
| 主要動作按鈕 | `<Button variant="filled" colorType="primary">` |
| 次要動作按鈕 | `<Button variant="filled" colorType="neutral">` 或 `<Button variant="outline">` |
| 弱化動作（文字樣式） | `<Button variant="text">` 或 `<Button variant="ghost">` |
| 只有 icon 的點擊 | `<IconButton aria-label="...">` |
| 懸浮主要動作按鈕（FAB） | `<Fab aria-label="...">`（可加 `text` 顯示標籤） |
| 單行輸入欄位 | `<TextField>` |
| 多行輸入欄位 | `<TextArea>` |
| 下拉選單 | `<Select>`（選項要圖文排版 / 大點擊區時，用 `onPickerOpen` 把展開交給 `<Sheet>` + `<ListItem>` 選單） |
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

找不到對應時，先確認是否新增元件，避免自己主動組裝。


## Figma Integration

### Design System

- **Figma file**: `zbdxaNIbxN4Iujx6Qi1DlI` (MCP-test)
- **Library**: 🧰 iOS - UI Kit 2025（components）、🧰 Design System 2025（variables、text styles）
- **Token reference**: `figma-tokens.json` — 完整 component / text style / variable collection keys

> 以下兩節寫的是**必須完成的能力與順序**，不綁特定工具名稱 —— skill 名、MCP 函式名因 AI 執行環境而異，對應表見 [.claude/figma-executors.md](./.claude/figma-executors.md)。

### Figma → Code workflow

使用者貼 Figma 連結（`figma.com/design/{fileKey}/...?node-id=...`）時：

1. **對精確的 node 取得 design context** —— 不要對整個 page 取。
2. **節點太大或回傳被截斷 → 先取 metadata 看結構，再逐區塊縮小範圍重取**，不要就著不完整的 context 硬猜。
3. **取得 screenshot 當視覺基準** —— 後續驗證要對照它，不是只看 context 的數值。
4. **翻譯成本專案元件與 token**（這段是專案規則，設計工具端不會知道）：
   - 元件：對照 `figma-tokens.json.componentKeys` 找已實作的 React 元件，再套用上方 Component Decision Tree
   - 顏色：raw hex 反查 `tokens/colors.css` 的 semantic token → `var(--color-*)`
   - 文字：換成 `tokens/typography.css` 的 `.text-*` class
   - **絕對不要**直接輸出 Tailwind class，即使工具回傳的是 Tailwind
   - 沒對應元件 → 用最接近的頂替，並在 plan 註記 TODO
5. **實作後對照 screenshot 驗證外觀與行為** —— 版面結構、間距節奏、色彩層級、字級階層；狀態（hover / focus / error）與可點區。有落差就修；**未驗證不算完成**，也不要以「大致相符」交付。

### Code → Figma workflow

要把 code 端頁面 / 元件建進 Figma 時：

1. **不要走 HTML 截圖 / 轉譯的路徑** —— 會丟失 variables、text styles、元件結構，產出的檔案設計師無法維護。必須用 Plugin API 逐層組裝：import 既有元件 → 設 properties → 套 text style → 綁 variable。
2. 專案專屬：所有 key 都從 `figma-tokens.json` 拿 —— `componentKeys`（元件 set）、`textStyles`（文字樣式）、`variableCollections`（色彩 / 尺寸變數集，見下表）。
3. 組完後**取 screenshot 與 code 端畫面對照**，確認不是「圖層對了但外觀跑掉」。

> 所有 Figma component/style/variable keys 一律讀取 figma-tokens.json，不要複製到其他文件。

### Figma 端 vs Code 端 text style

`figma-tokens.json` 的 text styles（如 `iOS/Body-CN/Large`）是 **Figma 設計端資料**，Plugin API 套對應 text style 用。Code 端只有一組通用 class（`.text-body-large` 等不分 EN/CN）。

## 範本應用

範本在 `src/pages/templates/`，涵蓋預設建立格式（外框、結構、token 用法都已就位）：

| 場景 | 複製這份 |
|------|---------|
| 一般頁面（起手式骨架） | `MainTabTemplate.tsx` |
| 票券 / 商品 / 圖文清單 | `ListTemplate.tsx` |
| 設定 / 選單（分組清單） | `SettingsTemplate.tsx` |
| 新增 / 編輯表單 | `FormTemplate.tsx` |
| 單筆資料詳情 | `DetailTemplate.tsx` |
| 404 / 空狀態（斷線、無結果） | `NotFoundTemplate.tsx` |

範本僅供參考，非共用元件。外框規則寫在 `templates.css`，複製後把用到的規則搬進新頁面自己的 CSS，不要 import `templates.css`、也不要 import 範本元件。