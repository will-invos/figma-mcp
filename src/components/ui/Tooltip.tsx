import React, { useState } from 'react'
import './Tooltip.css'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

interface TooltipProps {
  /** Content shown in the tooltip bubble. */
  content: React.ReactNode
  /** Where the tooltip appears relative to the trigger. */
  placement?: TooltipPlacement
  /** Alignment along the placement edge. */
  align?: TooltipAlign
  /** Trigger element. */
  children: React.ReactNode
  /** Force open state (controlled). */
  open?: boolean
}

/* CSS border-triangle tail — rendered via .ui-tooltip__tail--{direction} rules.
   Points toward the trigger (opposite of placement). Sharp-tipped (no rounding). */
function TooltipTail({ direction }: { direction: 'up' | 'down' | 'left' | 'right' }) {
  return (
    <span
      className={`ui-tooltip__tail ui-tooltip__tail--${direction}`}
      aria-hidden="true"
    />
  )
}

const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(
  ({ content, placement = 'top', align = 'center', children, open: controlledOpen }, ref) => {
    const [hovered, setHovered] = useState(false)
    const open = controlledOpen ?? hovered

    /* Tail points toward the trigger, i.e. opposite of placement direction. */
    const tailDirection = (
      { top: 'down', bottom: 'up', left: 'right', right: 'left' } as const
    )[placement]

    /* Tail comes after body for top/left (tail at end of flex), before body for bottom/right. */
    const tailFirst = placement === 'bottom' || placement === 'right'

    return (
      <span
        ref={ref}
        className="ui-tooltip"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {children}
        {open && (
          <span
            className={`ui-tooltip__container ui-tooltip__container--${placement} ui-tooltip__container--${align}`}
            role="tooltip"
          >
            <span className="ui-tooltip__inner">
              {tailFirst && <TooltipTail direction={tailDirection} />}
              <span className="text-body-large ui-tooltip__body">{content}</span>
              {!tailFirst && <TooltipTail direction={tailDirection} />}
            </span>
          </span>
        )}
      </span>
    )
  }
)
Tooltip.displayName = 'Tooltip'
export default Tooltip
export type { TooltipProps, TooltipPlacement, TooltipAlign }
