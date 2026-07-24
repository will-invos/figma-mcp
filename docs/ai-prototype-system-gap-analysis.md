# AI 高保真原型系統缺口盤點

> **狀態**：Draft v0.2 —— 2026-07-23 完成 UX 審閱與事實查核，調整項已整合至各節(摘要見 §1.1)  
> **目的**：盤點目前設計系統距離「讓產品經理與產品設計師透過 AI agent 快速產出接近現有 App UI/UX、並可直接交付 App 工程師」這個目標仍缺少的能力。  
> **使用方式**：依 P0 → P1 → P2 逐項確認。確認方向後，再拆成獨立規格與實作任務。  
> **關聯文件**：[CLAUDE.md](../CLAUDE.md)、[design.md](../design.md)、[cross-platform-handoff.md](./cross-platform-handoff.md)、[prototype-spec-template.md](./prototype-spec-template.md)

---

## 1. 結論摘要

目前專案已經是一套基礎相當完整的「視覺 UI Kit」，但還不是完整的「AI 高保真產品原型系統」。

目前最完整的是：

- Design tokens 與視覺規範
- 單一 UI 元件與 variants
- Figma 與程式碼的 mapping
- web、iOS、Android 的跨平台交接資料
- dark mode、safe area、icons 等基礎管線

真正影響 AI 能否產出可交付原型的主要缺口，不是更多 primitive 元件，而是以下這條可機器執行的鏈：

```text
產品 domain
  → 使用者 flow
  → page recipe
  → 畫面狀態與 mock data
  → 自動驗證
  → native handoff
```

目前 AI 已經大致知道「按鈕應該長什麼樣」，但還不夠知道：

- 什麼時候該出現哪個按鈕
- 畫面與畫面之間如何串接
- 權限、錯誤、空資料、loading 等狀態如何處理
- 應使用什麼產品文案
- 產出是否真的符合設計系統與工程規格

### 1.1 審閱調整摘要(2026-07-23)

骨架與 P0 前三項(domain flows、page recipes、狀態矩陣)維持；經 UX 審閱後調整如下：

- **降級/延後**：visual regression(P0 → Phase 2，P0 改為 token lint，見 §3.4)、`prototype.yaml` contract(先用現有模板跑 2~3 個 recipe 再決定，見 §4.1)、a11y contract(歸屬元件 manifest，不作 prototype gate，與 handoff §5.4 定案一致，見 §4.3)。
- **提前**：content design 三項進 P0 —— 錯誤訊息結構、empty state 文案模式、按鈕命名原則(與狀態矩陣連動，見 §4.4)。
- **新增四塊 UX 缺口**：保真度分級(§3.0)、prototype 導覽殼層(§3.5)、原生能力假畫面(§3.6)、真機預覽與分享(§3.7)。核心理由：目標是「視覺**及操作**一致性」，單頁正確不等於畫面之間的縫隙正確，prototype 也必須被真機看到才算實現價值。
- **事實勘誤**：原 §5.3 有兩條查核後不成立(Code Connect、發布策略)，已修正。

---

## 2. 現有基礎

### 2.1 已具備的能力

- 約 40 個 UI 元件與互動 stories。
- `CLAUDE.md` 已提供 Component Decision Tree，協助 AI 選擇元件。
- `design.md` 已定義視覺調性、色彩、排版、間距、圓角、陰影、動效與 anti-patterns。
- Figma variables 已能產出 web、iOS、Android tokens。
- `cross-platform-handoff.md` 已整理 web、Figma、iOS、Android 元件 mapping。
- `prototype-spec-template.md` 已涵蓋 navigation、手勢、鍵盤、haptics、系統能力與特殊動效。
- 已考慮 dark mode、safe area 與 native icon assets。

### 2.2 目前的定位差距

| 面向 | 目前狀態 | 目標狀態 |
|---|---|---|
| 視覺規範 | 完整度高 | AI 可自動引用與驗證 |
| UI 元件 | 單一元件完整 | 能組成固定且一致的頁面模式 |
| 產品流程 | 主要依需求當下理解 | 有正式 flow 與業務規則 |
| 畫面狀態 | 以元件 props 為主 | 每頁有完整狀態矩陣 |
| 測試驗收 | lint、build、人工預覽 | interaction、a11y、visual regression 自動化 |
| 工程交付 | Markdown mapping 與人工填表 | machine-readable contract 與驗證工具 |
| AI 使用 | 讀取長文件後自行推導 | 使用少數穩定 interface 與指令 |

---

## 3. P0：最關鍵的缺口

### 3.0 保真度分級(框架決策，先於一切 gate 問題)〔2026-07-23 新增〕

#### 問題

本文多個待確認問題(「是否強制狀態矩陣」「CI 是否阻擋」「YAML 是否必要交付物」)其實是同一個問題：不是所有 prototype 都該過同一道門。單一標準會兩敗：探索被流程稅扼殺，或交付品質被探索習慣拉低。

#### 分級定義

| 等級 | 用途 | 要求 |
|---|---|---|
| **探索級** | 發想、內部討論、快速驗證方向 | 只擋 token lint(禁 hex、magic number、深層 import)，其餘不強制 |
| **交付級** | 正式 handoff 給工程 | 狀態矩陣 + prototype spec + 驗證齊備才能交付 |

本文所有 gate 類問題一律以「只掛在交付級」回答。

#### 決議

- [x] 採用兩級制(2026-07-23)；後續各節 gate 問題依此回答。

---

### 3.1 產品流程與業務規則知識庫

#### 問題

目前文件主要回答：

- 畫面與元件長什麼樣
- 某種需求該使用哪個元件
- 三端元件如何對應

但還沒有一致地回答：

- 發票掃描成功後下一步是什麼？
- 未登入、未綁定、權限拒絕時如何分流？
- 中獎、未中獎、資料處理中、網路錯誤分別呈現什麼？
- 哪些操作可以取消、返回或重試？
- 哪些危險操作需要二次確認？
- 表單何時驗證，以及使用什麼錯誤文案？

如果缺少這層知識，AI 可能產出視覺相似，但產品邏輯是自行猜測的原型。

#### 建議結構

```text
domain/
├── glossary.md
├── personas.md
├── business-rules/
│   ├── invoice-scan.md
│   ├── carrier-binding.md
│   └── prize-redemption.md
└── flows/
    ├── invoice-scan.md
    ├── carrier-binding.md
    └── prize-redemption.md
```

#### 每個 flow 至少定義

- 進入條件
- happy path
- alternative paths
- error、retry、cancel
- 權限狀態
- API loading 與 timeout
- 返回與中斷行為
- analytics events
- 對應畫面
- 需要的原生能力

#### 待確認

- [ ] 是否同意建立正式的 domain 與 flow 知識庫？
- [ ] 首批應整理哪三個核心產品流程？
- [x] flow 要先採 Markdown，還是直接採 YAML schema？→ **Markdown 先行**，知識沉澱後再定 schema(2026-07-23)
- [ ] 業務規則的 owner 是 PM、設計或跨職能共同維護？

---

### 3.2 可重用的頁面模式與產品 recipes

#### 問題

目前設計系統以單一 UI 元件為主。AI 每次都要從 `Button`、`ListItem`、`NavigationBar` 等 primitive 重新組裝頁面，容易產生「局部合理、整體不一致」的結果。

README 提到 Login、Register、BankAccountSettings 等示範頁，但目前實際 App 入口只呈現元件預覽，尚未形成完整 page recipe library。

#### 建議建立的通用 page modules

- `FormPage`
- `SettingsListPage`
- `SearchResultsPage`
- `InvoiceListPage`
- `InvoiceDetailPage`
- `PermissionGate`
- `LoadingContent`
- `AsyncStateBoundary`
- `ConfirmationFlow`
- `EmptyStatePage`
- `BottomActionLayout`
- 原生能力假畫面(`MockCamera`、`MockPermissionDialog` 等，詳見 §3.6)

#### 建議建立的產品 recipes

```text
recipes/
├── login/
├── invoice-list/
├── invoice-detail/
├── scan-result/
├── carrier-binding/
└── prize-redemption/
```

每個 recipe 應包含：

- 可執行的頁面
- 完整狀態切換
- mock data fixtures
- flow spec
- prototype handoff spec
- web／iOS／Android mapping
- 正確範例與常見錯誤

#### 待確認

- [x] 是否將 page recipe 視為正式設計系統的一部分？→ **是**，列第一優先(2026-07-23)
- [ ] 通用 page module 與產品專屬 recipe 應放在同一 repo 或分開？
- [ ] 第一批要優先建立哪些頁面？

---

### 3.3 畫面狀態矩陣與 mock data fixtures

#### 問題

高保真原型不只需要 default state。真正影響產品可信度與工程可交付性的，通常是 loading、empty、error、權限與極端資料狀況。

#### 每個頁面應檢查的狀態

| 狀態類型 | 應涵蓋內容 |
|---|---|
| 資料 | empty、single、many、partial、stale |
| 網路 | initial loading、refreshing、offline、timeout、server error |
| 權限 | unknown、asking、denied、permanently denied |
| 表單 | pristine、editing、invalid、submitting、success、failure |
| 帳號 | guest、logged-in、expired、restricted |
| 內容 | 短字、長字、極端金額、缺圖、多語言 |

#### 建議格式

```yaml
screen: invoice-list
states:
  - id: loading
    fixture: fixtures/invoices/loading.json
  - id: empty
    fixture: fixtures/invoices/empty.json
  - id: loaded-many
    fixture: fixtures/invoices/many.json
  - id: offline
    fixture: fixtures/network/offline.json
```

AI、prototype preview、測試與 App 工程可以共用同一份 fixture，避免各自發明測試資料。

#### 待確認

- [x] 是否要求每個正式 prototype 都附狀態矩陣？→ 依 §3.0：**交付級強制、探索級不強制**(2026-07-23)
- [ ] fixtures 是否要對齊真實 API response model？
- [ ] 哪些狀態是所有頁面的最低交付要求？

---

### 3.4 自動驗證與視覺回歸

#### 問題

目前 repository 有 lint、build、tokens 與 icons pipeline，但沒有正式的元件測試、流程測試、accessibility test 或 visual regression。AI 指引目前主要依賴 Chrome DevTools 人工驗收。

這代表規範雖然完整，仍主要依靠 AI 自覺遵守，無法證明產出真的正確。

#### 審閱立場(2026-07-23)

visual regression **不列 P0**：AI 每次重新生成頁面，pixel baseline 維護成本高、誤報會磨掉使用者信任。P0 只留最便宜的一層 —— **token lint**，把 CLAUDE.md Top 5 地雷從「AI 自覺」變成「機器擋下」(幾條 ESLint／Stylelint 規則即可)。其餘測試基建移至 Phase 2。

#### 建議補齊 —— P0(立即)

- token 使用規則檢查
- hard-coded color、spacing、radius lint rules

#### 建議補齊 —— Phase 2 之後

- component interaction tests
- keyboard 與 focus tests
- accessibility checks
- light／dark visual snapshots
- 常用 iPhone／Android viewport snapshots
- 長字與系統字級放大 snapshots
- prototype flow smoke tests
- reduced-motion tests

#### 目標工作循環

```text
需求
  → 選擇 recipe
  → 產生頁面與狀態
  → schema validation
  → lint / typecheck / interaction test
  → screenshot comparison
  → 產出 prototype + handoff spec
```

#### 待確認

- [x] 是否將 visual regression 列為 P0？→ **否**，P0 改為 token lint(2026-07-23)
- [ ] baseline screenshot 由設計師、工程師或共同核准？
- [x] CI 是否應阻擋未通過的 prototype？→ 依 §3.0：只擋**交付級**；token lint 兩級皆擋(2026-07-23)
- [ ] 第一階段要支援哪些 viewport 與 theme？

---

### 3.5 Prototype 導覽殼層(navigation runtime)〔2026-07-23 新增〕

#### 問題

目標是「視覺**及操作**一致性」。§3.1 的 flow 定義了畫面怎麼串，但沒有回答「**誰來播放這個 flow**」。目前 repo 是 hash routing 的元件預覽：單頁再像 iOS，畫面切換仍是瞬間跳轉 —— 沒有 push／modal／sheet 轉場、沒有返回手勢語意、tab 切換不保留狀態，操作一致性在畫面與畫面的縫隙間破功。

#### 建議建立

一個 prototype shell，提供：

- iOS push／pop 轉場(含 edge-swipe 返回的視覺語意)
- modal／sheet 呈現與 dismiss 行為
- back 行為與 navigation stack
- TabBar 切換保留各 tab 的捲動位置與狀態
- 與 §3.1 flow spec 對接：flow 定義即殼層的路由設定

#### 待確認

- [ ] 殼層 API 形態(宣告式路由設定 vs 程式式 navigate)？
- [ ] 轉場動效是否直接引用 design.md §6.3 預設？

---

### 3.6 原生能力假畫面元件庫〔2026-07-23 新增〕

#### 問題

發票存摺的核心迴圈是**掃描**。prototype-spec-template §5 已定義「系統整合點用假畫面帶過」，但沒有可重用的假畫面元件 —— 每個 prototype 各自亂做，一致性與可信度都會崩。

#### 建議建立的 mock modules(併入 §3.2 page modules 清單)

- `MockCamera`(取景框 + 假掃描成功／失敗)
- `MockPermissionDialog`(iOS 樣式權限彈窗：相機、通知、相簿)
- `MockShareSheet`
- `MockBiometricPrompt`(Face ID／指紋)

#### 待確認

- [ ] 首批支援哪些原生能力？(建議：相機掃描 + 權限彈窗，對應核心 flow)

---

### 3.7 真機預覽與分享機制〔2026-07-23 新增〕

#### 問題

POC 的價值實現在「利害關係人拿手機看」的那一刻，但目前沒有回答 prototype 怎麼被**看到**。且鍵盤推擠、捲動手感、safe area 只有真機看得出來 —— cross-platform-handoff §5.1 已指出「prototype 版面會說謊」。

#### 建議

- 開發中：LAN dev server + QR code(掃了直接在手機上開)
- 分享：每個 prototype 一個可部署的 URL(靜態 build 即可)
- 支援加入主畫面(PWA meta)以移除瀏覽器 UI，接近全螢幕 App 體感

#### 待確認

- [ ] 部署載體(GitHub Pages／Vercel／內部主機)？
- [ ] 是否需要簡易存取控制(內部產品資訊)？

---

## 4. P1：直接影響工程交付的缺口

### 4.1 將 Prototype Spec 升級為正式交付契約

#### 現況

`prototype-spec-template.md` 已涵蓋重要的原生交付資訊，但仍需要 PM 或設計師複製後人工填寫，也還沒有被設為正式交付 gate。

#### 審閱立場(2026-07-23)

**緩**。prototype-spec-template.md 才剛落地，先用它跑 2～3 個真實 recipe、記錄人工填表的實際摩擦點，再決定是否 YAML 化。過早 gate 會扼殺探索(見 §3.0)。以下建議保留，待摩擦點確認後再啟動。

#### 建議

將規格改為 machine-readable `prototype.yaml`，並可自動產生人類可閱讀的 Markdown：

```yaml
feature: invoice-scan
screens:
  scan:
    presentation: push
    back: home
    nativeCapabilities: [camera]
  result:
    presentation: modal
    dismissible: false
gestures:
  - screen: result
    type: none
haptics:
  - event: prize_won
    feedback: success
```

可自動驗證：

- 每個畫面是否都有來源與返回行為
- modal／sheet 是否定義 dismiss 行為
- 是否涵蓋 loading、empty、error
- 是否標記原生整合能力
- 是否定義負責人與 prototype 版本

#### 待確認

- [x] `prototype.yaml` 是否作為所有原型的必要交付物？→ 依 §3.0：最多僅**交付級**要求；格式(YAML vs Markdown)待 Phase 1 摩擦點確認(2026-07-23)
- [ ] 是否由 AI 建頁面時自動產生？
- [ ] 是否需要從 YAML 自動產生 Markdown handoff 文件？

---

### 4.2 封閉三端 mapping 與 token parity

#### 尚未完成的項目

- Android mapping 尚缺 Toast、SnackBar、InAppNotification、ChipBar、FieldGroup、PinInput。
- Android typography 規格尚未成為單一真相來源。
- 尚未定義完整的 `px ↔ pt ↔ dp/sp` 換算規則。
- Dynamic Type／Android font scale 對應仍不完整。
- 三端 text-style 命名尚未完全對齊。
- mapping owner、PR checklist 與 parity 對帳頻率尚未落實。

#### 建議

將 mapping 從 Markdown 表格搬到 JSON／YAML，再自動產生文件與 CI 檢查：

- 每個 barrel export 必須有 mapping。
- 每個 Figma component key 必須有 status。
- 缺少 native adapter 時必須標記 `prototype-only`。
- 元件新增、改名或 deprecated 時 mapping 必須同步更新。

#### 待確認

- [ ] 是否同意以 machine-readable mapping 為 single source of truth？
- [ ] mapping 的 owner 是誰？
- [ ] `prototype-only` 元件是否允許出現在正式交付 prototype？

---

### 4.3 Accessibility contract

#### 問題

目前 VoiceOver／TalkBack 朗讀順序被列為暫不處理。這對探索型 prototype 可以接受，但若目標是工程師可以直接開發，會留下重要交付缺口。

#### 審閱立場(2026-07-23)

a11y contract 屬於**元件庫層**的責任：放進 §5.1 component manifest，工程接手時查，不作為 prototype 的交付 gate。此立場與 cross-platform-handoff §5.4 既有定案一致，本節不重開該決策；下列 contract 內容隨 manifest 試行推進。

#### 每個元件至少應定義

- accessible name
- role 與 state
- focus order
- keyboard interaction
- modal focus trap
- focus restoration
- error announcement
- dynamic content announcement
- reduced motion
- contrast
- font scaling behavior

例如 `Dialog` 的 interface 不應只描述外觀與 props，也應定義：

- 開啟後初始 focus 在哪裡
- Escape／system back 如何運作
- 關閉後 focus 回到哪裡
- screen reader 如何朗讀 title、content 與 actions

#### 待確認

- [x] Accessibility 是正式 prototype 的必要要求，還是 App 實作階段才補？→ contract 由元件 manifest 承載，prototype 不設 a11y gate(2026-07-23，同 handoff §5.4)
- [ ] 第一階段最低標準要涵蓋哪些元件與行為？
- [ ] 是否導入自動化 a11y 檢查？

---

### 4.4 Content design 與文案系統

#### 現況

目前已有金額、日期、時間與發票期數等格式規則，但還缺少完整的產品文案規範。

#### 審閱立場(2026-07-23)

下列前三項(粗體)**提前進 P0**：視覺一致但文案語氣不對，一眼就看出「不是我們的產品」；文案是 AI 生成頁面時最容易自由發揮、又沒有 token 可查的地方。且與 §3.3 狀態矩陣連動 —— 要求每頁有 empty／error 狀態，就必須同時給文案模式，否則 AI 只能瞎編。其餘維持 P1。

#### 建議補齊

- **按鈕命名原則(P0)**
- 標題與說明文字層級
- **error message 結構與語氣(P0)**
- **empty state 的標題、描述與 CTA(P0)**
- 成功與警告訊息
- 危險操作確認文案
- 權限請求前導說明
- loading 文案
- 數字、單位與千分位
- 長字串、換行與截斷規則
- 術語與禁用詞
- 繁體中文標點與中英混排

#### 待確認

- [ ] 是否建立 product voice & tone 文件？
- [ ] 是否建立可供 AI 使用的文案 patterns？
- [ ] 長字串與截斷規則由設計系統統一，還是由個別功能決定？

---

## 5. P2：提升 AI 可導航性與維護品質

### 5.1 Component manifest

#### 問題

目前 story metadata 主要描述 component、props、category 與 render，缺少 AI 選擇與工程交付真正需要的語意。

#### 建議欄位

```yaml
name: Button
purpose: 執行明確動作
doNotUseFor:
  - 純頁面導航
states:
  - default
  - pressed
  - focused
  - disabled
  - loading
figmaKey: component-key
native:
  ios: PrimitiveButton
  android: ButtonCompose
accessibility:
  role: button
  loadingAnnouncement: true
```

完整 manifest 可涵蓋：

- 何時使用／何時不要使用
- supported states
- content constraints
- accessibility contract
- Figma key
- native mapping
- compatible page patterns
- deprecated variants
- 正確範例與反例

Story、文件、AI context、mapping 與測試應盡可能從同一份 manifest 產生。

#### 待確認

- [ ] 是否建立 component manifest schema？
- [ ] 先選哪 3～5 個核心元件試行？
- [ ] manifest 是由元件作者維護，還是由設計系統 owner 維護？

---

### 5.2 AI agent interface 與工具化

#### 問題

目前 AI 主要依賴讀取 `CLAUDE.md` 與其他長篇文件後自行推導。不同 AI agent、IDE 或安裝方式不一定會自動讀取 package 內的文件。

#### 建議提供

- `AGENTS.md`
- 短版 `AI_CONTEXT.md`
- machine-readable component／flow／prototype manifests
- page scaffold CLI
- prototype validation CLI
- design-system suggestion CLI

可能的操作 interface：

```bash
npm run ds:suggest -- "建立載具綁定失敗頁"
npm run prototype:new -- carrier-binding
npm run prototype:validate -- carrier-binding
```

AI 應只需要學會少數穩定 interface，複雜規則則由工具實作集中處理。

#### 審閱補充(2026-07-23)

CLI 對工程師是好介面，對 PM 不是 —— PM 的介面是自然語言。真正需要的是一頁 PM-facing quickstart + 詞彙表(recipe 名、狀態名)，讓 PM 能用系統聽得懂的詞跟 AI 溝通；§3.1 的 glossary 可兼任此角色。

#### 待確認

- [ ] 要優先支援哪些 AI agent？
- [ ] 是否建立 agent-neutral 的 `AGENTS.md`？
- [ ] 第一個 CLI 應先做 scaffold、suggest 還是 validate？

---

### 5.3 文件與 repository 事實同步

#### 目前可見的漂移(2026-07-23 查核後修正)

查核屬實：

- README 提到 Login、Register、BankAccountSettings 等頁面，但目前 repo 尚未提供這些完整示範頁。
- README 安裝範例仍使用 `v0.1.0`，與目前 package version(0.6.0)不一致。

查核後不成立，自漂移清單移除：

- ~~README 技術棧列出 Code Connect，但實際狀態是尚未啟用~~ —— README 已明確標注未啟用並解釋原因，無漂移。
- ~~`private: true` 與發布策略矛盾~~ —— README 已定義 GitHub tag dependency 安裝方式，與 `private: true` 相容，發布策略已存在。

#### 建議

- release checklist 加入文件同步。
- README 的版本範例改用 placeholder 或自動產生。
- 自動檢查 README 所列頁面、scripts 與 exports 是否存在。

#### 待確認

- [x] 套件正式發布策略為何？→ 已定義：GitHub tag dependency(README 記載)，暫無需變更(2026-07-23)
- [ ] README 是否保留尚未存在的示範頁描述？
- [ ] 是否需要 docs validation？

---

## 6. 建議實施順序

### Phase 1：讓 AI 能產生正確流程(2026-07-23 修訂)

1. 建立 domain glossary(Markdown；兼作 PM-facing 詞彙表，對齊 recipe 名與狀態名)。
2. 整理前三個核心 flow(Markdown 先行)。
3. 建立 5～8 個完整 page recipes(以現有 spec 模板記錄，蒐集填表摩擦點)。
4. 為每個 recipe 補齊狀態矩陣、fixtures 與 P0 文案模式(錯誤訊息結構、empty state 文案、按鈕命名)。
5. 建立 prototype 導覽殼層與首批原生假畫面(§3.5、§3.6)。
6. 加入 token lint(禁 hex、magic number、深層 import；§3.4)。
7. 建立真機預覽與分享機制(§3.7)。
8. 提供標準 prototype scaffold。

### Phase 2：讓 AI 能證明產出正確

1. 加入 interaction tests 與 prototype flow smoke tests。
2. 建立 light／dark／viewport／長字 visual regression。
3. 加入 accessibility 自動檢查。
4. (token lint 已提前至 Phase 1)其餘 hard-coded value 規則持續加入 lint／CI。
5. 依 Phase 1 摩擦點決定 prototype spec 是否 YAML 化；若是，建立 `prototype:validate` 指令(僅 gate 交付級)。

### Phase 3：讓 App 工程師可以低摩擦接手

1. 封閉三端 mapping 缺口。
2. 定義 data model、API fixtures 與 error taxonomy。
3. 在交付契約加入 analytics、permissions、deep links。
4. 建立 native adapter 範例或 reference implementation。
5. 從 manifests 自動產生元件文件、mapping 與 AI context。

---

## 7. 建議的第一輪確認範圍

為避免一次討論過多，第一輪只需要確認以下五項方向：

1. **產品知識是否入 repo**：domain、business rules 與 flows 是否正式納入版本控制。→ **是**，Markdown 起步。
2. **Page recipe 是否屬於設計系統**：不只維護 primitive，也維護完整頁面模式。→ **是**，列第一優先。
3. **Prototype 是否強制涵蓋狀態矩陣**：loading、empty、error、permission 是否為最低交付要求。→ **交付級強制、探索級不強制**(§3.0)。
4. **Prototype spec 是否改為 YAML contract**：由 AI 產生並由 CI 驗證。→ **緩**，先用現有模板跑出摩擦點再決定。
5. **是否優先建立 visual regression**：讓 AI 產出有客觀驗收機制。→ **否**，P0 換成 token lint。

上述五項已於 2026-07-23 確認方向(紀錄見 §8)；後續進入 schema、目錄、工具與 owner 的細部決策。

---

## 8. 決策紀錄

| 日期 | 項目 | 決策 | 決策者 | 後續行動 |
|---|---|---|---|---|
| 2026-07-23 | §7-1 產品知識入 repo | 是，domain／flows 以 Markdown 起步入版控 | Will | 選定首批三個核心 flow |
| 2026-07-23 | §7-2 page recipe 定位 | 是，page recipe 為設計系統一級公民 | Will | 決定首批頁面清單 |
| 2026-07-23 | §7-3 狀態矩陣 | 交付級強制、探索級不強制(採 §3.0 兩級制) | Will | 定義交付級最低狀態集 |
| 2026-07-23 | §7-4 YAML contract | 暫緩，先以現有模板跑 2～3 個 recipe 蒐集摩擦點 | Will | Phase 1 記錄填表摩擦點 |
| 2026-07-23 | §7-5 visual regression | 不列 P0，P0 改為 token lint；screenshot 基建移 Phase 2 | Will | 建立 ESLint／Stylelint token 規則 |
| 2026-07-23 | a11y 歸屬 | contract 放元件 manifest，不作 prototype gate(同 handoff §5.4) | Will | manifest 試行時納入 a11y 欄位 |
| 2026-07-23 | content design 優先序 | 錯誤訊息結構、empty state 文案、按鈕命名提前 P0 | Will | 與狀態矩陣同批產出 |
| 2026-07-23 | 新增 UX 缺口 | 導覽殼層、原生假畫面、真機預覽與分享納入 P0(§3.5–3.7) | Will | Phase 1 排程 |
| 2026-07-23 | §5.3 事實勘誤 | Code Connect 與發布策略兩條查核後不成立，自漂移清單移除 | Will | — |

> 註：本輪為**方向層級**的確認(整合 2026-07-23 UX 審閱)；schema、目錄、工具與 owner 的細部決策另行記錄。

