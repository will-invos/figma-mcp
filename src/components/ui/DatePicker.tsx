import React, { useId } from 'react'
import './DatePicker.css'

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  /** ISO date string (YYYY-MM-DD). */
  value?: string
  onChange?: (value: string) => void
  status?: 'default' | 'error' | 'disabled'
  /** Min date (YYYY-MM-DD). */
  min?: string
  /** Max date (YYYY-MM-DD). */
  max?: string
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
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
          type="date"
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
DatePicker.displayName = 'DatePicker'
export default DatePicker
export type { DatePickerProps }
