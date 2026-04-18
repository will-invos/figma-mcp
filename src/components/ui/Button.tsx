import React from 'react';
import Spinner from './Spinner';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost' | 'text';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation' | 'white' | 'inverse' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

/**
 * Determines the spinner color for a given variant/colorType combination.
 * Filled non-neutral buttons use white; everything else uses brand.
 */
function resolveSpinnerColor(
  variant: ButtonProps['variant'],
  colorType: ButtonProps['colorType']
): 'primary' | 'inverse' {
  if (variant === 'filled' && colorType !== 'neutral') {
    return 'inverse';
  }
  return 'primary';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      colorType = 'primary',
      size = 'medium',
      loading = false,
      disabled,
      children,
      className,
      leadingIcon,
      trailingIcon,
      ...rest
    },
    ref
  ) => {
    // Outline has a single color scheme; filled/ghost/text use colorType sub-class
    const variantColorClass =
      variant === 'outline'
        ? 'ui-button--outline'
        : `ui-button--${variant} ui-button--${variant}-${colorType}`;

    const classes = [
      'ui-button',
      `ui-button--${size}`,
      variantColorClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const spinnerSize = size === 'large' ? 'medium' : 'small';
    const spinnerColor = resolveSpinnerColor(variant, colorType);

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...rest}
      >
        {/* Always render content; loading hides it via visibility to preserve width */}
        {leadingIcon && (
          <span className="ui-button__leading">{leadingIcon}</span>
        )}
        <span className="ui-button__content">{children}</span>
        {trailingIcon && (
          <span className="ui-button__trailing">{trailingIcon}</span>
        )}
        {loading && (
          <span className="ui-button__spinner" aria-hidden="true">
            <Spinner size={spinnerSize} color={spinnerColor} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps };
