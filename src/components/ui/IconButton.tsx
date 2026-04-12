import React from 'react';
import Spinner from './Spinner';
import './IconButton.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  'aria-label': string;
}

/**
 * Determines the spinner color for a given variant/colorType combination.
 * Filled non-neutral buttons use white; everything else uses brand.
 */
function resolveSpinnerColor(
  variant: IconButtonProps['variant'],
  colorType: IconButtonProps['colorType']
): 'white' | 'brand' {
  if (variant === 'filled' && colorType !== 'neutral') {
    return 'white';
  }
  return 'brand';
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'filled',
      colorType = 'primary',
      size = 'medium',
      loading = false,
      disabled,
      children,
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
      size === 'large' ? 'medium' : size === 'xsmall' ? 'small' : 'small';
    const spinnerColor = resolveSpinnerColor(variant, colorType);

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...rest}
      >
        {loading ? <Spinner size={spinnerSize} color={spinnerColor} /> : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
export type { IconButtonProps };
