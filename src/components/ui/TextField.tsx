import React, { useId, useState, useCallback } from 'react';
import './TextField.css';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'type'> {
  /** 'default' = plain input, 'inner-label' = floating label that acts as placeholder when empty+unfocused */
  variant?: 'default' | 'inner-label';
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** HTML input type */
  inputType?: React.HTMLInputTypeAttribute;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = 'default',
      label,
      status = 'default',
      leadingIcon,
      trailingIcon,
      inputType,
      id,
      className,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helpId = undefined;

    const isDisabled = status === 'disabled';
    const isError = status === 'error';
    const isInnerLabel = variant === 'inner-label';

    // Track focus and whether input has value for floating label
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(() => {
      return Boolean(value || defaultValue);
    });

    // Float label when focused or has value
    const shouldFloat = isInnerLabel && (focused || hasValue || Boolean(value));

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        setHasValue(e.target.value.length > 0);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        onChange?.(e);
      },
      [onChange]
    );

    const rootClasses = [
      'ui-text-field',
      `ui-text-field--${variant}`,
      shouldFloat && 'ui-text-field--float',
      isError && 'ui-text-field--error',
      isDisabled && 'ui-text-field--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Click wrapper to focus input
    const handleWrapperClick = useCallback(() => {
      document.getElementById(inputId)?.focus();
    }, [inputId]);

    return (
      <div className={rootClasses}>
        <div className="ui-text-field__input-wrapper" onClick={handleWrapperClick}>
          {leadingIcon && (
            <span className="ui-text-field__leading-icon">{leadingIcon}</span>
          )}
          <div className="ui-text-field__content">
            {isInnerLabel && label && (
              <label
                className={`${shouldFloat ? 'text-body-small' : 'text-body-large'} ui-text-field__label`}
                htmlFor={inputId}
              >
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={inputId}
              type={inputType}
              className="text-body-large ui-text-field__input"
              disabled={isDisabled}
              aria-invalid={isError || undefined}
              aria-describedby={helpId}
              placeholder={isInnerLabel ? placeholder : placeholder}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              {...rest}
            />
          </div>
          {trailingIcon && (
            <div
              className="ui-text-field__trailing-icon"
              onClick={(e) => e.stopPropagation()}
            >
              {trailingIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
export type { TextFieldProps };
