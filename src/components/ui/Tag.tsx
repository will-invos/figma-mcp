import React from 'react';
import './Tag.css';

interface TagProps {
  variant?: 'light' | 'bold';
  colorType?: 'neutral' | 'primary' | 'success' | 'danger' | 'warning' | 'prize';
  size?: 'medium' | 'small';
  children: React.ReactNode;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'light',
      colorType = 'neutral',
      size = 'medium',
      children,
    },
    ref
  ) => {
    const classes = [
      'ui-tag',
      `ui-tag--${size}`,
      `ui-tag--${variant}`,
      `ui-tag--${variant}-${colorType}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes}>
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
export type { TagProps };
