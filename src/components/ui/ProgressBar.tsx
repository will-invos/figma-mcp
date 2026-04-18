import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  /** 0–100. */
  value: number
  /** Shown label above the bar. */
  label?: string
  /** Indeterminate (animated) — ignores value when true. */
  indeterminate?: boolean
  colorType?: 'primary' | 'success' | 'warning' | 'danger' | 'prize'
  size?: 'small' | 'medium'
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, label, indeterminate = false, colorType = 'primary', size = 'medium' }, ref) => {
    const pct = Math.max(0, Math.min(100, value))
    const classes = [
      'ui-progress-bar',
      `ui-progress-bar--${size}`,
      `ui-progress-bar--${colorType}`,
      indeterminate && 'ui-progress-bar--indeterminate',
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        {label && <div className="ui-progress-bar__label">{label}</div>}
        <div
          className="ui-progress-bar__track"
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="ui-progress-bar__fill"
            style={!indeterminate ? { width: `${pct}%` } : undefined}
          />
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'
export default ProgressBar
export type { ProgressBarProps }
