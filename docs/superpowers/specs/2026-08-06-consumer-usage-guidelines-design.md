# 消費端使用規範（Consumer Usage Guidelines）設計

- 日期：2026-08-06
- 狀態：已與使用者確認方向（方案 A：套件內建規範 + 消費端薄入口）

## 背景與問題

`@invos/design-system` 的規範資產（CLAUDE.md、design.md、docs/*.md、ui-reviewer agent）目前全是**維護者視角**，服務在本 repo 內工作的人與 AI。但實際消費情境是：其他 repo（create-prototype 新專案、既有專案）裝了套件後，由 AI agent 開發 prototype 或頁面。此時存在三個缺口：

1. **沒有消費端視角的規範文件。** CLAUDE.md 混雜 token pipeline、元件註冊流程、`src/pages/templates/` 等消費端不存在或不適用的內容，消費端 AI 讀了會被誤導。
2. **消費端沒有入口。** AI 不會自動載入 `node_modules` 內的 CLAUDE.md（create-prototype SKILL.md 中「AI 會自動讀到」的描述不成立），必須由消費端專案的 CLAUDE.md 明確指過去。
3. **消費端沒有審查機制。** 現有 `ui-reviewer` agent 審的是本 repo 元件實作（路徑寫死 `src/components/ui/`），不能審消費端的頁面用法。

## 目標

- 讓消費端 repo 的 AI agent 在寫 UI 前讀到正確、與安裝版本一致的使用規範。
- 提供事後審查機制：AI 完成頁面後可自動用 checklist 自查。
- 覆蓋兩種情境：create-prototype scaffold 的新專案（自動就位）、既有 repo（一次性手動安裝）。

## 非目標

- ESLint / stylelint 硬性阻擋與 CI 檢查。
- Figma 設計師端使用規範。
- Claude Code plugin 發佈管道（不排斥日後追加）。

## 設計

### 1. 消費端規範文件 `docs/usage.md`

以「套件使用者」視角撰寫，放在 `docs/` 下。`package.json` 的 `files` 已含 `docs/*.md`，**不需改打包設定**即隨套件進到消費端 `node_modules/@invos/design-system/docs/usage.md`，版本與安裝的套件 tag 一致。

內容結構（依序）：

1. **安裝到既有專案**：消費端 CLAUDE.md 要貼的入口片段 + 複製 review agent 殼的指令（見 §3）。
2. **前置需求**：`styles.css` 只在入口引一次；`Toast` / `SnackBar` / `InAppNotification` 的 Provider 掛法；viewport 必含 `viewport-fit=cover`、禁 `maximum-scale` / `user-scalable=no`；頁面欄寬 480px，要改只覆寫 `--ui-page-max-width`。
3. **Component Decision Tree**：「需求 → 元件」對照表（自 CLAUDE.md 搬移，見下方單一來源決策）。
4. **Token 規則**：顏色一律 `var(--color-*)`、間距 `var(--space-*)`、radius `var(--radius-*)`、shadow `var(--shadow-*)`、文字用 `typography.css` 的 `.text-*` class；禁 hardcode、禁 Tailwind、禁 `var()` fallback。
5. **互動語意規則**：Dialog 與 Toast / SnackBar 不同時出現；Sheet 上不疊 Dialog；Toast 是「處理中」不是結果通知（結果用 SnackBar）；日期一律原生 `<input type="date">`。
6. **找不到元件時的流程**：查證（barrel export、型別）→ 只有視覺差異用 props 調 → 互動語意不同不可硬套 → 明確回報缺口，不得只留隱藏 TODO。
7. **交付前自我檢查清單**：AI 完成頁面後逐條自查的短清單（與 `docs/usage-review.md` 的規則一一對應）。

**單一來源決策**：Component Decision Tree 完整版**搬到 usage.md**，CLAUDE.md 原位置改為一行引用連結。維護者與消費者讀同一張表，避免兩處漂移。

### 2. 審查機制

- **本 repo 新增 `docs/usage-review.md`**：審**頁面程式碼**（非元件實作）的規則清單，約 10 條：
  1. 沒用原生 HTML / 自製版本頂替既有元件（button、input、select、dialog…）
  2. 顏色皆 `var(--color-*)`，無 hex / rgb / 具名色
  3. 間距皆 `var(--space-*)`（`0` / `auto` 允許）
  4. `border-radius` 用 `var(--radius-*)`；`box-shadow` 用 `var(--shadow-*)`
  5. 文字用 `.text-*` class，CSS 不自定 `font-size` / `font-weight` / `line-height`
  6. 無 Tailwind class、無 `var()` fallback
  7. `useToast()` / `useSnackBar()` / `useInAppNotification()` 對應 Provider 已掛
  8. Dialog 與 Toast / SnackBar 不同時出現；Sheet 上不疊 Dialog
  9. 日期用原生 `<input type="date">`，未自製、未拿 Select 頂替
  10. 找不到元件時有明確回報，非隱藏 TODO
  隨套件發佈（同樣被 `docs/*.md` 涵蓋）。
- **消費端薄殼 agent** `.claude/agents/invos-ui-reviewer.md`（約 15 行）：內容僅「讀 `node_modules/@invos/design-system/docs/usage-review.md`，依清單審指定檔案，輸出 PASS / FAIL 與行號」。規則更新隨 npm 升級自動生效，殼不需改動。

### 3. 散佈到兩種情境

- **create-prototype 新專案**（`~/.claude/skills/create-prototype/`）：
  - `templates/` 新增 `CLAUDE.md`（內容：寫 UI 前先讀 `node_modules/@invos/design-system/docs/usage.md`、完成後用 invos-ui-reviewer 自查、專案注意事項）
  - `templates/` 新增 `.claude/agents/invos-ui-reviewer.md`（薄殼 agent）
  - 修正 SKILL.md：移除「AI 會自動讀到 node_modules 內 CLAUDE.md」的不實描述，完成訊息改為說明 CLAUDE.md 入口與 review agent 用法
- **既有 repo**：`docs/usage.md` 開頭的「安裝到既有專案」段落提供：
  - 消費端 CLAUDE.md 要貼的入口片段（數行）
  - 一條複製指令：`cp node_modules/@invos/design-system/docs/invos-ui-reviewer.agent.md .claude/agents/invos-ui-reviewer.md`。薄殼 agent 原始檔放本 repo `docs/invos-ui-reviewer.agent.md`（docs 頂層才被 `files` 的 `docs/*.md` glob 涵蓋，不需改打包設定），create-prototype template 內的同名檔與它內容一致

### 4. 驗證方式

純文件與 skill template 改動，不動元件程式碼：

1. `npm pack --dry-run`：確認 `docs/usage.md`、`docs/usage-review.md`（及 agent 殼原始檔）有進套件。
2. 用 create-prototype scaffold 一個測試專案：確認 CLAUDE.md 入口指得到 `node_modules` 內文件、review agent 能對測試頁面跑出 PASS / FAIL 報告。
3. `npm run lint` 通過（repo 慣例）。

## 風險與取捨

- **CLAUDE.md 的 Decision Tree 搬移**會改變維護者的閱讀動線——以一行引用連結補償，換取單一事實來源。
- 薄殼 agent 依賴 `node_modules` 路徑：消費端未安裝套件時 agent 無法運作——可接受，因為沒裝套件也不存在審查需求。
- 規範遵循度仍依賴 AI 讀取與自覺；硬性阻擋（lint / CI）明確列為非目標，日後可疊加。
