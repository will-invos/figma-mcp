import React, { useId } from 'react'
import './DatePicker.css'

interface MonthPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  /** YYYY-MM string. */
  value?: string
  onChange?: (value: string) => void
  status?: 'default' | 'error' | 'disabled'
  min?: string
  max?: string
}

const MonthPicker = React.forwardRef<HTMLInputElement, MonthPickerProps>(
  ({ value, onChange, status = 'default', min, max, id, className, ...rest }, ref) => {
    const generated = useId()
    const inputId = id ?? generated
    const isError = status === 'error'
    const isDisabled = status === 'disabled'
    const classes = [
      'ui-date-picker',
      isError && 'ui-date-picker--error',
      isDisabled && 'ui-date-picker--disabled',
      className,
    ].filter(Boolean).join(' ')
    return (
      <div className={classes}>
        <input
          ref={ref}
          id={inputId}
          type="month"
          className="ui-date-picker__input"
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          min={min}
          max={max}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          {...rest}
        />
      </div>
    )
  }
)
MonthPicker.displayName = 'MonthPicker'
export default MonthPicker
export type { MonthPickerProps }
