# 消費端使用規範 Implementation Plan

> **狀態：Task 1–7 已執行完畢（2026-08-06）。** 本檔內嵌的文件內容是**執行前的草稿**，
> 落地後又依設計決定調整過（Dialog danger 清單、Button 層級納入 white、SnackBar 字數上限、
> 新增 ListItem 章節、驗證時機改為送出時驗證…）。
> **實際規範以 repo 內的 `docs/usage.md`、`docs/component-usage.md`、`docs/usage-review.md` 為準**，
> 不要拿本檔的內嵌內容覆蓋回去。剩下 Task 8（發版）與 Task 9（e2e）尚未執行。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓消費端 repo 的 AI agent 讀到與安裝版本一致的設計系統使用規範，並能事後用 review agent 自查。

**Architecture:** 規範文件（usage.md、component-usage.md、usage-review.md、agent 殼原始檔）放本 repo `docs/` 頂層，靠現有 `files: ["docs/*.md", ...]` 隨 npm 套件散佈；消費端只放薄入口（CLAUDE.md 指針 + agent 殼），內容都指向 `node_modules` 內文件。create-prototype skill 的 templates 讓新專案自動就位。

**Tech Stack:** 純 Markdown 文件 + npm packaging（無程式碼變更）。spec 見 `docs/superpowers/specs/2026-08-06-consumer-usage-guidelines-design.md`。

**重要事實（執行前先知道）：**

- 間距 token 是 `--space-*`（**不是** `--spacing-*`；create-prototype SKILL.md 現存這個筆誤，Task 7 修正）。
- radius token：`--radius-0` ~ `--radius-1000`；shadow token：`--shadow-small/medium/large/bold/sheet`。
- typography class 前綴：`.text-body-*`、`.text-label-*`、`.text-heading-*`、`.text-display-*`、`.text-code-*`。
- `package.json` 的 `files` 已含 `docs/*.md`（僅 docs 頂層，不含子目錄）——四份新文件都放 `docs/` 頂層即可，不改打包設定。
- create-prototype skill 位置：`~/.claude/skills/create-prototype/`（不在本 repo，可能不在任何 git repo 內——若無 git 就只存檔不 commit）。
- 消費端要讀到新文件，套件必須發佈新 tag（Task 8）；在那之前 scaffold 測試會抓到舊版，所以 Task 9 的 e2e 測試排在發佈後。

**文件分層（Task 2 新增第四層的理由）：**

| 文件 | 內容 | 讀者 |
|------|------|------|
| `design.md` | 跨元件設計原則：token、色彩排版間距、覆蓋層並存、a11y、anti-patterns | 兩端 |
| `docs/component-internals.md` | 元件內部實測數值（尺寸、邊框、內距） | 維護者 |
| `docs/usage.md` | 消費端入口：前置需求、Decision Tree、token 規則、檢查清單 | 消費端 |
| `docs/component-usage.md`（新） | **元件級使用語意**：選對元件之後怎麼用才對 | 消費端 |

`component-usage.md` 的內容來自 Figma「🧰 UI Kit 2025 - Guideline - Spec」的 14 份元件 guideline。收錄原則：**只寫使用端會做錯的**——已烘進元件、使用端改不了的數值（disabled opacity 40%、SnackBar 停留 3 秒、Tooltip max-width 240、Dialog max-width 376）不寫；跨元件原則留在 design.md。

---

### Task 1: 建立 `docs/usage.md`（消費端使用規範入口）

**Files:**
- Create: `docs/usage.md`

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

````markdown
# @invos/design-system 使用規範

> 本文件寫給**引用此套件開發頁面 / prototype 的專案**（工程師與 AI agent）。
> 設計系統本身的維護規範見 repo 根目錄 CLAUDE.md；設計原則與完整 token 規格見 [design.md](../design.md)。

## 安裝到既有專案

已安裝 `@invos/design-system` 的專案，做兩件事讓 AI agent 遵循本規範：

**1. 專案 CLAUDE.md 加入：**

```markdown
## 設計系統

本專案使用 @invos/design-system。**寫任何 UI 之前**，先讀
`node_modules/@invos/design-system/docs/usage.md` 並遵循其中規範。
完成頁面後用 `invos-ui-reviewer` agent 對改動的頁面檔案自查。
```

**2. 複製 review agent 殼：**

```bash
mkdir -p .claude/agents
cp node_modules/@invos/design-system/docs/invos-ui-reviewer.agent.md .claude/agents/invos-ui-reviewer.md
```

之後升級套件，本文件與審查清單都隨 `node_modules` 更新，入口與 agent 殼不必再動。

## 前置需求

- **`styles.css` 整個專案只在入口引一次**（通常是 `main.tsx`）：
  `import '@invos/design-system/styles.css'` —— 沒引，元件完全沒樣式。
  `preflight.css` 選用（讓自訂 DOM 也套設計系統的 reset 與 body 預設）。
- **`useToast()` / `useSnackBar()` / `useInAppNotification()` 要先掛對應 Provider**，沒掛就呼叫會 throw：

  ```tsx
  <InAppNotificationProvider>
    <ToastProvider>
      <SnackBarProvider>
        <App />
      </SnackBarProvider>
    </ToastProvider>
  </InAppNotificationProvider>
  ```

  不要自己寫 portal 版通知元件——定位、計時、佇列、live region 都在 Provider 內建。
- **viewport 必含 `viewport-fit=cover`**（貼底/貼頂元件的 safe-area 才生效）；
  **禁止 `maximum-scale` / `user-scalable=no`**（無障礙反模式）。
- 頁面欄寬 480px；要改**只覆寫 `--ui-page-max-width`**，overlay 元件都以此變數計寬，一起跟上。
- **選對元件之後還有使用細則** —— 各元件的組合限制、樣式層級、狀態語意見
  [component-usage.md](./component-usage.md)。下方 Decision Tree 的「細則」欄直接連到對應章節。

## Component Decision Tree

下列場景 → 使用的元件。**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本**。

| 需求 | 用哪個元件 | 細則 |
|------|-----------|------|
| 主要動作按鈕 | `<Button variant="filled" colorType="primary">` | [Button](./component-usage.md#button) |
| 次要動作按鈕 | `<Button variant="filled" colorType="neutral">` 或 `<Button variant="outline">` | [Button](./component-usage.md#button) |
| 弱化動作（文字樣式） | `<Button variant="text">` 或 `<Button variant="ghost">` | [Button](./component-usage.md#button) |
| 只有 icon 的點擊 | `<IconButton aria-label="...">` | [IconButton](./component-usage.md#iconbutton) |
| 懸浮主要動作按鈕（FAB） | `<Fab aria-label="...">`（可加 `text` 顯示標籤） | [IconButton](./component-usage.md#iconbutton) |
| 單行輸入欄位 | `<TextField>` | [輸入欄家族](./component-usage.md#textfield--textarea--select) |
| 多行輸入欄位 | `<TextArea>` | [輸入欄家族](./component-usage.md#textfield--textarea--select) |
| 下拉選單 | `<Select>`（選項要圖文排版 / 大點擊區時，用 `onPickerOpen` 把展開交給 `<Sheet>` + `<ListItem>` 選單） | [輸入欄家族](./component-usage.md#textfield--textarea--select) |
| 搜尋輸入 | `<SearchField>` | [輸入欄家族](./component-usage.md#textfield--textarea--select) |
| OTP / 驗證碼 | `<PinInput>` | [輸入欄家族](./component-usage.md#textfield--textarea--select) |
| 切換 on/off | `<Switch>` | [Checkbox](./component-usage.md#checkbox) |
| 單選 | `<Radio>` | [Radio](./component-usage.md#radio) |
| 多選 | `<Checkbox>` | [Checkbox](./component-usage.md#checkbox) |
| 滑桿 | `<Slider>` | — |
| 表單分組容器 | `<FieldGroup label="..." helpText="...">` —— **表單欄位一律包這層**，label / helpText 由 FieldGroup 自己渲染（`<FieldGroupHelpText>` 只在單獨使用時才需要）。不包 FieldGroup 而直接用輸入元件時，改傳 `variant="inner-label"` | [輸入欄家族](./component-usage.md#textfield--textarea--select) |
| **重要的確認動作**，需讓使用者暫停其他行為 | `<Dialog>`。動作按下後先關閉 Dialog，再用 `<SnackBar>` 告知結果 —— **不要讓 Dialog 與 Toast / SnackBar 同時出現** | [Dialog](./component-usage.md#dialog) |
| **簡單的**互動或資訊（更多選項、一至兩個欄位） | `<Sheet>` / 搭配 `<SheetHeader>`。**欄位一多、需要多步驟、或中途可能要確認，就改用完整頁面** —— 不要在 Sheet 上再疊一層 `<Dialog>` | [Sheet](./component-usage.md#sheet) |
| **處理中**（頁面載入等），且當下不希望使用者做任何操作 | `<Toast>`（Provider 模式、`useToast()`）。**不是一般短訊通知** —— 告知結果請用 `<SnackBar>` | [SnackBar](./component-usage.md#snackbar) |
| 告知**使用者操作的結果**（API 回傳成功 / 失敗） | `<SnackBar>`（Provider 模式、`useSnackBar()`；貼齊頁面底部、連續呼叫排隊不疊加）| [SnackBar](./component-usage.md#snackbar) |
| **系統主動推播**訊息（可區分種類、可點擊跳轉） | `<InAppNotification>`（Provider 模式、`useInAppNotification()`）。時機不可預期，所以刻意排在 modal 之下 | [InAppNotification](./component-usage.md#inappnotification) |
| 區塊內告示（警告、資訊） | `<Banner>` | — |
| 整頁空狀態 / 錯誤狀態（斷線、無結果、404） | `<PageStatus status="...">` | — |
| 頁面頂部標題列 | `<NavigationBar>`（regular / large / home / search / tabs）| — |
| 底部 tab 導覽 | `<TabBar>` | — |
| 分頁切換（內容區） | `<Tabs>`。**功能分群一律先用 Tabs**，不要直接用 `<ChipBar>` | [Tabs](./component-usage.md#tabs) |
| 上一頁 / 下一頁導覽（含置中標題） | `<PageNavigation>` | — |
| 日期選擇 | 原生 `<input type="date">`（已定案：雙平台採原生 picker，**不要自製、不要拿 `<Select>` 頂替**） | — |
| 列表項（設定、選單） | `<ListItem>` | [Radio](./component-usage.md#radio) / [Checkbox](./component-usage.md#checkbox) |
| 卡片（內容 + 描述） | `<CardItem>` | — |
| 列表的 header / footer | `<ListHeader>` / `<ListFooter>` | — |
| 分隔線 | `<Divider>` | — |
| 標籤（可多個） | `<Tag>` / 可選取的 chips 列用 `<ChipBar>` —— **只用於內容分群；功能分群請先用 `<Tabs>`** | [Tag](./component-usage.md#tag) / [ChipBar](./component-usage.md#chipbar) |
| 數字徽章（通知未讀數） | `<Badge>` | — |
| 使用者頭像 | `<Avatar>` | — |
| 載入指示器 | `<Spinner>` | — |
| 進度條 | `<ProgressBar>` / 多條用 `<ProgressGroup>` | — |
| 輪播 / 分頁位置指示點 | `<DottedController>`（照片上用 `type="overlap"`） | — |
| 提示氣泡（簡短說明） | `<Tooltip>` | [Tooltip](./component-usage.md#tooltip) |

## 找不到對應元件時

1. **先確認真的沒有** —— 查套件的 export 與元件 props 型別
   （`node_modules/@invos/design-system/dist/src/components/ui/index.d.ts`）
2. **只有視覺差異** → 用既有元件的 props 調整，不要另做一個
3. **互動語意不同**（例：設計稿要多選、系統只有單選元件）→ **不可用近似元件硬套**，語意錯誤比缺元件嚴重
4. **明確回報缺口**給設計系統維護者（repo：`will-invos/iv-design-system`）——
   **不得只留隱藏的 TODO 註解，也不要自製近似元件**

## Token 規則

可用 token 清單見 `node_modules/@invos/design-system/dist/index.css`（搜 `--color-` / `--space-` 等前綴）；設計意圖見 [design.md](../design.md)。

- 顏色一律 `var(--color-*)` —— 禁 hex / rgb() / 具名色（`transparent` 允許）
- 間距（padding / margin / gap）一律 `var(--space-*)` —— `0`、`auto` 允許
- 圓角一律 `var(--radius-*)`；陰影一律 `var(--shadow-*)`
- 文字一律套 typography class（`.text-body-*`、`.text-label-*`、`.text-heading-*`、`.text-display-*`、`.text-code-*`），
  **不要在 CSS 自定 `font-size` / `font-weight` / `line-height` / `font-family`**
- **禁 Tailwind class**（即使設計工具回傳的是 Tailwind）
- **禁 `var()` fallback**（`var(--token, 值)` 的第二參數）

## 互動語意規則

- **Dialog 與 Toast / SnackBar 不同時出現**：確認動作按下後先關 Dialog，再用 SnackBar 告知結果
- **Sheet 上不疊 Dialog**：欄位一多、需要多步驟、或中途要確認 → 改用完整頁面
- **Toast ≠ 通知**：Toast 是「處理中、暫停使用者操作」；操作結果用 SnackBar；系統主動推播用 InAppNotification
- **日期選擇一律原生 `<input type="date">`**

## 交付前自我檢查清單

完成頁面後逐條自查（與 `usage-review.md` 的審查規則一一對應）：

- [ ] 沒有用原生 HTML / 自製版本頂替 Decision Tree 裡已有的元件
- [ ] 顏色皆 `var(--color-*)`，無 hardcode
- [ ] 間距皆 `var(--space-*)`（`0` / `auto` 除外）
- [ ] `border-radius` 皆 `var(--radius-*)`；`box-shadow` 皆 `var(--shadow-*)`
- [ ] 文字皆套 `.text-*` class，CSS 無自定字型屬性
- [ ] 無 Tailwind class、無 `var()` fallback
- [ ] 用到的 hook 對應 Provider 已掛
- [ ] Dialog 與 Toast / SnackBar 無同時出現；Sheet 上無 Dialog
- [ ] 日期用原生 `<input type="date">`
- [ ] 缺元件處已明確回報，非隱藏 TODO
- [ ] 用到的元件已對照 [component-usage.md](./component-usage.md) 的細則
````

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/usage.md && npm run lint`
Expected: 檔案存在、lint 通過

```bash
git add docs/usage.md
git commit -m "docs(usage): 新增消費端使用規範（隨套件發佈）"
```

---

### Task 2: 建立 `docs/component-usage.md`（元件級使用規範）

**Files:**
- Create: `docs/component-usage.md`

**來源**：Figma「🧰 UI Kit 2025 - Guideline - Spec」14 份元件 guideline，已對照本 repo 元件型別逐條翻譯成 props 語言。

**已處理的五個落差（寫作時不要退回 Figma 原文）：**

1. Figma Dialog 寫「多個 Dialog 同時觸發會互相疊加」——那是描述原生行為。本系統 design.md §4.2 規定覆蓋層依序出現，**以 repo 為準**，文中要註明是刻意收緊。
2. Figma Snackbar 寫「用 snackbar 取代既有的 toast」——指的是取代 **iOS/Android 原生 toast**，不是本系統的 `<Toast>`（處理中 / blocking）。直接照抄會讓 AI 以為 `<Toast>` 已廢棄。
3. Figma 規定輸入框「一般優先使用雙行樣式」，但 `TextField` / `TextArea` / `Select` 的 `variant` 預設是 `'default'`。
   **已定案：元件預設維持 `'default'` 不改**（改預設是 breaking change）。本專案的標題來源不是 Figma 的
   「單行 vs 雙行」二分，而是 **FieldGroup**：
   - 標準做法 —— 表單欄位包 `<FieldGroup label="…">`，標題與 helpText 由 FieldGroup 渲染，輸入元件維持預設 `variant="default"`
   - 例外 —— 不包 FieldGroup 而直接單獨使用輸入元件時，**必須** `variant="inner-label"` 並傳 `label`
   文件要照這個二分寫，並註明預設值是刻意保留的，不要當成待修的 bug。
4. Figma Tooltip 是「直接出現、只出現一次」的 coach-mark，不是 hover 提示；對應到 code 是受控的 `open` prop。
5. Figma「Icon button 不要與文字按鈕並排」在 repo 完全沒有記載，是版面層級的錯誤，要收進來。

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

````markdown
# 元件使用規範 — @invos/design-system

> 承接 [usage.md](./usage.md) 的 Component Decision Tree：**選對元件之後，怎麼用才對**。
> 每節只寫使用端會做錯的事——已烘進元件的數值（disabled 透明度、SnackBar 停留秒數、
> Tooltip 最大寬度…）不列在這裡，直接用元件即可。
> 跨元件的原則（token、覆蓋層並存、動效、a11y）見 [design.md](../design.md)。

## Button

- **一組按鈕最多兩種樣式層級。** 主要層級：`variant="filled"` 搭 `primary` / `danger` / `prize` / `donation`；
  次要層級：`filled` + `neutral`、`variant="outline"`、`variant="ghost"`。
- 多顆按鈕並排時**不要全用 primary**——沒有層級等於沒有主次。全部用次要層級是允許的。
- **需要三個以上的操作 → 改用 `<Sheet>` 或 `<TabBar>`**，不要一排三顆按鈕。
- **不要給固定寬度**：讓它依文案縮放，或 `width: 100%` 撐滿。寫死寬度在使用者放大系統字級時會破版。
- 文案保持一行、簡短；超過會以省略號截斷。
- `variant="text"` vs `ghost`：text 邊界貼合內容（無 padding）、圖文間距更緊、按下改字色不改背景。
  要貼齊文字基線時用 text，要有可點面積時用 ghost。
- 深色模式下主按鈕字色仍為白色——由 token 處理，**不要自己覆寫**。

❌ 一排四顆 primary ／ ❌ 混三種次要樣式 ／ ❌ `width: 120px`

## IconButton

- **同一區塊不要把 `<Button>` 與 `<IconButton>` 並排混用。** 空間夠就全部用文字按鈕，
  需要緊湊排列就全部用 icon 按鈕。
- `size` 四檔：`large` / `medium` / `small` / `xsmall`。
- `badge`（紅點）表示該按鈕後方的頁面有更新或新功能。只在 enabled 狀態顯示；
  **`size="xsmall"` 不支援紅點**，不要在該尺寸傳 `badge`。
- 用無外框（`variant="ghost"`）表示選取狀態時：未選用**輪廓**樣式 icon、已選用**填滿**樣式 icon。
- icon 必須清楚對應它觸發的操作。`aria-label` 是 TypeScript 必填，寫得讓人讀得懂。
- 懸浮主操作用 `<Fab>`（自帶 `--shadow-medium`），**不要拿 IconButton 自己加陰影**。

## Dialog

- **`actions` 最多 2 個。** 需要三個以上操作 → 改用 `<Sheet>`。
- `title` 簡短（十個字內、最多兩行），細節放 `description`。
- **破壞性且不可復原**（刪除帳號 / 刪除發票 / 刪除票券）→ `type="danger"`。
  元件會把第一顆 action 設為 danger 並排在左側，降低誤觸。
- **可以再建立的行為不是 danger**（登出、移除會員卡、歸戶載具）→ 用 `type="default"`，主要按鈕維持在右側。
- 純確認（只是「我知道了」）→ 該顆 action 用 `colorType="neutral"`。
  捐贈 / 愛心碼相關 → `colorType="donation"`。
- 版型用 `cta`：`"1-button"` 撐滿全寬、`"2-buttons-horizontal"` 均分寬度、`"2-buttons-vertical"` 縱向（主要在最上）。
- 覆蓋層並存規則見 [design.md §4.2](../design.md)：**不與 Toast / SnackBar 同時出現，也不疊在 Sheet 上**。
  Figma guideline 描述的「多個 Dialog 會互相疊加」是原生行為，本系統刻意收緊為依序出現。

## Sheet

- **高度不要超過畫面 3/4。** 內容會佔滿一頁或需要捲動 → 直接改用完整頁面，
  否則捲動會與下拉關閉的手勢衝突。
- **`Handle`（橫桿）與關閉按鈕擇一，不同時存在。** 有 CTA `footer` 時用關閉按鈕，給使用者放棄的路徑。
- `headlineSize` 優先 `"large"`；空間真的不夠才用 `"regular"`，或不給 `headline`
  （此時要傳 `aria-label` 當無障礙名稱）。
- header 左側是關閉鈕，**其他功能按鈕放 `<SheetHeader trailing>`**（右側）。
- body 四周保持 `var(--space-400)`；放 `<ListItem>` 時**不要再加**，元件自帶內距。
- `footer` 一到兩顆 CTA，兩顆可橫向或縱向排列。CTA footer 也可以單獨常駐在頁面底部。
- **不要在 Sheet 上再開 Dialog。**

## SnackBar

- 用 `useSnackBar().show()`，**不要自己 render `<SnackBar>` 或做 portal**——定位、計時、佇列都在 Provider 內。
- 一則只能一個操作。`buttonText` 簡短，**四個中文字以內**。
- SnackBar 貼齊頁面底部：頁面若有貼底 CTA、工具列或 FAB，**要自行留出空間避免遮擋**。
- 連續呼叫會排隊依序顯示，**不會堆疊**，不需要自己做節流或防抖。
- 圖示用填滿造型（`status="success" | "error"` 已對應好），不要換成線性 icon。

> **Toast vs SnackBar**：`<Toast>` 是「正在處理，先別動」（預設 blocking）；操作結果一律用 SnackBar。
> Figma guideline 寫的「用 snackbar 取代 toast」指的是取代 **iOS / Android 原生 toast**，
> 不是本系統的 `<Toast>` 元件。

## InAppNotification

- 系統**主動推播**用，時機不可預期。當前頁面的操作回饋請用 SnackBar。
- **固定的提示種類**（如發票存入）→ 傳 `icon`；**新任務推播、升級**這類要吸引點擊 → 傳 `image`。
- `button.label` 四個字以內。
- 一次只顯示一則，多則依序顯示。
- 圖層刻意排在 Tooltip 之上、Dialog 之下——不蓋在使用者正在做決策的畫面上。
- 支援上滑關閉與點擊跳轉（`onPress`），不需要自己綁手勢。

## Tabs

- **`items` 至少 2 個**，不要只放一個 tab。
- **超過 4 個改 `type="compact"`**：指示條縮到文字寬、整列可橫向捲動。
- 只放文字，**不放 icon**；label 一行，超過以省略號呈現。
- `badge` 可用 `'dot'` 或數字，**同一列不要混用兩種**。tab 被點擊後視為已讀，應清掉該筆 badge。
  數字上限顯示 99+。
- **分隔線**：作為功能分群（接在 `<NavigationBar>` 下）→ 導覽列與 Tabs 之間**不要**分隔線；
  作為頁面內錨點 → 導覽列下方**要有**分隔線。

## ChipBar

- **只用於「內容」分群**（例如「為你推薦 / 購物回饋 / 中獎名單」）。
  **功能面的分群一律先用 `<Tabs>`，不要跳過 Tabs 直接用 ChipBar。**
- 使用順序次於 Tabs；兩者同時存在時，ChipBar 排在 Tabs 下方。
- badge 規則同 Tabs：`'dot'` 與數字**不混用**，點擊後清除。
- 超出螢幕寬度用 `scrollable`，讓整列可左右拖移。

## Tag

- **優先 `variant="light"`**，讓標籤不搶眼；深色 / 圖片背景或需要強調時才用 `"bold"`。
- 列表、卡片或其他元件內部空間有限 → `size="small"`；整頁內容中才用 `"medium"`。
- 圖示通常放左側（`leadingIcon`）。
- Tag 是**附加資訊**，不是可點的篩選器。要能選取請用 `<ChipBar>`。
- 可點的 Tag 記得加透明 padding 把命中區撐到 44×44。

## Tooltip

- 用於揭示不易發現的功能，是**輕量提示不是說明文件**：一兩句話、最多兩行、純文字，
  不放促銷內容或與當前流程無關的資訊。
- 可用受控 `open` 直接出現，不必等 hover 或點擊。**通常只出現一次**——提示本身或指定元件被點過就該關掉。
- **同一畫面不要同時出現多個提示，也不要互相重疊。**
- `placement`（top/bottom/left/right）+ `align`（start/center/end）共 12 種位置，
  挑不會被螢幕邊界裁切的組合。

## TextField / TextArea / Select

- **表單欄位一律包 `<FieldGroup label="…">`。** label 與 helpText 由 FieldGroup 渲染
  （標題在欄位上方、說明在下方，`aria-describedby` 自動接好），此時輸入元件維持預設
  `variant="default"`，**不要再傳自己的 `label`**。
- **不包 FieldGroup 而單獨使用輸入元件時 → 必須傳 `variant="inner-label"` 與 `label`**，
  讓標題內建在欄位裡（空值且未對焦時當佔位字，一對焦或有值就浮到上方），
  使用者輸入中仍看得到欄位名。
  ⚠️ `variant` 預設是 `"default"`，不傳就沒有內建標題——**必須顯式指定**。
  （預設值刻意保留為 `"default"`，因為標準做法是包 FieldGroup。這不是待修的 bug，不要為此改元件。）
- **同一表單不要混用兩種做法**：要嘛整份都包 FieldGroup，要嘛整份都用 `inner-label`。
- **`variant="inner-label"` 已經有標題，不要再加 `leadingIcon`。**
- `leadingIcon` 是示意欄位內容的裝飾；`trailingIcon` 是可點的按鈕（例如顯示 / 隱藏密碼）。
- `status="error"` **優先於對焦狀態**：輸入中驗證失敗就切成 error。
- **helpText 與錯誤訊息不同時出現，錯誤優先。** helpText 走 `<FieldGroup helpText>`，
  錯誤時建議帶 icon；提示字數限制這類可對齊右方。
- 多行內容用 `<TextArea>`（可設最大高度、超過捲動），不要用 TextField 硬塞。
- OTP / 驗證碼用 `<PinInput>`，**不要用多個 TextField 拼**。
- 搜尋用 `<SearchField>`（填滿背景、無邊框、左側常駐搜尋 icon、有值時顯示清除鈕），
  **不要拿 TextField 加 icon 頂替**。
- 欄位大小盡量與預期輸入量相符——尺寸本身就是給使用者的提示。

### 驗證時機

| 欄位 | 驗證時機 |
|------|---------|
| 一般文字（字數 / 英數限制） | 使用者**輸入時** |
| 建立密碼（是否符合條件） | 使用者**輸入時** |
| 電子郵件 | 使用者**離開欄位時**（blur） |
| 電話號碼 | 使用者**離開欄位時**（blur） |
| 密碼、驗證碼 | 表單**送出前** |
| Checkbox / Radio 必選 | 表單**送出前** |
| Select 必填 | 表單**送出前** |
| 上傳欄位 | 表單**送出前** |

> 同一欄位可以有多個驗證時機；上表是預設建議，情境不同可調整。

## Radio

- 一組互斥選項中選一個。**選項 2–5 個**；更多請改 `<Select>`。
- **以縱向排列為主**；要橫排就保持一致的左右間距。
- 點擊範圍含 label 文字（元件已處理，不要自己縮小）。
- 已選中的再點**不會**取消——需要能取消請重新確認是不是該用 `<Checkbox>`。
- **表單選項用 `<Radio>`；頁面內容是列表（List View）時改用 `<ListItem>` + 右側 check icon**，
  維持列表的操作一律顯示在右側。
- 選項描述文字簡潔，並與周邊元素左側對齊。

## Checkbox

- 多選、每個彼此獨立。只能單選的情境用 `<Radio>`。
- 點擊範圍含 label；**label 內含連結時，把點擊範圍縮到方框本身**（連結另外處理），
  避免點連結時誤切換勾選狀態。
- **Checkbox vs Switch**：先勾選、再按儲存 → `<Checkbox>`；切換後**立即生效** → `<Switch>`。
- **同意條款 / 表單選項用 `<Checkbox>`；列表（List View）多選改 `<ListItem>` + 右側 checkbox。**
- 選項描述文字簡潔，並與周邊元素左側對齊。
````

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/component-usage.md && npm run lint`
Expected: 檔案存在、lint 通過

```bash
git add docs/component-usage.md
git commit -m "docs(usage): 新增元件級使用規範（來源：Figma UI Kit Guideline）"
```

---

### Task 3: 建立 `docs/usage-review.md`（消費端審查清單）

**Files:**
- Create: `docs/usage-review.md`

**範圍決定**：維持 10 條，只審 token 與元件選用。元件級細則（ChipBar vs Tabs、按鈕層級數、輸入框 variant 一致性…）交由寫作階段讀 `component-usage.md` 自律——那些規則需要判讀情境，機檢誤判率高。

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

````markdown
# @invos/design-system 頁面用法審查清單

> 供消費端專案的 `invos-ui-reviewer` agent 使用：對**頁面程式碼**（`.tsx` + 對應 `.css`）逐條檢查。
> 審的是「用法」，不是設計系統元件的內部實作。

## 審查流程

1. 讀使用者指定的頁面檔案（`.tsx` 與其 import 的 `.css`）
2. 逐條跑下列 10 規則，每條記 PASS 或 FAIL 並附檔案:行號
3. 依「輸出格式」回報

## 規則

### 1. 不得用原生 HTML / 自製版本頂替既有元件

- **Violation**：`<button>`、`<input>`（`type="date"` 除外）、`<select>`、`<textarea>`、`<dialog>`、自製 modal / toast / tab bar 等，
  而 Decision Tree（`usage.md`）裡已有對應元件
- **Correct**：`<Button>`、`<TextField>`、`<Select>`、`<TextArea>`、`<Dialog>`……

### 2. 顏色一律 token

- **Violation**：`.css` 內任何 `#hex`、`rgb()` / `rgba()`、具名色（`white`、`black`、`red`……；`transparent` 允許）
- **Correct**：`var(--color-*)`

### 3. 間距一律 token

- **Violation**：`padding` / `margin` / `gap` 用了非 `var(--space-*)` 的長度值
- **Exception**：`0`、`auto` 允許

### 4. 圓角與陰影一律 token

- **Violation**：`border-radius` 非 `var(--radius-*)`；`box-shadow` 非 `var(--shadow-*)`
- **Note**：沒用到該屬性 = PASS

### 5. 文字一律 typography class

- **Violation**：`.css` 內自定 `font-size` / `font-weight` / `line-height` / `font-family`
- **Correct**：`.tsx` 套 `.text-*` class（`text-body-*`、`text-label-*`、`text-heading-*`、`text-display-*`、`text-code-*`）

### 6. 無 Tailwind、無 var() fallback

- **Violation**：className 出現 Tailwind utility（`flex`、`p-4`、`text-sm`、`bg-*` 等原子 class 模式）；
  CSS 出現 `var(--token, 值)` 形式的 fallback

### 7. Provider 已掛

- **Violation**：呼叫 `useToast()` / `useSnackBar()` / `useInAppNotification()`，
  但元件樹上層（通常 `main.tsx`）沒掛對應 Provider
- **How to check**：grep hook 呼叫 → 讀專案入口確認 Provider

### 8. Overlay 互斥語意

- **Violation**：Dialog 開著的同時觸發 Toast / SnackBar；Sheet 內容裡再開 Dialog
- **Correct**：先關 Dialog 再 SnackBar；Sheet 內要確認 → 改完整頁面

### 9. 日期用原生 input

- **Violation**：自製日期選擇 UI，或拿 `<Select>` 組年月日
- **Correct**：`<input type="date">`

### 10. 缺元件有明確回報

- **Violation**：程式碼留 `// TODO: 之後換成設計系統元件` 之類的隱藏註解，或悄悄自製近似元件
- **Correct**：交付訊息中明確列出缺口（缺什麼元件、目前用什麼頂著）

## 輸出格式

```
## Review: {檔案清單}

### PASS
- [通過的規則]

### FAIL
- [規則名] — {file}:{line} — {描述}
  Suggest: {怎麼修}

### Summary
{N}/10 rules passed
```

> 元件級細則（按鈕層級數、Tabs / ChipBar 選用、輸入框 variant 一致性…）不在本清單內，
> 見 `component-usage.md`。審查時若明顯看到違反，可在 FAIL 之外以備註提出。
````

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/usage-review.md`
Expected: 檔案存在

```bash
git add docs/usage-review.md
git commit -m "docs(usage): 新增消費端頁面用法審查清單"
```

---

### Task 4: 建立 `docs/invos-ui-reviewer.agent.md`（薄殼 agent 原始檔）

**Files:**
- Create: `docs/invos-ui-reviewer.agent.md`

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

```markdown
---
name: invos-ui-reviewer
description: Review page code against @invos/design-system usage rules (component choice, tokens, overlay semantics)
tools: Read, Glob, Grep
model: sonnet
---

你是 @invos/design-system 消費端專案的頁面用法審查者。

## 做法

1. 讀 `node_modules/@invos/design-system/docs/usage-review.md`——那是**唯一的規則來源**，
   規則內容、判定方式、輸出格式都以它為準（規則隨套件版本更新，本檔不重複記載）。
2. 對使用者指定的頁面檔案（`.tsx` 與其 import 的 `.css`）逐條執行清單。
3. 需要對照可用元件與 token 時，查：
   - `node_modules/@invos/design-system/docs/usage.md`（Decision Tree、token 規則）
   - `node_modules/@invos/design-system/docs/component-usage.md`（元件級使用細則）
   - `node_modules/@invos/design-system/dist/src/components/ui/index.d.ts`（export 與 props 型別）
4. 依 usage-review.md 的「輸出格式」回報，FAIL 一律附 檔案:行號 與修法。

若 `node_modules/@invos/design-system` 不存在，直接回報「套件未安裝，無法審查」。
```

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/invos-ui-reviewer.agent.md`
Expected: 檔案存在

```bash
git add docs/invos-ui-reviewer.agent.md
git commit -m "docs(usage): 新增消費端 review agent 殼原始檔"
```

---

### Task 5: CLAUDE.md — Decision Tree 搬移為引用

**Files:**
- Modify: `CLAUDE.md`（「Component Decision Tree」一節、「任務閱讀路徑」表、「Source of truth」表）

- [ ] **Step 1: 以引用取代整張表**

把「## Component Decision Tree」標題之後、直到「**找不到對應元件時**」之前的內容（引言句 + 整張「需求 → 元件」表）替換為：

```markdown
完整「需求 → 元件」對照表在 [docs/usage.md](./docs/usage.md#component-decision-tree)
——隨套件發佈，消費端與本 repo 讀同一張表，**只維護那一份**。
選對元件之後的使用細則（樣式層級、組合限制、狀態語意）見
[docs/component-usage.md](./docs/component-usage.md)。
**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本。**
```

「**找不到對應元件時**」四步流程**保留在 CLAUDE.md**（維護者版：可提出新增元件；usage.md 的消費端版是回報缺口——兩者視角不同，非重複）。

- [ ] **Step 2: 更新「任務閱讀路徑」表**

「建立頁面」列的「本檔 Component Decision Tree」改為
「[docs/usage.md](./docs/usage.md) Decision Tree → [docs/component-usage.md](./docs/component-usage.md) 對應元件章節」。

- [ ] **Step 3: 更新「Source of truth」表**

新增一列：

```markdown
| 元件使用語意（何時用、怎麼組合） | [docs/component-usage.md](./docs/component-usage.md)（來源：Figma UI Kit Guideline） |
```

- [ ] **Step 4: 驗證與提交**

Run: `grep -n "usage.md\|component-usage.md" CLAUDE.md && ! grep -q "主要動作按鈕" CLAUDE.md && echo OK`
Expected: 兩個引用連結都存在、表已移除、輸出 OK

```bash
git add CLAUDE.md
git commit -m "docs(claude): Component Decision Tree 移至 docs/usage.md 單一來源"
```

---

### Task 6: 打包驗證

- [ ] **Step 1: 確認四份新文件會進套件**

Run: `npm pack --dry-run 2>&1 | grep -E "usage|component-usage|reviewer"`
Expected: 列出 `docs/usage.md`、`docs/component-usage.md`、`docs/usage-review.md`、`docs/invos-ui-reviewer.agent.md`

- [ ] **Step 2: lint**

Run: `npm run lint`
Expected: 通過（純文件改動，不應有任何錯誤）

---

### Task 7: 更新 create-prototype skill（`~/.claude/skills/create-prototype/`）

**Files:**
- Create: `~/.claude/skills/create-prototype/templates/CLAUDE.md`
- Create: `~/.claude/skills/create-prototype/templates/.claude/agents/invos-ui-reviewer.md`
- Modify: `~/.claude/skills/create-prototype/SKILL.md`

**注意**：此目錄不在本 repo；若它不在任何 git repo 內，只存檔、略過 commit 步驟。

- [ ] **Step 1: 建立 `templates/CLAUDE.md`**（不放 `{{...}}` placeholder——SKILL.md 的 placeholder 檢查不掃 .md 檔）

```markdown
# 專案指引

本專案使用 `@invos/design-system`（INVOS 發票存摺設計系統）。

## 設計系統（必讀）

- **寫任何 UI 之前**，先讀 `node_modules/@invos/design-system/docs/usage.md`
  並遵循其中規範（元件選用 Decision Tree、token 規則、overlay 互斥語意）。
- 用到的元件另讀 `node_modules/@invos/design-system/docs/component-usage.md`
  對應章節（樣式層級、組合限制、表單驗證時機）。
- 完成頁面後，用 `invos-ui-reviewer` agent（已在 `.claude/agents/`）對改動的頁面檔案自查，
  FAIL 項修完才算完成。
- 設計原則與完整 token 規格：`node_modules/@invos/design-system/design.md`。

## 指令

- `npm run dev` — 開發伺服器
- `npm run build` — tsc + vite build（交付前必須通過）
```

- [ ] **Step 2: 建立 `templates/.claude/agents/invos-ui-reviewer.md`**

內容與 Task 4 的 `docs/invos-ui-reviewer.agent.md` **完全相同**（從本 repo 該檔複製）：

```bash
mkdir -p ~/.claude/skills/create-prototype/templates/.claude/agents
cp docs/invos-ui-reviewer.agent.md ~/.claude/skills/create-prototype/templates/.claude/agents/invos-ui-reviewer.md
```

- [ ] **Step 3: 修正 SKILL.md**

三處修改：

1. **步驟 5 的完成訊息**——原文「元件清單與規範在 `node_modules/@invos/design-system/CLAUDE.md`（AI 會自動讀到）」不成立（AI 不會自動讀 node_modules），整句改為：

   > 最後告訴使用者：`npm run dev` 啟動。使用規範入口已在專案 `CLAUDE.md`（指向 `node_modules/@invos/design-system/docs/usage.md` 與 `docs/component-usage.md`），完成頁面後可用 `invos-ui-reviewer` agent 自查。

2. **「設計系統使用重點」表**——`var(--spacing-*)` 筆誤改為 `var(--space-*)`；同列「詳見套件內 CLAUDE.md」改為「詳見套件內 docs/usage.md 與 docs/component-usage.md」。

3. **步驟 3（複製 templates）補一句**：

   > templates 內含 `CLAUDE.md` 與 `.claude/agents/invos-ui-reviewer.md`（設計系統使用規範入口與審查 agent）；`cp -R` 會連同 `.claude` 隱藏目錄一起複製，複製後用 `ls -a <專案目錄>` 確認 `.claude` 存在。

- [ ] **Step 4: 驗證**

Run: `ls ~/.claude/skills/create-prototype/templates/CLAUDE.md ~/.claude/skills/create-prototype/templates/.claude/agents/invos-ui-reviewer.md && grep -c "spacing-\*" ~/.claude/skills/create-prototype/SKILL.md`
Expected: 兩檔存在；grep 計數 `0`（筆誤已清除，注意 grep 無匹配時 exit code 非 0 屬預期）

---

### Task 8: 發佈新版本（⚠️ 需使用者確認後執行）

新規範自此版起才隨套件散佈；未發佈前消費端抓最新 tag 拿不到新文件。

- [ ] **Step 1: 與使用者確認要發版**（會 push 到 GitHub）
- [ ] **Step 2: 發版**

Run: `npm version minor`（0.14.0 → 0.15.0；`preversion` 跑 lint + build:lib，`postversion` 自動 push commits 與 tags）
Expected: 新 tag `v0.15.0` 推上 GitHub

---

### Task 9: End-to-end 驗證（scaffold 測試專案）

- [ ] **Step 1: 用 create-prototype 流程 scaffold 測試專案**

在 scratchpad 目錄（不污染 ~/Github）依 SKILL.md 步驟 scaffold `prototype-usage-test`：
複製 templates → 替換 placeholder → `npm install` → `npm run build` 通過。

- [ ] **Step 2: 驗證規範鏈路**

Run（在測試專案內）:
```bash
ls node_modules/@invos/design-system/docs/usage.md \
   node_modules/@invos/design-system/docs/component-usage.md \
   node_modules/@invos/design-system/docs/usage-review.md \
   node_modules/@invos/design-system/docs/invos-ui-reviewer.agent.md \
   CLAUDE.md .claude/agents/invos-ui-reviewer.md
```
Expected: 六個檔案全部存在（前四個來自套件 v0.15.0，後兩個來自 templates）

- [ ] **Step 3: 試跑 review agent**

在測試專案寫一個故意違規的頁面（hardcode `#ff0000`、原生 `<button>`），
請 `invos-ui-reviewer` agent 審查，確認能輸出 FAIL 與行號。

- [ ] **Step 4: 清理測試專案**

Run: `rm -rf <scratchpad>/prototype-usage-test`

---

## Self-Review 紀錄

- **Spec coverage**：spec §1（usage.md）→ Task 1；§2（usage-review.md + agent 殼）→ Task 3、4；§3 散佈（templates + 既有 repo 安裝段）→ Task 7 + Task 1 的「安裝到既有專案」節；§4 驗證 → Task 6、9；Decision Tree 單一來源 → Task 5。無缺口。
- **超出原 spec 的新增**：Task 2（`component-usage.md`）。來源是 Figma 已建立的 14 份元件 guideline，屬 spec 撰寫時尚未納入的資產；落點決定與理由記在本檔開頭「文件分層」節。
- **一致性**：agent 殼在 Task 4 與 Task 7 Step 2 以 `cp` 保證同一內容；`--space-*` 命名已對 `spacing.css` 實測確認；`component-usage.md` 引用的 props（`Dialog.type`、`Sheet.Handle`、`Tabs.type`、`TextField.variant`、`IconButton.size/badge`、`Tag.variant/size`）已對元件 TypeScript 型別逐一核對；「找不到元件」流程兩版差異（維護者可新增元件 vs 消費端回報缺口）為刻意設計，已在 Task 5 註明。
- **Figma 與 repo 落差**：五處已在 Task 2 前言列出並指定以 repo 為準的寫法，避免執行時退回 Figma 原文。
- **Placeholder scan**：無 TBD / TODO；所有檔案內容完整內嵌。
