import React, { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import IconButton from './IconButton'
import SheetHeader from './SheetHeader'
import './Sheet.css'

/** Past this fraction of the sheet height the release is treated as dismiss. */
const DISMISS_DISTANCE_RATIO = 0.25
/** Downward flick velocity (px/ms) that auto-dismisses regardless of distance. */
const DISMISS_VELOCITY = 0.5

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Tabbable elements currently rendered inside the sheet, in DOM order. */
function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getClientRects().length > 0
  )
}

interface SheetProps {
  open: boolean
  onClose: () => void
  /** Size of the headline. Applied whether or not the grabber handle is shown. */
  headlineSize?: 'regular' | 'large'
  headline?: string
  children: React.ReactNode
  footer?: React.ReactNode
  /** Show the small drag handle at the top. Default: true. */
  Handle?: boolean
  /** Portal container element. Defaults to document.body. Set this to render inside a themed container. */
  container?: Element
  /** Accessible name for the dialog. Only needed when there is no visible `headline`. */
  'aria-label'?: string
}

function Sheet({
  open,
  onClose,
  headline,
  headlineSize = 'regular',
  children,
  footer,
  Handle = true,
  container,
  'aria-label': ariaLabel,
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  // Escape to close + keep Tab inside the sheet (aria-modal only hides the
  // background from assistive tech; it does not stop Tab from walking out).
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const sheetEl = sheetRef.current
      if (!sheetEl) return
      const focusables = getFocusable(sheetEl)
      if (focusables.length === 0) {
        e.preventDefault()
        sheetEl.focus({ preventScroll: true })
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      const insideContent = !!active && active !== sheetEl && sheetEl.contains(active)

      if (!insideContent) {
        // Focus sits on the sheet root (just opened) or escaped to the page behind.
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Move focus into the sheet on open, hand it back to the opener on close.
  // The sheet root is focused rather than its first control, so screen readers
  // announce the dialog name instead of landing straight on the close button.
  useEffect(() => {
    if (!open) return
    const sheetEl = sheetRef.current
    if (!sheetEl) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    // preventScroll：sheet 進場時還在 translateY(100%)（畫面外），瀏覽器會為了把它
    // 捲進視野而拉動背後的捲動容器，看起來像背景自己捲了一下。
    sheetEl.focus({ preventScroll: true })

    return () => {
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open])

  // Drag-to-dismiss: only active when the grabber Handle is shown.
  useEffect(() => {
    if (!open || !Handle) return
    const sheetEl = sheetRef.current
    if (!sheetEl) return
    const headerEl = sheetEl.querySelector<HTMLElement>('.ui-sheet-header--grabber')
    if (!headerEl) return

    let startY = 0
    let startTime = 0
    let dragging = false

    const onPointerDown = (e: PointerEvent) => {
      // Ignore right-click; primary button only.
      if (e.button !== 0 && e.pointerType === 'mouse') return
      dragging = true
      startY = e.clientY
      startTime = performance.now()
      headerEl.setPointerCapture(e.pointerId)
      // Disable enter animation while user is driving the position.
      sheetEl.style.animation = 'none'
      sheetEl.style.transition = 'none'
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dy = Math.max(0, e.clientY - startY)
      sheetEl.style.transform = `translateY(${dy}px)`
    }

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      const dy = e.clientY - startY
      const dt = performance.now() - startTime
      const velocity = dt > 0 ? dy / dt : 0
      const height = sheetEl.offsetHeight || 1
      const shouldDismiss = dy > height * DISMISS_DISTANCE_RATIO || velocity > DISMISS_VELOCITY

      sheetEl.style.transition = 'transform 0.2s ease'
      if (shouldDismiss) {
        sheetEl.style.transform = 'translateY(100%)'
        window.setTimeout(onClose, 200)
      } else {
        sheetEl.style.transform = 'translateY(0)'
        // Reset any leftover inline styles once snap-back finishes.
        window.setTimeout(() => {
          if (!sheetEl.isConnected) return
          sheetEl.style.transition = ''
          sheetEl.style.transform = ''
        }, 200)
      }
    }

    headerEl.addEventListener('pointerdown', onPointerDown)
    headerEl.addEventListener('pointermove', onPointerMove)
    headerEl.addEventListener('pointerup', endDrag)
    headerEl.addEventListener('pointercancel', endDrag)

    return () => {
      headerEl.removeEventListener('pointerdown', onPointerDown)
      headerEl.removeEventListener('pointermove', onPointerMove)
      headerEl.removeEventListener('pointerup', endDrag)
      headerEl.removeEventListener('pointercancel', endDrag)
    }
  }, [open, Handle, onClose])

  if (!open) return null

  const hasHeadline = !!headline
  const headerType = Handle ? 'grabber' : 'default'
  const resolvedHeadlineSize = hasHeadline ? headlineSize : Handle ? 'none' : 'regular'

  const closeButton = (
    <IconButton
      variant="ghost"
      colorType="neutral"
      size="medium"
      aria-label="Close"
      onClick={onClose}
      icon={<i className="icon-cross" aria-hidden="true" />}
    />
  )

  return createPortal(
    <>
      <div className="ui-sheet-overlay" onClick={onClose} />
      <div className="ui-sheet-container">
        <div
          ref={sheetRef}
          className="ui-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby={hasHeadline ? titleId : undefined}
          aria-label={hasHeadline ? undefined : ariaLabel}
          tabIndex={-1}
        >
          <SheetHeader
            type={headerType}
            headlineSize={resolvedHeadlineSize}
            headline={headline ?? ''}
            titleId={titleId}
            leading={headerType === 'default' ? closeButton : undefined}
          />
          <div className="ui-sheet__body">{children}</div>
          {footer && <div className="ui-sheet__footer">{footer}</div>}
        </div>
      </div>
    </>,
    container ?? document.body
  )
}

Sheet.displayName = 'Sheet'

export default Sheet
export type { SheetProps }
