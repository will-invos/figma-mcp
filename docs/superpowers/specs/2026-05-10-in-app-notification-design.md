# InAppNotification — Design Spec

Date: 2026-05-10
Component: `InAppNotification`
Repo: `@invos/ios-ui-kit` (`will-invos/invos-ui`)

## Goal

A mobile-web in-app notification that slides down from the top of the viewport, displays for a short duration, and supports tap / swipe-up dismissal. Used for non-blocking, app-level alerts (e.g. invoice arrival, error states, announcements, rewards) that should be visible from any page.

## Figma references

- Component (variants): `8pE8KHl50y72IP7JseLH55` node `6475:6103` — leading (icon | image) × trailing (none | button | chevron)
- Variant presets: `mLsUp3q2ewYZEQwfIjhsfg` node `2367:4051` — 5 named variants (default / completion / danger / announcement / reward)
- Guideline: `7b0nj4qql59Oefcl9t7upr` node `76:38969` — usage, layering, animation timing

## Decisions (already aligned with the user)

| Topic | Decision |
|------|----------|
| API form | `InAppNotificationProvider` + `useInAppNotification()`; mounted at app root, push programmatically (mirrors `Toast`) |
| Multiple notifications | FIFO queue; only one visible at a time. Next is shown after the current one's exit animation completes |
| Swipe-up to dismiss | In v1; pure touch event handlers (no `framer-motion` dependency) |
| Variant naming | `default`, `completion`, `danger` (renamed from Figma's "warning" — semantics is error), `announcement`, `reward` |
| Container radius | `--radius-400` (16px), per the original 6475:6103 spec |
| Image variant | Kept (custom 40×40 image content) |
| Trailing | `none` / `button` / `chevron` all kept |
| Card vs button click | Both supported; `button.onClick` does not propagate to `onPress` |
| Animation | Pure CSS transitions/keyframes; no extra dependency |
| Component name | `InAppNotification` + `useInAppNotification` (avoid clashing with future push-notification work) |

## API

```ts
type InAppNotificationVariant =
  | 'default'
  | 'completion'
  | 'danger'
  | 'announcement'
  | 'reward'

type InAppNotificationTrailing = 'none' | 'button' | 'chevron'

interface InAppNotificationButton {
  label: string                       // ≤ 4 chars per Figma guideline
  onClick: () => void
}

interface InAppNotificationOptions {
  // Leading — icon style (default)
  variant?: InAppNotificationVariant  // default 'default'
  icon?: React.ReactNode              // override the variant's default icon (still uses variant's bg color)

  // Leading — image style (mutually exclusive with variant/icon)
  image?: React.ReactNode             // when set, image variant takes precedence

  // Content
  headline: string                    // required, single line + ellipsis
  description?: string                // optional, single line + ellipsis

  // Trailing
  trailing?: InAppNotificationTrailing // default 'none'
  button?: InAppNotificationButton    // when trailing === 'button'

  // Interaction
  onPress?: () => void                // tap on the card; auto-dismisses after firing

  // Timing
  duration?: number                   // ms; default 3000
}

interface InAppNotificationContextValue {
  show: (opts: InAppNotificationOptions) => string
  update: (id: string, patch: Partial<InAppNotificationOptions>) => void
  dismiss: (id: string) => void
}
```

`show()` returns a string `id`. `dismiss(id)` triggers exit animation and removes from queue. `update(id, patch)` merges into the active notification and resets the auto-dismiss timer; if `id` is not the active one (e.g. queued or already gone), no-op.

## Variant token map

| variant | leading bg | icon class | icon color |
|---------|-----------|------------|-----------|
| `default` | `var(--color-background-sunken)` | `icon-bell-filled` | `var(--color-content-default)` |
| `completion` | `var(--color-background-success-subtlest)` | `icon-check-bold` | `var(--color-content-success-bold)` |
| `danger` | `var(--color-background-danger-subtlest)` | `icon-alert-circle-filled` | `var(--color-content-danger-bold)` |
| `announcement` | `var(--color-background-brand-subtlest)` | `icon-loud-speaker-filled` | `var(--color-content-brand-bold)` |
| `reward` | `var(--color-background-prize-subtlest)` | `icon-gift-filled` | `var(--color-content-prize-bold)` |

`image` variant: 40×40 wrapper, `border-radius: var(--radius-200)`, `overflow: hidden`, no background; consumer renders `<img>` / `<Avatar>` / etc. inside.

## Visual spec (matches Figma node 6475:6103 + variant presets)

### Container
- `position: fixed`, `left: var(--space-300)`, `right: var(--space-300)` (12px each)
- `top: calc(env(safe-area-inset-top, 0px) + var(--space-200))` (8px below status bar)
- `z-index: 1050` (above Tooltip/Sheet 1000 / Dialog 1000, below Toast 1100)
- `background: var(--color-background-default)`
- `padding: var(--space-300)` (12px)
- `border-radius: var(--radius-400)` (16px)
- `box-shadow: var(--shadow-large)`
- `display: flex; align-items: center; gap: var(--space-300)` (12px)

### Leading element (40×40, `flex-shrink: 0`)
- `width: 40px; height: 40px; border-radius: var(--radius-200)` (8px)
- icon variants: bg/color from variant table; inner icon is 24×24, centered
- image variant: `overflow: hidden`; child fills the box (`width: 100%; height: 100%; object-fit: cover`)

### Content (`flex: 1 0 0; min-width: 0`)
- `display: flex; flex-direction: column; justify-content: center; gap: var(--space-50)` (2px)
- Headline: class `text-label-large` (16/500/24, 0.04em), color `var(--color-content-bold)`, single line + ellipsis (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%`)
- Description: class `text-body-medium` (14/400/22, 0.04em), color `var(--color-content-subtle)`, same ellipsis treatment

### Trailing
- `none`: not rendered
- `button`: real `<button>`, `text-label-large`, color `var(--color-content-brand-default)`, no padding, `flex-shrink: 0`. Click does NOT propagate to card `onPress`.
- `chevron`: 24×24, `icon-chevron-right`, color `var(--color-content-default)`. Pure visual; click bubbles to card.

## Behavior

### Queue (FIFO)
- Internal state: `current: Notification | null`, `queue: Notification[]`
- `show(opts)` → push to `queue`. If `current === null`, immediately promote first queued item.
- On exit animation end: drop `current`, promote next.

### Auto-dismiss
- After mounting (and after enter animation begins), set `setTimeout(dismiss, duration)` (default 3000ms).
- `update()` resets the timer using the patched `duration`.
- Timer is paused while a touch gesture is in progress (`touchstart` clears, `touchend` without dismissal restarts with full duration to give user time to read).

### Tap interaction
- `card` has `onClick` only when `onPress` is set; in that case also `role="button"`, `tabindex="0"`, and Enter/Space trigger.
- `trailing button` always intercepts and `stopPropagation`s.
- Tap (card or button) → fire callback, then dismiss.

### Swipe-up to dismiss
- Touch handlers attached to the card.
- `touchstart`: record `startY`, `startTime`; clear auto-dismiss timer; set `data-dragging="true"`.
- `touchmove`: `delta = clientY - startY`. If `delta < 0` → set inline style `transform: translateY(${delta}px)` and `opacity: 1 - min(|delta| / 64, 0.3)`. If `delta >= 0` → ignore.
- `touchend`:
  - If `|delta| > 32px` OR velocity > 0.3 px/ms → trigger exit (animate from current transform to `translateY(-100%)`, opacity → 0).
  - Else → spring back: `transition: transform 150ms ease-out, opacity 150ms ease-out`; clear inline transform; restart auto-dismiss timer.

### Animations (CSS)
- Enter: `translateY(-120%) → translateY(0)`, `opacity: 0.7 → 1`, 300ms `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (easeOutBack)
- Exit: `translateY(0) → translateY(-120%)`, `opacity: 1 → 0`, 300ms `cubic-bezier(0.6, -0.28, 0.735, 0.045)` (easeInBack)
- Use `data-state="entering" | "visible" | "exiting"` driven from React state to switch CSS rules, and listen for `transitionend` / `animationend` on the relevant transform property to advance the queue.

### Reduced motion
- Under `@media (prefers-reduced-motion: reduce)`, replace transforms with `opacity 150ms linear`. Swipe gesture remains functional but the spring-back transition is also opacity-only.

## Accessibility

- Container: `role="status"`, `aria-live="polite"` (non-interruptive). Polite is appropriate; the notification is informational, not a critical alert.
- Card with `onPress`: `role="button"`, `tabindex="0"`, `onKeyDown` for Enter/Space.
- Trailing button: real `<button type="button">`, `aria-label` defaults to `button.label`.
- Chevron is decorative — `aria-hidden="true"` on the icon span.
- Focus: when a notification arrives, focus stays where it was; users find it via swipe / TalkBack / VoiceOver announcement.

## File structure

```
src/components/ui/InAppNotification.tsx     # Provider, hook, queue, visual, animation, touch logic
src/components/ui/InAppNotification.css     # variants, layout, keyframes, transitions
src/components/ui/index.ts                  # add barrel exports
src/pages/stories/InAppNotification.story.tsx  # showcase: 5 variants + image + 3 trailings + onPress
```

Barrel exports (`src/components/ui/index.ts`):
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
  InAppNotificationContextValue,
} from './InAppNotification'
```

## Story plan (for `src/pages/stories/InAppNotification.story.tsx`)

A `Render` component with controls for `variant`, `trailing`, `description (boolean)`, `useImage (boolean)` and a "Show notification" button that calls `show()`. The provider must be mounted at the app shell so the story can call the hook.

Mount point: `src/main.tsx`, alongside the existing `ToastProvider` (e.g. `<InAppNotificationProvider><ToastProvider>...</ToastProvider></InAppNotificationProvider>`).

## Out of scope (explicit non-goals)

- Stacking multiple notifications visually (FIFO queue replaces this).
- Persistent / sticky notifications (no `duration: Infinity` support; if needed later, add `persist: true`).
- Top-edge slide-down on landscape / tablet layouts (mobile-first; horizontal positioning relies on viewport width).
- Sound / haptic feedback.
- Push-notification integration (this is purely an in-app, in-process UI primitive).

## Risks / open notes

- **z-index conflict with Dialog**: existing `Dialog` is `1000`, but the guideline says in-app notification should sit *below* dialogs. With `z-index: 1050`, the in-app notification will visually cover an open dialog. Resolution: in v1 we pick `1050` (above Tooltip/Sheet, below Toast). If a workflow ever shows a notification while a dialog is open, follow up by raising `Dialog` to `1100+` and lowering this to `~900`. Document this in code comments.
- **`update()` semantics**: only the *currently visible* notification is updatable; queued items are not. If a use case requires updating queued items, revisit.
- **Story preview vs real app**: the story's `previewWidth` might differ from `390-414px` mobile widths; manual test on Chrome DevTools iPhone 14 Pro before sign-off.
