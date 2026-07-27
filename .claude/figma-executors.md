# Figma 執行器對應（Claude Code 環境）

[CLAUDE.md「Figma Integration」](../CLAUDE.md) 定義**要完成什麼**；這份定義在 Claude Code + Figma MCP 環境下**用哪個執行器**。換到其他 AI 環境只需改這份，CLAUDE.md 不動。

## Figma → Code

| 步驟（CLAUDE.md） | 執行器 |
|------|--------|
| 取得 design context | 先載入 `figma:figma-design-to-code` skill（MCP 端強制前置，不可跳過）→ `mcp__figma__get_design_context` |
| 取 metadata 縮小範圍 | `mcp__figma__get_metadata` |
| 取 screenshot 當視覺基準 | `mcp__figma__get_screenshot` |
| 實作後視覺驗證 | 重新 `mcp__figma__get_screenshot` 對照，必要時搭配 `/run` 起本地頁面比對 |

## Code → Figma

| 步驟（CLAUDE.md） | 執行器 |
|------|--------|
| Plugin API 逐層組裝 | 先載入 `figma:figma-use` skill（`use_figma` 強制前置）→ `mcp__figma__use_figma`；建整頁 / 多區塊版面另加 `figma:figma-generate-design`，建元件庫另加 `figma:figma-generate-library` |
| 建新檔 | 先載入 `figma:figma-create-new-file` skill → `mcp__figma__create_new_file` |

**不要用 `mcp__figma__generate_figma_design`** —— 它是 HTML capture 路徑，對應 CLAUDE.md 明文禁止的那條。

## 低階細節

- **node-id 格式**：URL 內是 dash（`123-456`），Plugin API 內是 colon（`123:456`）。傳完整 URL 時由 MCP client 解析，不需自己轉；只有手動組 `nodeId` 參數時才需要換。
- **工具名稱前綴依 MCP 來源而異**：桌面 / IDE 端 Figma MCP 是 `mcp__figma__*`，claude.ai Figma connector 是 `mcp__claude_ai_Figma__*`（`.claude/settings.json` 的 allow 清單目前是後者）。名稱對不上時先確認掛的是哪個 server。
- Figma file key、library 名稱見 CLAUDE.md；component / style / variable key 一律讀 `figma-tokens.json`，不重複記在這裡。
