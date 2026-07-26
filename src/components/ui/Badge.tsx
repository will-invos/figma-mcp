import React from 'react';
import './Badge.css';

interface BadgeProps {
  variant?: 'dot' | 'number';
  /** number 版只吃 medium / large，傳 small 會退回 medium */
  size?: 'small' | 'medium' | 'large';
  /** variant='number' 時顯示；超過 99 印成 '99+' */
  count?: number;
  /** 用底色畫一圈外環，疊在 icon 上時才分得出來 */
  border?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'dot',
      size = 'medium',
      count,
      border = true,
    },
    ref
  ) => {
    const effectiveSize = variant === 'number' && size === 'small' ? 'medium' : size;

    const classes = [
      'ui-badge',
      `ui-badge--${variant}`,
      `ui-badge--${effectiveSize}`,
      border && 'ui-badge--bordered',
    ]
      .filter(Boolean)
      .join(' ');

    const displayCount = variant === 'number' && count !== undefined
      ? count > 99 ? '99+' : String(count)
      : null;

    return (
      <span ref={ref} className={classes}>
        {displayCount}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
export type { BadgeProps };
