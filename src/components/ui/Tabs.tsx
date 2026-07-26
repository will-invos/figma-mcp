import React from 'react'
import Badge from './Badge'
import Divider from './Divider'
import './Tabs.css'

interface TabsItem {
  key: string
  label: string
  /** 'dot' 是未讀標記，數字則顯示未讀數 */
  badge?: 'dot' | number
}

interface TabsProps {
  items: TabsItem[]
  activeKey: string
  onChange: (key: string) => void
  /** fill：每個 tab 均分整列寬度；compact：依內容寬度排列並留間距 */
  type?: 'fill' | 'compact'
  className?: string
}

/** 內容區的分頁切換，區別於底部導覽的 TabBar */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ items, activeKey, onChange, type = 'fill', className }, ref) => {
    const classes = ['ui-tabs', `ui-tabs--${type}`, className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes} role="tablist">
        {items.map((item) => {
          const active = item.key === activeKey
          const itemClasses = ['ui-tabs__item', active && 'ui-tabs__item--active']
            .filter(Boolean).join(' ')
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              className={itemClasses}
              onClick={() => onChange(item.key)}
            >
              <span className="ui-tabs__content">
                <span className="text-label-medium">{item.label}</span>
                {item.badge === 'dot' && (
                  <Badge variant="dot" size="medium" border={false} />
                )}
                {typeof item.badge === 'number' && (
                  <Badge variant="number" size="large" count={item.badge} border={false} />
                )}
              </span>
            </button>
          )
        })}
        <Divider className="ui-tabs__divider" />
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'
export default Tabs
export type { TabsProps, TabsItem }
