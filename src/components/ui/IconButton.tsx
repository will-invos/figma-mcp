import React from 'react';
import Spinner from './Spinner';
import Badge from './Badge';
import './IconButton.css';

interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'filled' | 'outline' | 'ghost';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  /** The icon element to render inside the button. */
  icon?: React.ReactNode;
  /** Overlay a small red notification dot on the button. */
  badge?: boolean;
  'aria-label': string;
}

/**
 * Determines the spinner color for a given variant/colorType combination.
 * Matches the button's content color: white → inverse, blue → primary, dark → neutral.
 */
function resolveSpinnerColor(
  variant: IconButtonProps['variant'],
  colorType: IconButtonProps['colorType']
): 'primary' | 'inverse' | 'neutral' | 'fixed-bold' {
  if (variant === 'filled') {
    switch (colorType) {
      case 'neutral': return 'neutral';
      case 'prize': return 'fixed-bold';
      default: return 'inverse';
    }
  }
  return 'primary';
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'filled',
      colorType = 'primary',
      size = 'medium',
      loading = false,
      disabled,
      icon,
      badge = false,
      className,
      ...rest
    },
    ref
  ) => {
    const variantColorClass =
      variant === 'outline'
        ? `ui-icon-button--${variant}`
        : `ui-icon-button--${variant} ui-icon-button--${variant}-${colorType}`;

    const classes = [
      'ui-icon-button',
      `ui-icon-button--${size}`,
      variantColorClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const spinnerSize =
      size === 'large' ? 'medium' : size === 'medium' ? 'small' : size === 'small' ? 'xsmall' : 'xxsmall';
    const spinnerColor = resolveSpinnerColor(variant, colorType);
    const badgeSize = size === 'large' ? 'large' : size === 'xsmall' ? 'small' : 'medium';

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...rest}
      >
        {loading ? <Spinner size={spinnerSize} color={spinnerColor} /> : icon}
        {badge && !loading && (
          <span className="ui-icon-button__badge" aria-hidden="true">
            <Badge variant="dot" size={badgeSize} />
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
export type { IconButtonProps };
