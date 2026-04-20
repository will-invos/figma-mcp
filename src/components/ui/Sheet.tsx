import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import IconButton from './IconButton'
import SheetHeader from './SheetHeader'
import './Sheet.css'

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
}: SheetProps) {
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
    >
      <i className="icon-cross" aria-hidden="true" />
    </IconButton>
  )

  return createPortal(
    <>
      <div className="ui-sheet-overlay" onClick={onClose} />
      <div className="ui-sheet-container">
        <div className="ui-sheet">
          <SheetHeader
            type={headerType}
            headlineSize={resolvedHeadlineSize}
            headline={headline}
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

export default Sheet
export type { SheetProps }
