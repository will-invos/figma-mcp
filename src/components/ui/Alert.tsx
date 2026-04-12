import React from 'react';
import './Alert.css';

interface AlertProps {
  colorType?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'prize';
  variant?: 'default' | 'full-width';
  icon?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      colorType = 'neutral',
      variant = 'default',
      icon,
      onClose,
      children,
    },
    ref
  ) => {
    const classes = [
      'ui-alert',
      `ui-alert--${colorType}`,
      variant === 'full-width' && 'ui-alert--full-width',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="alert">
        {icon && <span className="ui-alert__icon">{icon}</span>}
        <div className="ui-alert__content">{children}</div>
        {onClose && (
          <button
            type="button"
            className="ui-alert__close"
            onClick={onClose}
            aria-label="Close alert"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
export type { AlertProps };
