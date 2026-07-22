# 雙平台交接 — 設計系統三端 Mapping 與一致性策略

> **狀態**：草稿 `v0.1` · **視覺方向（§0、§1）過去已達成共識，屬定案記錄，不再討論**；本文件重心在 **§2 三端元件 mapping**，§3 起為待逐項確認的交接項。
> **目的**：讓 PM 用本設計系統（web）產出的 prototype / mockup，能讓 iOS 與 Android 工程師靠一張對照表「無痛」找到對應的原生元件與 token。
> **用法**：§3 起每個 `- [ ]` 是一個**待確認決策或待辦**。確認後改成 `- [x]`，並在該行補上〈結論 / 負責人 / 目標日〉。
> **關聯文件**：[CLAUDE.md](../CLAUDE.md)（web 元件決策）、[design.md](../design.md)（視覺規格）、[docs/ios-figma-mapping.md](./ios-figma-mapping.md)（iOS 元件 / 色彩 / 字體對應）、[docs/android-figma-mapping/](./android-figma-mapping/)（Compose 元件索引）。

---

## 0. 定位決策（一切的前提）

> 此為已定案的定位記錄，其餘章節都以它為基準。

**決策**：本設計系統採 **「刻意跨平台一致的品牌化 UI」**。

- **預設**：同一套視覺（目前偏 iOS 風格）同時作為 web / iOS / Android 的品牌外觀，不做平台原生視覺分歧。
- **例外**：少數小元件為求開發便利，且在視覺及操作上沒有太大差異而採平台原生（Material on Android / native on iOS）。
- **不可選的部分**：平台 chrome（狀態列、home indicator、返回手勢、鍵盤、轉場）本來就是原生，不列入「選擇」。

**這代表的取捨**（視覺方向過去已達成共識，此處僅記錄）：
- ✅ 好處：三端外觀一致、品牌識別強、設計/維護一份、prototype 可信度高。
- ⚠️ 代價：Android 使用者會覺得「不完全像原生 Android app」（例如 Dialog 置中、按鈕造型非 Material）。這是刻意的品牌選擇，不是 bug。

---

## 1. 平台一致性分級（Tier A–D）— 定案記錄

視覺方向已有共識，以下為已定案分類，供 §2 mapping 時查照，不再討論。

| Tier | 意義 | 涵蓋 |
|------|------|------|
| **A** | 統一品牌視覺（兩平台長一樣） | 絕大多數元件：Button、IconButton、TextField、TextArea、Select、PinInput、FieldGroup、Dialog、Sheet、Banner、Toast、SnackBar、InAppNotification、Tabs、TabBar、ProgressBar、Card、List、Tag、ChipBar、Badge、Avatar、Tooltip、NavigationBar、SearchField |
| **B** | 視覺統一、互動/觸感交給平台 | 點擊回饋（iOS highlight / Android ripple）、文字選取游標、捲動回彈、列表慣性 |
| **C** | 採平台原生元件 | **Switch**（iOS `UISwitch` / Android Material）、**Date picker**（✅ 已定案：雙平台原生）、**Spinner**（原生指示器）、系統鍵盤、Share sheet、系統權限對話框 |
| **D** | 平台 chrome（非選擇） | 狀態列、home indicator、Android 返回鍵/predictive back、轉場、safe-area insets |


---

## 2. 三端元件對照表（本文件核心）

### 2.1 mapping 原則：以「web 元件」為 join key

現況：[ios-figma-mapping.md](./ios-figma-mapping.md) 與 [android-figma-mapping/](./android-figma-mapping/) **兩端都已有相當完整的 mapping，但各自以「Figma 元件名」為 key、獨立維護** —— 沒有一張把三端接起來的表。

而 PM 的 prototype 是用 **web 設計系統元件**（`@/components/ui` 的 barrel export）搭的。所以：

> **以「web 元件名」作為三端的唯一 join key。** 工程師看到 prototype 用 `<Button>`，查下表同一列即得 Figma 來源、iOS 型別、Android Compose 型別。

### 2.2 對照表

圖例：**Tier** 見 §1，`A+B` = 視覺歸 A（統一品牌樣式）、互動觸感歸 B（平台原生回饋）；`—` = 該端無此元件（parity 缺口）；`待確認` = 該端 mapping 文件尚未收錄，需該平台團隊補填。

| web `@/components/ui` | Figma 元件 | iOS | Android Compose | Tier | 備註 / parity |
|---|---|---|---|---|---|
| `Button` | Text button | `PrimitiveButton` | `ButtonCompose` / `TextButtonCompose` | A | variant filled/outline/ghost/text 對應 |
| `IconButton` | Icon button | `IConButton` | `IconButtonCompose` | A | |
| `Fab` | FAB | `FABButton` | `FABCompose` | A | web 已補（`ba4bb19`），與 Figma token 綁定逐項核對一致 |
| `TextField` | Text field | `FormTextFieldView` | `CustomTextFieldCompose` | A | |
| `TextArea` | Text area | `FormTextFieldView`（多行） | `CustomTextFieldCompose`（多行） | A | |
| `Select` | Select | `SelectionFieldView` | `SimpleTextSelector` | A | 選單呈現依內容而異；一般：iOS 以 `presentModalViewController` 呈現、Android 以 bottom sheet 模擬 modal —— 兩平台皆為 modal 式,語意一致 |
| `Checkbox` | Checkbox / item | `CustomCheckbox` | `InvosCheckBox` | A+B | 視覺統一（A）、點擊回饋走平台原生（B） |
| `Radio` | Radio item / group | `RadioButtonGroup` / `RadioItemView` | `InvosRadioButton` | A+B | 視覺統一（A）、點擊回饋走平台原生（B） |
| `Switch` | Switch | `UISwitch`（原生） | `InvosSwitch`（Material） | **C** | 唯一已定案的原生視覺分歧 |
| `Slider` | Slider | — | — | — | ⏸ 暫不納入比對（雙平台未使用；web 保留供 prototype） |
| `PinInput` | Pin input | 自訂 | 待確認 | A | iOS 自訂、Android 待補 |
| `FieldGroup` | Field group | `GroupFormTextFieldView` | 待確認 | A | |
| `SearchField` | Search field | Nav search（見 NavigationBar） | `Search components` | A | |
| `Banner` | Basic / Rich banner | `AlertBannerView` | `Banner components` | A | ✅ 已更名對齊三端（原 `Alert`；web 舊名以 `@deprecated` 別名保留） |
| `Dialog` | Dialog | `AlertVC` | `Dialog components` | A | 命名差異：iOS 照原生慣例命名（`UIAlertController`），查表對應 |
| `Toast` | Toast | `ToastView` | 待確認 | A | Android mapping 未收錄 |
| `SnackBar` | Snackbar | `SnackBarView` | 待確認 | A | Android mapping 未收錄 |
| `InAppNotification` | In-app notification | `InAppNotifyView` | 待確認 | A | Android mapping 未收錄 |
| `Tooltip` | Tooltip | `ToolTipView` | `ToolTipCompose` | A | |
| `Spinner` | Spinner | `UIActivityIndicatorView`（原生） | `Loading components` | **C**（建議） | |
| `ProgressBar` | Progress bar | 自訂 | `Progress`（feedback） | A | |
| `ProgressGroup` | （Progress 群組） | — | — | — | ⏸ 暫不納入比對（雙平台未使用；web 保留供 prototype） |
| `Sheet` / `SheetHeader` | Bottom sheet | `BottomSheetVC` | `BottomSheet components` | A | 兩平台 Kit 皆含平台 indicator（iOS home indicator / Android gesture handle，藏於 Sheet footer） |
| `CardItem` | Card item | 自訂 `UICollectionViewCell` | `Card`（misc） | A | |
| `NavigationBar` | Navigation Bar | `…NavigationDecoratable` + `NavigationButton` | `TopBackAppBar` / `TopCloseAppBar` / `AppBar` | A | |
| `PageNavigation` | Page Navigation | 待確認（原 Figma「Month picker」更名，iOS 舊對應 `YearMonthPickerView` 需重審） | 待確認 | A | 上一頁 / 置中標題 / 下一頁；「按月查詢」的月份切換用這個 |
| `DottedController` | Dotted Controller | 待確認（可能對應原生 `UIPageControl`） | 待確認 | A | 原 Figma「Page Controller」更名；輪播 / 分頁指示點 |
| `TabBar` | Tab bar | 原生 `UITabBar` | Bottom navigation | A視 | ✅ iOS 定案採原生 `UITabBar`（品牌外觀靠 appearance 設定）；兩平台 Kit 皆含平台 indicator |
| `Tabs` | Tabs | `SegmentedView` | `Tab components` | A | 命名差異：iOS 照原生慣例命名（`UISegmentedControl`），查表對應 |
| `Divider` | Divider | `UIView`（1pt） | Divider | A | |
| `ListItem` | List item | 自訂 `UITableViewCell` | List item | A | |
| `ListHeader` / `ListFooter` | List header / footer | 自訂 | 待確認 | A | |
| `Tag` | Tag | `TagView` | `TagCompose` | A | |
| `ChipBar` | Chip bar | `ChipView` | 待確認 | A | ✅ 已更名對齊 iOS `ChipView`（原 `TagBar`；web 舊名以 `@deprecated` 別名保留） |
| `Badge` | Category / Notification badge | `TagView(.category)` | `CategoryBadge` / `NewNotifyDot` | A | |
| `Avatar` | Avatar | — | — | — | ⏸ 暫不納入比對（雙平台未使用；web 保留供 prototype） |
| —（prototype 用原生 `<input type="date">` 並標注） | —（Kit 無，採原生） | 原生 `UIDatePicker` | Material Date picker | **C** | ✅ **已定案：Date picker 雙平台採原生**，不自建、不入庫；prototype 標注「此處接原生」 |
| — | — | `YearMonthPickerView`（客製） | —（客製） | — | ⏸ Month picker 未統一元件（各端客製），不納入比對；月份「切換」用 `PageNavigation` |
| `PageStatus` | Page status | `EmptyView` | `EmptyView components` | A | ✅ web 已補：5 種狀態（斷線/系統錯誤/無結果/空/不存在）附插圖與預設文案；插圖有 SVG 源 |

### 2.3 從表格浮出的三類問題（需處理）

1. **命名差異（非風險項，查表即可）**：iOS 端以原生元件命名慣例對應（`AlertVC` ← `UIAlertController` 慣例、`SegmentedView` ← `UISegmentedControl` 慣例），對 iOS 工程師是自然命名，本表即是對照 —
   - `Dialog`(web) ↔ iOS `AlertVC`
   - `Tabs`(web) ↔ iOS `SegmentedView`
   - ~~`Alert` ↔ `AlertBannerView`~~、~~`TagBar` ↔ `ChipView`~~：web/Figma 已更名為 `Banner` / `ChipBar`，直接對齊
2. **行為說明（已釐清）**：`Select` 的選單呈現會依內容量採不同操作；一般情況兩平台都是 modal 式 —— iOS 以 `presentModalViewController` 呈現選單、Android 以 bottom sheet 元件模擬 modal view，互動語意一致，非分歧。
3. **parity 缺口（有格子是空的）**：
   - **web 缺**：✅ **全數收斂** —— ~~`FAB`~~、~~`PageStatus`~~、~~月份切換~~（`PageNavigation`）已補；~~Date picker~~ 已定案採雙平台原生，不需 web 元件
   - ⏸ Month picker：未統一元件（各端客製），決議不納入比對、不追蹤入庫
   - **Android mapping 未收錄**：`Toast`、`SnackBar`、`InAppNotification`、`ChipBar`、`FieldGroup`、`PinInput`
   - ~~iOS mapping 未收錄~~ ✅ 已收斂：TabBar 定案原生 `UITabBar`
   - ⏸ **暫不納入比對**（雙平台未使用）：`Slider`、`ProgressGroup`、`Avatar` — web 保留供 prototype，若未來原生要用再回表補列

**待確認/待辦**
- [ ] 本 §2 對照表定案，成為三端交接的單一入口（取代各自看兩份 mapping）
- [x] ~~命名地雷加註~~ 結論：非風險項 —— iOS 以原生命名慣例對應，§2 表即是對照，不需額外加註
- [x] ~~`Select` 行為差異註明~~ 結論：兩平台皆 modal 式呈現（iOS `presentModalViewController` / Android bottom sheet 模擬），依內容量調整操作，已記錄於 §2.2
- [ ] Android 團隊補填「待確認」格（Toast/SnackBar/InApp/ChipBar/FieldGroup/PinInput）
- [x] ~~Month picker 入庫決策~~ 結論：忽略 —— 未統一元件（各端客製），不入庫、不納入比對
- [x] iOS 團隊補填「待確認」格 —— TabBar 定案原生 `UITabBar`；Slider / ProgressGroup / Avatar 暫不納入比對（雙平台未使用）

---

## 3. Token 對照（web ↔ iOS ↔ Android）

> 元件對得上，數值也要對得上，否則同一畫面三端長不一樣。

- **現況**：
  - Figma variables → **手動對齊** → 本 repo CSS custom properties（git `a4f8159` 即手動對齊紀錄）。iOS/Android 再各自手抄 = 多份漂移。
  - **色彩**：iOS 已有 semantic 對應（`.colorBackgroundBrandDefault` 等，見 ios-figma-mapping.md）、Android 對到 `colors.xml`（見 references/colors.md）。三端命名相近但無單一產生器。
  - **排版**：web `.text-*` class ↔ iOS `UIFont.*`（ios-figma-mapping.md 已列）↔ Compose `TextStyle`（android references/text-styles.md）。但 Figma text styles 全是 `iOS/` 前綴（SF Pro + PingFang TC）；**Android 的 Roboto + Noto Sans TC 字級/行高缺單一規格**（SF Pro 16pt ≠ Roboto 16sp，行高字寬會反映在版面）。
  - **間距 / 圓角 / 陰影**：`px ↔ pt ↔ dp` 換算規則、Dynamic Type / Android font scale 對應無文件。
### 3.1 ✅ 已定案方案：MCP 同步腳本 + Style Dictionary（2026-07-22）

**一句話**：現在是四個人各抄一份筆記（Figma / CSS / Swift / Kotlin），改成「一份母版 + 三個唯讀分享連結」——就像 Figma 的 library publish，只是發佈的是「數值」。

```
      Figma variables（設計師改這裡，原地不動、不搬家）
              │  MCP 同步腳本（手動觸發，整批倒出）
              ▼
        tokens.json（git 裡的中繼母版，每次變更都有 diff 記錄可審）
              │  Style Dictionary（免費開源，自動產生 ↓，人不碰）
   ┌──────────┼──────────────┐
   ▼          ▼              ▼
colors.css  Colors.swift   Colors.kt / colors.xml
 (web)       (iOS)          (Android)
```

**為什麼選這條**（三選一的結論）：

| 選項 | 不選 / 選的理由 |
|------|----------------|
| Tokens Studio plugin | ❌ 進階功能付費，且 token 編輯主場要從 Figma variables 搬進 plugin（搬家成本） |
| Figma Variables REST API | ❌ 只開放 Enterprise 方案（本團隊方案不符，同 Code Connect 受限原因） |
| **MCP 同步腳本** | ✅ 零額外成本；variables 留在 Figma 原地當唯一真相；MCP 讀取管道現成（本文件的比對就是靠它讀的） |

**日常流程（設計師視角）**：
1. 在 Figma variables 改值（例：`warning/default` 從 `#ff8710` 調成 `#f57c00`）
2. 觸發同步（跑一次腳本 / 請 AI 執行）→ `tokens.json` 產生一筆看得懂的 git 變更：「warning/default: #ff8710 → #f57c00」
3. Style Dictionary 自動重產三端檔案 → 工程師像收 library publish 一樣收到更新，不用手改

**特性與限制（期待管理）**：
- 產出的三端檔案是**唯讀投影**（如同 instance）——直接改會被下次產生蓋掉，要改就改 Figma
- 同步是**手動觸發**（半自動），不是即時；之後方案升級可換全自動進水口，`tokens.json` 中心不變
- pipeline 只搬**數值**：命名決策、Android 行高微調、元件行為仍是人的事

### 3.2 待辦

- [x] ~~決定 token 源工具~~ 已定案：MCP 同步腳本 + Style Dictionary（見 §3.1）
- [x] ~~第一步（驗證）~~ ✅ 完成（2026-07-22）：倒出 colors 275（Light/Dark）+ sizes 38、零錯誤；建置 [tokens/](../tokens/)（`npm run tokens:build`）；**端到端等值驗證 163/163 共同 token 全數一致、值零漂移** —— 手動對齊的品質很好，切換不會造成任何視覺變化
- [x] 第一步驗證發現的待決事項 —— **全數定案（2026-07-22）**：
  - [x] `seondary` / `graident` 命名：**照 Figma 為準、不改名**（皆屬 web 排除範圍，無影響）
  - [x] `radius/full` 定案 **999**：CSS `--radius-full` 已由 9999px 改為 999px（視覺等效）
  - [x] Figma-only token **不納入 web 輸出**（theme/*、category/* 等 124 個；`build.mjs` 的 `WEB_EXCLUDE` 落實）；brand gradient 4 個 web 有用，保留。過濾後產出 189 個 token 與手寫 CSS 完全對齊，唯一差異 `--color-border-secondary`（web 未使用、Figma 無對應，接管時自然移除）
- [ ] 第二步：`dist/tokens.css` 正式接管 `src/components/ui/tokens/{colors,spacing,radius}.css`；加開 Swift + Compose 輸出格式，iOS / Android 專案改吃產生檔
- [ ] 補 Android typography（Roboto / Noto Sans TC 字級行高）進 Design System 2025 與 token
- [ ] 定義 `px ↔ pt ↔ dp/sp` 換算與 Dynamic Type / font scale 規則
- [ ] 三端 color / text-style 命名對照表（補進本文件或各 mapping 文件）

---

## 4. Mapping 維護機制（別讓三份文件再各走各的）

- **問題**：目前 web（本 repo）、[ios-figma-mapping.md](./ios-figma-mapping.md)、[android-figma-mapping/](./android-figma-mapping/) 三份**獨立維護、key 不一致**。新增或改元件時，很容易只更新一端，parity 悄悄破裂。
- **建議**：
  - 以 **§2 對照表為 master index**，每次新增/改動元件，先更新這張表再改各端。
  - web repo 每加一個 `@/components/ui` 元件，PR checklist 要求補上 §2 對應列（iOS/Android 可先填「待對應」）。
  - 定期（每次改版）對一次帳：§2 有沒有新的空格。
- **待確認/待辦**
  - [ ] 指定 §2 對照表的 owner（誰負責保持三端同步）
  - [ ] web repo PR 模板加一條「新元件需更新 cross-platform-handoff §2」
  - [ ] 決定對帳頻率（每次 minor 版本？）

---

## 5. 其他交接待辦（非 mapping，但影響落地）

> 這些不屬於 mapping，但不處理一樣會返工。優先級 P0 > P1 > P2。

### 5.1 safe-area — prototype 版面會「說謊」〔P0，可直接修〕
- **現況**：全 repo 只有 [InAppNotification.css:16](../src/components/ui/InAppNotification.css#L16) 處理 `env(safe-area-inset-*)`；[TabBar.css](../src/components/ui/TabBar.css) 與 Sheet **未處理 bottom inset**，真機會被 home indicator 遮住 → 交出去的版面 spec 是錯的。
- [x] 修 `TabBar` / `Sheet` 的 `env(safe-area-inset-bottom)` —— 已修（兩者容器補 `padding-bottom: env(safe-area-inset-bottom, 0px)`；規則已寫入 design.md §3.2）

### 5.2 web prototype 表達不了的原生行為〔P1〕
- hash routing 無法表達 push / modal / sheet / tab 差異；手勢、鍵盤、haptics、動效曲線無載體。
- [ ] 建「prototype 隨附規格」模板：navigation map（呈現方式 + 返回行為）＋ 手勢（sheet drag/detents、swipe actions）＋ 鍵盤（avoidance / return key）＋ haptics（對獎/金流關鍵點）＋ 動效 CSS→native 對應

### 5.3 Icon / 資產管線是 web-only〔P1〕
- icon 為 icon font（`src/components/ui/icons/invos.woff2`，255 顆），native 無法直接吃。
- [ ] 確認是否有 SVG 源
- [ ] 建 SVG → web font + iOS asset catalog + Android vector drawable 管線 + 命名對照（`icon-scan` ↔ `ic_scan`）

### 5.4 a11y / 內容規則〔P2〕
- [ ] 字級放大（Dynamic Type / font scale）截斷換行規則
- [ ] VoiceOver / TalkBack 朗讀順序；Android 48dp 觸控標準（目前只有 iOS 44×44）
- [ ] 金額 / 日期格式、長字串截斷規則

---

## 附錄 — 推進順序

| # | 項目 | 章節 | 優先 | 性質 |
|---|------|------|------|------|
| 1 | §2 對照表定案 + 命名地雷加註 | §2 | P0 | 文件 |
| 2 | ~~修 safe-area（TabBar / Sheet）~~ ✅ 已修（`4eb38fd`） | §5.1 | — | 完成 |
| 3 | Token pipeline 建置（✅ 選型已定：MCP 腳本 + Style Dictionary，見 §3.1；先驗證 CSS 等值再擴到 Swift/Compose + Android 字體） | §3 | P0 | 建置 |
| 4 | 補填 parity 空格（Android/iOS 待確認格） | §2 | P1 | 文件 |
| 5 | ~~web 元件 parity~~ ✅ 已收斂（FAB / PageNavigation / DottedController / PageStatus 補齊；Date picker 採原生） | §2 | — | 完成 |
| 6 | mapping 維護機制上線（owner + PR 模板） | §4 | P1 | 流程 |
| 7 | prototype 隨附規格模板 | §5.2 | P1 | 文件 |
| 8 | Icon SVG 管線 | §5.3 | P1 | 建置 |
| 9 | a11y / 內容規則 | §5.4 | P2 | 文件 |

## 附錄 — 名詞
- **join key**：把三端資料接起來的共同欄位；本文件用「web 元件名」。
- **parity**：三端功能/元件的對齊程度；「parity 缺口」= 某端缺對應。
- **home indicator**：iOS 螢幕底部黑色圓角橫條。**detents**：iOS sheet 停駐高度。**predictive back**：Android 14+ 返回預覽手勢。
