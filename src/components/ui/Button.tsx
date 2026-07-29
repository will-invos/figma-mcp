import React from 'react';
import Spinner from './Spinner';
import './Button.css';

type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'text';

/**
 * 每個 variant 只有這些 colorType 有對應樣式，對齊 Figma「Style × Type」共 12 組
 * （🧰 iOS - UI Kit 2025 · Button）。不在表內的組合沒有 CSS，會渲染成沒有配色的裸按鈕，
 * 所以用 union 在編譯期擋掉，而不是留給執行期靜默失敗。
 */
type ButtonColorByVariant = {
  filled: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation' | 'white';
  outline: 'primary';
  ghost: 'primary' | 'inverse';
  text: 'primary' | 'secondary' | 'inverse';
};

type ButtonColorType = ButtonColorByVariant[ButtonVariant];

interface ButtonBaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  text?: React.ReactNode;
}

/** filled 是預設值所以 variant 可省略；其餘三個必須明寫，才不會讓省略時落到別的配色集合。 */
type ButtonStyleProps =
  | { variant?: 'filled'; colorType?: ButtonColorByVariant['filled'] }
  | { variant: 'outline'; colorType?: ButtonColorByVariant['outline'] }
  | { variant: 'ghost'; colorType?: ButtonColorByVariant['ghost'] }
  | { variant: 'text'; colorType?: ButtonColorByVariant['text'] };

type ButtonProps = ButtonBaseProps & ButtonStyleProps;

/** loading 時 spinner 要跟文字同色，才不會在深色底上消失 */
function resolveSpinnerColor(
  variant: ButtonVariant | undefined,
  colorType: ButtonColorType | undefined
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
    // outline 在 Figma 只有 Primary 一種，CSS 也只有 .ui-button--outline，不帶 colorType 後綴
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
export type { ButtonProps, ButtonStyleProps };
