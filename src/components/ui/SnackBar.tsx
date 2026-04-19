import React from 'react'
import Spinner from './Spinner'
import './SnackBar.css'

interface SnackBarProps {
  text: string
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Trailing type: 'none' (text only), 'button' (action text), 'spinner' (loading). */
  trailing?: 'none' | 'button' | 'spinner'
  /** Button label when trailing is 'button'. */
  buttonText?: string
  /** Callback when trailing button is clicked. */
  onButtonClick?: () => void
  className?: string
}

const SnackBar = React.forwardRef<HTMLDivElement, SnackBarProps>(
  ({ text, icon, trailing = 'none', buttonText = 'Button', onButtonClick, className }, ref) => {
    const classes = ['ui-snackbar', className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes} role="status">
        {icon && <span className="ui-snackbar__icon">{icon}</span>}
        <span className="ui-snackbar__text">{text}</span>
        {trailing === 'button' && (
          <button className="ui-snackbar__action" onClick={onButtonClick}>{buttonText}</button>
        )}
        {trailing === 'spinner' && (
          <Spinner size="small" color="inverse" />
        )}
      </div>
    )
  }
)
SnackBar.displayName = 'SnackBar'
export default SnackBar
export type { SnackBarProps }
