# 登入/註冊流程（最小 Prototype）

## Context
在 `figma-mcp` demo App 中加入登入/註冊流程，主要目的是展示現有 iOS UI Kit 的表單與按鈕元件。純前端 mock，不連後端。

## Decisions
- **登入方式**：Email + 密碼（主要）+ 第三方登入（Google、Apple、LINE）
- **畫面範圍**：4 頁 — 登入、註冊、忘記密碼、歡迎頁
- **後端**：純前端 mock，用 `setTimeout` 模擬延遲，`localStorage` 存登入狀態
- **入口**：未登入直接看到登入頁（無 Welcome 介紹頁）
- **架構**：沿用現有最小擴充模式，無 Context、無 service 層、無新依賴

## Routes (hash-based, App.tsx)

| Hash | 頁面 | 未登入 | 已登入 |
|---|---|---|---|
| `#/login` | 登入 | 顯示 | 重導向 `#/welcome` |
| `#/register` | 註冊 | 顯示 | 重導向 `#/welcome` |
| `#/forgot-password` | 忘記密碼 | 顯示 | 重導向 `#/welcome` |
| `#/welcome` 或預設 `/` | 歡迎頁 | 重導向 `#/login` | 顯示 |

保留原本的 `#/bank` 與 `#/invoice`（前面的 demo 頁），但將其視為登入後才能存取。

## Pages

### 1. 登入頁 `#/login` (`src/pages/Login.tsx`)
- Nav bar（無返回鍵）：置中標題「登入」
- Field group 「Email」：`TextField`（`inputType="email"`, `inputMode="email"`）
- Field group 「密碼」：`TextField`（`inputType="password"`）
- 右下「忘記密碼？」文字連結 → `#/forgot-password`
- 主按鈕「登入」（filled / primary / large，全寬；disabled 直到 email + password 都非空）
- 分隔線 + 文字「或使用其他方式登入」
- 三顆 `Button`（outline / neutral / large / 全寬，搭配 leadingIcon）：「以 Google 繼續」、「以 Apple 繼續」、「以 LINE 繼續」
- 底部文字：「還沒有帳號？立即註冊」→ `#/register`

### 2. 註冊頁 `#/register` (`src/pages/Register.tsx`)
- Nav bar：返回鍵 + 標題「建立帳號」
- Field group「Email」：`TextField`
- Field group「密碼」：`TextField`（password）+ `helpText`「至少 8 碼，含英文字母與數字」
- Field group「確認密碼」：`TextField`（password）
- `Checkbox`：「我已閱讀並同意 **服務條款** 與 **隱私政策**」（品牌色文字連結）
- Sticky footer 按鈕「註冊」（disabled 直到 email / 密碼格式正確、兩次密碼一致、checkbox 勾選）

### 3. 忘記密碼頁 `#/forgot-password` (`src/pages/ForgotPassword.tsx`)
- Nav bar：返回鍵 + 標題「忘記密碼」
- 說明文字：「輸入註冊時的 Email，我們會寄送重設密碼連結到你的信箱。」
- Field group「Email」：`TextField`
- Sticky footer 按鈕「寄送重設連結」（disabled 直到 email 格式正確）
- 送出後顯示 `Alert`（colorType=success）：「重設連結已寄出，請前往信箱查看」
- Alert 顯示 3 秒後自動回到登入頁

### 4. 歡迎頁 `#/welcome` (`src/pages/Welcome.tsx`)
- Nav bar：置中標題「首頁」（無返回鍵）
- 簡潔卡片：「歡迎回來，{email}！」
- `ListItem` 兩條連結：「設定領獎帳戶」→ `#/bank`、「新增紙本電子發票」→ `#/invoice`
- 底部 `Button`（outline / neutral / large）「登出」

## Validation Rules
- Email：`^[^\s@]+@[^\s@]+\.[^\s@]+$`
- 密碼：長度 ≥ 8 且包含至少 1 個英文字母和 1 個數字
- 確認密碼：必須與密碼相同
- `canSubmit` 邏輯用既有 pattern，按鈕 disabled 自動 40% 透明

## Mock Auth State
```ts
// localStorage 鍵：'auth_user'
// 已登入：{ email: string, loginAt: number }
// 登出：移除該鍵
```

每頁提交表單時：
1. `setTimeout 500ms` 模擬 API 延遲
2. Button 在延遲期間 `loading` 狀態
3. 成功後寫 localStorage，導向對應頁面

第三方登入按鈕：點擊直接 mock 登入（email 設為 `demo.{provider}@example.com`）。

## Files to Create
- `src/pages/Login.tsx` + `Login.css`
- `src/pages/Register.tsx` + `Register.css`
- `src/pages/ForgotPassword.tsx` + `ForgotPassword.css`
- `src/pages/Welcome.tsx` + `Welcome.css`
- 共享樣式：可抽一個 `src/pages/auth-shared.css` 放 Nav bar / Footer / Field group pattern（沿用 AddPaperInvoice.css 的結構）

## Files to Modify
- `src/App.tsx`：擴充 hash routing，加 4 個新路由 + auth guard（讀 localStorage 決定是否重導）

## Components Reused
- `Button`、`TextField`、`Checkbox`、`Alert`、`ListItem`（歡迎頁連結）
- 無新增 UI Kit 元件，無新 tokens

## Out of Scope
- Email 驗證、驗證碼輸入、重設密碼頁、條款同意頁、個人資料頁（用户選擇精簡版時已明確排除）
- 真實後端 / 第三方 OAuth（純 mock）
- i18n、密碼強度視覺指示器、登入失敗錯誤狀態（示範為主）

## Verification
1. `npx tsc -b` — 型別檢查通過
2. `npm run dev`，測試流程：
   - `#/login` 輸入任意 email/密碼 → 進 `#/welcome`
   - `#/welcome` 點登出 → 回 `#/login`
   - `#/register` 完整填寫 + 勾選 → 進 `#/welcome`
   - `#/forgot-password` 送出 → 看到 Alert → 回 `#/login`
   - 未登入直接輸 `#/welcome` → 應被導到 `#/login`
   - 已登入再輸 `#/login` → 應被導到 `#/welcome`
3. 375×667 行動版視覺檢查
