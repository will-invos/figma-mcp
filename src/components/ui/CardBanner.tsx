import React from 'react'
import './CardBanner.css'

interface CardBannerDescRow {
  icon?: React.ReactNode
  text: string
}

interface CardBannerProps {
  /** Image URL for the banner. */
  imageUrl?: string
  /** Aspect ratio of the image area (CSS aspect-ratio value). Default: '16 / 9'. */
  aspectRatio?: string
  /** Optional badge / tag overlaid on the image. */
  badge?: React.ReactNode
  title?: string
  /** Description rows with optional leading icon. */
  descriptions?: CardBannerDescRow[]
  /** Action element (e.g. Button) shown at bottom-right. */
  action?: React.ReactNode
  onClick?: () => void
  className?: string
}

const CardBanner = React.forwardRef<HTMLDivElement, CardBannerProps>(
  ({ imageUrl, aspectRatio = '16 / 9', badge, title, descriptions, action, onClick, className }, ref) => {
    const isInteractive = Boolean(onClick)
    const classes = [
      'ui-card-banner',
      isInteractive && 'ui-card-banner--interactive',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        <div className="ui-card-banner__image" style={{ aspectRatio }}>
          {imageUrl && <img src={imageUrl} alt="" />}
          {badge && <div className="ui-card-banner__badge">{badge}</div>}
        </div>
        {(title || descriptions?.length || action) && (
          <div className="ui-card-banner__body">
            {title && <h3 className="ui-card-banner__title">{title}</h3>}
            {(descriptions?.length || action) && (
              <div className="ui-card-banner__bottom">
                {descriptions?.length ? (
                  <div className="ui-card-banner__descriptions">
                    {descriptions.map((row, i) => (
                      <div key={i} className="ui-card-banner__desc-row">
                        {row.icon && <span className="ui-card-banner__desc-icon">{row.icon}</span>}
                        <p className="ui-card-banner__desc-text">{row.text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {action && <div className="ui-card-banner__action">{action}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
CardBanner.displayName = 'CardBanner'
export default CardBanner
export type { CardBannerProps, CardBannerDescRow }
