import React from 'react'
import './DottedController.css'

interface DottedControllerProps {
  count: number
  /** 目前位置，從 0 起算 */
  activeIndex?: number
  /** default 放在單色底上；overlap 放在照片 / 內容上（白點加陰影才看得見） */
  type?: 'default' | 'overlap'
  /** 傳了才會把點變成按鈕（點擊區也跟著加寬）；只要純指示器就別傳 */
  onChange?: (index: number) => void
  'aria-label'?: string
  className?: string
}

/** 輪播 / 分頁的位置指示點 */
const DottedController = React.forwardRef<HTMLDivElement, DottedControllerProps>(
  ({ count, activeIndex = 0, type = 'default', onChange, className, ...rest }, ref) => {
    const interactive = typeof onChange === 'function'
    const classes = [
      'ui-dotted-controller',
      `ui-dotted-controller--${type}`,
      interactive && 'ui-dotted-controller--interactive',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes} role="group" {...rest}>
        {Array.from({ length: count }, (_, i) => {
          const active = i === activeIndex
          const dotClass = [
            'ui-dotted-controller__dot',
            active && 'ui-dotted-controller__dot--active',
          ].filter(Boolean).join(' ')

          if (interactive) {
            return (
              <button
                key={i}
                type="button"
                className="ui-dotted-controller__hit"
                aria-label={`第 ${i + 1} 頁`}
                aria-current={active ? 'true' : undefined}
                onClick={() => onChange(i)}
              >
                <span className={dotClass} />
              </button>
            )
          }

          return <span key={i} className={dotClass} aria-hidden="true" />
        })}
      </div>
    )
  }
)
DottedController.displayName = 'DottedController'
export default DottedController
export type { DottedControllerProps }
