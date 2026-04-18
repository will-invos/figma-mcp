import React from 'react'
import './CircularProgress.css'

interface CircularProgressProps {
  /** 0–100. */
  value: number
  /** Indeterminate (animated) — ignores value when true. */
  indeterminate?: boolean
  size?: 'small' | 'medium' | 'large'
  colorType?: 'primary' | 'success' | 'warning' | 'danger' | 'prize'
  /** Show value label inside the ring. */
  showLabel?: boolean
}

const SIZES = { small: 32, medium: 48, large: 72 } as const
const STROKE = { small: 3, medium: 4, large: 6 } as const

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ value, indeterminate = false, size = 'medium', colorType = 'primary', showLabel = false }, ref) => {
    const px = SIZES[size]
    const sw = STROKE[size]
    const r = (px - sw) / 2
    const c = 2 * Math.PI * r
    const pct = Math.max(0, Math.min(100, value))
    const offset = c * (1 - pct / 100)
    const classes = [
      'ui-circular-progress',
      `ui-circular-progress--${colorType}`,
      indeterminate && 'ui-circular-progress--indeterminate',
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes} style={{ width: px, height: px }} role="progressbar" aria-valuenow={indeterminate ? undefined : pct}>
        <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`}>
          <circle cx={px / 2} cy={px / 2} r={r} fill="none" strokeWidth={sw} className="ui-circular-progress__track" />
          <circle
            cx={px / 2} cy={px / 2} r={r} fill="none" strokeWidth={sw}
            className="ui-circular-progress__fill"
            strokeDasharray={c}
            strokeDashoffset={indeterminate ? c * 0.75 : offset}
            transform={`rotate(-90 ${px / 2} ${px / 2})`}
            strokeLinecap="round"
          />
        </svg>
        {showLabel && !indeterminate && (
          <span className="ui-circular-progress__label">{pct}%</span>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'
export default CircularProgress
export type { CircularProgressProps }
