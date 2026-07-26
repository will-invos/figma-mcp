import React from 'react'
import Button from './Button'
import Divider from './Divider'
import './CardItem.css'

interface CardItemDescRow {
  icon?: React.ReactNode
  text: string
}

interface CardItemProps {
  headline?: string
  /** large 是直式主視覺，medium 是橫式縮圖 */
  size?: 'large' | 'medium'
  content?: 'list-item' | 'text'
  /** large 當主視覺、medium 當縮圖 */
  imageUrl?: string
  /** 只有 medium 有效；large 一律顯示主視覺 */
  showThumbnail?: boolean
  /** content='list-item' 時使用 */
  descriptions?: CardItemDescRow[]
  /** content='text' 時使用 */
  description?: string
  showButton?: boolean
  buttonText?: string
  /** 只有 medium 有效 */
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
          <p className="text-body-medium ui-card-item__desc-text">{row.text}</p>
        </div>
      ))
    ) : (
      description && <p className="text-body-medium ui-card-item__desc-text">{description}</p>
    )

    const actionButton = showButton && (
      <Button
        variant="filled"
        colorType="primary"
        size={isLarge ? 'medium' : 'small'}
        text={buttonText}
      />
    )

    if (isLarge) {
      return (
        <div ref={ref} className={classes} onClick={onClick}>
          {imageUrl && (
            <div className="ui-card-item__hero">
              <img src={imageUrl} alt="" />
            </div>
          )}
          <div className="ui-card-item__body">
            {headline && <p className="text-heading-small ui-card-item__title">{headline}</p>}
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

    return (
      <div ref={ref} className={classes} onClick={onClick}>
        <div className="ui-card-item__container">
          {showThumbnail && imageUrl && (
            <div className="ui-card-item__thumbnail">
              <img src={imageUrl} alt="" />
            </div>
          )}
          <div className="ui-card-item__content">
            {headline && <p className="text-label-large ui-card-item__title">{headline}</p>}
            {isListItem ? (
              <div className="ui-card-item__desc-list">{descContent}</div>
            ) : (
              descContent
            )}
          </div>
          {actionButton && <div className="ui-card-item__action">{actionButton}</div>}
        </div>
        {divider && <Divider className="ui-card-item__divider" />}
      </div>
    )
  }
)
CardItem.displayName = 'CardItem'
export default CardItem
export type { CardItemProps, CardItemDescRow }
