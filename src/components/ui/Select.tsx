import React, { useId, useState, useCallback } from 'react';
import './Select.css';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'disabled'> {
  /** inner-label：有值時 label 浮到上方（與 TextField 不同，單純對焦不浮） */
  variant?: 'default' | 'inner-label';
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  status?: 'default' | 'error' | 'disabled';
  leadingIcon?: React.ReactNode;
  /** 改用自訂選單（例如 <Sheet> + <ListItem>）取代原生下拉。
   *  欄位會渲染成 button 並在點擊時呼叫這個 callback；顯示的文字仍由 options + value 決定。
   *  這個模式下沒有原生 <select>，所以 ref / ...rest 不會生效。 */
  onPickerOpen?: () => void;
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
      onPickerOpen,
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

    // 與 TextField 不同：只有有值才浮起，單純對焦不浮
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

    const field = (
      <>
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
      </>
    );

    // 自訂選單模式：欄位本身就是觸發器，不渲染原生下拉
    if (onPickerOpen) {
      return (
        <div className={rootClasses}>
          <button
            type="button"
            className="ui-select__input-wrapper"
            disabled={isDisabled}
            aria-haspopup="dialog"
            aria-invalid={isError || undefined}
            onClick={onPickerOpen}
          >
            {field}
          </button>
        </div>
      );
    }

    return (
      <div className={rootClasses}>
        <label className="ui-select__input-wrapper" htmlFor={selectId}>
          {field}
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
