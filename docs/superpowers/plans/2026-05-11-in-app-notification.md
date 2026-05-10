# InAppNotification Implementation Plan

> **Spec:** [docs/superpowers/specs/2026-05-10-in-app-notification-design.md](../specs/2026-05-10-in-app-notification-design.md)

**Goal:** Build the `InAppNotification` provider/hook + visual + animation/touch behavior per spec, ship as a new component in `@invos/ios-ui-kit`, mount the provider in `main.tsx`, and add a story.

**Architecture:** Single `InAppNotification.tsx` (Toast-style: provider + hook + queue + visual all in one file) + matching CSS. Pure CSS animation; touch events drive a drag offset; React state machine `data-state="entering" | "visible" | "exiting"` advances the FIFO queue on `transitionend`.

**Tech Stack:** React 19, TypeScript, plain CSS with design tokens, no extra deps.

---

## File map

- Create `src/components/ui/InAppNotification.tsx` — Provider, hook, queue, visual, animation, touch.
- Create `src/components/ui/InAppNotification.css` — variants, layout, keyframes, transitions, reduced-motion.
- Modify `src/components/ui/index.ts` — barrel export.
- Modify `src/main.tsx` — wrap app in `<InAppNotificationProvider>`.
- Create `src/pages/stories/InAppNotification.story.tsx` — story with controls.
- Modify `src/pages/stories/registry.ts` — register the story under "Feedback".

---

## Task 1: Visual + variant CSS

Write `src/components/ui/InAppNotification.css`. Container, leading element variants (5 icon variants + image), content (typography), trailing layout, enter/exit keyframes, swipe-back transition, reduced-motion.

Notes:
- Use design tokens only (no raw hex).
- Single-line ellipsis on headline + description.
- z-index `1050`.
- Container `position: fixed` with `top: calc(env(safe-area-inset-top, 0px) + 8px)`.

## Task 2: Component skeleton (types + visual render)

Create `src/components/ui/InAppNotification.tsx`:
- Define types: `InAppNotificationVariant`, `InAppNotificationTrailing`, `InAppNotificationButton`, `InAppNotificationIconButton`, `InAppNotificationOptions`, `InAppNotificationContextValue`.
- Define `VARIANT_ICONS` map (5 entries).
- Implement a pure presentational component `<InAppNotificationCard>` that takes the resolved options + state + handlers. Uses `IconButton` for trailing icon and `Button` for trailing button.
- No queue / no provider yet.

## Task 3: Provider + hook + queue (no animation yet)

In the same file:
- `InAppNotificationContext` + `useInAppNotification` hook (throws if not within provider).
- `InAppNotificationProvider`:
  - State: `current: NotificationItem | null`, `queue: NotificationItem[]`, `state: 'entering' | 'visible' | 'exiting' | null`.
  - `show(opts)` returns id; pushes to queue; promotes to current if idle.
  - `dismiss(id)` triggers state → `'exiting'`; on `onAnimationEnd` move on.
  - `update(id, patch)` only patches the current.
  - Auto-dismiss timer set when state becomes `'visible'`.
  - Mount via `createPortal` to `document.body`.

## Task 4: Animation states

- Render with `data-state` attribute; CSS animates enter/exit.
- Use `onAnimationEnd` (or `onTransitionEnd`) to:
  - When `entering` finishes → set `'visible'` and start auto-dismiss timer.
  - When `exiting` finishes → drop current, promote next from queue.
- Cleanup timer in dismiss / unmount.

## Task 5: Swipe-up gesture

- Touch handlers on the card: `onTouchStart`, `onTouchMove`, `onTouchEnd`.
- During drag, apply inline `transform: translateY(${delta}px)` and reduced opacity; pause auto-dismiss timer.
- On release: dismiss if `delta < -32` or velocity > 0.3 px/ms; else spring back via inline transition then clear inline style and restart timer.
- Suppress drag if state ≠ `'visible'`.

## Task 6: Barrel export

Add to `src/components/ui/index.ts`:

```ts
export { InAppNotificationProvider, useInAppNotification } from './InAppNotification';
export type {
  InAppNotificationOptions,
  InAppNotificationVariant,
  InAppNotificationTrailing,
  InAppNotificationButton,
  InAppNotificationIconButton,
  InAppNotificationContextValue,
} from './InAppNotification';
```

## Task 7: Mount provider in main

Edit `src/main.tsx`:

```tsx
import { ToastProvider, InAppNotificationProvider } from '@/components/ui'

ReactDOM.createRoot(...).render(
  <React.StrictMode>
    <InAppNotificationProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </InAppNotificationProvider>
  </React.StrictMode>,
)
```

## Task 8: Story

Create `src/pages/stories/InAppNotification.story.tsx`. Follow the `Toast.story.tsx` pattern: a Render component with a `Show` button + props for `variant`, `trailing`, `description`, `useImage`. On click, calls `show()`.

## Task 9: Register story

Edit `src/pages/stories/registry.ts`:
- import `InAppNotificationStory`
- add to "Feedback" category

## Task 10: Lint + dev verify

- Run `npm run lint` — expect pass.
- Run `npm run dev` (background); manually open the story in iPhone 14 Pro DevTools mode, exercise: 5 variants, image, trailing none/button/icon, queueing 3 in a row, swipe-up.
- TypeScript check via `npm run build` (or `tsc --noEmit`).

## Task 11: Commit

Single feat commit when verified.
