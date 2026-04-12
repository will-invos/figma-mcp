import React, { useId, useState, useCallback } from 'react';
import './Select.css';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'disabled'> {
  /** 'default' = no label, 'inner-label' = floating label */
  variant?: 'default' | 'inner-label';
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
  helpIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = 'default',
      label,
      placeholder,
      options,
      status = 'default',
      helpText,
      helpIcon,
      leadingIcon,
      id,
      className,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helpId = helpText ? `${selectId}-help` : undefined;

    const isDisabled = status === 'disabled';
    const isError = status === 'error';
    const isInnerLabel = variant === 'inner-label';

    const [hasValue, setHasValue] = useState(() => {
      return Boolean(value || defaultValue);
    });

    // Select only floats when it has a value (not on focus)
    const shouldFloat = isInnerLabel && (hasValue || Boolean(value));

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHasValue(e.target.value !== '');
        onChange?.(e);
      },
      [onChange]
    );

    const rootClasses = [
      'ui-select',
      `ui-select--${variant}`,
      shouldFloat && 'ui-select--float',
      isError && 'ui-select--error',
      isDisabled && 'ui-select--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={rootClasses}>
        <div className="ui-select__input-wrapper">
          {leadingIcon && (
            <span className="ui-select__leading-icon">{leadingIcon}</span>
          )}
          <div className="ui-select__content">
            {isInnerLabel && (
              <label className="ui-select__label" htmlFor={selectId}>
                {shouldFloat ? label : (placeholder || label)}
              </label>
            )}
            <select
              ref={ref}
              id={selectId}
              className="ui-select__input"
              disabled={isDisabled}
              aria-invalid={isError || undefined}
              aria-describedby={helpId}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              {...rest}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <span className="ui-select__chevron" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {helpText && (
          <div id={helpId} className="ui-select__help">
            {helpIcon && (
              <span className="ui-select__help-icon">{helpIcon}</span>
            )}
            <span className="ui-select__help-text">{helpText}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
export type { SelectProps, SelectOption };
