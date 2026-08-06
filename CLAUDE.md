# Project: @invos/design-system

> Repo: `will-invos/iv-design-system` · npm 套件 `@invos/design-system`

「發票存摺」行動端產品的設計系統，包含 UI Kit 與 design tokens。可搭配 Figma MCP 快速建立或直接透過 AI agent 建立 Prototype 頁面，並讓工程開發銜接 APP 元件及設計系統。

- 本檔為指引該使用什麼元件與新頁面的範本。
- 設計準則請參考 [design.md](./design.md)：完整 token、色彩 / 排版 / 間距 / 動效規格、anti-patterns。
- 元件的內部實作規格另見 [docs/component-internals.md](./docs/component-internals.md)。
- 消費端（引用此套件的專案）的使用規範見 [docs/usage.md](./docs/usage.md) 與 [docs/component-usage.md](./docs/component-usage.md)——Decision Tree 與元件使用細則都在那兩份，本 repo 也讀同一份。

## Source of truth

同一件事有多處記載時，以下為權威來源：

| 主題 | 權威來源 |
|------|---------|
| 公開元件與 props | `src/components/ui/index.ts` 與各元件的 TypeScript 型別 |
| 顏色 / spacing / radius | **生成檔** —— Figma variables → `tokens/figma-dump/*.txt` → `tokens/tokens.json` → `npm run tokens:build` |
| Typography / Shadow / 版面 | **手維護** —— `tokens/typography.css`、`tokens/shadows.css`、`tokens/layout.css`（不在 pipeline 內） |
| Figma component / style / variable key | `figma-tokens.json` |
| 設計意圖與使用原則 | [design.md](./design.md) |
| 元件內部尺寸 / 邊框 / 內距實測 | [docs/component-internals.md](./docs/component-internals.md) |
| 元件使用語意（何時用、怎麼組合） | [docs/component-usage.md](./docs/component-usage.md)（來源：Figma UI Kit Guideline） |

- **`colors.css` / `spacing.css` / `radius.css` 是產物，手改會被下次 `npm run tokens:build` 靜默覆蓋。** 查「有哪些 token」讀這三檔；**改值**走 Figma variables（流程見 [tokens/README.md](./tokens/README.md)）。
- **文件與程式碼不一致時以程式碼為準**：依實際型別讓程式可編譯，**不要猜測、也不要默默建立近似 API**，並在回報中明確指出文件的規格落差。

## 任務閱讀路徑

不必每次載入全部文件，依任務讀對應幾份：

| 任務 | 讀這些 |
|------|--------|
| 建立頁面 | [docs/usage.md](./docs/usage.md) Decision Tree → [docs/component-usage.md](./docs/component-usage.md) 對應元件章節 → `src/pages/templates/` 對應範本 → design.md 相關章節 |
| 修改元件 | 元件 `.tsx` / `.css` → 對應 story → [docs/component-internals.md](./docs/component-internals.md) |
| 修改 token | [tokens/README.md](./tokens/README.md) —— **禁止直接改生成檔** |
| Figma → Code | 本檔「Figma Integration」→ `figma-tokens.json` → 執行器名稱見 [.claude/figma-executors.md](./.claude/figma-executors.md) |
| Dark mode | [docs/dark-mode.md](./docs/dark-mode.md) |
| 無障礙 | [design.md §6.4](./design.md) |

## Tech Stack

- React 19、TypeScript、Vite
- No CSS framework — plain CSS with design token CSS variables
- No router library — component explorer uses lightweight hash navigation in src/pages/Components.tsx.

## UI Kit 結構

- 元件：`src/components/ui/`（每個元件配 `.css`）
- Token：`src/components/ui/tokens/`（colors / layout / radius / shadows / spacing / typography）
- 跨元件基礎樣式：`base.css`（自足化 reset）、`a11y.css`（focus 環、reduced-motion）、`preflight.css`（選用的全域 reset，不含在 `styles.css` 內）
- Stories：`src/pages/stories/`（各元件 props 及頁面範例）

**新增元件時一併註冊**，否則元件不會出現在 component explorer：

1. `src/components/ui/index.ts` 補 default 與 type 兩個出口
2. 新增 `src/pages/stories/{Component}.story.tsx`，export `{Component}Story`（`StoryDef` 型別）
3. 在 `src/pages/stories/registry.ts` import 它，並放進 `sections` 對應分類

**發佈的樣式不得依賴使用端有 CSS reset。** `src/index.css` 是本 repo explorer 用的完整 reset，**不在 library build 的產出裡**（`vite.lib.config.ts` 的 entry 只有 `src/components/ui/index.ts`），使用端拿不到。元件需要的 reset 一律寫進 `base.css`（限定 `ui-` 前綴、包 `:where()` 讓 specificity 歸零）或元件自己的 CSS —— 不要假設 `* { margin: 0; box-sizing: border-box }` 存在。

## Component Decision Tree

完整「需求 → 元件」對照表在 [docs/usage.md](./docs/usage.md#component-decision-tree)
——隨套件發佈，消費端與本 repo 讀同一張表，**只維護那一份**。
選對元件之後的使用細則（樣式層級、組合限制、狀態語意）見
[docs/component-usage.md](./docs/component-usage.md)。
**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本。**

**找不到對應元件時**（這條流程也適用 Figma → Code）：

1. 先確認真的沒有 —— 查 `src/components/ui/index.ts` 的 barrel export、元件型別、`src/pages/stories/`、`figma-tokens.json`
2. **只有視覺差異** → 用既有元件的 props 調整，不要另做一個
3. **互動語意不同**（例：設計稿要多選、系統只有單選元件）→ **不可用近似元件硬套**，語意錯誤比缺元件嚴重
4. 依任務範圍提出新增元件，或在回報中明確標示缺口 —— **不得只留隱藏的 TODO 註解**

## Figma Integration

### Design System

- **Library**: 🧰 iOS - UI Kit 2025（components）、🎨 Design System 2025（variables、text styles）
- **Token reference**: `figma-tokens.json` — 完整 component / text style / variable collection keys
- **目標檔**：本專案**沒有固定的 Figma 產出檔**。`figma-tokens.json` 的 key 全部屬於上述兩個已發佈 library，在任何啟用了它們的檔案都能 import，因此不綁特定檔案。
  - Code → Figma 的目標檔**由任務指定（依功能分開給）** —— 使用者沒給就先問，**不要自己挑一個檔**（寫錯檔案的產出設計師不會看到）。
  - 前置條件：目標檔須同時啟用上述兩個 library，否則 import component / style / variable 三類呼叫都會失敗。

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
   - 沒對應元件 → 走上方「找不到對應元件時」的流程判斷，不要一律拿最接近的頂替
5. **實作後對照 screenshot 驗證外觀與行為** —— 版面結構、間距節奏、色彩層級、字級階層；狀態（hover / focus / error）與可點區。有落差就修；**未驗證不算完成**，也不要以「大致相符」交付。

### Code → Figma workflow

要把 code 端頁面 / 元件建進 Figma 時：

1. **不要走 HTML 截圖 / 轉譯的路徑** —— 會丟失 variables、text styles、元件結構，產出的檔案設計師無法維護。必須用 Plugin API 逐層組裝：import 既有元件 → 設 properties → 套 text style → 綁 variable。
2. 專案專屬：所有 key 都從 `figma-tokens.json` 拿 —— `componentKeys`（元件 set）、`textStyles`（文字樣式）、`variableCollections`（色彩 / 尺寸變數集，見下表）。
3. 組完後**取 screenshot 與 code 端畫面對照**，確認不是「圖層對了但外觀跑掉」。

> 所有 Figma component/style/variable keys 一律讀取 figma-tokens.json，不要複製到其他文件。

### Figma 端 vs Code 端 text style

`figma-tokens.json` 的 text styles（如 `iOS/Body/Large`）是 **Figma 設計端資料**，Plugin API 套對應 text style 用；code 端的對應 class 記在同一筆的 `css` 欄位。

**中英文不分兩套。** Figma 與 code 端都只有一組樣式，中文字型交給 OS 自行挑選（見 [design.md §2](./design.md)）。過去曾有 `-CN` 平行樣式，已移除——**不要再建，也不要在 Figma 端挑 `-CN` 版本**。

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

## Validation

改完自己跑過再回報。本專案**沒有 test script**，不要嘗試 `npm test`。

| 改動範圍 | 指令 |
|---------|------|
| 一般程式修改 | `npm run lint` → `npm run build` |
| 套件輸出 / public API（`index.ts`、元件 props） | `npm run lint` → `npm run build:lib` |
| Token | 依 [tokens/README.md](./tokens/README.md) 改來源 → `npm run tokens:build` → `npm run build:lib` |

UI 改動另需在對應 story 目視驗證：light / dark 兩個主題、窄螢幕（375px）、互動狀態（focus / disabled / error / loading）。