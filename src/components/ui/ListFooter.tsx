import React from 'react'
import './ListFooter.css'

interface ListFooterProps {
  /** Caption text shown below the list. */
  text: string
  className?: string
}

const ListFooter = React.forwardRef<HTMLDivElement, ListFooterProps>(
  ({ text, className }, ref) => {
    const classes = ['ui-list-footer', className].filter(Boolean).join(' ')
    return <div ref={ref} className={classes}>{text}</div>
  }
)
ListFooter.displayName = 'ListFooter'
export default ListFooter
export type { ListFooterProps }
