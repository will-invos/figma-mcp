import React from 'react';
import './Badge.css';

interface BadgeProps {
  variant?: 'dot' | 'number';
  /** For 'number' variant only 'medium' and 'large' are used; 'small' falls back to 'medium'. */
  size?: 'small' | 'medium' | 'large';
  /** Shown when variant='number'. Values >99 render as '99+'. */
  count?: number;
  /** Outer white ring used for overlaying on icons. Defaults to true. */
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
