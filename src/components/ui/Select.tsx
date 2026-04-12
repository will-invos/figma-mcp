import React, { useId } from 'react';
import './Select.css';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'disabled'> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      options,
      status = 'default',
      helpText,
      id,
      className,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helpId = helpText ? `${selectId}-help` : undefined;

    const isDisabled = status === 'disabled';
    const isError = status === 'error';

    const classes = [
      'ui-select',
      isError && 'ui-select--error',
      isDisabled && 'ui-select--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        {label && (
          <label className="ui-select__label" htmlFor={selectId}>
            {label}
          </label>
        )}
        <div className="ui-select__wrapper">
          <select
            ref={ref}
            id={selectId}
            className="ui-select__input"
            disabled={isDisabled}
            aria-invalid={isError || undefined}
            aria-describedby={helpId}
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
          <span className="ui-select__chevron" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <span id={helpId} className="ui-select__help">
            {helpText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
export type { SelectProps, SelectOption };
