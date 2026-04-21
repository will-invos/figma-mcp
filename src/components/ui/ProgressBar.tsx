import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  /** Progress 0–100. Ignored when `indeterminate` is true. */
  value: number
  /** Animated indeterminate state (e.g. unknown progress). */
  indeterminate?: boolean
  className?: string
}

/** Per Figma Web 3:1985 — 8px brand-filled bar with subtle track. */
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
