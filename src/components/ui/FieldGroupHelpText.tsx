import React from 'react'

interface FieldGroupHelpTextProps {
  text: string
  icon?: React.ReactNode
  status?: 'default' | 'error'
  /** Text alignment */
  align?: 'left' | 'right'
  className?: string
}

/** Standalone help-text row — typically rendered automatically by <FieldGroup> when helpText is provided. */
const FieldGroupHelpText = React.forwardRef<HTMLDivElement, FieldGroupHelpTextProps>(
  ({ text, icon, status = 'default', align = 'left', className }, ref) => {
    const classes = [
      'ui-field-group__help',
      status === 'error' && 'ui-field-group--error',
      align === 'right' && 'ui-field-group__help--right',
      className,
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes} style={align === 'right' ? { justifyContent: 'flex-end' } : undefined}>
        {icon && <span className="ui-field-group__help-icon">{icon}</span>}
        <span className="ui-field-group__help-text">{text}</span>
      </div>
    )
  }
)
FieldGroupHelpText.displayName = 'FieldGroupHelpText'
export default FieldGroupHelpText
export type { FieldGroupHelpTextProps }
