import React from 'react'
import ProgressBar from './ProgressBar'
import './ProgressGroup.css'

interface ProgressGroupProps {
  /** Progress 0–100. */
  value: number
  /**
   * Text label position:
   *   - 'top'  : two labels above the bar (leading on the left in brand color, trailing on the right in default color)
   *   - 'aside': bar fills available width, trailing label sits to the right (brand color)
   */
  textPosition?: 'top' | 'aside'
  /** Left text shown above the bar in 'top' mode. Ignored in 'aside' mode. */
  leadingText?: string
  /** Right (top mode) or aside (aside mode) text. */
  trailingText?: string
  className?: string
}

/**
 * Per Figma 5867:21532 — single progress bar with text labels.
 * Two variants: text on top (two labels) or text on the side (single label).
 */
const ProgressGroup = React.forwardRef<HTMLDivElement, ProgressGroupProps>(
  ({ value, textPosition = 'top', leadingText, trailingText, className }, ref) => {
    const classes = [
      'ui-progress-group',
      `ui-progress-group--${textPosition}`,
      className,
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        {textPosition === 'top' && (leadingText || trailingText) && (
          <div className="ui-progress-group__texts">
            <span className="text-body-small ui-progress-group__leading">{leadingText}</span>
            <span className="text-body-small ui-progress-group__trailing">{trailingText}</span>
          </div>
        )}
        <ProgressBar value={value} />
        {textPosition === 'aside' && trailingText && (
          <span className="text-body-small ui-progress-group__leading">{trailingText}</span>
        )}
      </div>
    )
  }
)
ProgressGroup.displayName = 'ProgressGroup'
export default ProgressGroup
export type { ProgressGroupProps }
