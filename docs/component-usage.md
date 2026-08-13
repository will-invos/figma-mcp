# 元件使用規範 — @invos/design-system

> 承接 [usage.md](./usage.md) 的 Component Decision Tree：**選對元件之後，怎麼用才對**。
> 每節只寫使用端會做錯的事——已烘進元件的數值（disabled 透明度、SnackBar 停留秒數、
> Tooltip 最大寬度…）不列在這裡，直接用元件即可。
> 跨元件的原則（token、覆蓋層並存、動效、a11y）見 [design.md](../design.md)。
>
> **這份是元件使用語意的權威來源。** 早期內容整理自 Figma UI Kit Guideline，
> 但後續的定案以本檔為準——與 Figma 上的舊敘述不一致時，**以這裡寫的為準**，
> 並回頭更新 Figma 那份，不要反向覆蓋本檔。

## Button

- **一組按鈕最多兩種樣式層級。**
  - 主要層級：`variant="filled"` 搭 `primary` / `prize` / `danger` / `donation`
  - 次要層級：`variant="filled" colorType="neutral"`、`variant="outline"`、`variant="ghost"`、`variant="filled" colorType="white"`
- 多顆按鈕並排時**不要全用 primary**——沒有層級等於沒有主次。全部用次要層級是允許的。
- 預設依文案縮放寬度，或 width: 100% 撐滿。盡可能不要給固定寬度。
- 文案保持一行、簡短；超過會以省略號截斷。
- `variant="text"` vs `ghost`：text 邊界貼合內容（無 padding）、圖文間距更緊、按下改字色不改背景。要貼齊文字基線時用 text，要有可點面積時用 ghost。
- 深色模式下主按鈕字色仍為白色——由 token 處理，**不要自己覆寫**。
- `colorType="white"` 屬次要層級，但底色是固定白（`--color-background-fixed-white`）、**不隨主題翻轉**——給彩色 / 照片 / 深色底圖上的按鈕用，一般頁面背景上不要用。
- 不可一組有多個主要按鈕。
- 不可一組按鈕混三種樣式。

## IconButton

- **同一區塊不要把 `<Button>` 與 `<IconButton>` 並排混用。** 空間夠就全部用文字按鈕，需要緊湊排列就全部用 icon 按鈕。
- `size` 四檔：`large` / `medium` / `small` / `xsmall`。
- `badge`（紅點）表示該按鈕後方的頁面有更新或新功能。只在 enabled 狀態顯示（loading 時元件會自動收起）。**設計規範規定 `size="xsmall"` 不放紅點** —— 元件技術上做得出來（會渲染成 small badge），但那個尺寸太小、視覺上擠在一起，不要用。
- 用無外框（`variant="ghost"`）表示選取狀態時：未選用**輪廓**樣式 icon、已選用**填滿**樣式 icon。
- icon 必須清楚對應它觸發的操作。`aria-label` 是 TypeScript 必填，寫得讓人讀得懂。
- 懸浮主操作用 `<Fab>`（自帶 `--shadow-medium`），**不要拿 IconButton 自己加陰影**。

## Dialog

- **`actions` 最多 2 個。** 需要三個以上操作 → 改用 `<Sheet>`。
- `title` 簡短（十個字內、最多兩行），細節放 `description`。
- **破壞性操作 → `type="danger"`**，使用時機如：**登出、刪除帳號、刪除發票、刪除票券**。元件會把第一顆 action 設為 danger 並排在左側，降低誤觸。
- **可以再建立、影響有限的行為不用 danger**（移除會員卡、歸戶載具）→ `type="default"`，主要按鈕維持在右側。
- 純確認（只是「我知道了」）→ 該顆 action 用 `colorType="neutral"`。
- 捐贈 / 愛心碼相關 → `colorType="donation"`。
- 版型用 `cta`：`"1-button"` 撐滿全寬、`"2-buttons-horizontal"` 均分寬度、`"2-buttons-vertical"` 縱向（主要在最上）。
- 覆蓋層並存規則見 [design.md §4.2](../design.md)：**不與 Toast / SnackBar 同時出現，也不疊在 Sheet 上**。
- 多個 Dialog 會互相疊加，依序出現。

## Sheet

- 高度最高為視窗高，超過時請支援內容捲動，避免版面超出視窗。
- **`Handle`（橫桿）與關閉按鈕擇一，不同時存在。** 有 CTA `footer` 時用關閉按鈕，給使用者放棄的路徑。
- `headlineSize` 優先 `"large"`；空間真的不夠才用 `"regular"`，或不給 `headline`（此時要傳 `aria-label` 當無障礙名稱）。
- header 左側是關閉鈕，**其他功能按鈕放 `<SheetHeader trailing>`**（右側）。
- body 四周保持 `var(--space-400)`；放 `<ListItem>` 時**不要再加**，元件自帶內距。
- `footer` 一到兩顆 CTA，兩顆可橫向或縱向排列。CTA footer 也可以單獨常駐在頁面底部。
- **不要在 Sheet 上再開 Dialog。**

## SnackBar

- 用 `useSnackBar().show()`，**不要自己 render `<SnackBar>` 或做 portal**——定位、計時、佇列都在 Provider 內。
- 一則只能一個操作。`buttonText` **上限四個中文字**，超過就換更短的說法。
- SnackBar 貼齊頁面底部：頁面若有貼底 CTA、工具列或 FAB，**要自行留出空間避免遮擋**。
- 連續呼叫會排隊依序顯示，**不會堆疊**，不需要自己做節流或防抖。
- 同一操作三秒內連續執行，不要重複顯示。
- 圖示用填滿造型（`status="success" | "error"` 已對應好），不要換成線性 icon。

> **Toast vs SnackBar**：`<Toast>` 是「正在處理，先別動」（預設 blocking）；操作結果一律用 SnackBar。

## InAppNotification

- 系統**主動推播**用，時機不可預期。當前頁面的操作回饋請用 SnackBar。
- **固定的提示種類**（如發票存入）→ 傳 `icon`；**新任務推播、升級**這類要吸引點擊 → 傳 `image`。
- `button.label` 四個字以內。
- 一次只顯示一則，多則依序顯示。
- 圖層刻意排在 Tooltip 之上、Dialog 之下——不蓋在使用者正在做決策的畫面上。
- 支援上滑關閉與點擊跳轉（`onPress`），不需要自己綁手勢。

## Tabs

**Tabs 是導覽**——點下去等於「我要去哪裡」。兩種形態：

- **① 分頁切換** —— 切到另一塊內容（例如「任務 ↔ 商城」），兩邊的版面與資料結構可以不同。
- **② 頁面內錨點** —— 內容不換，捲動到本頁的某個章節（例如任務詳情頁的段落捷徑）。

**不要拿 Tabs 做篩選或選參數**，那是 [`<ChipBar>`](#chipbar) 的事。分不出來時看項目怎麼來的：
Tabs 的項目是設計時固定的結構，**改它要改設計**；跟著資料長的清單屬於 ChipBar。

- **`items` 至少 2 個**，不要只放一個 tab。
- **超過 4 個改 `type="compact"`**：指示條縮到文字寬、整列可橫向捲動。
- 只放文字，**不放 icon**；label 一行，超過以省略號呈現。
- `badge` 可用 `'dot'` 或數字，**同一列不要混用兩種**。tab 被點擊後視為已讀，應清掉該筆 badge。數字上限顯示 99+。
- **分隔線**：形態①（接在 `<NavigationBar>` 下）→ 導覽列與 Tabs 之間**不要**分隔線；形態②（頁面內錨點）→ 導覽列下方**要有**分隔線。

## PageNavigation

「上一頁 / 標籤 / 下一頁」的一列，用在**同一種內容按時間或序號一筆一筆翻**——
發票列表的期數、分類明細的月份。**不是 Tabs**：翻的是同一份清單的不同區間，不是切到另一塊內容。

- **兩端到不了就 disabled**，不要藏起來。`onPrev` / `onNext` 不傳即為 disabled（透明度 40%），
  也可以用 `prevDisabled` / `nextDisabled` 明講。
- **`divider` 只有下底線**，上緣不畫線。接在頁面主內容上方、需要與下方清單分界時才開；
  已經有 `<NavigationBar>` 或 `<Tabs>` 的底線接在上面時不要再開，會出現兩條線。
- **標籤預設是不可點的純文字**。只有在「點標籤要開期數 / 年月選單」時才傳 `onLabelClick`，
  傳了才會變成按鈕（有按下回饋與 focus 環）。**沒有選單就不要傳**，否則使用者點了沒反應。
- 標籤**寬度會隨文字變動**，箭頭位置跟著移。文字長度會變的情境（例如「115 年 7-8 月」↔「115 年 11-12 月」）
  請在設計稿標明是否要固定標籤寬度——兩端原生實作目前是**寫死 120**。
- 一頁**只放一列**。需要同時切期數與切分類時，分類走 `<ChipBar>`，不要並排兩列 PageNavigation。

## ChipBar

橫向的可選取標籤列，**一律單選**（`activeKey` 只吃一個 key）。
**ChipBar 是取值**——點下去等於「我要什麼條件」，頁面結構不變。兩種用途：

- **① 條件篩選** —— 例如商城的分類標籤列。篩的是**同一種內容的子集**，版面不變、只是列表短了。
- **② 選一個參數或模式** —— 例如「電子／傳統發票」、對獎的期數切換。選的是值，不是內容分群。

用途規則：

- **表單以外的單選一律用 ChipBar，不要用 `<Radio>`。** Radio 只服務表單；其餘 UI 優先採用 Chip。
- **切換後不一定立即生效** —— 有些情境是選完再按送出。依情境決定，兩種都合法。
- 與 [`<Tabs>`](#tabs) **不是上下位關係**，差別在做的事不同：Tabs 是導覽（去哪裡），ChipBar 是取值（要什麼條件）。
  拿不定時看項目怎麼來的——**跟著資料長的清單**（分類、期數，後端多一筆就多一顆）屬於 ChipBar。
- 兩者同時存在時，ChipBar 排在 Tabs 下方。

樣式與行為：

- badge 規則同 Tabs：`'dot'` 與數字**不混用**，點擊後清除。
- 超出螢幕寬度用 `scrollable`，讓整列可左右拖移。
- **多選的篩選列目前不支援**，需要多選時請提出需求，不要改用 `<Checkbox>` 橫排頂替。
- **整列上方沒有可見標題時要給 `aria-label`**（例如 `aria-label="發票狀態篩選"`），
  否則輔助技術唸不出這組選項在選什麼。有可見標題時不必給。
- 鍵盤操作已內建（radiogroup 慣例）：整列是**單一 tab stop**，進到列內後用方向鍵移動，
  **移動即選取**，Home / End 跳頭尾。不要自己再加鍵盤處理。

## Tag

- **優先 `variant="light"`**，讓標籤不搶眼；深色 / 圖片背景或需要強調時才用 `"bold"`。
- 列表、卡片或其他元件內部空間有限 → `size="small"`；整頁內容中才用 `"medium"`。
- 圖示通常放左側（`leadingIcon`）。

## Tooltip

- 用於揭示新推出或不易發現的功能，是**輕量提示不是說明文件**：一兩句話、最多兩行、純文字，不放促銷內容或與當前流程無關的資訊。
- 可用受控 `open` 直接出現，不必等 hover 或點擊。
- 只出現一次，提示本身或指定元件被點過就該關掉。
- 同一畫面不要同時出現多個提示，也不要互相重疊。
- `placement`（top/bottom/left/right）+ `align`（start/center/end）共 12 種位置，挑不會被螢幕邊界裁切的組合。

## TextField / TextArea / Select

- **表單欄位一律包 `<FieldGroup label="…">`。** label 與 helpText 由 FieldGroup 渲染（標題在欄位上方、說明在下方，`aria-describedby` 自動接好），此時輸入元件維持預設 `variant="default"`，**不要再傳自己的 `label`**。
- **不包 FieldGroup 而單獨使用輸入元件時 → 必須傳 `variant="inner-label"` 與 `label`**，讓標題內建在欄位裡（空值且未對焦時當佔位字，一對焦或有值就浮到上方），使用者輸入中仍看得到欄位名。
- **同一表單不要混用兩種做法**：要嘛整份都包 FieldGroup，要嘛整份都用 `inner-label`。
- **`variant="inner-label"` 已經有標題，不要再加 `leadingIcon`。**
- `leadingIcon` 是示意欄位內容的裝飾；`trailingIcon` 是可點的按鈕（例如顯示 / 隱藏密碼）。
- **helpText 與錯誤訊息不同時出現，錯誤優先。** helpText 走 `<FieldGroup helpText>`，錯誤時建議帶 icon。
- **字數上限用 help text 顯示，不做計數器元件**：`<FieldGroup helpText="0/200" helpTextAlign="right" helpTextIcon={false}>`。**不要靜默截斷**——使用者要看得到還剩多少。
- 多行內容用 `<TextArea>`（可設最大高度、超過上下捲動；也可能是固定高度，可左右捲動），不要用 TextField 硬改。
- OTP / 驗證碼用 `<PinInput>`，**不要用多個 TextField 拼**。
- 搜尋用 `<SearchField>`（填滿背景、無邊框、左側常駐搜尋 icon、有值時顯示清除鈕），**不要拿 TextField 加 icon 頂替**。
- 欄位大小盡量與預期輸入量相符——尺寸本身就是給使用者的提示。
- 欄位驗證預設是點擊送出時，才做驗證。不在輸入時做驗證，亦不在 blur 時驗證。

## Divider

- 分隔線有**三種語意**，先決定是哪一種再選元件：

  | 語意 | 用什麼 | 長相 |
  |------|--------|------|
  | **列與列之間**（同一組內容的項目分隔） | [`<ListItem showDivider>`](#listitem)（預設開，元件自帶） | 水平，左右內縮 `--space-400`，與內容左緣對齊 |
  | **區塊與區塊之間**（兩組不同內容的分界） | `<Divider>` | 水平，滿版，不內縮 |
  | **文字與文字之間**（同一行內並列的資訊，例如日期 ｜ 時間 ｜ 地點） | `<Divider orientation="vertical">` | 垂直，高度由父層撐開 |

- **不要為了內縮而覆寫 `<Divider>` 的 padding / margin。** 內縮版只存在於 `<ListItem>` 內——Figma 的 Divider 沒有變體，自己縮排等於自創設計稿上不存在的樣式（同 [`<ChipBar>`](#chipbar) 內距的處理）。列表就用 ListItem，不要用 Divider 拼。
- **顏色與粗細由元件決定，不要自己指定色票。** 一律 1px，色票**依方向而不同，這是刻意的**：
  - **水平**（列間、區塊間）→ `--color-border-subtle`（實色）
  - **垂直**（文字之間）→ `--color-border-divider`（半透明 10%，對齊 Figma「Text」元件的綁定）
- 兩個色票不要互換。淺色模式下很接近，但半透明的那個疊在有底色的區塊上才不會顯得突兀——**文字並排的資訊常出現在彩色卡片或首頁區塊上，所以垂直用它**。
- **不要拿分隔線當留白。** 兩塊內容只是需要距離時用間距，不要補一條線。

## ListItem

- 設定、選單這類**列表**用 `<ListItem>`；**表單裡的選項不要用它**（用 `<Radio>` / `<Checkbox>` 搭 `<FieldGroup>`）。
- **列表的操作一律顯示在右側**，用 `trailing` 指定，不要自己在 `description` 裡塞控制項：

  | 情境 | `trailing` |
  |------|-----------|
  | 進下一頁 | `"drill-in"` |
  | 立即生效的開關 | `"switch"` |
  | 列表多選 | `"checkbox"` |
  | 列表單選（打勾表示選中） | `"icon"` + check icon |
  | 顯示值 / 次要動作 / 主要動作 | `"text"` / `"text-button"` / `"cta"` |
  | 處理中 | `"spinner"` |

- 預設列高由 `type` 決定：`"default"` 56 / `"rich"` 80 / `"compact"` 48，但可以隨著內容增加高度。
- `description` 收 node，塞得下 `<Tag>` + 時間這種組合。
- **內距是元件自帶的**：放進 `<Sheet>` body 或列表容器時不要再加 padding。
- 分隔線用 `showDivider`（預設開）控制，**不要自己補 `<Divider>`**；分組標題 / 註腳用 `<ListHeader>` / `<ListFooter>`。

## Radio

- 一組互斥選項中選一個。**選項 2–5 個**；更多請改 `<Select>`。
- **兩顆以上的互斥選項一律用 [`<RadioGroup>`](#radiogroup)，不要自己排 `<Radio>`。** 互斥、`name` 綁定、`role="radiogroup"`、整組錯誤態都在群組那一層，手動排列會漏掉。
- 單顆 `<Radio>` 只用在**互斥邏輯已由外層負責**的情境（例如每列自帶選取狀態的清單）。
- 點擊範圍含 label 文字（元件已處理，不要自己縮小），若 label 內含 link，則點擊 link 部分會另開視窗。
- 已選中的再點**不會**取消——需要能取消請重新確認是不是該用 `<Checkbox>`。
- **`<Radio>` 只用在表單。** 表單以外的單選改用 [`<ChipBar>`](#chipbar)；
  頁面內容是列表（List View）時改用 [`<ListItem>`](#listitem) `trailing="icon"` + check icon，維持列表的操作一律顯示在右側。
- 選項描述文字簡潔，並與周邊元素左側對齊。

## RadioGroup

- 選項用 `options` 陣列傳（`value` / `label` / `description` / `disabled`），**不要把 `<Radio>` 當 children 塞進去**。
- **整組的標題由外層 [`<FieldGroup label="…">`](#textfield--textarea--select) 給**，RadioGroup 自己不渲染標題。沒有 FieldGroup 時要傳 `aria-label` 替整組命名，否則螢幕閱讀器讀不出這組在問什麼。
- **錯誤態掛在整組上（`status="error"`），不要逐顆傳。** 單一選項本身不會錯，錯的是「還沒選」或「選錯」——這是群組層的事，與 FieldGroup 的 status 同一層級。
- 包在 FieldGroup 裡時**兩層都要設 `status="error"`**：FieldGroup 的只讓 helpText 轉紅，不會往下傳給選項。
- 停用也分兩層：整組不可用傳 `disabled`，只有某幾個選項不可選則設在 `options[].disabled`。
- `layout` 三種，依**選項文字長度**選，不是依喜好：

  | layout | 用在 |
  |--------|------|
  | `side-by-side`（並排） | 選項只有二到三個字，例如「本國人 / 外國人」。放不下會換行，不會擠壓文字 |
  | `column`（縱向，預設） | 選項較長，或任一選項帶 `description` |
  | `two-columns`（兩欄） | **少用**——橫向排列（1│2 換行 3│4）。窄螢幕（375px）多半放不下，用之前先確認設計稿真的是兩欄 |

- **不要拿 RadioGroup 做表單以外的單選**（改 [`<ChipBar>`](#chipbar)），也不要用它排列非互斥的選項（那是 `<Checkbox>`）。
- 交接提醒：**這支在 App 端沒有對應的共用元件**（iOS 的群組行為併在單顆裡、Android 各畫面自組），設計稿仍要標選項間距與排列方向。

## Checkbox

- 多選、每個彼此獨立。只能單選的情境用 `<Radio>`。
- 點擊範圍含 label；**label 內含連結時，把點擊範圍縮到方框本身**（連結另外處理），避免點連結時誤切換勾選狀態。
- **Checkbox vs Switch**：先勾選、再按儲存 → `<Checkbox>`；切換後**立即生效** → `<Switch>`。
- **同意條款 / 表單選項用 `<Checkbox>`；列表（List View）多選改 [`<ListItem>`](#listitem) `trailing="checkbox"`。**
- 選項描述文字簡潔，並與周邊元素左側對齊。
