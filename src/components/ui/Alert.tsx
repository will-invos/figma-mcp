import React from 'react';
import './Alert.css';

interface AlertProps {
  colorType?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'prize';
  variant?: 'default' | 'full-width';
  /** Show the leading icon. Defaults to true (renders a default icon per colorType). */
  leadingIcon?: boolean;
  /** Custom leading icon — overrides the default when provided. */
  icon?: React.ReactNode;
  /** Show the trailing close icon. Defaults to true. */
  trailingIcon?: boolean;
  /** Called when the trailing icon is clicked. */
  onClose?: () => void;
  children: React.ReactNode;
}

/** Default leading icon SVG per colorType. Uses currentColor for proper color inheritance. */
const DEFAULT_LEADING_ICONS: Record<NonNullable<AlertProps['colorType']>, React.ReactNode> = {
  primary: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  ),
  neutral: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 11.5L4 6.5L7 9L12 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 13.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  ),
  prize: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v6M4 9.5h8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7C8 7 5 7 4 5.5C3 4 4.5 2.5 5.5 3C6.5 3.5 8 5 8 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7C8 7 11 7 12 5.5C13 4 11.5 2.5 10.5 3C9.5 3.5 8 5 8 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

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
      leadingIcon = true,
      icon,
      trailingIcon = true,
      onClose,
      children,
    },
    ref
  ) => {
    const classes = [
      'ui-alert',
      `ui-alert--${variant}`,
      `ui-alert--${colorType}`,
    ].join(' ');

    const resolvedLeading = icon ?? (leadingIcon ? DEFAULT_LEADING_ICONS[colorType] : null);

    return (
      <div ref={ref} className={classes} role="alert">
        {resolvedLeading && <span className="ui-alert__icon">{resolvedLeading}</span>}
        <div className="ui-alert__content">{children}</div>
        {trailingIcon && (
          onClose ? (
            <button
              type="button"
              className="ui-alert__trailing ui-alert__trailing--button"
              onClick={onClose}
              aria-label="Close alert"
            >
              <CloseIcon />
            </button>
          ) : (
            <span className="ui-alert__trailing">
              <CloseIcon />
            </span>
          )
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
export type { AlertProps };
