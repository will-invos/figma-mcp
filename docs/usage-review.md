# @invos/design-system 頁面用法審查清單

> 供消費端專案的 `usage-reviewer` agent 使用：對**頁面程式碼**（`.tsx` + 對應 `.css`）逐條檢查。
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
