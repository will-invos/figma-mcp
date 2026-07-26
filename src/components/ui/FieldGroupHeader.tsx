import React from 'react'

interface FieldGroupHeaderProps {
  headline: string
  description?: string
  className?: string
}

/** 一般由 <FieldGroup> 自動渲染，單獨使用的情境少 */
const FieldGroupHeader = React.forwardRef<HTMLDivElement, FieldGroupHeaderProps>(
  ({ headline, description, className }, ref) => {
    const classes = ['ui-field-group__header', className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        <span className="text-label-large ui-field-group__label">{headline}</span>
        {description && <span className="text-body-large ui-field-group__description">{description}</span>}
      </div>
    )
  }
)
FieldGroupHeader.displayName = 'FieldGroupHeader'
export default FieldGroupHeader
export type { FieldGroupHeaderProps }
