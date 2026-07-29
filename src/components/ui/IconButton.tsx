import React from 'react';
import Spinner from './Spinner';
import Badge from './Badge';
import './IconButton.css';

type IconButtonVariant = 'filled' | 'outline' | 'ghost';

/**
 * 每個 variant 只有這些 colorType 有對應樣式，對齊 Figma「Style × Type」共 10 組
 * （🧰 iOS - UI Kit 2025 · Icon button）。不在表內的組合沒有 CSS，會渲染成沒有配色的裸按鈕，
 * 所以用 union 在編譯期擋掉，而不是留給執行期靜默失敗。
 */
type IconButtonColorByVariant = {
  filled: 'primary' | 'neutral' | 'danger' | 'prize' | 'donation';
  outline: 'primary';
  ghost: 'primary' | 'neutral' | 'danger' | 'fixed-white';
};

type IconButtonColorType = IconButtonColorByVariant[IconButtonVariant];

interface IconButtonBaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  loading?: boolean;
  icon?: React.ReactNode;
  badge?: boolean;
  'aria-label': string;
}

/** filled 是預設值所以 variant 可省略；其餘兩個必須明寫，才不會讓省略時落到別的配色集合。 */
type IconButtonStyleProps =
  | { variant?: 'filled'; colorType?: IconButtonColorByVariant['filled'] }
  | { variant: 'outline'; colorType?: IconButtonColorByVariant['outline'] }
  | { variant: 'ghost'; colorType?: IconButtonColorByVariant['ghost'] };

type IconButtonProps = IconButtonBaseProps & IconButtonStyleProps;

/** loading 時 spinner 要跟 icon 同色，才不會在深色底上消失 */
function resolveSpinnerColor(
  variant: IconButtonVariant | undefined,
  colorType: IconButtonColorType | undefined
): 'primary' | 'inverse' | 'neutral' | 'danger' | 'fixed-bold' | 'fixed-white' {
  if (colorType === 'fixed-white') return 'fixed-white';
  if (colorType === 'neutral') return 'neutral';
  // ghost + danger 的 icon 是紅字，filled + danger 是紅底白字，兩者 spinner 色不同
  if (variant === 'ghost' && colorType === 'danger') return 'danger';
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
    // outline 在 Figma 只有 Primary 一種，CSS 也只有 .ui-icon-button--outline，不帶 colorType 後綴
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
export type { IconButtonProps, IconButtonStyleProps };
