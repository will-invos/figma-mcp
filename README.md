# @invos/design-system

> Repo: [`will-invos/invos-design-system`](https://github.com/will-invos/invos-design-system) — npm 套件名稱 `@invos/design-system`

一套 iOS 風格、**行動網頁為主**的 React UI Kit，可供內部多個專案共用。

元件與 token 透過 **Claude Code** + **Figma MCP** 從 Figma 設計稿讀回並產生，搭配自製 Storybook 預覽系統，實現「設計 ↔ 程式碼」同步。

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

## 安裝與啟動（在這個 repo 內開發時）

```bash
pnpm install        # 或 npm install / yarn
pnpm dev            # 啟動 Vite dev server
pnpm build          # 型別檢查 + production build
pnpm build:lib      # 打包成 library（output: dist/）
pnpm lint           # ESLint
```

開啟 `http://localhost:5173/` 即可看到自製 Storybook。

## 在其他內部專案引用這套 UI Kit

### 1. 安裝（走 GitHub tag）

在新專案的 `package.json` 加入，`#` 後面換成最新 tag：

```json
{
  "dependencies": {
    "@invos/design-system": "github:will-invos/invos-design-system#<最新 tag>",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```

最新 tag 查法（或看 repo 的 Releases 頁）：

```bash
git ls-remote --tags --refs --sort=-v:refname \
  https://github.com/will-invos/invos-design-system | head -1
```

```bash
npm install
```

> 一律釘在 tag，不要用 branch 名（例如 `#master`）—— GitHub URL 依賴沒有版本範圍語意，指向 branch 會讓不同時間安裝的人拿到不同版本。

> 原理：`npm install` 看到 GitHub URL 會 clone 該 tag、自動裝 devDeps、跑 `prepare` script（= `npm run build:lib`）把 `dist/` 建出來、再打包安裝。所以消費端不用額外做事，但首次安裝會比一般套件慢 30 秒～1 分鐘。

### 2. 引入 CSS（**整個專案只要一次**）

```tsx
// src/main.tsx
import '@invos/design-system/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
```

沒引這行 → 元件完全沒樣式。

**元件不需要你的專案有 CSS reset** —— `styles.css` 內含元件自足化所需的規則（box-sizing、margin、button 外觀），只作用在 `ui-` 前綴的元素上，不會動到你自己的 DOM。

如果你希望**整個 App** 都套用設計系統的 reset 起點（自訂的 DOM 也一致），另外引入選用的 preflight：

```tsx
import '@invos/design-system/styles.css'
import '@invos/design-system/preflight.css'  // 選用；會作用在全域
```

### 頁面欄寬

設計系統以手機版網頁為前提，頁面欄寬上限 480px。覆蓋層（`Dialog`、`Sheet`、`Toast`、`SnackBar`、`InAppNotification`）雖然是 `position: fixed`，寬度都以這個欄寬計算而不是視窗 —— 桌機瀏覽器裡頁面固定欄寬置中時，覆蓋層才不會比頁面寬。

你的頁面欄寬不是 480px 時**只要覆寫一個變數**，五個覆蓋層一起跟上：

```css
:root { --ui-page-max-width: 420px; }
```

### 3. 在元件使用

```tsx
import {
  Button,
  TextField,
  Dialog,
  NavigationBar,
  ListItem,
} from '@invos/design-system'
import type { ButtonProps } from '@invos/design-system'

export default function LoginPage() {
  return (
    <>
      <NavigationBar title="登入" />
      <TextField variant="inner-label" label="Email" />
      <Button variant="filled" colorType="primary" size="large" text="送出" />
    </>
  )
}
```

完整元件清單與決策樹請見 Kit 內的 [CLAUDE.md](CLAUDE.md)（被 `npm install` 時一起裝進 `node_modules/@invos/design-system/`，AI 會自動讀到）。

#### 通知類元件要先掛 Provider

`Toast`、`SnackBar`、`InAppNotification` 是 Provider + hook 的形式（自帶 portal、計時與佇列管理）。**沒掛 Provider 就呼叫對應的 hook 會 throw**：

```tsx
import { InAppNotificationProvider, ToastProvider, SnackBarProvider } from '@invos/design-system'

createRoot(document.getElementById('root')!).render(
  <InAppNotificationProvider>
    <ToastProvider>
      <SnackBarProvider>
        <App />
      </SnackBarProvider>
    </ToastProvider>
  </InAppNotificationProvider>
)
```

```tsx
const { show } = useSnackBar()
show({ text: '已儲存', status: 'success' })   // 貼齊頁面底部，3 秒後自動關閉
```

三者的差別：`Toast` 畫面正中央、可多則並存堆疊、支援 loading 與擋住底層操作；`SnackBar` 貼齊底部、一次一則排隊；`InAppNotification` 貼齊頂部、可點擊跳轉。**不要自己寫 portal 版本** —— 定位、計時、佇列與 live region 都已經在 Provider 內處理好。

### 4. Viewport（行動網頁）

```html
<!-- index.html -->
<meta name="viewport"
      content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

- `viewport-fit=cover` 是必要的，否則貼底 / 貼頂元件（`TabBar`、`Sheet`、`SnackBar`、`InAppNotification`）的 `env(safe-area-inset-*)` 不生效
- **不要加 `maximum-scale=1` / `user-scalable=no`** —— 那會關掉使用者縮放，是無障礙反模式（見 [design.md §3.2](design.md)）。要限制縮放必須有經無障礙評估的產品需求
- viewport 只在 app shell 的 HTML 設定一次，頁面與元件不得新增或覆寫

### 5. 升級版本

#### Kit 端發新版（在這個 repo）

```bash
npm version patch     # 0.1.0 → 0.1.1（bug fix）
# 或 npm version minor / npm version major
```

`package.json` 已設好 `preversion` / `postversion` hooks，一行會自動：

1. 跑 `lint` + `build:lib`（任一失敗就中止，不會升版）
2. 改 `package.json` → `git commit` → `git tag vX.Y.Z`
3. `git push && git push --tags`

> 跑前先把工作 commit 完，`npm version` 預設會擋未 commit 的變更。

#### 消費端拉新版

修改消費端 `package.json`：

把 `#` 後面的 tag 換成要升上去的版本（查法同上）：

```diff
- "@invos/design-system": "github:will-invos/invos-design-system#<目前的 tag>",
+ "@invos/design-system": "github:will-invos/invos-design-system#<最新 tag>",
```

```bash
rm -rf node_modules/@invos/design-system
npm install
```

> 為什麼要 `rm -rf`：npm 對 GitHub URL 的快取很黏，光改 tag 跑 `npm install` 有時不會重抓。

驗證：

```bash
npm ls @invos/design-system
```

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

### 4. Code Connect（目前未啟用）

Code Connect 能讓 Figma Dev Mode 直接顯示 React 呼叫，但 publish 需要 Figma Organization 以上方案，目前帳號不具備。AI 讀 Figma 時會拿到 Tailwind 預設輸出，需依 [CLAUDE.md](CLAUDE.md) 的決策樹與 [figma-tokens.json](figma-tokens.json) 手動翻譯成本專案元件。升級方案後可重建 `.figma.tsx` 映射。

## 設計規範（摘要，完整請見 [CLAUDE.md](CLAUDE.md)）

- **禁止 hard-coded 顏色**：CSS 內不可出現 hex / rgb / 顏色名稱，一律走 `var(--color-*)`。唯一例外是 `tokens/colors.css`。
- **`var()` 不加 fallback**：token 一定存在，fallback 只會讓差異悄悄發生。
- **字體 token**：UI 文字用 `var(--font-family)`（系統預設字體 chain），code 用 `var(--font-family-code)`。不在 code 指定 `PingFang TC` 等特定中文字體，讓各平台 OS 自行挑選。
- **Remote Plugin API 側**：若在 Figma Plugin 端直接改文字節點，以 `Noto Sans TC` 當 fallback，再套回正確 `textStyleId`（PingFang TC 在 remote Plugin API 不可用）。

## Figma 資源

| 項目 | Key |
|------|-----|
| Component library | 🧰 iOS - UI Kit 2025 |
| Variable / text style library | 🎨 Design System 2025 |
| Semantic Colors collection | `aca99ba7f5e3b863523761870ab4fa8d4b24c0be` |
| Semantic Sizes collection | `b2b4d349ff3e569ea2799606edbc77e3b5c1aa60` |

所有元件 / 樣式 / 變數的 key 都存在 [figma-tokens.json](figma-tokens.json)。

**沒有固定的 Figma 產出檔。** 上述 key 全部屬於兩個已發佈 library，在任何啟用了它們的檔案都能 import。
Code → Figma 的目標檔依功能分開指定，動工前先確認這次要寫進哪個檔；該檔須同時啟用上面兩個 library。
