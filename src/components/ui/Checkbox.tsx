import React, { useId } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  status?: 'default' | 'error';
  children?: React.ReactNode;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      status = 'default',
      children,
      description,
    },
    ref
  ) => {
    const id = useId();

    const wrapperClasses = [
      'ui-checkbox',
      disabled && 'ui-checkbox--disabled',
      status === 'error' && 'ui-checkbox--error',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses} htmlFor={id}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="ui-checkbox__input"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-invalid={status === 'error' || undefined}
        />
        <span className="ui-checkbox__indicator" aria-hidden="true" />
        {(children || description) && (
          <span className="ui-checkbox__content">
            {children && <span className="ui-checkbox__label">{children}</span>}
            {description && <span className="ui-checkbox__description">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
export type { CheckboxProps };
