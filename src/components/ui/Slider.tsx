import React from 'react'
import './Slider.css'

interface SliderProps {
  value: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, disabled = false, className }, ref) => {
    const pct = ((value - min) / (max - min)) * 100
    const classes = ['ui-slider', disabled && 'ui-slider--disabled', className].filter(Boolean).join(' ')
    return (
      <div className={classes}>
        <div className="ui-slider__track">
          <div className="ui-slider__fill" style={{ width: `${pct}%` }} />
        </div>
        <input
          ref={ref}
          type="range"
          className="ui-slider__input"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => onChange?.(Number(e.target.value))}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'
export default Slider
export type { SliderProps }
