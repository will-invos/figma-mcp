import React from 'react';
import Switch from './Switch';
import Checkbox from './Checkbox';
import Spinner from './Spinner';
import './ListItem.css';

interface ListItemProps {
  headline: string;
  description?: string;
  contentSize?: '1-line' | '2-lines' | 'compact';
  trailing?: 'none' | 'drill-in' | 'text' | 'switch' | 'checkbox' | 'icon' | 'spinner';
  trailingText?: string;
  trailingChecked?: boolean;
  onTrailingChange?: (value: boolean) => void;
  trailingIcon?: React.ReactNode;
  leading?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const ChevronRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
      contentSize = '1-line',
      trailing = 'none',
      trailingText,
      trailingChecked,
      onTrailingChange,
      trailingIcon,
      leading,
      disabled = false,
      onClick,
    },
    ref
  ) => {
    const isClickable = !!onClick;

    const classes = [
      'ui-list-item',
      `ui-list-item--${contentSize}`,
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
        {leading && <span className="ui-list-item__leading">{leading}</span>}
        <div className="ui-list-item__content">
          <span className="ui-list-item__headline">{headline}</span>
          {description && (
            <span className="ui-list-item__description">{description}</span>
          )}
        </div>
        {renderTrailing()}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
export type { ListItemProps };
