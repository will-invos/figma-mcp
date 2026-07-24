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

---

## 附錄

- [design.md](../design.md) — 設計準則 / 怎麼用（引用者看這份）
- [src/components/ui/](../src/components/ui/) — 元件實作(真相來源)
- [src/components/ui/tokens/](../src/components/ui/tokens/) — token 定義
