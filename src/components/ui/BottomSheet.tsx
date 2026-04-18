import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Sheet.css'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  titleSize?: 'large' | 'regular'
  children: React.ReactNode
  footer?: React.ReactNode
  /** Show the small drag handle at the top. Default: true. */
  showHandle?: boolean
}

function BottomSheet({
  open,
  onClose,
  title,
  titleSize = 'regular',
  children,
  footer,
  showHandle = true,
}: BottomSheetProps) {
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

  return createPortal(
    <>
      <div className="ui-sheet-overlay" onClick={onClose} />
      <div className="ui-sheet-container">
        <div className="ui-sheet">
          {showHandle ? (
            <div className="ui-sheet__grabber" />
          ) : (
            <div className="ui-sheet__header">
              {title && (
                <span className={`ui-sheet__title--${titleSize}`}>{title}</span>
              )}
              <button
                className="ui-sheet__close"
                onClick={onClose}
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5l10 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="ui-sheet__body">{children}</div>
          {footer && <div className="ui-sheet__footer">{footer}</div>}
        </div>
      </div>
    </>,
    document.body
  )
}

export default BottomSheet
export type { BottomSheetProps }
