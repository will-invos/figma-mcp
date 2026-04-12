import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'brand' | 'white' | 'neutral';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'medium', color = 'brand' }, ref) => {
    const classes = [
      'ui-spinner',
      `ui-spinner--${size}`,
      `ui-spinner--${color}`,
    ].join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="status"
        aria-label="Loading"
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
export type { SpinnerProps };
