import React from 'react'
import ProgressBar from './ProgressBar'
import './ProgressGroup.css'

interface ProgressGroupProps {
  /** 0–100 */
  value: number
  /** top：進度條上方左右各一段文字；aside：文字排在進度條右側 */
  textPosition?: 'top' | 'aside'
  /** 只有 top 模式會用到，aside 模式忽略 */
  leadingText?: string
  trailingText?: string
  className?: string
}

/** 帶文字標籤的單條進度條 */
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
