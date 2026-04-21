import React from 'react';
import './Tag.css';

interface TagProps {
  variant?: 'light' | 'bold';
  colorType?: 'neutral' | 'primary' | 'success' | 'danger' | 'warning' | 'prize';
  size?: 'medium' | 'small';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  message: React.ReactNode;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'light',
      colorType = 'neutral',
      size = 'medium',
      leadingIcon,
      trailingIcon,
      message,
    },
    ref
  ) => {
    const classes = [
      'ui-tag',
      `ui-tag--${size}`,
      `ui-tag--${variant}-${colorType}`,
    ].join(' ');

    return (
      <span ref={ref} className={classes}>
        {leadingIcon && <span className="ui-tag__icon">{leadingIcon}</span>}
        {message}
        {trailingIcon && <span className="ui-tag__icon">{trailingIcon}</span>}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
export type { TagProps };
