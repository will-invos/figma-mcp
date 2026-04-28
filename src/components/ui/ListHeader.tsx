import React from 'react'
import './ListHeader.css'

interface ListHeaderProps {
  headline: string
  /** Optional trailing element (e.g., action link, text). */
  trailing?: React.ReactNode
  /** Visual size — maps to Figma Small / Medium / Large. */
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const HEADLINE_CLASS = {
  small:  'text-label-medium',
  medium: 'text-heading-small',
  large:  'text-display',
} as const

const TRAILING_CLASS = {
  small:  'text-body-medium',
  medium: 'text-body-medium',
  large:  'text-body-large',
} as const

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ headline, trailing, size = 'small', className }, ref) => {
    const classes = ['ui-list-header', `ui-list-header--${size}`, className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        <span className={`${HEADLINE_CLASS[size]} ui-list-header__headline`}>{headline}</span>
        {trailing && <span className={`${TRAILING_CLASS[size]} ui-list-header__trailing`}>{trailing}</span>}
      </div>
    )
  }
)
ListHeader.displayName = 'ListHeader'
export default ListHeader
export type { ListHeaderProps }
