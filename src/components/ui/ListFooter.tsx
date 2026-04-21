import React from 'react'
import './ListFooter.css'

interface ListFooterProps {
  /** Caption text shown below the list. */
  text: string
  /** Visual state — danger turns text and icon red. */
  state?: 'default' | 'danger'
  /** Show a leading info icon (16×16). */
  icon?: boolean
  className?: string
}


const ListFooter = React.forwardRef<HTMLDivElement, ListFooterProps>(
  ({ text, state = 'default', icon = true, className }, ref) => {
    const classes = [
      'ui-list-footer',
      state === 'danger' && 'ui-list-footer--danger',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes}>
        {icon && (
          <span className="ui-list-footer__icon"><i className="icon-info" aria-hidden="true" /></span>
        )}
        <span className="text-body-medium ui-list-footer__text">{text}</span>
      </div>
    )
  }
)
ListFooter.displayName = 'ListFooter'
export default ListFooter
export type { ListFooterProps }
