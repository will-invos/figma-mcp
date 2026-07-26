import React from 'react'
import Button from './Button'
import Spinner from './Spinner'
import './SnackBar.css'

interface SnackBarProps {
  text: string
  icon?: React.ReactNode
  /** none 只有文字；button 顯示動作文字；spinner 顯示載入中 */
  trailing?: 'none' | 'button' | 'spinner'
  /** trailing='button' 時的按鈕文字 */
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

const SnackBar = React.forwardRef<HTMLDivElement, SnackBarProps>(
  ({ text, icon, trailing = 'none', buttonText = 'Button', onButtonClick, className }, ref) => {
    const classes = ['ui-snackbar', className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes} role="status">
        {icon && <span className="ui-snackbar__icon">{icon}</span>}
        <span className="text-body-large ui-snackbar__text">{text}</span>
        {trailing === 'button' && (
          <Button
            variant="text"
            colorType="primary"
            size="large"
            className="ui-snackbar__action"
            onClick={onButtonClick}
            text={buttonText}
          />
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
