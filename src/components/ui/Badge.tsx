import React from 'react';
import './Badge.css';

interface BadgeProps {
  variant?: 'dot' | 'number';
  count?: number;
  size?: 'small' | 'medium' | 'large';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'dot',
      count,
      size = 'medium',
    },
    ref
  ) => {
    const classes = [
      'ui-badge',
      `ui-badge--${variant}`,
      `ui-badge--${size}`,
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
