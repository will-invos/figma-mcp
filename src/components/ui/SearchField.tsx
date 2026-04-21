import React, { useId } from 'react'
import './SearchField.css'

interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  /** Show clear (×) icon when the field has a value. */
  clearable?: boolean
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Search',
      clearable = true,
      id,
      className,
      ...rest
    },
    ref
  ) => {
    const generated = useId()
    const inputId = id ?? generated
    const hasValue = Boolean(value && value.length > 0)
    return (
      <div className={['ui-search-field', className].filter(Boolean).join(' ')}>
        <div className="ui-search-field__input-wrapper">
          <span className="ui-search-field__icon"><i className="icon-magnifier" aria-hidden="true" /></span>
          <input
            ref={ref}
            id={inputId}
            type="search"
            className="text-body-large ui-search-field__input"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            {...rest}
          />
          {clearable && hasValue && (
            <button
              type="button"
              className="ui-search-field__clear"
              aria-label="Clear"
              onClick={() => onChange?.('')}
            >
              <i className="icon-cross-circle-filled" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
SearchField.displayName = 'SearchField'
export default SearchField
export type { SearchFieldProps }
