# Design Spec — @invos/ios-ui-kit

> 「發票存摺」行動端產品的設計規範。涵蓋色彩、排版、間距、元件、陰影、互動。
> 與 [CLAUDE.md](./CLAUDE.md) 互補：CLAUDE.md 規範「**該用什麼元件**」，本檔規範「**長什麼樣**」。

---

## 0. 產品定位與視覺主題

**產品**：「發票存摺」mobile web + iOS/Android app。**使用者**：一般消費者 / 會員，非技術背景，單手操作。**核心任務**：雲端發票自動對獎與領獎、載具歸戶、紙本掃描對獎、消費明細查詢。

- **整體調性**：「現代極簡」—乾淨、留白充足、藍色品牌色點綴
- **色彩語法**：大面積中性灰白底 + 藍色 (`#3560FF`) 為唯一主動作色，其他語意色僅用於提示
- **形狀語法**：圓角偏大（按鈕 8–12、卡片 12–16），無銳角；按鈕、卡片、輸入欄統一節奏
- **動效調性**：短促克制（0.15–0.3s），ease-in-out 為主

> **AI 決策方向**：預設選 **安靜、克制、平衡**；遇對獎、發票、金流相關元件 **信任 > 趣味**，資訊清晰不誤導為先；獎勵與捐贈區塊可帶輕量正向感（用 prize / donation 語意色點綴）。

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

### 1.2 文字色階（由深到淺）

| Token | Hex | 場景 |
|-------|-----|------|
| `--color-content-bold` | `#101119` | 標題、最強調 |
| `--color-content-default` | `#3b3c43` | **正文（預設）** |
| `--color-content-subtle` | `#737380` | 次要說明、placeholder |
| `--color-content-subtlest` | `#9b9baa` | 最弱層級、disabled |
| `--color-content-plain` | `#000000` | 純黑（極少用） |

`Inverse 系列`（`--color-content-inverse-*`）給深色容器（Toast、Sheet overlay 上的文字）用。

### 1.3 語意色（intents）

每個 intent 都有 `default / bold / hover / active / subtle / subtlest` 6 階強弱。

| Intent | default | 用途（發票存摺情境） |
|--------|---------|--------------------|
| `brand` | `#3560ff` | 主動作 / 連結 |
| `success` | `#00bd64` | 對獎成功、已歸戶、匯款完成 |
| `danger` | `#f4252d` | 綁定失敗、刪除 |
| `warning` | `#ff8710` | 即將開獎、領獎期限 |
| `prize` | `#ffc423` | 中獎獎項、累計獎金 |
| `donation` | `#f61372` | 發票愛心碼、中獎捐贈 |
| `neutral` | `#737380` | 灰階、無情緒語意 |

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

**配色預設**：標題→`--color-content-bold`、正文→`--color-content-default`、次要→`--color-content-subtle`、提示→`--color-content-subtlest`、連結→`--color-content-link-default`。

---

## 3. 間距與佈局

### 3.1 4px-grid token（最常用幾檔）

| Token | 值 | 用途 |
|-------|-----|------|
| `--space-50 / 100` | 2 / 4 | 標題↔描述微距、tag 內距 |
| `--space-150 / 200 / 250` | 6 / 8 / 10 | small/medium 按鈕 padding、icon↔text |
| `--space-300` | 12 | large 按鈕 padding、緊湊內距 |
| `--space-400` | 16 | **標準容器內距、欄位間距（最常用）** |
| `--space-600` | 24 | 強調區塊、Dialog body |

> 完整定義（含 `--space-25 / 500 / 700 / 800 / 900`）見 [tokens/spacing.css](./src/components/ui/tokens/spacing.css)。**自製容器三檔內距**：標準 16 / 緊湊 12 / 強調 24。

### 3.2 佈局約束

- **頁面 max-width: 480px**，**不加桌機 breakpoint**（mobile-first）
- viewport meta：`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />`
- 頁面結構：`NavigationBar` (top) → 內容區（自由捲動）→ `TabBar` (bottom，可選)

### 3.3 圓角（實測元件對應）

| Token | 值 | 元件 |
|-------|-----|------|
| `--radius-150` | 6 | Checkbox、Tag (small) |
| `--radius-200` | 8 | Banner、Button small、SearchField、Tag (medium)、TabBar item、Tooltip |
| `--radius-250` | 10 | Button medium |
| `--radius-300` | 12 | **Button large、CardItem、PinInput、Select、SnackBar、TextField、TextArea**（最常用） |
| `--radius-400` | 16 | Dialog、Toast、InAppNotification |
| `--radius-600` | 24 | Sheet 頂部、Switch track |
| `--radius-full` | 9999 | Avatar、Badge、IconButton、ProgressBar、Slider track、Switch thumb、ChipBar、SheetHeader 把手 |

> Radio / Spinner / Slider thumb / TabBar 圓點直寫 `border-radius: 50%`（純圓形 width=height，不透過 token）。`--radius-0/50/100/500/800/1000` 目前未使用。

---

## 4. 陰影與層次（Elevation）

| Token | 規格 | 性質 | 元件 |
|-------|------|------|------|
| `--shadow-small` | `0 2px 4px` | 微投影 | Slider thumb、Switch thumb（小立體感） |
| `--shadow-medium` | `0 4px 8px` | 中投影 | Tooltip（用 `filter: drop-shadow` 含三角尾巴） |
| `--shadow-large` | `0 8px 16px` | 大投影 | SnackBar、InAppNotification（從頂端 / 底部浮起） |
| `--shadow-sheet` | `0 -4px 8px` | 反向投影 | Sheet（向上發散） |
| `--shadow-bold` | `0 0 16px` | **無方向 glow** | （目前未使用，保留給需要光暈強調的容器） |

**層次原則**：
1. **無陰影**（最常見）：頁面背景、CardItem、Banner、ListItem、NavigationBar、TabBar、Button、**Dialog、Toast** — 靠背景色、分隔線或 overlay 對比建立層級
2. **小立體感**：Slider thumb、Switch thumb → `--shadow-small`
3. **浮起 / 投影**：Tooltip、Sheet、SnackBar、InAppNotification → 對應 token

> Dialog 靠半透明 overlay backdrop 把背景變暗，Toast 靠 `--color-background-toast` 半透明深底建立對比，**都不需要陰影**。`--shadow-bold` 是 **glow 風格**（無 y-offset），與其他向下投影 token 性質不同——適合放在多彩背景或照片上的強調容器，**不要拿來當一般卡片陰影**。Dark mode 陰影 opacity 自動加重。

---

## 5. 元件樣式

### 5.1 Button 尺寸

| Size | Height | Radius | Padding | Font |
|------|--------|--------|---------|------|
| `large` | 48 | `--radius-300` | `--space-300` | `.text-label-large` |
| `medium` | 38 | `--radius-250` | `--space-200` | `.text-label-medium` |
| `small` | 30 | `--radius-200` | `--space-150` | `.text-label-small` |

### 5.2 邊框

| 場景 | 規格 |
|------|------|
| Outline 按鈕（Button、IconButton） | `1.5px solid var(--color-border-brand)` |
| 文字輸入欄 default（TextField、TextArea、Select、PinInput） | `1px solid var(--color-border-default)` |
| 文字輸入欄 focus | `border-color: var(--color-border-brand)` + `box-shadow: inset 0 0 0 1px var(--color-border-brand)`（1px border + 1px inset shadow，視覺 2px、避免 layout shift） |
| 文字輸入欄 error | `border-color: var(--color-border-danger)` + 同樣 inset shadow（**僅 `:not(:focus)` 時生效**——focus 永遠優先顯示 brand 框） |
| Checkbox / Radio | 預設 `2px solid var(--color-border-default)`，選中 / 錯誤改 `border-color` |
| 卡片 / 容器分隔（CardItem、ChipBar item） | `1px solid var(--color-border-subtle)` |
| TabBar 上緣（chrome ↔ 內容） | `border-top: 1px solid var(--color-border-subtle)` |

> **不畫線的地方**：ListItem / ListHeader / ListFooter 之間沒有 border，靠背景色與 padding 區隔；Divider 元件用 `background-color + height`（不是 border）；Badge / TabBar 重疊描邊用 `--color-background-*`（不破壞語意 border 色）。

### 5.3 容器內距（實測）

| 容器 | padding | gap |
|------|---------|-----|
| `CardItem` Large | 無外距（父層決定） | body 內 `--space-200` |
| `CardItem` Medium | `0 --space-400`（水平 16） | container `--space-400`、content 內 `--space-100` |
| `ListItem` | 水平 `--space-400`；上下 `--space-400`（default/rich）或 `--space-300`（compact） | row gap `--space-400` |
| `Sheet` body / footer | body 水平 16、footer 全 16 | 無 flex gap |
| `SheetHeader` | 水平 `--space-400`、頂部 `--space-300` | — |
| `Dialog` body / footer | body 全 24、footer `0 24 24` | body 主軸 `--space-600`、content 內 `--space-400`、actions `--space-400` |
| `FieldGroup` header / help | header `--space-200 0`（無水平）、help 頂部 `--space-200` | header `--space-50`、help `--space-200` |

---

## 6. 互動與動效

### 6.1 狀態機與 Hover

順序：`default → :focus-visible → :active → [disabled]`。

**Hover 為漸進增強**，`:hover` 一定要包在 `@media (hover: hover)` 內——不是因為「行動沒有 hover」（iPad 配滑鼠、桌機開 mobile web 都有），而是要避免 **觸控點擊後 hover 樣式「黏住」** 到下次點擊他處。

```css
@media (hover: hover) { .ui-button:hover { background: var(--color-background-brand-hover); } }
.ui-button:active { background: var(--color-background-brand-active); }
:disabled { opacity: 0.4; pointer-events: none; cursor: not-allowed; }
[data-loading] { pointer-events: none; cursor: not-allowed; }
```

> Loading 保持元件寬度（`visibility: hidden` + 絕對定位 `Spinner`），不抖動。

### 6.2 觸控區

最小可點擊區 **44×44px**（iOS HIG）；小尺寸元件（Tag、Badge）若可點擊，加透明 padding 擴大命中區。

### 6.3 Animation

**Duration 三檔**：`0.15s` 微互動 / `0.2s` 中型彈出 modal / `0.3s` 大型位移或長時程。

**Easing 按動效類型對應**（不要混用）：
- **pop-in**（opacity + scale）→ `ease-in-out`：Dialog body、Toast、Tooltip
- **slide-in**（位移進入）→ `ease-out`：Sheet 從底部滑上（`0.3s`）
- **fade-only / 連續變化** → `ease`：Dialog overlay（`0.2s`）、ProgressBar 寬度（`0.3s`）
- **0.15s 狀態切換** → `linear`（省略不寫）：hover、focus、color
- **spring-like 進出場**（客製 `cubic-bezier`，**僅限 push notification 類**）→ InAppNotification 進場用 overshoot 曲線、退場用反向 ease；`prefers-reduced-motion` 自動降為 `0.15s linear` opacity-only

> 一般元件不用 spring / bounce / 客製 cubic-bezier；觸控延遲約 100ms，動畫超過 0.3s 會感覺卡。客製曲線僅在 InAppNotification 這類「需要 spring 感」的進出場使用，且**必須**附 `prefers-reduced-motion` fallback。

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
| 卡片 / 按鈕加陰影 | 卡片無陰影、按鈕用背景色狀態區分 |
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
- [ ] 間距 / 圓角 / 陰影都用 token，沒有 magic number
- [ ] `:hover` 包在 `@media (hover: hover)` 內，沒自製 modal / sheet / toast / dropdown
- [ ] Barrel import（`@/components/ui`），觸控區 ≥ 44×44，Loading 不抖動

---

## 8. AI Prompt 範本

**新建頁面**：
```
建立頁面 [purpose]：barrel import 元件、結構 NavigationBar → 內容區 → TabBar（可選）、
max-width 480、不寫桌機 breakpoint、顏色用 var(--color-*)、字級用 .text-*、
間距用 var(--space-*)、:hover 包 @media (hover: hover)、dark mode 不需處理。
```

**Figma → 程式碼**：完整流程（含 Plugin API 反向組裝、Variable Collection key、PingFang TC 限制）見 [CLAUDE.md「Figma Integration」](./CLAUDE.md)。重點：解析 nodeId（**dash → colon**）→ 呼叫 `get_design_context` → 對照 `figma-tokens.json` 翻譯成本專案元件 + token，**不要產出 Tailwind**。

**狀態反饋色**：
```
[success/warning/danger/info] 提示：
- 瞬時短訊（中央）→ useToast()
- 操作結果（底部，可帶動作）→ <SnackBar action>
- push 通知（頂部，帶 leading icon、可點擊跳轉）→ useInAppNotification()
- 區塊內持續告示 → <Banner>
- 表單錯誤 → TextField 自帶 error prop；顏色用 --color-*-{intent}-* token
```

---

## 附錄

- [CLAUDE.md](./CLAUDE.md) — 元件決策樹 / Figma 整合 / anti-patterns
- [docs/dark-mode.md](./docs/dark-mode.md) — Dark mode 設定
- [src/components/ui/tokens/](./src/components/ui/tokens/) — token 定義
- [figma-tokens.json](./figma-tokens.json) — Figma component / style key 索引
