import React from 'react'
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
  className?: string
}

/** 可選取的橫向 chip 列 */
const ChipBar = React.forwardRef<HTMLDivElement, ChipBarProps>(
  ({ items, activeKey, onChange, scrollable = true, className }, ref) => {
    const classes = [
      'ui-chip-bar',
      scrollable && 'ui-chip-bar--scroll',
      className,
    ].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes} role="tablist">
        {items.map((item) => {
          const active = item.key === activeKey
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              className={['ui-chip-bar__item', active && 'ui-chip-bar__item--active']
                .filter(Boolean).join(' ')}
              onClick={() => onChange?.(item.key)}
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
