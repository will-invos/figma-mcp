import React from 'react'

interface FieldGroupHelpTextProps {
  text: string
  status?: 'default' | 'error'
  align?: 'left' | 'right'
  className?: string
  /** 由 FieldGroup 產生並傳入，供輸入元件 aria-describedby 指向 */
  id?: string
}

/** 一般由 <FieldGroup> 在有 helpText 時自動渲染，單獨使用的情境少 */
const FieldGroupHelpText = React.forwardRef<HTMLDivElement, FieldGroupHelpTextProps>(
  ({ text, status = 'default', align = 'left', className, id }, ref) => {
    const classes = [
      'ui-field-group__help',
      status === 'error' && 'ui-field-group--error',
      align === 'right' && 'ui-field-group__help--right',
      className,
    ].filter(Boolean).join(' ')
    const iconClass = status === 'error' ? 'icon-alert-circle-filled' : 'icon-info'
    return (
      <div ref={ref} id={id} className={classes} style={align === 'right' ? { justifyContent: 'flex-end' } : undefined}>
        <span className="ui-field-group__help-icon">
          <i className={iconClass} aria-hidden="true" />
        </span>
        <span className="text-body-small ui-field-group__help-text">{text}</span>
      </div>
    )
  }
)
FieldGroupHelpText.displayName = 'FieldGroupHelpText'
export default FieldGroupHelpText
export type { FieldGroupHelpTextProps }
