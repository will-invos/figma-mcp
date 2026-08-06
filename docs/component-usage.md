# 元件使用規範 — @invos/design-system

> 承接 [usage.md](./usage.md) 的 Component Decision Tree：**選對元件之後，怎麼用才對**。
> 每節只寫使用端會做錯的事——已烘進元件的數值（disabled 透明度、SnackBar 停留秒數、
> Tooltip 最大寬度…）不列在這裡，直接用元件即可。
> 跨元件的原則（token、覆蓋層並存、動效、a11y）見 [design.md](../design.md)。

## Button

- **一組按鈕最多兩種樣式層級。**
  - 主要層級：`variant="filled"` 搭 `primary` / `prize` / `danger` / `donation`
  - 次要層級：`variant="filled" colorType="neutral"`、`variant="outline"`、`variant="ghost"`、
    `variant="filled" colorType="white"`
- 多顆按鈕並排時**不要全用 primary**——沒有層級等於沒有主次。全部用次要層級是允許的。
- **需要三個以上的操作 → 改用 `<Sheet>` 或 `<TabBar>`**，不要一排三顆按鈕。
- **不要給固定寬度**：讓它依文案縮放，或 `width: 100%` 撐滿。寫死寬度在使用者放大系統字級時會破版。
- 文案保持一行、簡短；超過會以省略號截斷。
- `variant="text"` vs `ghost`：text 邊界貼合內容（無 padding）、圖文間距更緊、按下改字色不改背景。
  要貼齊文字基線時用 text，要有可點面積時用 ghost。
- 深色模式下主按鈕字色仍為白色——由 token 處理，**不要自己覆寫**。
- `colorType="white"` 屬次要層級，但底色是固定白（`--color-background-fixed-white`）、
  **不隨主題翻轉**——給彩色 / 照片 / 深色底圖上的按鈕用，一般頁面背景上不要用。

❌ 一排四顆 primary ／ ❌ 混三種次要樣式 ／ ❌ `width: 120px`

## IconButton

- **同一區塊不要把 `<Button>` 與 `<IconButton>` 並排混用。** 空間夠就全部用文字按鈕，
  需要緊湊排列就全部用 icon 按鈕。
- `size` 四檔：`large` / `medium` / `small` / `xsmall`。
- `badge`（紅點）表示該按鈕後方的頁面有更新或新功能。只在 enabled 狀態顯示（loading 時元件會自動收起）。
  **設計規範規定 `size="xsmall"` 不放紅點** —— 元件技術上做得出來（會渲染成 small badge），
  但那個尺寸太小、視覺上擠在一起，不要用。
- 用無外框（`variant="ghost"`）表示選取狀態時：未選用**輪廓**樣式 icon、已選用**填滿**樣式 icon。
- icon 必須清楚對應它觸發的操作。`aria-label` 是 TypeScript 必填，寫得讓人讀得懂。
- 懸浮主操作用 `<Fab>`（自帶 `--shadow-medium`），**不要拿 IconButton 自己加陰影**。

## Dialog

- **`actions` 最多 2 個。** 需要三個以上操作 → 改用 `<Sheet>`。
- `title` 簡短（十個字內、最多兩行），細節放 `description`。
- **破壞性操作 → `type="danger"`**，使用時機如：**登出、刪除帳號、刪除發票、刪除票券**。
  元件會把第一顆 action 設為 danger 並排在左側，降低誤觸。
- **可以再建立、影響有限的行為不用 danger**（移除會員卡、歸戶載具）→ `type="default"`，主要按鈕維持在右側。

  > 「登出」列入 danger 是本專案的決定，與 Figma guideline（把登出歸在「可以再次被建立」而排除）不同。
  > 之後回頭對 Figma 時不要改回去。
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
- 一則只能一個操作。`buttonText` **上限四個中文字**，超過就換更短的說法。
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
