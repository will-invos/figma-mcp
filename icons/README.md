# Icon Pipeline

> SVG 源（[src/assets/icons/](../src/assets/icons/)）是單一來源。native 產出由 `npm run icons:build` 生成，屬產物（`icons/dist/` 已 gitignore）。

```
src/assets/icons/*.svg（273 顆，16×16，Figma 匯出）
   │ npm run icons:build（svg2vectordrawable + 正規化）
   ├→ icons/dist/ios/icons.xcassets/<name>.imageset/   ← iOS，向量保留 + template（可 tint）
   ├→ icons/dist/android/drawable/ic_<name>.xml         ← Android vector drawable
   └→ icons/dist/manifest.json                          ← 命名對照 + 來源瑕疵清單
```

## 命名對照

| 端 | 規則 | 例 |
|----|------|-----|
| SVG 源 / web class | kebab（`icon-` 前綴） | `arrow-down` → `.icon-arrow-down` |
| iOS（Asset Catalog） | 同 base | `arrow-down`（imageset） |
| Android（drawable） | `ic_` 前綴、底線 | `ic_arrow_down` |

完整對照見 `icons/dist/manifest.json` 的 `icons[]`。

## 交付

native 團隊 `npm run icons:build` 後，從 `icons/dist/` copy：
- iOS：`ios/icons.xcassets/` 併入 `Assets.xcassets`；用 template rendering，顏色靠 `tintColor`
- Android：`android/drawable/*.xml` 放進 `res/drawable/`；顏色靠 `app:tint` / `android:tint`

## Web（現況，未由本管線產生）

web 仍用既有 icon font（`src/components/ui/icons/invos.woff2`，255 glyph，`<i class="icon-name">`）。
**font 已略舊**：SVG 源 273 顆 > font 255 顆，差 18 顆（多為品牌 logo：facebook/google/line/threads 等 + 少數新 icon）。
web font 重生（SVG → woff2 + ui-icons.css）尚未納入本管線 —— 屬 opt-in（動到二進位字型檔、需視覺回歸），要做再議。

## 來源瑕疵（`icons:build` 會列出，建議 Figma 端修）

| 檔案 | 問題 |
|------|------|
| `document-check-aside.pdf` | 非 SVG（Figma 匯出選錯格式，需重出）——目前**不會**被產出 |
| `volumn-filled-on/off.svg` | typo：volumn → volume |
| `bell_filled.svg` | 底線分隔（輸出已自動正規化為 `bell-filled`，但源建議改名） |

> `twitter_x` 的底線視為品牌名，不列入瑕疵。
