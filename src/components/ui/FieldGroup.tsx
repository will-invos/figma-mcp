import React from 'react'
import FieldGroupHeader from './FieldGroupHeader'
import FieldGroupHelpText from './FieldGroupHelpText'
import './FieldGroup.css'

interface FieldGroupProps {
  /** Headline shown in the header (the field's main label). */
  headline?: string
  /** Optional secondary description shown under the headline. */
  description?: string
  /** Optional help text shown below the input. */
  helpText?: string
  /** Help text alignment. */
  helpTextAlign?: 'left' | 'right'
  /** Whether the field is in error state (affects help text color). */
  status?: 'default' | 'error'
  /** Children = the input control(s) — TextField, Select, Radio group, etc. */
  children: React.ReactNode
  className?: string
}

/**
 * Form field wrapper composing FieldGroupHeader + content + FieldGroupHelpText,
 * matching the Figma "Field group" component structure.
 */
const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ headline, description, helpText, helpTextAlign = 'left', status = 'default', children, className }, ref) => {
    const classes = [
      'ui-field-group',
      status === 'error' && 'ui-field-group--error',
      className,
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        {headline && <FieldGroupHeader headline={headline} description={description} />}
        <div className="ui-field-group__content">{children}</div>
        {helpText && <FieldGroupHelpText text={helpText} status={status} align={helpTextAlign} />}
      </div>
    )
  }
)
FieldGroup.displayName = 'FieldGroup'
export default FieldGroup
export type { FieldGroupProps }
