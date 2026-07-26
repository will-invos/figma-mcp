import React from 'react'
import './SheetHeader.css'

type SheetHeaderType = 'grabber' | 'default'
type SheetHeadlineSize = 'none' | 'regular' | 'large'

interface SheetHeaderProps {
  /** grabber 上方有可拖曳的手把；default 只有一列 nav bar */
  type?: SheetHeaderType
  /** none 不顯示標題；regular 為 16px 置中；large 為 24px 靠左 */
  headlineSize?: SheetHeadlineSize
  headline?: string
  /** 掛在標題上的 id，供外層 aria-labelledby 指向 */
  titleId?: string
  /** 只有 Figma 允許的組合會渲染，見下方 navShowsLeading */
  leading?: React.ReactNode
  /** 只有 Figma 允許的組合會渲染，見下方 navShowsTrailing / contentShowsTrailing */
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

    // 只在 default（兩種 size）與 grabber+regular 給 leading，grabber+large 沒有
    const navShowsLeading = isDefaultRegular || isDefaultLarge || isGrabberRegular
    // nav bar 裡的 trailing：default（兩種 size）與 grabber+regular
    const navShowsTrailing = isDefaultRegular || isDefaultLarge || isGrabberRegular
    // large 內容區塊裡的 trailing：只有 grabber+large
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
