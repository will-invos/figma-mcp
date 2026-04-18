import React from 'react'
import './CardItem.css'

interface CardItemDescRow {
  icon?: React.ReactNode
  text: string
}

interface CardItemProps {
  title?: string
  /** Description rows with optional leading icon. */
  descriptions?: CardItemDescRow[]
  /** Thumbnail image URL (120×80, shown on the left). */
  thumbnailUrl?: string
  /** Action element (e.g. Button) shown at the right. */
  action?: React.ReactNode
  /** Generic trailing element (e.g. chevron). */
  trailing?: React.ReactNode
  /** Show bottom divider. Default: false. */
  divider?: boolean
  onClick?: () => void
  className?: string
}

const CardItem = React.forwardRef<HTMLDivElement, CardItemProps>(
  ({ title, descriptions, thumbnailUrl, action, trailing, divider = false, onClick, className }, ref) => {
    const isInteractive = Boolean(onClick)
    const classes = [
      'ui-card-item',
      isInteractive && 'ui-card-item--interactive',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } } : undefined}
      >
        <div className="ui-card-item__container">
          {thumbnailUrl && (
            <div className="ui-card-item__thumbnail">
              <img src={thumbnailUrl} alt="" />
            </div>
          )}
          <div className="ui-card-item__content">
            {title && <p className="ui-card-item__title">{title}</p>}
            {descriptions?.map((row, i) => (
              <div key={i} className="ui-card-item__desc-row">
                {row.icon && <span className="ui-card-item__desc-icon">{row.icon}</span>}
                <p className="ui-card-item__desc-text">{row.text}</p>
              </div>
            ))}
          </div>
          {action && <div className="ui-card-item__action">{action}</div>}
          {trailing && <div className="ui-card-item__trailing">{trailing}</div>}
        </div>
        {divider && <div className="ui-card-item__divider" />}
      </div>
    )
  }
)
CardItem.displayName = 'CardItem'
export default CardItem
export type { CardItemProps, CardItemDescRow }
