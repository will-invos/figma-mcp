import React from 'react';
import './Banner.css';

interface BannerProps {
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
  message: React.ReactNode;
}

/** Default leading icon SVG per colorType. Uses currentColor for proper color inheritance. */
const DEFAULT_LEADING_ICONS: Record<NonNullable<BannerProps['colorType']>, React.ReactNode> = {
  primary: (
    <i className="icon-loud-speaker"></i>
  ),
  neutral: (
    <i className="icon-info"></i>
  ),
  success: (
    <i className="icon-check"></i>
  ),
  warning: (
    <i className="icon-alert-circle"></i>
  ),
  danger: (
    <i className="icon-alert-circle"></i>
  ),
  prize: (
    <i className="icon-gift"></i>
  ),
};

const CloseIcon = () => (
  <i className="icon-cross"></i>
);

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      colorType = 'neutral',
      variant = 'default',
      leadingIcon = true,
      icon,
      trailingIcon = true,
      onClose,
      message,
    },
    ref
  ) => {
    const classes = [
      'ui-banner',
      `ui-banner--${variant}`,
      `ui-banner--${colorType}`,
    ].join(' ');

    const resolvedLeading = icon ?? (leadingIcon ? DEFAULT_LEADING_ICONS[colorType] : null);

    return (
      <div ref={ref} className={classes} role="alert">
        {resolvedLeading && <span className="ui-banner__icon">{resolvedLeading}</span>}
        <div className="text-body-medium ui-banner__content">{message}</div>
        {trailingIcon && (
          onClose ? (
            <button
              type="button"
              className="ui-banner__trailing ui-banner__trailing--button"
              onClick={onClose}
              aria-label="Close banner"
            >
              <CloseIcon />
            </button>
          ) : (
            <span className="ui-banner__trailing">
              <CloseIcon />
            </span>
          )
        )}
      </div>
    );
  }
);

Banner.displayName = 'Banner';

export default Banner;
export type { BannerProps };
