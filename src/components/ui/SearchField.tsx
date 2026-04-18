import React, { useId } from 'react'
import './SearchField.css'

interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  /** Show cancel button on focus / when value present. */
  showCancel?: boolean
  onCancel?: () => void
  cancelLabel?: string
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M9 3.5A5.5 5.5 0 1 0 12.5 13.4l3.3 3.3a.9.9 0 1 0 1.3-1.3l-3.3-3.3A5.5 5.5 0 0 0 9 3.5zM5.3 9a3.7 3.7 0 1 1 7.4 0 3.7 3.7 0 0 1-7.4 0z"
      fill="currentColor"
    />
  </svg>
)

const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="8.75" fill="currentColor" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="var(--color-content-fixed-white)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onChange,
      placeholder = '搜尋',
      showCancel = false,
      onCancel,
      cancelLabel = '取消',
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
          <span className="ui-search-field__icon"><SearchIcon /></span>
          <input
            ref={ref}
            id={inputId}
            type="search"
            className="ui-search-field__input"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            {...rest}
          />
          {hasValue && (
            <button
              type="button"
              className="ui-search-field__clear"
              aria-label="清除"
              onClick={() => onChange?.('')}
            >
              <ClearIcon />
            </button>
          )}
        </div>
        {showCancel && (
          <button type="button" className="ui-search-field__cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
        )}
      </div>
    )
  }
)
SearchField.displayName = 'SearchField'
export default SearchField
export type { SearchFieldProps }
