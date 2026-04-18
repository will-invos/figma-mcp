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

/* Tail SVG paths — match Figma 4115:7699 spec.
   Horizontal tails (top/bottom of bubble): 36w × 8h
   Vertical tails (left/right of bubble):   8w × 28h */
function TooltipTail({ direction }: { direction: 'up' | 'down' | 'left' | 'right' }) {
  /* Paths from Figma 4115:7699 — small triangular bump (12px) centered
     in the bounding box (36×8 horizontal, 8×28 vertical). */
  const map = {
    down:  { w: 36, h: 8,  d: 'M12 0H24L18.8 6.93333C18.4 7.46667 17.6 7.46667 17.2 6.93333L12 0Z' },
    up:    { w: 36, h: 8,  d: 'M12 8H24L18.8 1.06667C18.4 0.533333 17.6 0.533333 17.2 1.06667L12 8Z' },
    right: { w: 8,  h: 28, d: 'M0 20L0 8L6.93333 13.2C7.46667 13.6 7.46667 14.4 6.93333 14.8L0 20Z' },
    left:  { w: 8,  h: 28, d: 'M8 8L8 20L1.06667 14.8C0.533334 14.4 0.533334 13.6 1.06667 13.2L8 8Z' },
  }[direction]
  return (
    <svg
      className="ui-tooltip__tail"
      width={map.w}
      height={map.h}
      viewBox={`0 0 ${map.w} ${map.h}`}
      aria-hidden="true"
    >
      <path d={map.d} />
    </svg>
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
              <span className="ui-tooltip__body">{content}</span>
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
