import React, { useId, useMemo } from 'react'
import FieldGroupHeader from './FieldGroupHeader'
import FieldGroupHelpText from './FieldGroupHelpText'
import FieldGroupContext from './FieldGroupContext'
import './FieldGroup.css'

interface FieldGroupProps {
  headline?: string
  description?: string
  /** 顯示在輸入元件下方的說明文字 */
  helpText?: string
  helpTextAlign?: 'left' | 'right'
  /** error 會讓 helpText 轉為錯誤色 */
  status?: 'default' | 'error'
  /** 輸入元件本體（TextField / Select / Radio 群組…） */
  children: React.ReactNode
  className?: string
}

/** 表單欄位容器：FieldGroupHeader + 內容 + FieldGroupHelpText */
const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ headline, description, helpText, helpTextAlign = 'left', status = 'default', children, className }, ref) => {
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
          {headline && <FieldGroupHeader headline={headline} description={description} />}
          <div className="ui-field-group__content">{children}</div>
          {helpText && <FieldGroupHelpText id={helpId} text={helpText} status={status} align={helpTextAlign} />}
        </div>
      </FieldGroupContext.Provider>
    )
  }
)
FieldGroup.displayName = 'FieldGroup'
export default FieldGroup
export type { FieldGroupProps }
