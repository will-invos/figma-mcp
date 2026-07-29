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
| `FieldGroup` header / help | header `--space-200 0`（無水平）、help 頂部 `--space-200` | header `--space-50`、help `--space-200` |
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

z-index 疊放：`InAppNotification` / `SnackBar` 900 → `Dialog` overlay 1000 / `Sheet` overlay 1000、container 1001 → `Toast` 1100。

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
