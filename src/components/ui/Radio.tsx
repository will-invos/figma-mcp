import React, { useId } from 'react';
import './Radio.css';

interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  status?: 'default' | 'error';
  name?: string;
  value?: string;
  children?: React.ReactNode;
  description?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      status = 'default',
      name,
      value,
      children,
      description,
    },
    ref
  ) => {
    const id = useId();

    const wrapperClasses = [
      'ui-radio',
      disabled && 'ui-radio--disabled',
      status === 'error' && 'ui-radio--error',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses} htmlFor={id}>
        <input
          ref={ref}
          id={id}
          type="radio"
          className="ui-radio__input"
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-invalid={status === 'error' || undefined}
        />
        <span className="ui-radio__indicator" aria-hidden="true" />
        {(children || description) && (
          <span className="ui-radio__content">
            {children && <span className="ui-radio__label">{children}</span>}
            {description && <span className="ui-radio__description">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
export type { RadioProps };
