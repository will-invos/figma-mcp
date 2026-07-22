# Token Pipeline

> Figma variables 是唯一母版，這裡的一切都是它的投影。方案背景與定案見 [docs/cross-platform-handoff.md §3](../docs/cross-platform-handoff.md)。

```
Figma variables（設計師改這裡）
   │ ① 同步：請 AI 用 MCP 整批倒出（見下方「同步指令」）→ figma-dump/*.txt
   ▼
tokens.json（排序後的 git 母版，diff 可審）
   │ ② npm run tokens:build（Style Dictionary）
   ▼
dist/tokens.css（:root light + [data-theme="dark"]）…未來加 Swift / Compose 輸出
```

## 檔案說明

| 檔案 | 角色 | 可以手改嗎 |
|------|------|-----------|
| `figma-dump/colors.txt`、`sizes.txt` | 從 Figma 倒出的原始值（`name\|light\|dark`） | ❌ 由同步產生 |
| `tokens.json` | 排序後的中繼母版，每次同步的 git diff 就看它 | ❌ 由 build 產生 |
| `build.mjs` | dump → tokens.json → CSS | ✅ 管線邏輯在這 |
| `dist/tokens.css` | 產出的 CSS custom properties | ❌ 唯讀投影 |

## 同步流程（設計師改了 Figma variables 之後）

1. 對 AI 說：「同步 design tokens」。AI 會用 MCP（`use_figma`）從 `🎨 Design System 2025` 的兩個 collection（key 見 `tokens.json` 的 `$meta`）整批倒出變數、解析別名、寫入 `figma-dump/*.txt`
2. 跑 `npm run tokens:build`
3. 看 `tokens.json` 的 git diff 確認變更符合預期 → commit

## 現況（2026-07-22 驗證與定案）

- 首次倒出：colors 275（Light/Dark）、sizes 38，與手寫 CSS 比對 **值零漂移**
- 已定案：`radius/full` = 999（CSS 已對齊）；Figma-only token（theme/*、category/* 等）**不納入 web 輸出**（`build.mjs` 的 `WEB_EXCLUDE`）；Figma 端命名照現狀為準
- 過濾後 `dist/tokens.css` 共 189 個 token，與手寫 CSS **完全對齊**（唯一差異：`--color-border-secondary` 為 CSS 殘留、未使用，接管時自然移除）
- `dist/tokens.css` **尚未接管** `src/components/ui/tokens/*.css` —— 正式切換屬第二步（連同 Swift / Compose 輸出）
