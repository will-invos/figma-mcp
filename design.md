# Design Spec — @invos/design-system

「發票存摺」行動端產品的設計準則，涵蓋視覺調性、色彩、排版、間距、圓角、陰影、互動與 anti-patterns。

## 適用範圍

除非段落另有註明，本文件的 AI 守則適用於「使用既有 UI Kit 建立產品頁面」，不直接套用於：

- `src/components/ui/tokens/` 的生成檔
- UI Kit 元件內部的精確尺寸
- component explorer / stories 的展示外框
- SVG、圖片與測試用視覺素材

維護元件時以 TypeScript props、元件 CSS、Figma 規格及
`docs/component-internals.md` 為準。

---

## 0. 產品定位與視覺主題

**產品**：「發票存摺」mobile web + iOS/Android app。
**使用者**：一般消費者 / 會員，非技術背景，優先單手操作。
**核心任務**：雲端發票自動對獎與領獎、紙本掃描對獎、消費明細查詢、參與任務與兌換獎勵。

- **整體調性**：「現代極簡」—乾淨、留白充足、藍色品牌色點綴，背景搭配科技感的輕量漸層色
- **色彩語法**：大面積中性灰白底 + 品牌藍（`brand`）為唯一主動作色，其他語意色僅用於提示
- **形狀語法**：圓角偏大（按鈕 8–12、卡片 12–16），無銳角；按鈕、卡片、輸入欄統一節奏
- **動效調性**：短促克制（0.15–0.3s），ease-in-out 為主

> **AI 決策方向**：預設選 **安靜、平衡**；遇對獎、發票、金流相關元件 **信任 > 趣味**，資訊清晰不誤導為先；獎勵與捐贈區塊可帶輕量正向感（用 prize / donation 語意色點綴）。

---

## 1. 色彩（Colors）

### 1.1 token 命名

```
--color-{group}-{intent}-{variant}
        ↓        ↓        ↓
        category role     state/strength
```

- `group`：`content`（文字 / icon）/ `background` / `border` / `shadow`
- `intent`：`brand` / `success` / `danger` / `warning` / `prize` / `donation` / `neutral` / `link` / `inverse`
- `variant`：`default` / `bold` / `subtle` / `subtlest` / `hover` / `active`

> **色值不在本文件維護**。查「有哪些 token」讀 [tokens/colors.css](./src/components/ui/tokens/colors.css)；**要改色值不要改那個檔** —— 它是 `npm run tokens:build` 的產物，母版是 Figma variables（見 [tokens/README.md](./tokens/README.md)）。

### 1.2 文字色階（由深到淺）

| Token | 場景 |
|-------|------|
| `--color-content-bold` | 標題、最強調 |
| `--color-content-default` | 正文（預設） |
| `--color-content-subtle` | 次要說明、placeholder |
| `--color-content-subtlest` | 最弱層級、disabled |
| `--color-content-plain` | 純黑 / 純白（極少用） |

`Inverse 系列`（`--color-content-inverse-*`）給深色容器（Toast、Sheet overlay 上的文字）用。

### 1.3 語意色（intents）

| Intent | 用途（發票存摺情境） |
|--------|--------------------|
| `brand` | 主動作 |
| `success` | 操作成功 |
| `danger` | 嚴重警示、操作失敗、刪除 |
| `warning` | 預設警示 |
| `prize` | 中獎公告、獎金/獎項 |
| `donation` | 愛心碼、捐贈發票 |
| `neutral` | 無情緒語意、中性操作 |
| `link` | 文字連結 |

### 1.4 Fixed 與 Dark Mode

- **`fixed-*` token 在 dark mode 不反轉**，用於恆色背景上的恆色前景（例：品牌藍按鈕上的恆白字、prize 黃底上的深字）。
- 切換靠 `<html data-theme="dark">`（**必須**掛在 `<html>` 或 `<body>`，不能掛 `#root`，否則 Portal 元件吃不到）。詳見 [docs/dark-mode.md](./docs/dark-mode.md)。
- 內容階層、語意色在 dark mode 自動反轉並變淺一階以維持可讀性；陰影 opacity 自動加重。

---

## 2. 排版（Typography）

### 2.1 字體

```css
--font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-family-code: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
```

**完全依賴系統預設字體**，不在 stack 加 `'PingFang TC'` / `'Noto Sans TC'` / `'Microsoft JhengHei'`，讓 OS 自動選字（避免硬指定字體不存在時 fallback 到 sans-serif）。

### 2.2 文字 class

統一規則：**套 class，不自訂 `font-size`**；不額外設 `letter-spacing`（採預設，`.text-code-*` 明確設 `0`）。

| Class | Size/Line | Weight | 用途 |
|-------|-----------|--------|------|
| `.text-display-small` | 28/36 | 700 | 頁面大標、Large nav title |
| `.text-heading-{large/medium/small}` | 24/20/18 | 700 | Dialog / 卡片 / 子區段標題 |
| `.text-body-{xlarge/large/medium/small}` | 18/16/14/12 | 400 | 強調內文 / **預設正文** / 描述 / 註解 |
| `.text-label-{large/medium/small}` | 16/14/12 | 500 | Button large/medium/small、欄位 label / Tag / Badge |
| `.text-code-{large/medium/small}` | 16/14/12 | 400 | 等寬代碼 / 數字 |

> 完整定義（含 `-display-small-light`、`-body-xsmall`、`-label-xsmall`）見 [tokens/typography.css](./src/components/ui/tokens/typography.css)。

**配色預設**：標題→`--color-content-bold`、正文→`--color-content-default`、次要→`--color-content-subtle`、失效/輸入框提示→`--color-content-subtlest`、連結→`--color-content-link-default`。

> **字級縮放（跨平台現況）**：web 與 iOS 為**固定字級**（iOS 不隨 Dynamic Type）；**Android 依系統字級設定縮放** —— Android 端版面需容忍字級放大（優先換行，個案驗收）。

### 2.3 內容格式規則

| 內容 | 格式 | 範例 |
|------|------|------|
| 金額 | 前綴 `$` 符號 | `$540` |
| 發票期數 | **民國年** N-N 月，月份 1〜9 **不補 0** | `115 年 7-8 月` |
| 日期 | **西元**年月日，斜線分隔 | `2026/07/31` |
| 時間 | **24 小時制** `HH:mm:ss` | `18:30:25` |

> 期數用民國年（對應官方發票開獎），日期用西元 —— 兩者並存是刻意的，不要「統一」。

---

## 3. 間距與佈局

### 3.1 間距 token

**4px 為主要節奏**，另提供 2px half-step（`--space-50`）與 1px 特殊值（`--space-25`）；不是嚴格的 4px grid，但一律優先用既有 token，不要自己算數值。

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-50 / 100` | 2 / 4 | 標題↔描述微距、tag 內距 |
| `--space-150 / 200 / 250` | 6 / 8 / 10 | small/medium 按鈕 padding、icon↔text |
| `--space-300` | 12 | large 按鈕 padding、緊湊內距 |
| `--space-400` | 16 | 標準容器內距、欄位間距 |
| `--space-600` | 24 | 強調區塊、Dialog body |

> 完整定義（含 `--space-25 / 500 / 700 / 800 / 900`）見 [tokens/spacing.css](./src/components/ui/tokens/spacing.css)。**自製容器三檔內距**：標準 16 / 緊湊 12 / 強調 24。

### 3.2 佈局約束

- **頁面 max-width: 480px**，**不加桌機 breakpoint**（mobile-first）
- **viewport 只由 app shell 的 HTML 設定**（本 repo 是 [index.html](./index.html)），頁面與元件**不得新增或覆寫**。預設**保留使用者縮放** —— 不要加 `maximum-scale=1` / `user-scalable=no`，那是無障礙反模式；要限制縮放必須有經無障礙評估的產品需求。設定值必須含 `viewport-fit=cover`，否則下一條 safe area 不生效
- 頁面結構：`NavigationBar` (top) → 內容區（自由捲動）→ `TabBar` (bottom，可選)
- **Safe area**：`viewport-fit=cover` 下內容會延伸到瀏海 / home indicator 底下。貼底 chrome（`TabBar`、`Sheet`）與貼頂懸浮元件（`InAppNotification`）已自帶 `env(safe-area-inset-*, 0px)` padding

### 3.3 圓角（實測元件對應）

| Token | 值 | 元件 |
|-------|-----|------|
| `--radius-150` | 6 | Checkbox、Tag (small) |
| `--radius-200` | 8 | Banner、Button small、SearchField、Tag (medium)、TabBar item、Tooltip |
| `--radius-250` | 10 | Button medium |
| `--radius-300` | 12 | **Button large、CardItem、PinInput、Select、SnackBar、TextField、TextArea**（最常用） |
| `--radius-400` | 16 | Dialog、Toast、InAppNotification、Fab |
| `--radius-600` | 24 | Sheet 頂部、Switch track |
| `--radius-full` | 999 | Avatar、Badge、IconButton、ProgressBar、Slider track、Switch thumb、ChipBar、SheetHeader 把手 |

> Radio / Spinner / Slider thumb / TabBar 圓點 / DottedController 圓點直寫 `border-radius: 50%`（純圓形 width=height，不透過 token）。

---

## 4. 陰影與層次（Elevation）

| Token | 規格 | 性質 | 元件 |
|-------|------|------|------|
| `--shadow-small` | `0 2px 4px` | 微投影 | Slider thumb、Switch thumb（小立體感）、DottedController overlap（`drop-shadow`，照片上的指示點） |
| `--shadow-medium` | `0 4px 8px` | 中投影 | Tooltip（用 `filter: drop-shadow` 含三角尾巴）、Fab（懸浮於內容上） |
| `--shadow-large` | `0 8px 16px` | 大投影 | SnackBar、InAppNotification（從頂端 / 底部浮起） |
| `--shadow-sheet` | `0 -4px 8px` | 反向投影 | 常駐型 Sheet（無遮罩、向上發散；目前 `<Sheet>` 元件尚未實作此變體） |
| `--shadow-bold` | `0 0 16px` | **無方向 glow** | （目前未使用，保留給需要光暈強調的容器） |

**Sheet 陰影 vs 遮罩（兩者互斥，依 Sheet 型態二選一）**：
- **互動型**（`<Sheet>` 元件目前唯一實作的型態）：底部覆蓋全螢幕黑色半透明遮罩，靠遮罩對比凸顯當前操作畫面，**不帶陰影**。
- **常駐型**（如首頁載具條碼面板）：不覆蓋遮罩，改用 `--shadow-sheet` 向上發散陰影與下方內容分層。目前 codebase 尚未有對應元件變體，如需建置請先確認設計稿。

**層次原則**：
1. **無陰影**（最常見）：頁面背景、CardItem、Banner、ListItem、NavigationBar、TabBar、Button、**Dialog、互動型 Sheet、Toast** — 靠背景色、分隔線或 overlay 對比建立層級
2. **小立體感**：Slider thumb、Switch thumb → `--shadow-small`
3. **浮起 / 投影**：Tooltip、SnackBar、InAppNotification、Fab、**常駐型 Sheet** → 對應 token

> Dialog / 互動型 Sheet 靠半透明 overlay backdrop 把背景變暗，Toast 靠 `--color-background-toast` 半透明深底建立對比，這些**都不需要陰影**。`--shadow-bold` 是 **glow 風格**（無 y-offset），與其他向下投影 token 性質不同——適合放在多彩背景或照片上的強調容器，**不要拿來當一般卡片陰影**。Dark mode 陰影 opacity 自動加重。

---

## 5. 元件樣式（內部規格 → 另檔）

元件的**確切尺寸**（Button 各 size 的 height / radius / padding）、**邊框規格**（各輸入欄 default / focus / error、Checkbox / Radio、卡片分隔）、**容器內距實測**（CardItem / ListItem / Sheet / Dialog / FieldGroup）已移到 [docs/component-internals.md](./docs/component-internals.md)。

> 引用這套系統做頁面 **用不到** 這些數字 —— 直接用元件 props（`<Button size="large">`）即可,它們已烘進元件。只有 **維護或擴充元件** 時才需要查,且以 code 為準。

---

## 6. 互動與動效

### 6.1 狀態機與 Hover

順序：`default → :focus-visible → :active → [disabled]`。

**Hover 為漸進增強**，`:hover` 一定要包在 `@media (hover: hover)` 內，避免 **觸控點擊後 hover 樣式「黏住」** 到下次點擊他處。

```css
@media (hover: hover) { .ui-button:hover { background: var(--color-background-brand-hover); } }
.ui-button:active { background: var(--color-background-brand-active); }
:disabled { opacity: 0.4; pointer-events: none; cursor: not-allowed; }
[data-loading] { pointer-events: none; cursor: not-allowed; }
```

> Loading 保持元件寬度（`visibility: hidden` + 絕對定位 `Spinner`），不抖動。

### 6.2 觸控區

最小可點擊區：web / iOS **44×44px**（iOS HIG）、Android 原生端 **48×48dp**（Material 標準）；小尺寸元件（Tag、Badge）若可點擊，加透明 padding 擴大命中區。

> **例外**：`DottedController` interactive 模式的命中區為 16×16 —— 輪播以滑動為主、點按僅輔助。

### 6.3 Animation

**Duration 三檔**：`0.15s` 微互動 / `0.2s` 中型彈出 modal / `0.3s` 大型位移或長時程。

**Easing 按動效類型對應**（不要混用）：
- **pop-in**（opacity + scale）→ `ease-in-out`：Dialog body、Toast、Tooltip
- **slide-in**（位移進入）→ `ease-out`：Sheet 從底部滑上（`0.3s`）
- **fade-only / 連續變化** → `ease`：Dialog overlay（`0.2s`）
- **0.15s 狀態切換** → `linear`：hover、focus、color、background
- **spring-like 進出場**（客製 `cubic-bezier`，**僅限 push notification 類**）→ InAppNotification 進場用 overshoot 曲線、退場用反向 ease；`prefers-reduced-motion` 自動降為 `0.15s linear` opacity-only

> 一般元件不用 spring / bounce / 客製 cubic-bezier；觸控延遲約 100ms，動畫超過 0.3s 會感覺卡。客製曲線僅在 InAppNotification 這類「需要 spring 感」的進出場使用，且**必須**附 `prefers-reduced-motion` fallback。

### 6.4 無障礙（Accessibility）

**已由型別或元件保證** —— 沿用元件即符合，不需另外處理：

- `IconButton` / `Fab` 的 `aria-label` 是 **TypeScript 必填**，漏了不會過編譯
- `Dialog` / `Sheet` 都會在開啟時把 focus 移進面板、關閉時還給原本的觸發元素；`Sheet` 另有 focus trap 與 `aria-modal`
- **`prefers-reduced-motion` 由 [a11y.css](./src/components/ui/a11y.css) 全域處理** —— 所有 `ui-` 元件的 transition / animation 自動歸零，不需逐一寫。例外：`Spinner` 與 `ProgressBar` indeterminate 保持轉動（靜止就失去「處理中」的意義）；元件要保留自己的降級動效（如 `InAppNotification` 的 opacity-only 淡入）就在自己的 CSS 用 `!important`
- 按鈕類（`Button` / `IconButton` / `Fab`）的 `:focus-visible` 外環同樣在 a11y.css；輸入欄家族用各自的 `:focus-within` 外框
- `FieldGroup` 的 `helpText` 會自動接上底下輸入元件的 `aria-describedby`（`TextField` / `TextArea` / `Select` / `PinInput`）
- 觸控區下限見 §6.2

**新增或修改元件時必須做到**：

- 優先用語意 HTML（`<section>` / `<h1>` / `<ul>` / `<label>`）。CLAUDE.md 的「不要用原生 HTML」只限**已有 UI Kit 對應的互動控制項**（button / input / checkbox / select…），結構標籤不在此列
- icon-only 的可點擊元素一律要有讀得懂的 `aria-label`
- 輸入元件要能被 `FieldGroup` 描述：用 `useFieldGroupHelpId()` 接 `aria-describedby`，error 狀態設 `aria-invalid`
- **不可只靠顏色傳達狀態** —— error 必須另有文字或 icon（`FieldGroup` 的 helpText 會帶 `icon-alert-circle-filled`）
- 自訂互動要能鍵盤操作，且**有可見的對焦樣式** —— 寫了 `outline: none` 就必須自己補 `:focus-visible` 或 `:focus-within`
- 新的 modal 類元件要驗證開啟後的 focus 落點與**關閉後的 focus restoration**（照 `Sheet` / `Dialog` 的寫法：存 `document.activeElement`，在 effect cleanup 時檢查 `isConnected` 再 focus 回去）

---

## 7. AI 守則（Do / Don't + 自我檢查）

### 7.1 Anti-patterns（**絕對不要**）

| ❌ Don't | ✅ Do |
|---------|------|
| `color: #3560ff` / `color: white` / `rgb(...)` | `var(--color-*)` token |
| `var(--color-x, #fallback)` 帶 fallback | `var(--color-x)`（token 一定存在） |
| 自訂 alpha：`rgba(53, 96, 255, 0.1)` | 用 `--color-*-subtle` / `-subtlest` token |
| `font-size: 16px; font-weight: 500;` | `<span className="text-label-large">` |
| `font-family: 'PingFang TC', ...` | `var(--font-family)` |
| `padding: 13px 17px` 任意值 | 4px-grid，`var(--space-*)` |
| `border-radius: 8px` 寫死 | `var(--radius-200)` |
| 卡片 / 按鈕加陰影 | 卡片無陰影、按鈕用背景色狀態區分（**Fab 除外**：懸浮元件，用 `--shadow-medium`） |
| 桌機 breakpoint `@media (min-width: 768px)` | mobile-first，max-width 480 |
| `:hover` 不包 `@media (hover: hover)` | 包進去，避免 touch 裝置 sticky hover |
| 自製 modal / sheet / toast / dropdown | 用 `Dialog` / `Sheet` / `Toast` / `Select` |
| `<div onClick>` 假按鈕 | `<Button>` / `<IconButton>` |
| `<input type="checkbox">` 原生 | `<Checkbox>` / `<Radio>` / `<Switch>` |
| 從 `'@/components/ui/Button'` 深層 import | `import { Button } from '@/components/ui'` |
| dark mode 自己手刻特例 | 仰賴 token 自動翻轉 |

### 7.2 Commit 前自我檢查

- [ ] CSS 無 hex / rgb / 命名色，且 `var(...)` 不帶 fallback
- [ ] 字體只用 `var(--font-family)` / `var(--font-family-code)`，文字尺寸用 `.text-*` class
- [ ] 色彩、文字層級、間距、圓角與陰影優先使用既有 token。結構性數值如 100%、1px border、aspect ratio、z-index，以及尚無對應 token 的元件內部尺寸，可在有明確理由時使用。
- [ ] `:hover` 包在 `@media (hover: hover)` 內
- [ ] 沒自製 modal / sheet / toast / dropdown
- [ ] Barrel import（`@/components/ui`），觸控區 ≥ 44×44

---

## 附錄

- [CLAUDE.md](./CLAUDE.md) — 元件決策樹 / Figma 整合
- [docs/component-internals.md](./docs/component-internals.md) — 元件內部規格（尺寸 / 邊框 / 內距，維護元件用）
- [docs/dark-mode.md](./docs/dark-mode.md) — Dark mode 設定
- [src/components/ui/tokens/](./src/components/ui/tokens/) — token 定義
- [figma-tokens.json](./figma-tokens.json) — Figma component / style key 索引
