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

- **頁面 max-width: 480px**，**不加桌機 breakpoint**（mobile-first）。這個值是 `--ui-page-max-width`，欄寬不同的使用端覆寫它就好，不要各處改寫死值
- **覆蓋層一律對齊頁面欄寬，不是視窗**：`Dialog`、`Sheet`、`Toast`、`SnackBar`、`InAppNotification` 都是 `position: fixed`，但寬度以 `--ui-page-max-width` 計算。桌機瀏覽器裡頁面是固定欄寬置中，以視窗算寬會讓覆蓋層比頁面寬、或剛好等寬而左右零間距。**新增覆蓋層元件時照這個通則走，不要再加個別的寬度 prop**
  - 需要左右間距的（Dialog 24 / SnackBar 與 InAppNotification 12）寫成 `calc(var(--ui-page-max-width) - 間距 * 2)` —— 直接用欄寬就等於貼齊頁面邊緣
  - `Sheet` 貼齊底部、滿欄寬是刻意的，所以直接用欄寬不減間距
- **覆蓋層盡量不要同時出現在畫面上** —— 這是**設計層面的第一原則**，優先於下面的 z-index。要在 `Sheet` 上問使用者一個問題時，**正確做法是先關掉 Sheet 再開 `Dialog`**；如果那個流程複雜到需要中途確認（多步驟、可能放棄編輯），那它一開始就不該是 Sheet，**應該用完整頁面呈現**。兩層 modal 疊在一起會讓使用者不知道關掉上層之後會回到哪裡
- **疊放順序（由高至低）**：`Toast` > `SnackBar` > `Dialog` > `Sheet` > `InAppNotification` > `Tooltip`。值統一在 [tokens/layout.css](./src/components/ui/tokens/layout.css) 的 `--ui-z-*`，**元件 CSS 不得寫死 z-index 數字**；新增覆蓋層元件時在那裡加變數並排進這條順序。對照表見 [docs/component-internals.md](./docs/component-internals.md)
  - 這條順序是**保險，不是設計許可** —— 它保證萬一同時出現時不會出現「上層被下層蓋住、按鈕點不到」這種卡死，但不代表可以把疊加當成正常設計
  - 各元件的用途與**並存規則見 §4.1 / §4.2** —— 設計上這些覆蓋層是依序出現而非疊加，唯一時機不可預期的是 `InAppNotification`（系統推播），它刻意排在 modal 之下
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

### 4.1 覆蓋層各自的用途

選錯元件比疊錯層級嚴重。先用這張表確認語意，再看下面的並存規則。

| 元件 | 用途 | 誰觸發 | 阻擋操作 |
|------|------|--------|---------|
| `Toast` | **處理中**狀態，最常見是頁面載入；**當下不希望使用者做任何操作** | 使用者動作後由系統顯示 | 是（`blocking`） |
| `SnackBar` | 告知**使用者操作的結果** —— API 回傳的成功或失敗 | 使用者動作完成後 | 否 |
| `Dialog` | **重要的確認動作**，需要讓使用者暫停其他行為 | 使用者 | 是 |
| `Sheet` | 頁面上**簡單的**互動或資訊 —— 更多選項、一至兩個欄位 | 使用者 | 是 |
| `InAppNotification` | **系統主動推播**訊息，可區分種類 | 系統，**時機不可預期** | 否 |

- `Sheet` 只放得下「簡單」的東西。欄位一多、需要多步驟、或流程中途可能要確認，就**改用完整頁面**
- `Toast` 不是「短訊通知」—— 純告知結果請用 `SnackBar`；`Toast` 的語意是「正在處理，先別動」
- **背景捲動鎖是元件內建的**：`Dialog` / `Sheet` 開啟、或有 blocking `Toast`（預設即 blocking）期間，背景頁面會自動鎖住不可捲動，關閉後還原；使用端不需自行處理，也不要另外改 `body` 的 `overflow`

### 4.2 覆蓋層並存規則

**原則：覆蓋層之間是「依序」而不是「疊加」。** 使用者觸發的覆蓋層都該一個關掉才出現下一個。

- **`Dialog` 不與 `Toast` / `SnackBar` 同時出現** —— 正確順序是：按下 Dialog 的動作 → **Dialog 關閉** → 再用 `SnackBar` 告知結果
- **`Sheet` 開著時不疊 `Dialog`** —— 先關 `Sheet`；會需要中途確認的流程一開始就該用完整頁面
- **唯一時機不可預期的是 `InAppNotification`** —— 它是系統主動推播，可能剛好在別的覆蓋層顯示時到達。這正是它刻意排在 modal **之下**的原因：不該蓋在使用者正在做決策的畫面上

> §3.2 的 z-index 順序是**保險** —— 保證萬一同時出現時不會「上層被下層蓋住、按鈕點不到」，**不是**可以把疊加當正常設計的許可。

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
- **slide-in**（位移進入）→ `ease-out`：Sheet 從底部滑上（`0.3s`）、SnackBar 由下往上滑入（`0.25s`，`prefers-reduced-motion` 降為 `0.15s linear` 只淡入不位移）
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
- `Dialog` / `Sheet` 的 `inert` 會一併停掉 overlay 點擊、Esc、Tab 聚焦與下拉關閉 —— 請求進行中要鎖住畫面時用它，內容與已填的值都留在畫面上
- 觸控區下限見 §6.2

**新增或修改元件時必須做到**：

- 優先用語意 HTML（`<section>` / `<h1>` / `<ul>` / `<label>`）。CLAUDE.md 的「不要用原生 HTML」只限**已有 UI Kit 對應的互動控制項**（button / input / checkbox / select…），結構標籤不在此列
- icon-only 的可點擊元素一律要有讀得懂的 `aria-label`
- 輸入元件要能被 `FieldGroup` 描述：用 `useFieldGroupHelpId()` 接 `aria-describedby`，error 狀態設 `aria-invalid`
- **不可只靠顏色傳達狀態** —— error 必須另有文字或 icon（`FieldGroup` 的 helpText 會帶 `icon-alert-circle-filled`）
- 自訂互動要能鍵盤操作，且**有可見的對焦樣式** —— 寫了 `outline: none` 就必須自己補 `:focus-visible` 或 `:focus-within`
- 新的 modal 類元件要驗證開啟後的 focus 落點與**關閉後的 focus restoration**（照 `Sheet` / `Dialog` 的寫法：存 `document.activeElement`，在 effect cleanup 時檢查 `isConnected` 再 focus 回去）
- 通知類元件（會自動出現又消失的）要有 live region，且**整組只能有一層**：常駐的 viewport 容器掛 `role="status"`，裡面的 bar 本體傳 `role="none"`。理由有兩個 —— live region 必須先存在於 DOM，之後塞進去的內容才會被可靠朗讀（整塊連 role 一起插入不保證會唸）；巢狀 live region 會讓螢幕閱讀器唸兩次。照 `SnackBarProvider` 的寫法
- **`inert` 擋不住 document 上的事件監聽** —— 它只擋指標與焦點。元件若把 Esc / Tab trap / 拖曳綁在 `document` 或子節點上，加 `inert` 時必須另外擋掉那些 effect（見 `Sheet` / `Dialog`）

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
| 自製 modal / sheet / toast / snackbar / dropdown | 用 `Dialog` / `Sheet` / `Toast` / `SnackBarProvider` / `Select` |
| `Sheet` 開著時再疊一層 `Dialog` | 先關 `Sheet` 再開 `Dialog`；會需要中途確認的流程改用完整頁面，不要用 `Sheet` |
| `Dialog` 開著時同時出現 `Toast` / `SnackBar` | 按下 Dialog 的動作 → 關閉 Dialog → 再用 `SnackBar` 告知結果（§4.2） |
| 拿 `Toast` 當一般短訊通知 | `Toast` 是「正在處理，先別動」；告知操作結果用 `SnackBar`（§4.1） |
| 自製覆蓋層的定位與顯示管理（portal、計時、佇列） | 用元件既有的 Provider；覆蓋層寬度一律走 `--ui-page-max-width` |
| `<div onClick>` 假按鈕 | `<Button>` / `<IconButton>` |
| `<input type="checkbox">` 原生 | `<Checkbox>` / `<Radio>` / `<Switch>` |
| 從 `'@/components/ui/Button'` 深層 import | `import { Button } from '@/components/ui'` |
| dark mode 自己手刻特例 | 仰賴 token 自動翻轉 |

### 7.2 Commit 前自我檢查

- [ ] CSS 無 hex / rgb / 命名色，且 `var(...)` 不帶 fallback
- [ ] 字體只用 `var(--font-family)` / `var(--font-family-code)`，文字尺寸用 `.text-*` class
- [ ] 色彩、文字層級、間距、圓角與陰影優先使用既有 token。結構性數值如 100%、1px border、aspect ratio、z-index，以及尚無對應 token 的元件內部尺寸，可在有明確理由時使用。
- [ ] `:hover` 包在 `@media (hover: hover)` 內
- [ ] 沒自製 modal / sheet / toast / snackbar / dropdown
- [ ] 覆蓋層是依序出現而非疊加：沒有 `Sheet` + `Dialog`、也沒有 `Dialog` + `Toast` / `SnackBar`（§4.2）
- [ ] Barrel import（`@/components/ui`），觸控區 ≥ 44×44

---

## 附錄

- [CLAUDE.md](./CLAUDE.md) — 元件決策樹 / Figma 整合
- [docs/component-internals.md](./docs/component-internals.md) — 元件內部規格（尺寸 / 邊框 / 內距，維護元件用）
- [docs/dark-mode.md](./docs/dark-mode.md) — Dark mode 設定
- [src/components/ui/tokens/](./src/components/ui/tokens/) — token 定義
- [figma-tokens.json](./figma-tokens.json) — Figma component / style key 索引
