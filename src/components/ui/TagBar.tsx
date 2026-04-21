import React from 'react'
import Badge from './Badge'
import './TagBar.css'

interface TagBarItem {
  key: string
  label: string
  /** Optional badge next to the label: 'dot' (unread marker) or a numeric count. */
  badge?: 'dot' | number
}

interface TagBarProps {
  items: TagBarItem[]
  /** Currently selected key (single-select). */
  activeKey?: string
  onChange?: (key: string) => void
  /** Allow horizontal scroll when items overflow. */
  scrollable?: boolean
  className?: string
}

/** Horizontal selectable tag bar — pick one of several options. */
const TagBar = React.forwardRef<HTMLDivElement, TagBarProps>(
  ({ items, activeKey, onChange, scrollable = true, className }, ref) => {
    const classes = [
      'ui-tag-bar',
      scrollable && 'ui-tag-bar--scroll',
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
              className={['ui-tag-bar__item', active && 'ui-tag-bar__item--active']
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
TagBar.displayName = 'TagBar'
export default TagBar
export type { TagBarProps, TagBarItem }
