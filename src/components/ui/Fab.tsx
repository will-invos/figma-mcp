import React from 'react';
import Spinner from './Spinner';
import './Fab.css';

interface FabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon?: React.ReactNode;
  text?: string;
  loading?: boolean;
  'aria-label': string;
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ icon, text, loading = false, disabled, className, ...rest }, ref) => {
    const classes = [
      'ui-fab',
      text ? 'ui-fab--has-text' : null,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...rest}
      >
        {loading ? (
          <Spinner size="medium" color="fixed-white" />
        ) : (
          <>
            {icon ?? <i className="icon-plus" aria-hidden="true" />}
            {text && <span className="ui-fab__text">{text}</span>}
          </>
        )}
      </button>
    );
  }
);

Fab.displayName = 'Fab';

export default Fab;
export type { FabProps };
