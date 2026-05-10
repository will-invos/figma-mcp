# InAppNotification — 設計規格書

日期：2026-05-10
元件：`InAppNotification`
Repo：`@invos/ios-ui-kit`（`will-invos/invos-ui`）

## 目標

行動網頁的站內通知元件，從畫面頂部滑入、顯示短暫時間後自動收回，並支援點擊與上滑收回。用於非阻斷型、App 全域層級的提示（例如：發票進帳、錯誤狀態、公告、獎勵），可在任何頁面上顯示。

## Figma 來源

- 元件本體（變體組合）：`8pE8KHl50y72IP7JseLH55` node `6475:6103` — leading（icon | image）× trailing（none | button | chevron）
- Variant 類型：`mLsUp3q2ewYZEQwfIjhsfg` node `2367:4051` — 5 個命名 variant（default / completion / danger / announcement / reward）
- Guideline：`7b0nj4qql59Oefcl9t7upr` node `76:38969` — 使用時機、層級、動畫時序

## 已確認的決策

| 項目 | 決定 |
|------|------|
| API 形式 | `InAppNotificationProvider` + `useInAppNotification()`；mount 在 App 根層，程式化推送（與 `Toast` 一致） |
| 多則處理 | FIFO 佇列；同時間只顯一則，目前那則退場動畫結束後再顯下一則 |
| 上滑收回 | v1 即實作；純 touch event，不引入 `framer-motion` |
| Variant 命名 | `default`、`completion`、`danger`（從 Figma 的「warning」改名，因實際語意是 error）、`announcement`、`reward` |
| 容器圓角 | `--radius-400`（16px），以原始 6475:6103 為準 |
| Image variant | 保留（自訂 40×40 圖像內容） |
| Trailing | `none` / `button` / `icon` 全部保留（`icon` 變體使用 `IconButton` 元件，預設圖示為 chevron-right，可由 props 覆蓋） |
| 卡片點擊 vs button 點擊 | 兩者皆支援；`button.onClick` 不冒泡到 `onPress` |
| 動畫 | 純 CSS transitions/keyframes，不加額外依賴 |
| 元件命名 | `InAppNotification` + `useInAppNotification`（避開未來與 push notification 衝突） |

## API

```ts
type InAppNotificationVariant =
  | 'default'
  | 'completion'
  | 'danger'
  | 'announcement'
  | 'reward'

type InAppNotificationTrailing = 'none' | 'button' | 'icon'

interface InAppNotificationButton {
  label: string                       // 依 Figma guideline ≤ 4 字
  onClick: () => void
}

interface InAppNotificationIconButton {
  icon?: React.ReactNode              // 預設 <i className="icon-chevron-right" />
  ariaLabel: string                   // 必填（IconButton 要求）
  onClick: () => void
}

interface InAppNotificationOptions {
  // Leading — icon style（預設）
  variant?: InAppNotificationVariant  // 預設 'default'
  icon?: React.ReactNode              // 覆蓋 variant 的預設 icon（仍套用 variant 底色）

  // Leading — image style（與 variant/icon 互斥）
  image?: React.ReactNode             // 給了 image → 走 image variant

  // Content
  headline: string                    // 必填，單行 + ellipsis
  description?: string                // 選填，單行 + ellipsis

  // Trailing
  trailing?: InAppNotificationTrailing      // 預設 'none'
  button?: InAppNotificationButton          // 當 trailing === 'button'
  iconButton?: InAppNotificationIconButton  // 當 trailing === 'icon'

  // 互動
  onPress?: () => void                // 點整張卡，觸發後自動收回

  // 時序
  duration?: number                   // ms；預設 3000
}

interface InAppNotificationContextValue {
  show: (opts: InAppNotificationOptions) => string
  update: (id: string, patch: Partial<InAppNotificationOptions>) => void
  dismiss: (id: string) => void
}
```

`show()` 回傳 string `id`。`dismiss(id)` 觸發退場動畫並移出佇列。`update(id, patch)` 把 patch 合併到目前顯示的那則並重置 auto-dismiss timer；如果 `id` 不是目前顯示的那則（在佇列中或已消失），no-op。

## Variant token 對照

| variant | leading 底色 | icon class | icon 顏色 |
|---------|-----------|------------|-----------|
| `default` | `var(--color-background-sunken)` | `icon-bell-filled` | `var(--color-content-default)` |
| `completion` | `var(--color-background-success-subtlest)` | `icon-check-bold` | `var(--color-content-success-bold)` |
| `danger` | `var(--color-background-danger-subtlest)` | `icon-alert-circle-filled` | `var(--color-content-danger-bold)` |
| `announcement` | `var(--color-background-brand-subtlest)` | `icon-loud-speaker-filled` | `var(--color-content-brand-bold)` |
| `reward` | `var(--color-background-prize-subtlest)` | `icon-gift-filled` | `var(--color-content-prize-bold)` |

`image` variant：40×40 容器、`border-radius: var(--radius-200)`、`overflow: hidden`、無底色；由使用者自行放 `<img>` / `<Avatar>` 等。

## 視覺規格（對齊 Figma node 6475:6103 + variant 預設）

### Container
- `position: fixed`、`left: var(--space-300)`、`right: var(--space-300)`（左右各 12px）
- `top: calc(env(safe-area-inset-top, 0px) + var(--space-200))`（status bar 下方 8px）
- `z-index: 900`（在 Dialog/Sheet/Tooltip 1000 之下，符合 guideline「在 Dialog 之下」；Toast 1100 仍最上）
- `background: var(--color-background-default)`
- `padding: var(--space-300)`（12px）
- `border-radius: var(--radius-400)`（16px）
- `box-shadow: var(--shadow-large)`
- `display: flex; align-items: center; gap: var(--space-300)`（12px）

### Leading 元素（40×40，`flex-shrink: 0`）
- `width: 40px; height: 40px; border-radius: var(--radius-200)`（8px）
- icon variant：底色 / 顏色依 variant 表；內部 icon 24×24 置中
- image variant：`overflow: hidden`；子元素填滿（`width: 100%; height: 100%; object-fit: cover`）

### Content（`flex: 1 0 0; min-width: 0`）
- `display: flex; flex-direction: column; justify-content: center; gap: var(--space-50)`（2px）
- Headline：class `text-label-large`（16/500/24，0.04em），顏色 `var(--color-content-bold)`，單行 + ellipsis（`white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%`）
- Description：class `text-body-medium`（14/400/22，0.04em），顏色 `var(--color-content-subtle)`，同樣的 ellipsis 處理

### Trailing
- `none`：不渲染
- `button`：真正的 `<button>`，`text-label-large`、顏色 `var(--color-content-brand-default)`、無內距、`flex-shrink: 0`。Click 不冒泡到卡片的 `onPress`。
- `icon`：使用 `<IconButton>` 元件，預設 `icon={<i className="icon-chevron-right" />}`、`variant="ghost"`、`colorType="neutral"`、`size="small"`，由使用者透過 `iconButton.icon` 覆蓋。`flex-shrink: 0`。Click 不冒泡到卡片的 `onPress`。

## 行為

### 佇列（FIFO）
- 內部狀態：`current: Notification | null`、`queue: Notification[]`
- `show(opts)` → 推入 `queue`。若 `current === null`，立即把第一則升為 current。
- 退場動畫結束 → 移除 `current` → 升下一則。

### Auto-dismiss
- mount 後（入場動畫開始時）`setTimeout(dismiss, duration)`，預設 3000ms。
- `update()` 用 patch 後的 `duration` 重置 timer。
- 觸控手勢進行中暫停 timer：`touchstart` 清除、`touchend` 若沒收回則用完整 duration 重啟（讓使用者有時間閱讀）。

### 點擊互動
- 卡片只有在 `onPress` 有設定時才有 `onClick`；此時加上 `role="button"`、`tabindex="0"`，鍵盤 Enter/Space 也能觸發。
- Trailing button 與 trailing IconButton 都永遠攔截 click 並 `stopPropagation()`。
- Tap（卡片、button 或 IconButton）→ 執行對應 callback → 收回。

### 上滑收回
- Touch handlers 綁在卡片上。
- `touchstart`：記錄 `startY`、`startTime`；清除 auto-dismiss timer；設 `data-dragging="true"`。
- `touchmove`：`delta = clientY - startY`。若 `delta < 0` → 設 inline `transform: translateY(${delta}px)`、`opacity: 1 - min(|delta| / 64, 0.3)`。`delta >= 0` 忽略。
- `touchend`：
  - 若 `|delta| > 32px` 或 velocity > 0.3 px/ms → 觸發退場（從目前 transform 過渡到 `translateY(-100%)`、opacity → 0）。
  - 否則 → 彈回原位：`transition: transform 150ms ease-out, opacity 150ms ease-out`；清除 inline transform；重啟 auto-dismiss timer。

### 動畫（CSS）
- 入場：`translateY(-120%) → translateY(0)`、`opacity: 0.7 → 1`，300ms `cubic-bezier(0.175, 0.885, 0.32, 1.275)`（easeOutBack）
- 退場：`translateY(0) → translateY(-120%)`、`opacity: 1 → 0`，300ms `cubic-bezier(0.6, -0.28, 0.735, 0.045)`（easeInBack）
- 用 `data-state="entering" | "visible" | "exiting"`（由 React state 驅動）切換 CSS 規則，並在 `transitionend` / `animationend` 時推進佇列。

### Reduced motion
- `@media (prefers-reduced-motion: reduce)` 下，把 transform 換成 `opacity 150ms linear`。上滑手勢仍可用，但彈回過渡也只用 opacity。

## Accessibility

- 容器：`role="status"`、`aria-live="polite"`（非阻斷型）。Polite 適合此用途，因為通知是告知性而非緊急的。
- 帶 `onPress` 的卡片：`role="button"`、`tabindex="0"`、`onKeyDown` 處理 Enter/Space。
- Trailing button：真正的 `<button type="button">`，`aria-label` 預設為 `button.label`。
- Trailing IconButton：直接使用既有的 `<IconButton>`，`aria-label` 由 `iconButton.ariaLabel` 提供（必填）。
- Focus：通知出現時 focus 不移動；使用者透過滑動 / TalkBack / VoiceOver 公告察覺。

## 檔案結構

```
src/components/ui/InAppNotification.tsx     # Provider、hook、佇列、視覺、動畫、touch 邏輯
src/components/ui/InAppNotification.css     # variants、layout、keyframes、transitions
src/components/ui/index.ts                  # 加 barrel exports
src/pages/stories/InAppNotification.story.tsx  # 故事：5 variants + image + 3 trailings + onPress
```

Barrel exports（`src/components/ui/index.ts`）：
```ts
export {
  InAppNotificationProvider,
  useInAppNotification,
} from './InAppNotification'
export type {
  InAppNotificationOptions,
  InAppNotificationVariant,
  InAppNotificationTrailing,
  InAppNotificationButton,
  InAppNotificationIconButton,
  InAppNotificationContextValue,
} from './InAppNotification'
```

## Story 規畫（`src/pages/stories/InAppNotification.story.tsx`）

`Render` 元件提供 `variant`、`trailing`（none / button / icon）、`description`（boolean）、`useImage`（boolean）等 controls，加上「Show notification」按鈕呼叫 `show()`。Provider 必須先 mount 在 app shell 才能讓 hook 工作。

Mount 點：`src/main.tsx`，與既有的 `ToastProvider` 並排（如 `<InAppNotificationProvider><ToastProvider>...</ToastProvider></InAppNotificationProvider>`）。

## 不在範圍內（明確的 non-goals）

- 多則同時視覺堆疊（FIFO 佇列已取代）。
- 永久 / 黏住的通知（不支援 `duration: Infinity`；之後若需要再加 `persist: true`）。
- 橫向 / 平板版型的頂端滑入（mobile-first，水平定位以 viewport 寬度為準）。
- 音效 / 觸覺回饋。
- Push notification 整合（這純粹是 in-app、in-process 的 UI primitive）。

## 風險 / 待註記

- **z-index 設 `900`**：依 guideline「在 Dialog 之下」（既有 Dialog/Sheet/Tooltip 是 1000，Toast 1100）。若 Dialog 與 Tooltip 之間未來要再分層，可再調整。
- **`update()` 語意**：只能更新「目前顯示中」那則，佇列中的不能更新。如有需求再回來討論。
- **Story 寬度 vs 實機**：故事預覽寬度可能跟 390-414px 行動寬度不同，sign-off 前用 Chrome DevTools iPhone 14 Pro 模擬器手測。
