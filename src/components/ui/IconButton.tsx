import React from 'react';
import Spinner from './Spinner';
import Badge from './Badge';
import './IconButton.css';

interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'filled' | 'outline' | 'ghost';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation' | 'fixed-white';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  icon?: React.ReactNode;
  badge?: boolean;
  'aria-label': string;
}

/** loading 時 spinner 要跟 icon 同色，才不會在深色底上消失 */
function resolveSpinnerColor(
  variant: IconButtonProps['variant'],
  colorType: IconButtonProps['colorType']
): 'primary' | 'inverse' | 'neutral' | 'fixed-bold' | 'fixed-white' {
  if (colorType === 'fixed-white') return 'fixed-white';
  if (colorType === 'neutral') return 'neutral';
  if (variant === 'filled') {
    switch (colorType) {
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
