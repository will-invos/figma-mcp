import React from 'react'
import './SheetHeader.css'

type SheetHeaderType = 'grabber' | 'default'
type SheetHeadlineSize = 'none' | 'regular' | 'large'

interface SheetHeaderProps {
  /** Visual type — `grabber` shows a drag handle at top; `default` shows a nav bar only. */
  type?: SheetHeaderType
  /** Headline size — `none` hides the title, `regular` is 16px centered, `large` is 24px. */
  headlineSize?: SheetHeadlineSize
  /** Headline text (shown when `headlineSize !== 'none'`). */
  headline?: string
  /** Id set on the rendered headline, so a parent can point `aria-labelledby` at it. */
  titleId?: string
  /** Left element (icon / text button). Rendered only in variants where Figma allows it. */
  leading?: React.ReactNode
  /** Right element (icon / text button). Rendered only in variants where Figma allows it. */
  trailing?: React.ReactNode
  className?: string
}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  (
    {
      type = 'grabber',
      headlineSize = 'none',
      headline = 'Headline',
      titleId,
      leading,
      trailing,
      className,
    },
    ref
  ) => {
    const isGrabberRegular = type === 'grabber' && headlineSize === 'regular'
    const isGrabberLarge = type === 'grabber' && headlineSize === 'large'
    const isDefaultRegular = type === 'default' && headlineSize === 'regular'
    const isDefaultLarge = type === 'default' && headlineSize === 'large'

    const showGrabber = type === 'grabber'
    const showNav = isGrabberRegular || isDefaultRegular || isDefaultLarge
    const showLargeBlock = headlineSize === 'large'

    // Leading is allowed in default (both sizes) and grabber+regular (not grabber+large).
    const navShowsLeading = isDefaultRegular || isDefaultLarge || isGrabberRegular
    // Trailing in nav bar: default (both sizes) and grabber+regular.
    const navShowsTrailing = isDefaultRegular || isDefaultLarge || isGrabberRegular
    // Trailing in large content block: only grabber+large.
    const contentShowsTrailing = isGrabberLarge

    const rootClass = [
      'ui-sheet-header',
      `ui-sheet-header--${type}`,
      `ui-sheet-header--headline-${headlineSize}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={rootClass}>
        {showGrabber && (
          <div className="ui-sheet-header__grabber" aria-hidden="true">
            <span className="ui-sheet-header__handle" />
          </div>
        )}

        {showNav && (
          <div className="ui-sheet-header__nav">
            {navShowsLeading && leading && (
              <div className="ui-sheet-header__leading">{leading}</div>
            )}
            {headlineSize === 'regular' && (
              <span
                id={titleId}
                className="ui-sheet-header__title ui-sheet-header__title--regular text-label-large"
              >
                {headline}
              </span>
            )}
            {navShowsTrailing && trailing && (
              <div className="ui-sheet-header__trailing">{trailing}</div>
            )}
          </div>
        )}

        {showLargeBlock && (
          <div className="ui-sheet-header__content">
            <h2
              id={titleId}
              className="ui-sheet-header__title ui-sheet-header__title--large text-heading-large"
            >
              {headline}
            </h2>
            {contentShowsTrailing && trailing && (
              <div className="ui-sheet-header__trailing ui-sheet-header__trailing--inline">
                {trailing}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
SheetHeader.displayName = 'SheetHeader'
export default SheetHeader
export type { SheetHeaderProps, SheetHeaderType, SheetHeadlineSize }
