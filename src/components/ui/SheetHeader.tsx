import React from 'react'
import './SheetHeader.css'

interface SheetHeaderProps {
  title?: string
  /** Optional element on the trailing side (e.g., close button). */
  trailing?: React.ReactNode
  /** Optional element on the leading side. */
  leading?: React.ReactNode
  /** Show drag handle (small bar at top). */
  showHandle?: boolean
  /** Show bottom divider. */
  divider?: boolean
}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ title, trailing, leading, showHandle = true, divider = true }, ref) => {
    return (
      <div ref={ref} className={['ui-sheet-header', divider && 'ui-sheet-header--divider'].filter(Boolean).join(' ')}>
        {showHandle && <div className="ui-sheet-header__handle" />}
        <div className="ui-sheet-header__row">
          <div className="ui-sheet-header__leading">{leading}</div>
          {title && <h2 className="ui-sheet-header__title">{title}</h2>}
          <div className="ui-sheet-header__trailing">{trailing}</div>
        </div>
      </div>
    )
  }
)
SheetHeader.displayName = 'SheetHeader'
export default SheetHeader
export type { SheetHeaderProps }
