import React from 'react'
import Button from './Button'
import './CardItem.css'

interface CardItemDescRow {
  icon?: React.ReactNode
  text: string
}

interface CardItemProps {
  headline?: string
  /** Card layout size. Large = vertical hero, Medium = horizontal thumbnail. */
  size?: 'large' | 'medium'
  /** Content type below headline. */
  content?: 'list-item' | 'text'
  /** Image URL — hero image (large) or thumbnail (medium). */
  imageUrl?: string
  /** Show thumbnail on the left (medium only). Default true. */
  showThumbnail?: boolean
  /** Description rows with optional leading icon (content='list-item'). */
  descriptions?: CardItemDescRow[]
  /** Plain description text (content='text'). */
  description?: string
  /** Show action button. Default true. */
  showButton?: boolean
  /** Button label text. */
  buttonText?: string
  /** Show bottom divider (medium only). Default true. */
  divider?: boolean
  onClick?: () => void
  className?: string
}

const CardItem = React.forwardRef<HTMLDivElement, CardItemProps>(
  (
    {
      headline,
      size = 'medium',
      content = 'list-item',
      imageUrl,
      showThumbnail = true,
      descriptions,
      description,
      showButton = true,
      buttonText = 'Button',
      divider = true,
      onClick,
      className,
    },
    ref
  ) => {
    const isLarge = size === 'large'
    const isListItem = content === 'list-item'
    const isInteractive = Boolean(onClick)

    const classes = [
      'ui-card-item',
      `ui-card-item--${size}`,
      isInteractive && 'ui-card-item--interactive',
      className,
    ].filter(Boolean).join(' ')

    const descContent = isListItem ? (
      descriptions?.map((row, i) => (
        <div key={i} className="ui-card-item__desc-row">
          {row.icon && <span className="ui-card-item__desc-icon">{row.icon}</span>}
          <p className="ui-card-item__desc-text">{row.text}</p>
        </div>
      ))
    ) : (
      description && <p className="ui-card-item__desc-text">{description}</p>
    )

    const actionButton = showButton && (
      <Button
        variant="filled"
        colorType="primary"
        size={isLarge ? 'medium' : 'small'}
        text={buttonText}
      />
    )

    /* ── Large: vertical layout ── */
    if (isLarge) {
      return (
        <div ref={ref} className={classes} onClick={onClick}>
          {imageUrl && (
            <div className="ui-card-item__hero">
              <img src={imageUrl} alt="" />
            </div>
          )}
          <div className="ui-card-item__body">
            {headline && <p className="ui-card-item__title">{headline}</p>}
            <div className="ui-card-item__bottom">
              {isListItem ? (
                <div className="ui-card-item__desc-list">{descContent}</div>
              ) : (
                <div className="ui-card-item__desc-plain">{descContent}</div>
              )}
              {actionButton && <div className="ui-card-item__action">{actionButton}</div>}
            </div>
          </div>
        </div>
      )
    }

    /* ── Medium: horizontal layout ── */
    return (
      <div ref={ref} className={classes} onClick={onClick}>
        <div className="ui-card-item__container">
          {showThumbnail && imageUrl && (
            <div className="ui-card-item__thumbnail">
              <img src={imageUrl} alt="" />
            </div>
          )}
          <div className="ui-card-item__content">
            {headline && <p className="ui-card-item__title">{headline}</p>}
            {isListItem ? (
              <div className="ui-card-item__desc-list">{descContent}</div>
            ) : (
              descContent
            )}
          </div>
          {actionButton && <div className="ui-card-item__action">{actionButton}</div>}
        </div>
        {divider && <div className="ui-card-item__divider" />}
      </div>
    )
  }
)
CardItem.displayName = 'CardItem'
export default CardItem
export type { CardItemProps, CardItemDescRow }
