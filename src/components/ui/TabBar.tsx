import React from 'react'
import './TabBar.css'

interface TabItem {
  key: string
  label: string
  icon: React.ReactNode
  badge?: number | boolean
}

interface TabBarProps {
  items: TabItem[]
  activeKey: string
  onChange: (key: string) => void
}

const TabBar = React.forwardRef<HTMLElement, TabBarProps>(
  ({ items, activeKey, onChange }, ref) => {
    return (
      <nav ref={ref} className="ui-tab-bar">
        <div className="ui-tab-bar__items">
          {items.map((item) => {
            const active = item.key === activeKey
            return (
              <button
                key={item.key}
                type="button"
                className={['ui-tab-bar__item', active && 'ui-tab-bar__item--active']
                  .filter(Boolean).join(' ')}
                onClick={() => onChange(item.key)}
                aria-current={active ? 'page' : undefined}
              >
                <span className="ui-tab-bar__icon">
                  {item.icon}
                  {item.badge && (
                    <span className="ui-tab-bar__badge">
                      {typeof item.badge === 'number' ? item.badge : ''}
                    </span>
                  )}
                </span>
                <span className="ui-tab-bar__label">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    )
  }
)
TabBar.displayName = 'TabBar'
export default TabBar
export type { TabBarProps, TabItem }
