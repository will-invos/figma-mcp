import React from 'react'
import './Divider.css'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', className }, ref) => {
    const classes = [
      'ui-divider',
      `ui-divider--${orientation}`,
      className,
    ].filter(Boolean).join(' ')
    return <div ref={ref} className={classes} role="separator" aria-orientation={orientation} />
  }
)
Divider.displayName = 'Divider'
export default Divider
export type { DividerProps }
