import React from 'react'
import './FieldGroup.css'

interface FieldGroupProps {
  /** Headline shown in the header (the field's main label). */
  label?: string
  /** Optional secondary description shown under the headline. */
  description?: string
  /** Optional help text shown below the input. */
  helpText?: string
  /** Optional icon for help text (e.g. info circle). */
  helpIcon?: React.ReactNode
  /** Whether the field is in error state (affects help text color). */
  status?: 'default' | 'error'
  /** Children = the input control(s) — TextField, Select, Radio group, etc. */
  children: React.ReactNode
  className?: string
}

/**
 * Form field wrapper providing consistent label + input + help layout.
 * Mirrors the Figma "Field group" component (containing FieldGroupHeader + content + FieldGroupHelpText).
 */
const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ label, description, helpText, helpIcon, status = 'default', children, className }, ref) => {
    const classes = [
      'ui-field-group',
      status === 'error' && 'ui-field-group--error',
      className,
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        {label && (
          <div className="ui-field-group__header">
            <span className="ui-field-group__label">{label}</span>
            {description && <span className="ui-field-group__description">{description}</span>}
          </div>
        )}
        <div className="ui-field-group__content">{children}</div>
        {helpText && (
          <div className="ui-field-group__help">
            {helpIcon && <span className="ui-field-group__help-icon">{helpIcon}</span>}
            <span className="ui-field-group__help-text">{helpText}</span>
          </div>
        )}
      </div>
    )
  }
)
FieldGroup.displayName = 'FieldGroup'
export default FieldGroup
export type { FieldGroupProps }
