import React from 'react'
import './ListFooter.css'

interface ListFooterProps {
  /** Caption text shown below the list. */
  footer: string
  /** Visual state — danger turns text and icon red. */
  state?: 'default' | 'danger'
  /** Show a leading info icon (16×16). */
  icon?: boolean
  /** Text alignment — 'end' right-aligns the caption (e.g. a version number). */
  align?: 'start' | 'end'
  className?: string
}


const ListFooter = React.forwardRef<HTMLDivElement, ListFooterProps>(
  ({ footer, state = 'default', icon = true, align = 'start', className }, ref) => {
    const classes = [
      'ui-list-footer',
      state === 'danger' && 'ui-list-footer--danger',
      align === 'end' && 'ui-list-footer--end',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes}>
        {icon && (
          <span className="ui-list-footer__icon"><i className="icon-info" aria-hidden="true" /></span>
        )}
        <span className="text-body-medium ui-list-footer__text">{footer}</span>
      </div>
    )
  }
)
ListFooter.displayName = 'ListFooter'
export default ListFooter
export type { ListFooterProps }
