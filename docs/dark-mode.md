# Dark Mode 設定指南

> 適用：消費端引入 `@invos/ios-ui-kit` 後，要在 app 加上 dark mode 支援。

## 契約

Kit 的 dark mode 純粹用 **CSS attribute switching**，不 ship `ThemeProvider`：

- **Light（預設）**：[tokens/colors.css](../src/components/ui/tokens/colors.css) `:root` 上的所有 token，全域生效。
- **Dark**：任一 ancestor 有 `data-theme="dark"` 屬性，後代元件自動改用 dark token。

```css
/* 機制示意 */
:root {
  --color-background-default: #fff;
  --color-content-bold: #101119;
  /* … */
}

[data-theme="dark"] {
  --color-background-default: #101119;
  --color-content-bold: #f7f8f9;
  /* … */
}
```

## 重要：把 `data-theme` 放在 `<html>` 或 `<body>`

Kit 內的 `Toast`、`Dialog`、`Sheet` 透過 `createPortal` 把 DOM 接到 `document.body`，**會跳出 React 元件樹的層級**。

如果 `data-theme="dark"` 只套在 React app 根 div（例如 `#root`），portal 元件就吃不到，永遠拿 `:root` 的 light token。

```html
<!-- ❌ 錯：portal 元件吃不到 dark mode -->
<body>
  <div id="root" data-theme="dark">
    <App />
  </div>
</body>

<!-- ✅ 對：portal 元件能繼承 -->
<html data-theme="dark">
  <body>
    <div id="root">
      <App />
    </div>
  </body>
</html>
```

**永遠把 `data-theme` 放在 `<html>` 或 `<body>`**。

## 三種常見設定模式

### 1. 純手動 toggle

最簡單：使用者點按鈕切換，不記憶、不跟隨系統。

```tsx
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (dark) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
  }, [dark])
  return (
    <button onClick={() => setDark((d) => !d)}>
      {dark ? '☀ Light' : '● Dark'}
    </button>
  )
}
```

### 2. 跟隨系統偏好

App 不提供 toggle，純粹跟著作業系統的 dark mode。

```tsx
import { useEffect } from 'react'

function useSystemTheme() {
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      if (mql.matches) document.documentElement.dataset.theme = 'dark'
      else delete document.documentElement.dataset.theme
    }
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [])
}
```

在 app 根呼叫一次：

```tsx
function App() {
  useSystemTheme()
  return <Routes />
}
```

### 3. 跟隨系統 + 使用者覆蓋 + 記憶（完整版）

三段式選擇：`system`（預設、跟系統）/ `light` / `dark`，存 localStorage。

```tsx
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

function useTheme(): readonly [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme | null) ?? 'system'
  )

  useEffect(() => {
    const html = document.documentElement
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mql.matches)
      if (dark) html.dataset.theme = 'dark'
      else delete html.dataset.theme
    }
    apply()
    if (theme === 'system') {
      mql.addEventListener('change', apply)
      return () => mql.removeEventListener('change', apply)
    }
  }, [theme])

  const set = (t: Theme) => {
    localStorage.setItem('theme', t)
    setTheme(t)
  }
  return [theme, set] as const
}
```

UI 範例：

```tsx
function ThemeMenu() {
  const [theme, setTheme] = useTheme()
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
      <option value="system">跟隨系統</option>
      <option value="light">淺色</option>
      <option value="dark">深色</option>
    </select>
  )
}
```

## 避免 FOUC（首屏白閃黑）

模式 2 / 3 都用 `useEffect` 套 `data-theme`，但 `useEffect` 是 React mount 後才跑 — 在那之前，畫面會用 light mode 渲染一瞬間，然後切到 dark，造成「白閃」。

解法：在 `index.html` 的 `<head>` 內塞一段 inline script，**早於** stylesheet 載入就決定好 theme。

```html
<head>
  <meta charset="UTF-8" />
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('theme');
        var dark = saved === 'dark' || (
          (saved === null || saved === 'system') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        );
        if (dark) document.documentElement.dataset.theme = 'dark';
      } catch (e) {}
    })();
  </script>
  <link rel="stylesheet" href="..." />
  <!-- ... -->
</head>
```

這段 script 同步執行（沒有 async/defer），在 React bundle 解析前就已經把 `<html data-theme="dark">` 設好，stylesheet 套用時就直接吃 dark token，看不到閃爍。

## 為什麼不 ship `ThemeProvider`？

幾個原因：

1. **沒有狀態需要管理** — 整個機制就是改一個 DOM attribute，不需要 React context。
2. **避免綁定 React 之外的 framework** — kit 本身只用 React，但理論上 token / CSS 可被任何 framework 用。
3. **靈活性** — 上面三種模式各自合理，hook-code 才十幾行，硬包成元件反而限制使用者。

如果未來真的需要，可以考慮 ship 一個 thin `useTheme` hook（模式 3 的版本），但目前以 README 範例為主。

## 自我檢查清單

實作 dark mode 後，逐項確認：

- [ ] `data-theme="dark"` 套在 `<html>` 或 `<body>`，不是 `#root`
- [ ] 顯示 Toast / Dialog / Sheet 後，背景色與內容色都跟著翻
- [ ] 重整頁面沒有 FOUC（已加 inline script）
- [ ] 切換模式時，已開啟的 portal 元件即時跟著翻（CSS variable 是即時的，正常都會）
- [ ] localStorage / cookie 持久化（如有需要）
- [ ] 系統偏好變更時 app 跟著翻（如有跟隨系統的設計）
