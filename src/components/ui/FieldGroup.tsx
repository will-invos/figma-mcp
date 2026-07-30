import React, { useId, useMemo } from 'react'
import FieldGroupHelpText from './FieldGroupHelpText'
import FieldGroupContext from './FieldGroupContext'
import './FieldGroup.css'

interface FieldGroupProps {
  /** 欄位標題，顯示在輸入元件上方 */
  label?: string
  /** 顯示在輸入元件下方的說明文字 */
  helpText?: string
  helpTextAlign?: 'left' | 'right'
  /**
   * helpText 前置的 info / error icon。純說明性的註腳傳 false，
   * 文字左緣就會與輸入框左緣對齊；不影響 status="error" 的錯誤色。
   */
  helpTextIcon?: boolean
  /** error 會讓 helpText 轉為錯誤色 */
  status?: 'default' | 'error'
  /** 輸入元件本體（TextField / Select / Radio 群組…） */
  children: React.ReactNode
  className?: string
}

/** 表單欄位容器：label + 內容 + FieldGroupHelpText，三者間距固定 --space-200 */
const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ label, helpText, helpTextAlign = 'left', helpTextIcon = true, status = 'default', children, className }, ref) => {
    const classes = [
      'ui-field-group',
      status === 'error' && 'ui-field-group--error',
      className,
    ].filter(Boolean).join(' ')

    const generatedId = useId()
    const helpId = helpText ? `${generatedId}-help` : undefined
    const context = useMemo(() => ({ helpId }), [helpId])

    return (
      <FieldGroupContext.Provider value={context}>
        <div ref={ref} className={classes}>
          {label && <p className="text-label-large ui-field-group__label">{label}</p>}
          <div className="ui-field-group__content">{children}</div>
          {helpText && (
            <FieldGroupHelpText
              id={helpId}
              text={helpText}
              status={status}
              align={helpTextAlign}
              icon={helpTextIcon}
            />
          )}
        </div>
      </FieldGroupContext.Provider>
    )
  }
)
FieldGroup.displayName = 'FieldGroup'
export default FieldGroup
export type { FieldGroupProps }
