import React from 'react';
import Spinner from './Spinner';
import './Button.css';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'filled' | 'outline' | 'ghost' | 'text';
  colorType?: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation' | 'white' | 'inverse' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  text?: React.ReactNode;
}

/** loading 時 spinner 要跟文字同色，才不會在深色底上消失 */
function resolveSpinnerColor(
  variant: ButtonProps['variant'],
  colorType: ButtonProps['colorType']
): 'primary' | 'inverse' | 'neutral' | 'fixed-bold' | 'fixed-white' {
  if (variant === 'filled') {
    switch (colorType) {
      case 'white': return 'primary';
      case 'neutral': return 'neutral';
      case 'prize': return 'fixed-bold';
      default: return 'fixed-white';
    }
  }
  switch (colorType) {
    case 'inverse': return 'inverse';
    case 'secondary': return 'neutral';
    default: return 'primary';
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      colorType = 'primary',
      size = 'medium',
      loading = false,
      disabled,
      text,
      className,
      leadingIcon,
      trailingIcon,
      ...rest
    },
    ref
  ) => {
    // outline 只有一套配色，不吃 colorType
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

    const spinnerSize = size === 'large' ? 'small' : size === 'medium' ? 'xsmall' : 'xxsmall';
    const spinnerColor = resolveSpinnerColor(variant, colorType);

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...rest}
      >
        {/* 內容一律渲染，loading 時由 CSS 用 visibility 藏起來，寬度才不會跳動 */}
        {leadingIcon && (
          <span className="ui-button__leading">{leadingIcon}</span>
        )}
        <span className="ui-button__content">{text}</span>
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
