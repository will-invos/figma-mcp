import React from 'react'

interface FieldGroupHeaderProps {
  headline: string
  description?: string
  className?: string
}

/** Standalone field group header — typically used inside <FieldGroup> automatically. */
const FieldGroupHeader = React.forwardRef<HTMLDivElement, FieldGroupHeaderProps>(
  ({ headline, description, className }, ref) => {
    const classes = ['ui-field-group__header', className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        <span className="ui-field-group__label">{headline}</span>
        {description && <span className="ui-field-group__description">{description}</span>}
      </div>
    )
  }
)
FieldGroupHeader.displayName = 'FieldGroupHeader'
export default FieldGroupHeader
export type { FieldGroupHeaderProps }
