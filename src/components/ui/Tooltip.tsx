import React, { useState } from 'react'
import './Tooltip.css'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

interface TooltipProps {
  content: React.ReactNode
  placement?: TooltipPlacement
  align?: TooltipAlign
  children: React.ReactNode
  /** 受控開關；不傳就由 hover / focus 決定 */
  open?: boolean
}

/* 尾巴的三角形由 .ui-tooltip__tail--{direction} 用 border 疊出來 */
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

    /* 尾巴指向觸發元素，方向與 placement 相反 */
    const tailDirection = (
      { top: 'down', bottom: 'up', left: 'right', right: 'left' } as const
    )[placement]

    /* top / left 時尾巴排在本體後面，bottom / right 時排在前面 */
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
