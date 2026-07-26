import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  /** 0–100；indeterminate 為 true 時忽略 */
  value: number
  indeterminate?: boolean
  className?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, indeterminate = false, className }, ref) => {
    const pct = Math.max(0, Math.min(100, value))
    const classes = [
      'ui-progress-bar',
      indeterminate && 'ui-progress-bar--indeterminate',
      className,
    ].filter(Boolean).join(' ')
    return (
      <div
        ref={ref}
        className={classes}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="ui-progress-bar__base" />
        <div
          className="ui-progress-bar__fill"
          style={!indeterminate ? { width: `${pct}%` } : undefined}
        />
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'
export default ProgressBar
export type { ProgressBarProps }
