import React, { useId } from 'react';
import './TextField.css';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  helpText?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      status = 'default',
      helpText,
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

    const classes = [
      'ui-text-field',
      isError && 'ui-text-field--error',
      isDisabled && 'ui-text-field--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        {label && (
          <label className="ui-text-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className="ui-text-field__input"
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          aria-describedby={helpId}
          {...rest}
        />
        {helpText && (
          <span id={helpId} className="ui-text-field__help">
            {helpText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
export type { TextFieldProps };
