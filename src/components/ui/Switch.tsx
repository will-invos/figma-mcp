import React, { useId } from 'react';
import './Switch.css';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
    },
    ref
  ) => {
    const id = useId();

    const wrapperClasses = [
      'ui-switch',
      disabled && 'ui-switch--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={wrapperClasses} htmlFor={id}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className="ui-switch__input"
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="ui-switch__track" aria-hidden="true">
          <span className="ui-switch__thumb" />
        </span>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
export type { SwitchProps };
