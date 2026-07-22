import React from 'react'
import Badge from './Badge'
import './ChipBar.css'

interface ChipBarItem {
  key: string
  label: string
  /** Optional badge next to the label: 'dot' (unread marker) or a numeric count. */
  badge?: 'dot' | number
}

interface ChipBarProps {
  items: ChipBarItem[]
  /** Currently selected key (single-select). */
  activeKey?: string
  onChange?: (key: string) => void
  /** Allow horizontal scroll when items overflow. */
  scrollable?: boolean
  className?: string
}

/** Horizontal selectable chip bar — pick one of several options. */
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
