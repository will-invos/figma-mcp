import React from 'react'
import './ListHeader.css'

interface ListHeaderProps {
  title: string
  /** Optional trailing element (e.g., action link, text). */
  trailing?: React.ReactNode
  /** Visual size — maps to Figma Small / Medium / Large. */
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ title, trailing, size = 'small', className }, ref) => {
    const classes = ['ui-list-header', `ui-list-header--${size}`, className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        <span className="ui-list-header__title">{title}</span>
        {trailing && <span className="ui-list-header__trailing">{trailing}</span>}
      </div>
    )
  }
)
ListHeader.displayName = 'ListHeader'
export default ListHeader
export type { ListHeaderProps }
