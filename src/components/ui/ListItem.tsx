import React from 'react';
import Button from './Button';
import Switch from './Switch';
import Checkbox from './Checkbox';
import Spinner from './Spinner';
import Divider from './Divider';
import './ListItem.css';

interface ListItemProps {
  headline: string;
  /** 第二行（type='rich' 才顯示）。收 node 是為了塞得下 <Tag> + 時間這種組合，不只純文字 */
  description?: React.ReactNode;
  /** 列高：default 56px、rich 80px、compact 48px */
  type?: 'default' | 'rich' | 'compact';
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
              <i className="icon-chevron-right" aria-hidden="true" />
            </span>
          );
        case 'text':
          return (
            <span className="ui-list-item__trailing">
              <span className="text-body-large">{trailingText}</span>
            </span>
          );
        case 'text-button':
          return (
            <span className="ui-list-item__trailing">
              <Button variant="text" colorType="primary" size="large" text={trailingText} />
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
              <Spinner size="medium" color="neutral" />
            </span>
          );
        case 'cta':
          return (
            <span className="ui-list-item__trailing ui-list-item__trailing--cta">
              <Button variant="outline" colorType="primary" size="small" text={trailingText} />
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
        <div className="ui-list-item__container">
          {leadingExtra && (
            <span className="ui-list-item__leading-extra">{leadingExtra}</span>
          )}
          {leadingIcon && (
            <span className="ui-list-item__leading-icon">{leadingIcon}</span>
          )}
          <div className="ui-list-item__content">
            <span className="text-body-large ui-list-item__headline">{headline}</span>
            {description && type === 'rich' && (
              <span className="text-body-medium ui-list-item__description">{description}</span>
            )}
          </div>
          {renderTrailing()}
        </div>
        {showDivider && <Divider className="ui-list-item__divider" />}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
export type { ListItemProps };
