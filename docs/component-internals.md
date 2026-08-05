# Component Internals — @invos/design-system

元件內部規格(尺寸、邊框、容器內距),**維護 / 擴充元件時**對齊用。
真相以 code 為準,實測值可能漂移。

---

## 1. Button 尺寸

| Size | Height | Radius | Padding | Font |
|------|--------|--------|---------|------|
| `large` | 48 | `--radius-300` | `--space-300` | `.text-label-large` |
| `medium` | 38 | `--radius-250` | `--space-200` | `.text-label-medium` |
| `small` | 30 | `--radius-200` | `--space-150` | `.text-label-small` |

---

## 2. 邊框

| 場景 | 規格 |
|------|------|
| Outline 按鈕（Button、IconButton） | `1px solid var(--color-border-brand)` |
| 文字輸入欄 default（TextField、TextArea、Select、PinInput） | `1px solid var(--color-border-default)` |
| 文字輸入欄 focus | `border-color: var(--color-border-brand)` + `box-shadow: inset 0 0 0 1px var(--color-border-brand)`（1px border + 1px inset shadow，視覺 2px、避免 layout shift） |
| 文字輸入欄 error | `border-color: var(--color-border-danger)` + 同樣 inset shadow（**僅 `:not(:focus)` 時生效**——focus 永遠優先顯示 brand 框） |
| 按鈕類鍵盤對焦（Button、IconButton、Fab） | `outline: 2px solid var(--color-border-brand)` + `outline-offset: 2px`，統一寫在 `a11y.css` 的 `:focus-visible` |
| Checkbox / Radio | 預設 `2px solid var(--color-border-default)`，選中 / 錯誤改 `border-color` |
| 卡片 / 容器分隔（CardItem、ChipBar item） | `1px solid var(--color-border-subtle)` |
| TabBar 上緣（chrome ↔ 內容） | `border-top: 1px solid var(--color-border-subtle)` |

> Divider 元件用 `background-color + height`（不是 border）。

---

## 3. 容器內距（實測）

| 容器 | padding | gap |
|------|---------|-----|
| `CardItem` Large | 無外距（父層決定） | body 內 `--space-200` |
| `CardItem` Medium | `0 --space-400`（水平 16） | container `--space-400`、content 內 `--space-100` |
| `ListItem` | 水平 `--space-400`；上下 `--space-400`（default/rich）或 `--space-300`（compact） | row gap `--space-400` |
| `Sheet` body / footer | body 水平 16、footer 全 16 | 無 flex gap |
| `SheetHeader` | 水平 `--space-400`、頂部 `--space-300` | — |
| `Dialog` body / footer | body 全 24、footer `0 24 24` | body 主軸 `--space-600`、content 內 `--space-400`、actions `--space-400` |
| `FieldGroup` | 無內距 | 容器主軸 `--space-200`（label / 內容 / help 三者等距）、help 內 icon 與文字 `--space-200` |
| `ChipBar` | `--space-300 --space-400`（12 / 16）；**無 prop 可調**，見下 | item 間 `--space-200` |

> **`ChipBar` 的內距不做成 prop**（2026-07-29 定案）：Figma 的 Chip bar **沒有** no-inset / full-bleed 變體（已向設計師確認），加 prop 等於自創設計稿上不存在的樣式；且這個 kit 沒有純間距 prop 的慣例 —— `ListItem` 的 `type`、`Tabs` 的 `type` 都是 Figma 變體名稱，只是剛好會改到間距。
>
> 放進本身已有內距的容器（卡片、Sheet）需要讓第一顆 chip 對齊時，用公開的 `className` 覆寫 `padding`。要推翻這個決定，先確認 Figma 是否新增了變體，並用該變體的名稱命名 prop。
>
> `ChipBar` 也刻意不設 `background` —— 底色由外層容器決定，才能放在各種底色上。

---

## 4. 覆蓋層寬度與間距

全部以 `--ui-page-max-width`（預設 480）計算，不以視窗計算 —— 原則見 [design.md §3.2](../design.md)。

| 元件 | 寬度 | 兩側間距 | 定位 |
|------|------|---------|------|
| `Dialog` | `calc(var(--ui-page-max-width) - --space-600 * 2)` = 432 | 24（overlay 的 padding；窄螢幕時由它收出間距） | fixed 置中 |
| `Sheet` | `var(--ui-page-max-width)` = 480 | 0（貼齊底部滿欄寬是刻意的） | fixed 貼底 |
| `Toast` | 同 Dialog（432） | 24 | fixed 置中；`align-items: center` 讓 toast 保持自然寬度 |
| `SnackBar` viewport | `calc(var(--ui-page-max-width) - --space-300 * 2)` = 456 | 12 | fixed 貼底 + `env(safe-area-inset-bottom)` |
| `InAppNotification` viewport | 同 SnackBar（456） | 12 | fixed 貼頂 + `env(safe-area-inset-top)` |

**寫成 `calc(欄寬 - 間距 * 2)` 而不是直接用欄寬**：頁面本身的 max-width 也是這個變數，等寬的話覆蓋層會剛好貼齊頁面左右邊緣、零間距。

### 疊放順序（z-index）

**由高至低：`Toast` > `SnackBar` > `Dialog` > `Sheet` > `InAppNotification` > `Tooltip`**（2026-07-29 定案）

值統一定義在 [tokens/layout.css](../src/components/ui/tokens/layout.css)，元件 CSS 一律用 `var(--ui-z-*)`，**不要在元件裡寫死數字**：

| Token | 值 | 用於 |
|-------|-----|------|
| `--ui-z-toast` | 1200 | `.ui-toast-container`、`.ui-toast-scrim`（同值，scrim 排在前面所以 toast 畫在其上） |
| `--ui-z-snackbar` | 1100 | `.ui-snackbar-viewport` |
| `--ui-z-dialog` | 1000 | `.ui-dialog-overlay` |
| `--ui-z-sheet` | 901 | `.ui-sheet-container`（面板要壓過自己的遮罩） |
| `--ui-z-sheet-overlay` | 900 | `.ui-sheet-overlay` |
| `--ui-z-in-app-notification` | 800 | `.ui-in-app-notification__viewport` |
| `--ui-z-tooltip` | 700 | `.ui-tooltip__container` |

> **前提：設計上盡量不讓這些元件同時出現**（見 [design.md §3.2](../design.md)）。要在 `Sheet` 上問問題就先關掉 `Sheet` 再開 `Dialog`；需要中途確認的流程一開始就該用完整頁面而不是 `Sheet`。
>
> **這張表是保險，不是設計許可** —— 它保證萬一同時出現時不會卡死（上層被下層蓋住、按鈕點不到），但不代表可以把疊加當成正常設計。

幾個關鍵理由：

- **`Dialog` 高於 `Sheet`** —— 兩者同時出現本身要避免，但真的發生時不能卡死。先前 Dialog overlay(1000) 低於 Sheet container(1001)，只要 sheet 夠高，Dialog 會整個被蓋住、連按鈕都點不到（實測 900×713 視窗、sheet 內容 70vh，重疊區域中心命中 `.ui-sheet__body`）。
- **`SnackBar` / `Toast` 高於 modal** —— 純粹是保險。設計上 `Dialog` **不與** `Toast` / `SnackBar` 同時出現（按下 Dialog 的動作 → Dialog 關閉 → 再用 SnackBar 告知結果），所以這個順序平常不會被用到；萬一被用到時，回饋不該被遮罩吃掉。
- **`InAppNotification` 低於 modal** —— push 通知不該蓋在使用者正在做決策的畫面上。
- **`Tooltip` 的值幾乎不影響全域** —— 它沒有 portal，是 `position: absolute` 在自己的 `relative` wrapper 內，z-index 只在該 stacking context 生效。列在這裡是為了表達意圖。

### 背景捲動鎖（scroll lock）

`Dialog` / `Sheet` 開啟、或有 blocking `Toast`（預設即 blocking）期間，元件會自動鎖住 `body` 捲動，使用端不需自行處理。實作在 [scrollLock.ts](../src/components/ui/scrollLock.ts)（未公開 export）：

- **ref-count 計數** —— 多層覆蓋同開時，最後一層關閉才還原 `body` 的 `overflow`；鎖定時同步補 scrollbar 等寬的 `padding-right`，避免桌面上版面向右跳動。
- **CSS 配套** —— 只鎖 `overflow` 擋不住觸控的捲動穿透：`.ui-dialog-overlay` / `.ui-sheet-overlay` / `.ui-toast-scrim` 都有 `touch-action: none`，`Sheet` 的可捲區 `.ui-sheet__body` 另加 `overscroll-behavior: contain` 防止捲到頂 / 底之後鏈到背景。
- 使用端**不要另外改 `body` 的 `overflow`**，會和還原邏輯互相覆蓋。

---

## 5. 跨元件基礎樣式（載入順序）

`src/components/ui/index.ts` 的 import 順序決定 CSS 串接順序，**不能調動**：

1. `tokens/index.css` —— 變數與 `.text-*` utility
2. `base.css` —— 自足化 reset。選擇器限定 `ui-` 前綴並包 `:where()`，specificity 為 0，任何元件規則都蓋得過它
3. `a11y.css` —— `:focus-visible` 外環、`prefers-reduced-motion`；元件要保留自己的降級動效得用 `!important`
4. 各元件 CSS（由元件模組 import 帶入）

`preflight.css` **不在這條鏈上** —— 它是全域 reset，由使用端自行決定要不要 `import '@invos/design-system/preflight.css'`，並由 `vite.lib.config.ts` 的 `emitPreflightCss` 單獨輸出。

---

## 附錄

- [design.md](../design.md) — 設計準則 / 怎麼用（引用者看這份）
- [src/components/ui/](../src/components/ui/) — 元件實作(真相來源)
- [src/components/ui/tokens/](../src/components/ui/tokens/) — token 定義
