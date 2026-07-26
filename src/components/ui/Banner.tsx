import React from 'react';
import './Banner.css';

interface BannerProps {
  colorType?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'prize';
  variant?: 'default' | 'full-width';
  /** 顯示前置 icon；未另外傳 icon 時會依 colorType 帶入預設圖示 */
  leadingIcon?: boolean;
  /** 自訂前置 icon，會蓋掉預設圖示 */
  icon?: React.ReactNode;
  /** 顯示後置的關閉 icon */
  trailingIcon?: boolean;
  onClose?: () => void;
  message: React.ReactNode;
}

/** 各 colorType 的預設前置圖示 */
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
      leadingIcon = false,
      icon,
      trailingIcon = false,
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
