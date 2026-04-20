# figma-mcp

透過 **Claude Code** 與 **Figma MCP** 從 Figma 設計稿自動產生 React 元件與 Storybook（自製預覽系統）的示範專案。

一套 iOS 風格 UI Kit，元件與 story 幾乎全由 Claude Code 讀取 Figma 設計後產出，並透過 Code Connect 綁定回 Figma，達到「設計 ↔ 程式碼」雙向同步。

## 專案目標

- 以 Figma 為 **single source of truth**：color token、text style、component variant 都從 Figma 拉回。
- 用 Claude Code + Figma MCP 把設計稿轉成符合專案規範的 React + CSS（不是一次性的 HTML dump）。
- 自製輕量 Storybook：展示每個元件的 variant、互動與控制項，方便驗收。

## 技術棧

- **React 19** + **TypeScript** + **Vite**
- 純 CSS + 設計 token CSS variables（不使用 Tailwind 或 CSS framework）
- Hash-based routing（無 router library）
- [`@figma/code-connect`](https://github.com/figma/code-connect) — 元件與 Figma 變體的對應

## 專案結構

```
src/
├── components/ui/        # iOS UI Kit 元件（Button, TextField, Dialog, …）
│   └── tokens/           # 設計 token：colors / radius / shadows / spacing / typography
├── pages/
│   ├── stories/          # 自製 Storybook — 每個元件的 *.story.tsx
│   │   ├── Sidebar.tsx   # 左側元件選單
│   │   ├── Preview.tsx   # 中央預覽區
│   │   └── Controls.tsx  # 右側 props 控制項
│   ├── Components.tsx    # Story 主頁（載入 Sidebar + Preview + Controls）
│   └── …                 # 其他示範頁面（Login, Register, BankAccountSettings …）
├── App.tsx               # Hash routing
└── main.tsx
figma-tokens.json         # Figma component / text style / variable 的 key 清單
CLAUDE.md                 # 給 Claude Code 的專案規範
```

## 安裝與啟動

```bash
pnpm install        # 或 npm install / yarn
pnpm dev            # 啟動 Vite dev server
pnpm build          # 型別檢查 + production build
pnpm lint           # ESLint
```

開啟 `http://localhost:5173/` 即可看到自製 Storybook。

## Claude Code + Figma MCP 工作流程

### 1. 設定

專案透過 `.mcp.json`（或 Claude Code 設定）啟用以下 MCP servers：

- `figma-remote` — 官方 Figma MCP（遠端，推薦）
- `figma-dev-mode` — 本機 Dev Mode MCP（選配）

並在 [CLAUDE.md](CLAUDE.md) 中定義了：元件規範、禁止 hard-coded 顏色、token 命名、Figma file key、Code Connect 規則等。

### 2. Figma → Code（從設計稿產生元件 / story）

1. 把 Figma frame / component 連結（含 `node-id`）丟給 Claude Code。
2. Claude 呼叫 `get_design_context` 取得設計結構、screenshot、Code Connect 對應。
3. Claude 依 [CLAUDE.md](CLAUDE.md) 規範改寫成本專案的 React + CSS：
   - 顏色 / 間距 → `var(--color-*)` / `var(--spacing-*)`
   - 字體 → `var(--font-family)` + iOS text style class
   - 重用 `src/components/ui/` 既有元件，不生成 Tailwind
4. 同步產生對應的 `*.story.tsx`，包含 variant、互動範例與 Controls schema。

### 3. Code → Figma（把元件寫回 Figma）

> 重要：**不要使用 `generate_figma_design`（HTML 擷取）**，會遺失 variables、text style 與 component 結構。

請使用 `use_figma` 的 Plugin API 直接組裝 library instance：

1. 讀 [`figma-tokens.json`](figma-tokens.json) 取得 component set key / text style key / variable collection key
2. `figma.importComponentSetByKeyAsync(setKey)` → 建立 variant instance
3. `instance.setProperties({ '↳ PropName#id': 'value' })` 設定文字 / 變體
4. `figma.importStyleByKeyAsync(key)` → `textNode.textStyleId = style.id` 套用文字樣式
5. `figma.teamLibrary.getVariablesInLibraryCollectionAsync(collectionKey)` → 綁定顏色 / 尺寸變數

### 4. Code Connect

每個 UI 元件旁放一份 `*.figma.tsx` mapping，將 React props 對應到 Figma variant，讓 Figma 的 Dev Mode 直接顯示專案實際用法。

## 設計規範（摘要，完整請見 [CLAUDE.md](CLAUDE.md)）

- **禁止 hard-coded 顏色**：CSS 內不可出現 hex / rgb / 顏色名稱，一律走 `var(--color-*)`。唯一例外是 `tokens/colors.css`。
- **`var()` 不加 fallback**：token 一定存在，fallback 只會讓差異悄悄發生。
- **字體 token**：UI 文字用 `var(--font-family)`（系統預設字體 chain），code 用 `var(--font-family-code)`。不在 code 指定 `PingFang TC` 等特定中文字體，讓各平台 OS 自行挑選。
- **Remote Plugin API 側**：若在 Figma Plugin 端直接改文字節點，以 `Noto Sans TC` 當 fallback，再套回正確 `textStyleId`（PingFang TC 在 remote Plugin API 不可用）。

## Figma 資源

| 項目 | Key |
|------|-----|
| Figma file | `zbdxaNIbxN4Iujx6Qi1DlI` |
| Component library | 🧰 iOS - UI Kit 2025 |
| Variable / text style library | 🧰 Design System 2025 |
| Semantic Colors collection | `aca99ba7f5e3b863523761870ab4fa8d4b24c0be` |
| Semantic Sizes collection | `b2b4d349ff3e569ea2799606edbc77e3b5c1aa60` |

所有元件 / 樣式 / 變數的 key 都存在 [figma-tokens.json](figma-tokens.json)。

## License

MIT
