import React from 'react'
import SearchField from './SearchField'
import Divider from './Divider'
import Tabs from './Tabs'
import './NavigationBar.css'

interface NavigationBarTab {
  label: string
}

interface NavigationBarProps {
  title?: string
  titleSize?: 'regular' | 'large'
  type?: 'default' | 'home' | 'search' | 'tabs'
  leading?: React.ReactNode
  trailing?: React.ReactNode
  divider?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  tabs?: NavigationBarTab[]
  activeTab?: number
  onTabChange?: (index: number) => void
}

const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(
  (
    {
      title,
      titleSize = 'regular',
      type = 'default',
      leading,
      trailing,
      divider = true,
      searchPlaceholder,
      searchValue,
      onSearchChange,
      tabs,
      activeTab = 0,
      onTabChange,
    },
    ref
  ) => {
    const isHome = type === 'home'
    const isLarge = titleSize === 'large'

    const classes = [
      'ui-nav-bar',
      `ui-nav-bar--${titleSize}`,
      isHome && 'ui-nav-bar--home',
      type === 'search' && 'ui-nav-bar--search',
      type === 'tabs' && 'ui-nav-bar--tabs',
    ].filter(Boolean).join(' ')

    const bottomDivider = divider && type !== 'tabs' && <Divider />


    const searchBar = type === 'search' && (
      <div className="ui-nav-bar__search-bar">
        <SearchField
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
    )

    const tabStrip = type === 'tabs' && tabs && tabs.length > 0 && (
      <Tabs
        type="fill"
        items={tabs.map((tab, i) => ({ key: String(i), label: tab.label }))}
        activeKey={String(activeTab)}
        onChange={(key) => onTabChange?.(Number(key))}
      />
    )

    const bottomAddon = searchBar || tabStrip || null

    if (isLarge && type !== 'default') {
      return (
        <header ref={ref} className={classes}>
          <div className="ui-nav-bar__nav">
            <h1 className="ui-nav-bar__title text-display-small">{title}</h1>
            {trailing && <div className="ui-nav-bar__trailing">{trailing}</div>}
          </div>
          {bottomAddon}
          {bottomDivider}
        </header>
      )
    }

    if (!isLarge) {
      return (
        <header ref={ref} className={classes}>
          <div className="ui-nav-bar__bar">
            <div className="ui-nav-bar__leading">{leading}</div>
            <h1 className="ui-nav-bar__title text-label-large">{title}</h1>
            <div className="ui-nav-bar__trailing">{trailing}</div>
          </div>
          {bottomAddon}
          {bottomDivider}
        </header>
      )
    }

    return (
      <header ref={ref} className={classes}>
        <div className="ui-nav-bar__row">
          <div className="ui-nav-bar__leading">{leading}</div>
          <div className="ui-nav-bar__trailing">{trailing}</div>
        </div>
        <div className="ui-nav-bar__nav">
          <h1 className="ui-nav-bar__title text-display-small">{title}</h1>
        </div>
        {bottomDivider}
      </header>
    )
  }
)
NavigationBar.displayName = 'NavigationBar'
export default NavigationBar
export type { NavigationBarProps, NavigationBarTab }
