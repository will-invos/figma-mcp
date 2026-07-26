import React from 'react'
import './ListHeader.css'

interface ListHeaderProps {
  headline: string
  /** 傳字串 / 數字會套用預設文字樣式；傳元素（<Button>、<Tag>…）則原樣輸出，
   *  不會被 header 的字級與顏色影響 */
  trailing?: React.ReactNode
  /** small＝區塊小標、medium＝區塊標題、large＝頁面標題 */
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const HEADLINE_CLASS = {
  small:  'text-label-medium',
  medium: 'text-heading-small',
  large:  'text-display-small',
} as const

/** 只用在預設文字上；換成元素的 trailing 不會套 */
const TRAILING_TEXT_CLASS = {
  small:  'text-body-medium',
  medium: 'text-body-large',
  large:  'text-body-large',
} as const

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ headline, trailing, size = 'small', className }, ref) => {
    const classes = ['ui-list-header', `ui-list-header--${size}`, className].filter(Boolean).join(' ')
    const isTextTrailing = typeof trailing === 'string' || typeof trailing === 'number'
    return (
      <div ref={ref} className={classes}>
        <span className={`${HEADLINE_CLASS[size]} ui-list-header__headline`}>{headline}</span>
        {trailing != null && trailing !== false && (
          <div className="ui-list-header__trailing">
            {isTextTrailing
              ? <span className={`${TRAILING_TEXT_CLASS[size]} ui-list-header__trailing-text`}>{trailing}</span>
              : trailing}
          </div>
        )}
      </div>
    )
  }
)
ListHeader.displayName = 'ListHeader'
export default ListHeader
export type { ListHeaderProps }
