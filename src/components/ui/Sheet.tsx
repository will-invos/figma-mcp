import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import IconButton from './IconButton'
import SheetHeader from './SheetHeader'
import './Sheet.css'

/** Past this fraction of the sheet height the release is treated as dismiss. */
const DISMISS_DISTANCE_RATIO = 0.25
/** Downward flick velocity (px/ms) that auto-dismisses regardless of distance. */
const DISMISS_VELOCITY = 0.5

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
  /** Body horizontal padding. Use 'none' when children (e.g. ListItem) already carry their own inset. Default: 'default'. */
  bodyPadding?: 'default' | 'none'
  /** Portal container element. Defaults to document.body. Set this to render inside a themed container. */
  container?: Element
}

function Sheet({
  open,
  onClose,
  headline,
  headlineSize = 'regular',
  children,
  footer,
  Handle = true,
  bodyPadding = 'default',
  container,
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

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
        <div ref={sheetRef} className="ui-sheet">
          <SheetHeader
            type={headerType}
            headlineSize={resolvedHeadlineSize}
            headline={headline}
            leading={headerType === 'default' ? closeButton : undefined}
          />
          <div
            className={
              bodyPadding === 'none' ? 'ui-sheet__body ui-sheet__body--flush' : 'ui-sheet__body'
            }
          >
            {children}
          </div>
          {footer && <div className="ui-sheet__footer">{footer}</div>}
        </div>
      </div>
    </>,
    container ?? document.body
  )
}

export default Sheet
export type { SheetProps }
