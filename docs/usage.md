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
| 單選（**表單內**） | `<Radio>` —— **Radio 只用在表單**；表單以外的單選一律用 `<ChipBar>` | [Radio](./component-usage.md#radio) |
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
| 切到另一塊內容，或跳到本頁的某個章節 | `<Tabs>` —— **導覽用**。兩種形態：分頁切換、頁面內章節錨點 | [Tabs](./component-usage.md#tabs) |
| 篩選內容（橫向標籤列） | `<ChipBar>` —— **取值用**。同一種內容篩子集，**單選**，超寬用 `scrollable` | [ChipBar](./component-usage.md#chipbar) |
| 選一個參數或模式 | `<ChipBar>` —— 表單以外的單選都走這裡，不要用 `<Radio>`，也不要拿 `<Tabs>` 頂替 | [ChipBar](./component-usage.md#chipbar) |
| 上一頁 / 下一頁導覽（含置中標題） | `<PageNavigation>` | — |
| 日期選擇 | 原生 `<input type="date">`（已定案：雙平台採原生 picker，**不要自製、不要拿 `<Select>` 頂替**） | — |
| 列表項（設定、選單） | `<ListItem>`（右側操作用 `trailing`：drill-in / switch / checkbox / icon…） | [ListItem](./component-usage.md#listitem) |
| 卡片（內容 + 描述） | `<CardItem>` | — |
| 列表的 header / footer | `<ListHeader>` / `<ListFooter>` | [ListItem](./component-usage.md#listitem) |
| 分隔線 | `<Divider>` | — |
| 標籤（**唯讀**、可多個） | `<Tag>` —— 純標示、不可點。**可選取的橫向標籤列請用 `<ChipBar>`** | [Tag](./component-usage.md#tag) |
| 數字徽章（通知未讀數） | `<Badge>` | — |
| 使用者頭像 | `<Avatar>` | — |
| 載入指示器 | `<Spinner>` | — |
| 進度條 | `<ProgressBar>` / 多條用 `<ProgressGroup>` | — |
| 輪播 / 分頁位置指示點 | `<DottedController>`（照片上用 `type="overlap"`） | — |
| 提示氣泡（簡短說明） | `<Tooltip>` | [Tooltip](./component-usage.md#tooltip) |

### `<Tabs>` 還是 `<ChipBar>`

兩者的 props 幾乎相同，程式端不會擋誤用，**只能靠語意判斷**。問一句「點下去我在做什麼」：

- **「我要去哪裡」→ `<Tabs>`。** 頁面結構本來就長那樣，我只是在其中移動。
- **「我要什麼條件」→ `<ChipBar>`。** 頁面結構不變，變的是內容的篩選條件或某個值。

拿不定時看第二個判準：**這列項目是設計時就固定的，還是跟著資料長的？**
固定（分頁名、章節名——要改得改設計）用 `<Tabs>`；跟資料長（分類清單、期數清單——後端多一筆就多一顆）用 `<ChipBar>`。

| 例子 | 用哪個 | 為什麼 |
|------|--------|--------|
| 任務 ↔ 商城 | `<Tabs>` | 去另一塊內容，兩邊版面與資料結構都不同 |
| 任務詳情頁的段落捷徑 | `<Tabs>` | 內容沒換，但仍是導覽——跳到本頁的另一個章節 |
| 商城的餐飲 / 交通 | `<ChipBar>` | 都是商品列表，只是篩掉一部分 |
| 電子 / 傳統發票、對獎期數 | `<ChipBar>` | 選的是參數，不是內容分群 |

兩者同時存在時，`<Tabs>` 在上、`<ChipBar>` 在下。

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
