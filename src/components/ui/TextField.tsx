import React, { useId } from 'react';
import './TextField.css';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'type'> {
  /** 'simple' = no label inside input, 'has-label' = floating label inside input */
  variant?: 'simple' | 'has-label';
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
  helpIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** HTML input type */
  inputType?: React.HTMLInputTypeAttribute;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = 'simple',
      label,
      status = 'default',
      helpText,
      helpIcon,
      leadingIcon,
      trailingIcon,
      inputType,
      id,
      className,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helpId = helpText ? `${inputId}-help` : undefined;

    const isDisabled = status === 'disabled';
    const isError = status === 'error';

    const rootClasses = [
      'ui-text-field',
      `ui-text-field--${variant}`,
      isError && 'ui-text-field--error',
      isDisabled && 'ui-text-field--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={rootClasses}>
        <div className="ui-text-field__input-wrapper">
          {leadingIcon && (
            <span className="ui-text-field__leading-icon">{leadingIcon}</span>
          )}
          <div className="ui-text-field__content">
            {variant === 'has-label' && label && (
              <label className="ui-text-field__label" htmlFor={inputId}>
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={inputId}
              type={inputType}
              className="ui-text-field__input"
              disabled={isDisabled}
              aria-invalid={isError || undefined}
              aria-describedby={helpId}
              {...rest}
            />
          </div>
          {trailingIcon && (
            <span className="ui-text-field__trailing-icon">{trailingIcon}</span>
          )}
        </div>
        {helpText && (
          <div id={helpId} className="ui-text-field__help">
            {helpIcon && (
              <span className="ui-text-field__help-icon">{helpIcon}</span>
            )}
            <span className="ui-text-field__help-text">{helpText}</span>
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
export type { TextFieldProps };
