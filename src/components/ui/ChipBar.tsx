import React, { useRef } from 'react'
import Badge from './Badge'
import './ChipBar.css'

interface ChipBarItem {
  key: string
  label: string
  /** 'dot' 是未讀標記，數字則顯示未讀數 */
  badge?: 'dot' | number
}

interface ChipBarProps {
  items: ChipBarItem[]
  /** 單選 */
  activeKey?: string
  onChange?: (key: string) => void
  /** 超出寬度時可橫向捲動 */
  scrollable?: boolean
  /** 整列沒有可見標題時，用它替這組選項命名 */
  'aria-label'?: string
  className?: string
}

/**
 * 可選取的橫向 chip 列。
 *
 * **語意是 radiogroup 不是 tablist** —— ChipBar 做的是「取值」（篩選條件、參數），
 * 頁面結構不會變；`tablist` 是 `<Tabs>` 的語意（導覽：切到另一塊內容或跳到本頁章節）。
 * 兩者的判準見 docs/usage.md，細則見 docs/component-usage.md。
 *
 * 依 radiogroup 慣例採 roving tabindex：整列只有一個 tab stop，
 * 進到列內後用方向鍵在選項間移動，**移動即選取**。
 */
const ChipBar = React.forwardRef<HTMLDivElement, ChipBarProps>(
  ({ items, activeKey, onChange, scrollable = true, className, ...rest }, ref) => {
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const classes = [
      'ui-chip-bar',
      scrollable && 'ui-chip-bar--scroll',
      className,
    ].filter(Boolean).join(' ')

    const activeIndex = items.findIndex((item) => item.key === activeKey)
    // 未選取時讓第一顆可被 Tab 進入，整列仍維持單一 tab stop
    const tabbableIndex = activeIndex >= 0 ? activeIndex : 0

    // 頭尾循環，與原生 radio group 一致；focus() 會自動把 chip 捲進可視範圍
    const moveTo = (index: number) => {
      const next = (index + items.length) % items.length
      itemRefs.current[next]?.focus()
      onChange?.(items[next].key)
    }

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          moveTo(index + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          moveTo(index - 1)
          break
        case 'Home':
          event.preventDefault()
          moveTo(0)
          break
        case 'End':
          event.preventDefault()
          moveTo(items.length - 1)
          break
        default:
          break
      }
    }

    return (
      <div ref={ref} className={classes} role="radiogroup" {...rest}>
        {items.map((item, index) => {
          const active = item.key === activeKey
          return (
            <button
              key={item.key}
              ref={(el) => { itemRefs.current[index] = el }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={index === tabbableIndex ? 0 : -1}
              className={['ui-chip-bar__item', active && 'ui-chip-bar__item--active']
                .filter(Boolean).join(' ')}
              onClick={() => onChange?.(item.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="text-label-medium">{item.label}</span>
              {item.badge === 'dot' && (
                <Badge variant="dot" size="medium" border={false} />
              )}
              {typeof item.badge === 'number' && (
                <Badge variant="number" size="large" count={item.badge} border={false} />
              )}
            </button>
          )
        })}
      </div>
    )
  }
)
ChipBar.displayName = 'ChipBar'
export default ChipBar
export type { ChipBarProps, ChipBarItem }
