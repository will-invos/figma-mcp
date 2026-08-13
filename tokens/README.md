# Token Pipeline

```
Figma variables（設計師改這裡）
   │ ① 同步：請 AI 用 MCP 整批倒出（見下方「同步指令」）→ figma-dump/*.txt
   ▼
tokens.json（排序後的 git 母版，diff 可審）
   │ ② npm run tokens:build（Style Dictionary + native 產生器）
   ▼
src/components/ui/tokens/{colors,spacing,radius}.css（**直接接管**，:root + [data-theme="dark"]）
dist/native/ios-colors/*.colorset（Xcode Asset Catalog，185 色 × light/dark）
dist/native/android/values/colors.xml + values-night/colors.xml（ARGB）
```

## 檔案說明

| 檔案 | 角色 | 可以手改嗎 |
|------|------|-----------|
| `figma-dump/colors.txt`、`sizes.txt` | 從 Figma 倒出的原始值（`name\|light\|dark`） | ❌ 由同步產生 |
| `tokens.json` | 排序後的中繼母版，每次同步的 git diff 就看它 | ❌ 由 build 產生 |
| `build.mjs` | dump → tokens.json → CSS | ✅ 管線邏輯在這 |
| `src/components/ui/tokens/{colors,spacing,radius}.css` | 產出的 CSS（**已接管**，檔頭有產生警語） | ❌ 唯讀投影（typography.css、shadows.css、layout.css 仍為手寫） |
| `src/components/ui/tokens/layout.css` | 版面旋鈕（`--ui-page-max-width`），給使用端覆寫用，非 Figma variables | ✅ 手維護 |
| `dist/native/ios-colors/` | Xcode Asset Catalog colorsets（iOS 工程師 copy 進 Assets.xcassets） | ❌ 唯讀投影 |
| `dist/native/android/` | `values/` + `values-night/` 的 colors.xml（Android 工程師 copy 進 res/） | ❌ 唯讀投影 |

## 同步流程（設計師改了 Figma variables 之後）

0. **先 publish library**！同步讀的是 library 已發佈快照 —— 改完 variables 沒 publish，抓到的會是舊版
1. 對 AI 說：「同步 design tokens」。AI 會用 MCP（`use_figma`）從 `🎨 Design System 2025` 的兩個 collection（key 見 `tokens.json` 的 `$meta`）整批倒出變數、解析別名、寫入 `figma-dump/*.txt`
2. 跑 `npm run tokens:build`
3. 看 `tokens.json` 的 git diff 確認變更符合預期 → commit

## 現況（2026-07-22 驗證與定案）

- 首次倒出：colors 275（Light/Dark）、sizes 38，與手寫 CSS 比對 **值零漂移**；`radius/full` = 999 已定案對齊
- **web 全收錄顏色**（2026-07-22 更正定案，對齊 app）：`dist/tokens.css` 含全部 275 色 + sizes（僅大間距 space 維持排除）
- **native 輸出已建置**，格式對齊既有交付：iOS Asset Catalog colorsets、Android `values(+night)/colors.xml`。與 plugin 轉出版驗證：**名稱 275/275 一致；值有 63 處相差 1/255**（plugin 端量化偏差 —— pipeline 版與 Figma API / web CSS 完全一致，視覺不可辨），**以 pipeline 版為準**
- **第二步 A 已完成（2026-07-22）**：`tokens:build` 直接接管 `src/components/ui/tokens/{colors,spacing,radius}.css`。接管驗證：共同 340 token 值零變更、零消失、新增 221（全收錄帶入）、`build:lib` 通過。typography.css / shadows.css 不在 Figma variables 範圍，維持手寫
- plugin（color2code）交付流程已退役，舊交付檔（src/assets/ios-colors、android-colors.csv）已移除

## 主題色盤不輸出（2026-08-13 定案）

`color/{background,content,border}/theme/{apple,girl,green,lake,lavender,rock}/*` 共 **90 色**，
`build.mjs` 的 `COLOR_EXCLUDE` 會把它們擋在**所有輸出**之外——
web CSS、iOS colorsets、Android colors.xml 都沒有，輸出色數 275 → **185**。
`figma-dump/colors.txt` 與 `tokens.json` 母版仍全收（它們是 Figma 的鏡像，不是交付物）。

理由：三邊（設計系統、iOS、Android）都 **0 引用**。App 的換主題是
**伺服器下發 JSON 覆寫 15 個 brand token**（iOS `ThemeManager` 讀 `theme.json`、Android `ThemePack`），
跟這批色票的名字無關——對照表見 [../docs/ui-mapping.md](../docs/ui-mapping.md#主題色對應表)。
色盤只留在 Figma。**要恢復輸出就刪掉那條 regex**，不要手改產出檔。
