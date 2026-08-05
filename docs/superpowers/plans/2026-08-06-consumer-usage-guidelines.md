# 消費端使用規範 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 讓消費端 repo 的 AI agent 讀到與安裝版本一致的設計系統使用規範，並能事後用 review agent 自查。

**Architecture:** 規範文件（usage.md、usage-review.md、agent 殼原始檔）放本 repo `docs/` 頂層，靠現有 `files: ["docs/*.md", ...]` 隨 npm 套件散佈；消費端只放薄入口（CLAUDE.md 指針 + agent 殼），內容都指向 `node_modules` 內文件。create-prototype skill 的 templates 讓新專案自動就位。

**Tech Stack:** 純 Markdown 文件 + npm packaging（無程式碼變更）。spec 見 `docs/superpowers/specs/2026-08-06-consumer-usage-guidelines-design.md`。

**重要事實（執行前先知道）：**

- 間距 token 是 `--space-*`（**不是** `--spacing-*`；create-prototype SKILL.md 現存這個筆誤，Task 6 修正）。
- radius token：`--radius-0` ~ `--radius-1000`；shadow token：`--shadow-small/medium/large/bold/sheet`。
- typography class 前綴：`.text-body-*`、`.text-label-*`、`.text-heading-*`、`.text-display-*`、`.text-code-*`。
- `package.json` 的 `files` 已含 `docs/*.md`（僅 docs 頂層，不含子目錄）——三份新文件都放 `docs/` 頂層即可，不改打包設定。
- create-prototype skill 位置：`~/.claude/skills/create-prototype/`（不在本 repo，可能不在任何 git repo 內——若無 git 就只存檔不 commit）。
- 消費端要讀到新文件，套件必須發佈新 tag（Task 7）；在那之前 scaffold 測試會抓到舊版，所以 Task 8 的 e2e 測試排在發佈後。

---

### Task 1: 建立 `docs/usage.md`（消費端使用規範）

**Files:**
- Create: `docs/usage.md`

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

````markdown
# @invos/design-system 使用規範

> 本文件寫給**引用此套件開發頁面 / prototype 的專案**（工程師與 AI agent）。
> 設計系統本身的維護規範見 repo 根目錄 CLAUDE.md；設計原則與完整 token 規格見 [design.md](../design.md)。

## 安裝到既有專案

已安裝 `@invos/design-system` 的專案，做兩件事讓 AI agent 遵循本規範：

**1. 專案 CLAUDE.md 加入：**

```markdown
## 設計系統

本專案使用 @invos/design-system。**寫任何 UI 之前**，先讀
`node_modules/@invos/design-system/docs/usage.md` 並遵循其中規範。
完成頁面後用 `invos-ui-reviewer` agent 對改動的頁面檔案自查。
```

**2. 複製 review agent 殼：**

```bash
mkdir -p .claude/agents
cp node_modules/@invos/design-system/docs/invos-ui-reviewer.agent.md .claude/agents/invos-ui-reviewer.md
```

之後升級套件，本文件與審查清單都隨 `node_modules` 更新，入口與 agent 殼不必再動。

## 前置需求

- **`styles.css` 整個專案只在入口引一次**（通常是 `main.tsx`）：
  `import '@invos/design-system/styles.css'` —— 沒引，元件完全沒樣式。
  `preflight.css` 選用（讓自訂 DOM 也套設計系統的 reset 與 body 預設）。
- **`useToast()` / `useSnackBar()` / `useInAppNotification()` 要先掛對應 Provider**，沒掛就呼叫會 throw：

  ```tsx
  <InAppNotificationProvider>
    <ToastProvider>
      <SnackBarProvider>
        <App />
      </SnackBarProvider>
    </ToastProvider>
  </InAppNotificationProvider>
  ```

  不要自己寫 portal 版通知元件——定位、計時、佇列、live region 都在 Provider 內建。
- **viewport 必含 `viewport-fit=cover`**（貼底/貼頂元件的 safe-area 才生效）；
  **禁止 `maximum-scale` / `user-scalable=no`**（無障礙反模式）。
- 頁面欄寬 480px；要改**只覆寫 `--ui-page-max-width`**，overlay 元件都以此變數計寬，一起跟上。

## Component Decision Tree

下列場景 → 使用的元件。**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本**。

| 需求 | 用哪個元件 |
|------|-----------|
| 主要動作按鈕 | `<Button variant="filled" colorType="primary">` |
| 次要動作按鈕 | `<Button variant="filled" colorType="neutral">` 或 `<Button variant="outline">` |
| 弱化動作（文字樣式） | `<Button variant="text">` 或 `<Button variant="ghost">` |
| 只有 icon 的點擊 | `<IconButton aria-label="...">` |
| 懸浮主要動作按鈕（FAB） | `<Fab aria-label="...">`（可加 `text` 顯示標籤） |
| 單行輸入欄位 | `<TextField>` |
| 多行輸入欄位 | `<TextArea>` |
| 下拉選單 | `<Select>`（選項要圖文排版 / 大點擊區時，用 `onPickerOpen` 把展開交給 `<Sheet>` + `<ListItem>` 選單） |
| 搜尋輸入 | `<SearchField>` |
| OTP / 驗證碼 | `<PinInput>` |
| 切換 on/off | `<Switch>` |
| 單選 | `<Radio>` |
| 多選 | `<Checkbox>` |
| 滑桿 | `<Slider>` |
| 表單分組容器 | `<FieldGroup label="..." helpText="...">`（label / helpText 由 FieldGroup 自己渲染，`<FieldGroupHelpText>` 只在單獨使用時才需要） |
| **重要的確認動作**，需讓使用者暫停其他行為 | `<Dialog>`。動作按下後先關閉 Dialog，再用 `<SnackBar>` 告知結果 —— **不要讓 Dialog 與 Toast / SnackBar 同時出現** |
| **簡單的**互動或資訊（更多選項、一至兩個欄位） | `<Sheet>` / 搭配 `<SheetHeader>`。**欄位一多、需要多步驟、或中途可能要確認，就改用完整頁面** —— 不要在 Sheet 上再疊一層 `<Dialog>` |
| **處理中**（頁面載入等），且當下不希望使用者做任何操作 | `<Toast>`（Provider 模式、`useToast()`）。**不是一般短訊通知** —— 告知結果請用 `<SnackBar>` |
| 告知**使用者操作的結果**（API 回傳成功 / 失敗） | `<SnackBar>`（Provider 模式、`useSnackBar()`；貼齊頁面底部、連續呼叫排隊不疊加）|
| **系統主動推播**訊息（可區分種類、可點擊跳轉） | `<InAppNotification>`（Provider 模式、`useInAppNotification()`）。時機不可預期，所以刻意排在 modal 之下 |
| 區塊內告示（警告、資訊） | `<Banner>` |
| 整頁空狀態 / 錯誤狀態（斷線、無結果、404） | `<PageStatus status="...">` |
| 頁面頂部標題列 | `<NavigationBar>`（regular / large / home / search / tabs）|
| 底部 tab 導覽 | `<TabBar>` |
| 分頁切換（內容區） | `<Tabs>` |
| 上一頁 / 下一頁導覽（含置中標題） | `<PageNavigation>` |
| 日期選擇 | 原生 `<input type="date">`（已定案：雙平台採原生 picker，**不要自製、不要拿 `<Select>` 頂替**） |
| 列表項（設定、選單） | `<ListItem>` |
| 卡片（內容 + 描述） | `<CardItem>` |
| 列表的 header / footer | `<ListHeader>` / `<ListFooter>` |
| 分隔線 | `<Divider>` |
| 標籤（可多個） | `<Tag>` / 可選取的 chips 列用 `<ChipBar>` |
| 數字徽章（通知未讀數） | `<Badge>` |
| 使用者頭像 | `<Avatar>` |
| 載入指示器 | `<Spinner>` |
| 進度條 | `<ProgressBar>` / 多條用 `<ProgressGroup>` |
| 輪播 / 分頁位置指示點 | `<DottedController>`（照片上用 `type="overlap"`） |
| 提示氣泡（簡短說明） | `<Tooltip>` |

## 找不到對應元件時

1. **先確認真的沒有** —— 查套件的 export 與元件 props 型別
   （`node_modules/@invos/design-system/dist/src/components/ui/index.d.ts`）
2. **只有視覺差異** → 用既有元件的 props 調整，不要另做一個
3. **互動語意不同**（例：設計稿要多選、系統只有單選元件）→ **不可用近似元件硬套**，語意錯誤比缺元件嚴重
4. **明確回報缺口**給設計系統維護者（repo：`will-invos/iv-design-system`）——
   **不得只留隱藏的 TODO 註解，也不要自製近似元件**

## Token 規則

可用 token 清單見 `node_modules/@invos/design-system/dist/index.css`（搜 `--color-` / `--space-` 等前綴）；設計意圖見 [design.md](../design.md)。

- 顏色一律 `var(--color-*)` —— 禁 hex / rgb() / 具名色（`transparent` 允許）
- 間距（padding / margin / gap）一律 `var(--space-*)` —— `0`、`auto` 允許
- 圓角一律 `var(--radius-*)`；陰影一律 `var(--shadow-*)`
- 文字一律套 typography class（`.text-body-*`、`.text-label-*`、`.text-heading-*`、`.text-display-*`、`.text-code-*`），
  **不要在 CSS 自定 `font-size` / `font-weight` / `line-height` / `font-family`**
- **禁 Tailwind class**（即使設計工具回傳的是 Tailwind）
- **禁 `var()` fallback**（`var(--token, 值)` 的第二參數）

## 互動語意規則

- **Dialog 與 Toast / SnackBar 不同時出現**：確認動作按下後先關 Dialog，再用 SnackBar 告知結果
- **Sheet 上不疊 Dialog**：欄位一多、需要多步驟、或中途要確認 → 改用完整頁面
- **Toast ≠ 通知**：Toast 是「處理中、暫停使用者操作」；操作結果用 SnackBar；系統主動推播用 InAppNotification
- **日期選擇一律原生 `<input type="date">`**

## 交付前自我檢查清單

完成頁面後逐條自查（與 `usage-review.md` 的審查規則一一對應）：

- [ ] 沒有用原生 HTML / 自製版本頂替 Decision Tree 裡已有的元件
- [ ] 顏色皆 `var(--color-*)`，無 hardcode
- [ ] 間距皆 `var(--space-*)`（`0` / `auto` 除外）
- [ ] `border-radius` 皆 `var(--radius-*)`；`box-shadow` 皆 `var(--shadow-*)`
- [ ] 文字皆套 `.text-*` class，CSS 無自定字型屬性
- [ ] 無 Tailwind class、無 `var()` fallback
- [ ] 用到的 hook 對應 Provider 已掛
- [ ] Dialog 與 Toast / SnackBar 無同時出現；Sheet 上無 Dialog
- [ ] 日期用原生 `<input type="date">`
- [ ] 缺元件處已明確回報，非隱藏 TODO
````

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/usage.md && npm run lint`
Expected: 檔案存在、lint 通過

```bash
git add docs/usage.md
git commit -m "docs(usage): 新增消費端使用規範（隨套件發佈）"
```

---

### Task 2: 建立 `docs/usage-review.md`（消費端審查清單）

**Files:**
- Create: `docs/usage-review.md`

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

````markdown
# @invos/design-system 頁面用法審查清單

> 供消費端專案的 `invos-ui-reviewer` agent 使用：對**頁面程式碼**（`.tsx` + 對應 `.css`）逐條檢查。
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
````

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/usage-review.md`
Expected: 檔案存在

```bash
git add docs/usage-review.md
git commit -m "docs(usage): 新增消費端頁面用法審查清單"
```

---

### Task 3: 建立 `docs/invos-ui-reviewer.agent.md`（薄殼 agent 原始檔）

**Files:**
- Create: `docs/invos-ui-reviewer.agent.md`

- [ ] **Step 1: 寫入檔案**（內容如下，完整寫入）

```markdown
---
name: invos-ui-reviewer
description: Review page code against @invos/design-system usage rules (component choice, tokens, overlay semantics)
tools: Read, Glob, Grep
model: sonnet
---

你是 @invos/design-system 消費端專案的頁面用法審查者。

## 做法

1. 讀 `node_modules/@invos/design-system/docs/usage-review.md`——那是**唯一的規則來源**，
   規則內容、判定方式、輸出格式都以它為準（規則隨套件版本更新，本檔不重複記載）。
2. 對使用者指定的頁面檔案（`.tsx` 與其 import 的 `.css`）逐條執行清單。
3. 需要對照可用元件與 token 時，查：
   - `node_modules/@invos/design-system/docs/usage.md`（Decision Tree、token 規則）
   - `node_modules/@invos/design-system/dist/src/components/ui/index.d.ts`（export 與 props 型別）
4. 依 usage-review.md 的「輸出格式」回報，FAIL 一律附 檔案:行號 與修法。

若 `node_modules/@invos/design-system` 不存在，直接回報「套件未安裝，無法審查」。
```

- [ ] **Step 2: 驗證與提交**

Run: `ls docs/invos-ui-reviewer.agent.md`
Expected: 檔案存在

```bash
git add docs/invos-ui-reviewer.agent.md
git commit -m "docs(usage): 新增消費端 review agent 殼原始檔"
```

---

### Task 4: CLAUDE.md — Decision Tree 搬移為引用

**Files:**
- Modify: `CLAUDE.md`（「Component Decision Tree」一節與「任務閱讀路徑」表）

- [ ] **Step 1: 以引用取代整張表**

把「## Component Decision Tree」標題之後、直到「**找不到對應元件時**」之前的內容（引言句 + 整張「需求 → 元件」表）替換為：

```markdown
完整「需求 → 元件」對照表在 [docs/usage.md](./docs/usage.md#component-decision-tree)
——隨套件發佈，消費端與本 repo 讀同一張表，**只維護那一份**。
**永遠優先使用這份設計系統內的元件，不要用原生 HTML 或自製版本。**
```

「**找不到對應元件時**」四步流程**保留在 CLAUDE.md**（維護者版：可提出新增元件；usage.md 的消費端版是回報缺口——兩者視角不同，非重複）。

- [ ] **Step 2: 更新「任務閱讀路徑」表**

「建立頁面」列的「本檔 Component Decision Tree」改為「[docs/usage.md](./docs/usage.md) Decision Tree」。

- [ ] **Step 3: 驗證與提交**

Run: `grep -n "usage.md" CLAUDE.md && ! grep -q "主要動作按鈕" CLAUDE.md && echo OK`
Expected: 引用連結存在、表已移除、輸出 OK

```bash
git add CLAUDE.md
git commit -m "docs(claude): Component Decision Tree 移至 docs/usage.md 單一來源"
```

---

### Task 5: 打包驗證

- [ ] **Step 1: 確認三份新文件會進套件**

Run: `npm pack --dry-run 2>&1 | grep -E "usage|reviewer"`
Expected: 列出 `docs/usage.md`、`docs/usage-review.md`、`docs/invos-ui-reviewer.agent.md`

- [ ] **Step 2: lint**

Run: `npm run lint`
Expected: 通過（純文件改動，不應有任何錯誤）

---

### Task 6: 更新 create-prototype skill（`~/.claude/skills/create-prototype/`）

**Files:**
- Create: `~/.claude/skills/create-prototype/templates/CLAUDE.md`
- Create: `~/.claude/skills/create-prototype/templates/.claude/agents/invos-ui-reviewer.md`
- Modify: `~/.claude/skills/create-prototype/SKILL.md`

**注意**：此目錄不在本 repo；若它不在任何 git repo 內，只存檔、略過 commit 步驟。

- [ ] **Step 1: 建立 `templates/CLAUDE.md`**（不放 `{{...}}` placeholder——SKILL.md 的 placeholder 檢查不掃 .md 檔）

```markdown
# 專案指引

本專案使用 `@invos/design-system`（INVOS 發票存摺設計系統）。

## 設計系統（必讀）

- **寫任何 UI 之前**，先讀 `node_modules/@invos/design-system/docs/usage.md`
  並遵循其中規範（元件選用 Decision Tree、token 規則、overlay 互斥語意）。
- 完成頁面後，用 `invos-ui-reviewer` agent（已在 `.claude/agents/`）對改動的頁面檔案自查，
  FAIL 項修完才算完成。
- 設計原則與完整 token 規格：`node_modules/@invos/design-system/design.md`。

## 指令

- `npm run dev` — 開發伺服器
- `npm run build` — tsc + vite build（交付前必須通過）
```

- [ ] **Step 2: 建立 `templates/.claude/agents/invos-ui-reviewer.md`**

內容與 Task 3 的 `docs/invos-ui-reviewer.agent.md` **完全相同**（從本 repo 該檔複製）：

```bash
mkdir -p ~/.claude/skills/create-prototype/templates/.claude/agents
cp docs/invos-ui-reviewer.agent.md ~/.claude/skills/create-prototype/templates/.claude/agents/invos-ui-reviewer.md
```

- [ ] **Step 3: 修正 SKILL.md**

三處修改：

1. **步驟 5 的完成訊息**——原文「元件清單與規範在 `node_modules/@invos/design-system/CLAUDE.md`（AI 會自動讀到）」不成立（AI 不會自動讀 node_modules），整句改為：

   > 最後告訴使用者：`npm run dev` 啟動。使用規範入口已在專案 `CLAUDE.md`（指向 `node_modules/@invos/design-system/docs/usage.md`），完成頁面後可用 `invos-ui-reviewer` agent 自查。

2. **「設計系統使用重點」表**——`var(--spacing-*)` 筆誤改為 `var(--space-*)`；同列「詳見套件內 CLAUDE.md」改為「詳見套件內 docs/usage.md」。

3. **步驟 3（複製 templates）補一句**：

   > templates 內含 `CLAUDE.md` 與 `.claude/agents/invos-ui-reviewer.md`（設計系統使用規範入口與審查 agent）；`cp -R` 會連同 `.claude` 隱藏目錄一起複製，複製後用 `ls -a <專案目錄>` 確認 `.claude` 存在。

- [ ] **Step 4: 驗證**

Run: `ls ~/.claude/skills/create-prototype/templates/CLAUDE.md ~/.claude/skills/create-prototype/templates/.claude/agents/invos-ui-reviewer.md && grep -c "spacing-\*" ~/.claude/skills/create-prototype/SKILL.md`
Expected: 兩檔存在；grep 計數 `0`（筆誤已清除，注意 grep 無匹配時 exit code 非 0 屬預期）

---

### Task 7: 發佈新版本（⚠️ 需使用者確認後執行）

新規範自此版起才隨套件散佈；未發佈前消費端抓最新 tag 拿不到新文件。

- [ ] **Step 1: 與使用者確認要發版**（會 push 到 GitHub）
- [ ] **Step 2: 發版**

Run: `npm version minor`（0.14.0 → 0.15.0；`preversion` 跑 lint + build:lib，`postversion` 自動 push commits 與 tags）
Expected: 新 tag `v0.15.0` 推上 GitHub

---

### Task 8: End-to-end 驗證（scaffold 測試專案）

- [ ] **Step 1: 用 create-prototype 流程 scaffold 測試專案**

在 scratchpad 目錄（不污染 ~/Github）依 SKILL.md 步驟 scaffold `prototype-usage-test`：
複製 templates → 替換 placeholder → `npm install` → `npm run build` 通過。

- [ ] **Step 2: 驗證規範鏈路**

Run（在測試專案內）:
```bash
ls node_modules/@invos/design-system/docs/usage.md \
   node_modules/@invos/design-system/docs/usage-review.md \
   node_modules/@invos/design-system/docs/invos-ui-reviewer.agent.md \
   CLAUDE.md .claude/agents/invos-ui-reviewer.md
```
Expected: 五個檔案全部存在（前三個來自套件 v0.15.0，後兩個來自 templates）

- [ ] **Step 3: 試跑 review agent**

在測試專案寫一個故意違規的頁面（hardcode `#ff0000`、原生 `<button>`），
請 `invos-ui-reviewer` agent 審查，確認能輸出 FAIL 與行號。

- [ ] **Step 4: 清理測試專案**

Run: `rm -rf <scratchpad>/prototype-usage-test`

---

## Self-Review 紀錄

- **Spec coverage**：spec §1（usage.md）→ Task 1；§2（usage-review.md + agent 殼）→ Task 2、3；§3 散佈（templates + 既有 repo 安裝段）→ Task 6 + Task 1 的「安裝到既有專案」節；§4 驗證 → Task 5、8；Decision Tree 單一來源 → Task 4。無缺口。
- **一致性**：agent 殼在 Task 3 與 Task 6 Step 2 以 `cp` 保證同一內容；`--space-*` 命名已對 `spacing.css` 實測確認；「找不到元件」流程兩版差異（維護者可新增元件 vs 消費端回報缺口）為刻意設計，已在 Task 4 註明。
- **Placeholder scan**：無 TBD / TODO；所有檔案內容完整內嵌。
