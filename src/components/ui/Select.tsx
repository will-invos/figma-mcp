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
      !hasValue && !value && 'ui-select--placeholder',
      isError && 'ui-select--error',
      isDisabled && 'ui-select--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const currentValue = (value ?? defaultValue ?? '') as string;
    const selectedOption = options.find((o) => o.value === currentValue);

    return (
      <div className={rootClasses}>
        <label className="ui-select__input-wrapper" htmlFor={selectId}>
          {leadingIcon && (
            <span className="ui-select__leading-icon">{leadingIcon}</span>
          )}
          <div className="ui-select__content">
            {isInnerLabel && (
              <span
                className={`${shouldFloat ? 'text-body-small' : 'text-body-large'} ui-select__label`}
              >
                {shouldFloat ? label : (placeholder || label)}
              </span>
            )}
            {(!isInnerLabel || shouldFloat) && (
              <span className="text-body-large ui-select__value">
                {selectedOption?.label ?? (!isInnerLabel ? placeholder : '')}
              </span>
            )}
          </div>
          <span className="ui-select__chevron" aria-hidden="true">
            <i className="icon-chevron-down" />
          </span>
          <select
            ref={ref}
            id={selectId}
            className="ui-select__input"
            disabled={isDisabled}
            aria-invalid={isError || undefined}
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
        </label>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
export type { SelectProps, SelectOption };
