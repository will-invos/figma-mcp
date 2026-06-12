import React from 'react'
import './ListHeader.css'

interface ListHeaderProps {
  headline: string
  /**
   * Optional trailing slot. A string/number renders as the default styled text
   * (per Figma's fallback "Text"); any element (e.g. `<Button>`, `<Tag>`) is
   * rendered as-is in a layout-only slot, free of the header's text styling.
   */
  trailing?: React.ReactNode
  /** Visual size — maps to Figma Small / Medium / Large. */
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const HEADLINE_CLASS = {
  small:  'text-label-medium',
  medium: 'text-heading-small',
  large:  'text-display-small',
} as const

/** Typography for the default text fallback only — not applied to swapped-in elements. */
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
