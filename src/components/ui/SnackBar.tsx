import React from 'react'
import Button from './Button'
import Spinner from './Spinner'
import './SnackBar.css'

/**
 * success / error 只以 leading icon 區分 —— 底色與文字色兩者相同（設計定案）。
 * 想換掉這裡帶入的 icon 就直接傳 icon prop。
 */
const STATUS_ICONS = {
  success: 'icon-check-circle-filled',
  error: 'icon-alert-circle-filled',
} as const

interface SnackBarProps {
  text: string
  /** 帶入對應的 leading icon；不傳就沒有 icon */
  status?: 'success' | 'error'
  /** 覆寫 status 帶入的 leading icon */
  icon?: React.ReactNode
  /** none 只有文字；button 顯示動作文字；spinner 顯示載入中 */
  trailing?: 'none' | 'button' | 'spinner'
  /** trailing='button' 時的按鈕文字 */
  buttonText?: string
  onButtonClick?: () => void
  /**
   * 預設 'status'，自己就是 live region。
   * 放進本身已經是 live region 的容器時傳 'none'（如 SnackBarProvider 的 viewport）——
   * 巢狀 live region 會讓螢幕閱讀器唸兩次。
   */
  role?: 'status' | 'none'
  className?: string
}

const SnackBar = React.forwardRef<HTMLDivElement, SnackBarProps>(
  (
    {
      text,
      status,
      icon,
      trailing = 'none',
      buttonText = 'Button',
      onButtonClick,
      role = 'status',
      className,
    },
    ref
  ) => {
    const classes = ['ui-snackbar', className].filter(Boolean).join(' ')
    const resolvedIcon =
      icon ?? (status ? <i className={STATUS_ICONS[status]} aria-hidden="true" /> : null)
    return (
      <div ref={ref} className={classes} role={role}>
        {resolvedIcon && <span className="ui-snackbar__icon">{resolvedIcon}</span>}
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
