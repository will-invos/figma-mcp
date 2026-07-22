import React from 'react'
import './DottedController.css'

interface DottedControllerProps {
  /** Total number of dots. */
  count: number
  /** Active dot index (0-based). */
  activeIndex?: number
  /**
   * Visual style:
   *   - 'default' : on solid backgrounds — brand-blue active dot, neutral-gray inactive.
   *   - 'overlap' : on photos / content — white active dot, translucent inactive, with a
   *     drop shadow so the dots stay legible over arbitrary imagery.
   */
  type?: 'default' | 'overlap'
  /**
   * Called with the dot index when a dot is tapped. Providing this turns the dots into
   * buttons (with a widened tap target); omit it for a purely visual indicator.
   */
  onChange?: (index: number) => void
  /** Accessible label describing the paged view (e.g. "輪播圖片"). */
  'aria-label'?: string
  className?: string
}

/**
 * Per Figma 5940:14610 — Dotted Controller.
 * A row of dots marking the current position within a paged / carousel view.
 * Renders as a static indicator, or as tappable buttons when `onChange` is provided.
 */
const DottedController = React.forwardRef<HTMLDivElement, DottedControllerProps>(
  ({ count, activeIndex = 0, type = 'default', onChange, className, ...rest }, ref) => {
    const interactive = typeof onChange === 'function'
    const classes = [
      'ui-dotted-controller',
      `ui-dotted-controller--${type}`,
      interactive && 'ui-dotted-controller--interactive',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes} role="group" {...rest}>
        {Array.from({ length: count }, (_, i) => {
          const active = i === activeIndex
          const dotClass = [
            'ui-dotted-controller__dot',
            active && 'ui-dotted-controller__dot--active',
          ].filter(Boolean).join(' ')

          if (interactive) {
            return (
              <button
                key={i}
                type="button"
                className="ui-dotted-controller__hit"
                aria-label={`第 ${i + 1} 頁`}
                aria-current={active ? 'true' : undefined}
                onClick={() => onChange(i)}
              >
                <span className={dotClass} />
              </button>
            )
          }

          return <span key={i} className={dotClass} aria-hidden="true" />
        })}
      </div>
    )
  }
)
DottedController.displayName = 'DottedController'
export default DottedController
export type { DottedControllerProps }
