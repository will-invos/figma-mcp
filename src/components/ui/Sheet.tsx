import React, { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import IconButton from './IconButton'
import SheetHeader from './SheetHeader'
import './Sheet.css'

/** 拖超過 sheet 高度的這個比例就當作要關閉 */
const DISMISS_DISTANCE_RATIO = 0.25
/** 向下快滑到這個速度（px/ms）就直接關閉，不看拖了多遠 */
const DISMISS_VELOCITY = 0.5

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getClientRects().length > 0
  )
}

interface SheetProps {
  open: boolean
  onClose: () => void
  /** 標題大小；不論有沒有 Handle 都適用 */
  headlineSize?: 'regular' | 'large'
  headline?: string
  children: React.ReactNode
  footer?: React.ReactNode
  Handle?: boolean
  /** portal 目標，預設 document.body；想讓 sheet 跟著某個容器的主題與範圍走就傳它 */
  container?: Element
  /** 沒有可見 headline 時才需要，用來當對話框的無障礙名稱 */
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

  // Esc 關閉，並把 Tab 圈在 sheet 內：aria-modal 只對輔助科技隱藏背景，
  // 並不會阻止 Tab 走出去。
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
        // 焦點還在 sheet 根節點（剛開啟），或已經跑到背後的頁面去了
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

  // 開啟時把焦點移進 sheet，關閉時還給原本的觸發元素。
  // 對焦的是 sheet 根節點而不是第一個控制項，這樣螢幕閱讀器會先唸出對話框名稱，
  // 而不是直接落在關閉鍵上。
  useEffect(() => {
    if (!open) return
    const sheetEl = sheetRef.current
    if (!sheetEl) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    // preventScroll：sheet 進場時還在 translateY(100%)（畫面外），瀏覽器會為了把它
    // 捲進視野而拉動背後的捲動容器，看起來像背景自己捲了一下
    sheetEl.focus({ preventScroll: true })

    return () => {
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open])

  // 下拉關閉：只有顯示 Handle 時才啟用（拖曳面是 grabber header）
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
      // 只吃滑鼠左鍵
      if (e.button !== 0 && e.pointerType === 'mouse') return
      dragging = true
      startY = e.clientY
      startTime = performance.now()
      headerEl.setPointerCapture(e.pointerId)
      // 使用者正在拖，先關掉進場動畫免得互搶 transform
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
        // 彈回結束後把 inline style 清乾淨，否則下次開啟會沿用舊值
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
