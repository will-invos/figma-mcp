import React, { useId, useState, useCallback } from 'react';
import { useFieldGroupHelpId } from './FieldGroupContext';
import './TextField.css';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'type'> {
  /** inner-label：空且未對焦時 label 當佔位字，一對焦或有值就浮到上方 */
  variant?: 'default' | 'inner-label';
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** 原生 input 的 type；因為 type 已被 Omit 掉，這裡改名避免衝突 */
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
    const helpId = useFieldGroupHelpId();

    const isDisabled = status === 'disabled';
    const isError = status === 'error';
    const isInnerLabel = variant === 'inner-label';

    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(() => {
      return Boolean(value || defaultValue);
    });

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
      // 對焦框由這個 class 驅動，不用 CSS 的 :focus-within —— trailingIcon 常是
      // IconButton，它自己拿到 focus 會讓 :focus-within 成立，input 沒對焦卻亮框。
      focused && 'ui-text-field--focused',
      shouldFloat && 'ui-text-field--float',
      isError && 'ui-text-field--error',
      isDisabled && 'ui-text-field--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 點外框任一處都要能對焦到 input
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
            // trailingIcon 通常是可點的 IconButton，點它不該連帶對焦 input，
            // 所以不讓 click 冒泡到外框的 handleWrapperClick
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
