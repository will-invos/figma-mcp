import React from 'react';
import Switch from './Switch';
import Checkbox from './Checkbox';
import Spinner from './Spinner';
import './ListItem.css';

interface ListItemProps {
  headline: string;
  description?: string;
  /** 'default' = 56px, 'has-description' = 80px, 'compact' = 48px */
  type?: 'default' | 'has-description' | 'compact';
  trailing?: 'none' | 'drill-in' | 'text' | 'text-button' | 'cta' | 'switch' | 'checkbox' | 'icon' | 'spinner';
  trailingText?: string;
  trailingChecked?: boolean;
  onTrailingChange?: (value: boolean) => void;
  trailingIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  leadingExtra?: React.ReactNode;
  showDivider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ChevronRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7.5 5L12.5 10L7.5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      headline,
      description,
      type = 'default',
      trailing = 'none',
      trailingText,
      trailingChecked,
      onTrailingChange,
      trailingIcon,
      leadingIcon,
      leadingExtra,
      showDivider = true,
      disabled = false,
      onClick,
    },
    ref
  ) => {
    const isClickable = !!onClick;

    const classes = [
      'ui-list-item',
      `ui-list-item--${type}`,
      isClickable && 'ui-list-item--clickable',
      disabled && 'ui-list-item--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const renderTrailing = () => {
      switch (trailing) {
        case 'drill-in':
          return (
            <span className="ui-list-item__trailing ui-list-item__chevron">
              <ChevronRightIcon />
            </span>
          );
        case 'text':
          return (
            <span className="ui-list-item__trailing">
              <span className="ui-list-item__trailing-text">{trailingText}</span>
            </span>
          );
        case 'text-button':
          return (
            <span className="ui-list-item__trailing">
              <span className="ui-list-item__trailing-text" style={{ color: 'var(--color-content-brand-default)' }}>{trailingText}</span>
            </span>
          );
        case 'switch':
          return (
            <span className="ui-list-item__trailing">
              <Switch
                checked={trailingChecked}
                onChange={onTrailingChange}
                disabled={disabled}
              />
            </span>
          );
        case 'checkbox':
          return (
            <span className="ui-list-item__trailing">
              <Checkbox
                checked={trailingChecked}
                onChange={onTrailingChange}
                disabled={disabled}
              />
            </span>
          );
        case 'icon':
          return (
            <span className="ui-list-item__trailing">{trailingIcon}</span>
          );
        case 'spinner':
          return (
            <span className="ui-list-item__trailing">
              <Spinner size="small" color="neutral" />
            </span>
          );
        case 'cta':
          return (
            <span className="ui-list-item__trailing">{trailingIcon}</span>
          );
        case 'none':
        default:
          return null;
      }
    };

    const interactiveProps = isClickable
      ? { role: 'button' as const, tabIndex: 0, onClick }
      : {};

    return (
      <div ref={ref} className={classes} {...interactiveProps}>
        <div className="ui-list-item__container">
          {leadingExtra && (
            <span className="ui-list-item__leading-extra">{leadingExtra}</span>
          )}
          {leadingIcon && (
            <span className="ui-list-item__leading-icon">{leadingIcon}</span>
          )}
          <div className="ui-list-item__content">
            <span className="ui-list-item__headline">{headline}</span>
            {description && type === 'has-description' && (
              <span className="ui-list-item__description">{description}</span>
            )}
          </div>
          {renderTrailing()}
        </div>
        {showDivider && <div className="ui-list-item__divider" />}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
export type { ListItemProps };
