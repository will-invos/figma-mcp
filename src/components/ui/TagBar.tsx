import React from 'react'
import './TagBar.css'

interface TagBarItem {
  key: string
  label: string
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
              {item.label}
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
