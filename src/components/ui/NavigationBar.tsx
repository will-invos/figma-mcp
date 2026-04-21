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
  /** 'regular' shows centered title (48px), 'large' shows large left-aligned title. */
  titleSize?: 'regular' | 'large'
  /** Layout variant: default, home (large only), search (with search bar), tabs (with tab strip). */
  type?: 'default' | 'home' | 'search' | 'tabs'
  /** Optional element on the leading (left) side, e.g. a back IconButton. */
  leading?: React.ReactNode
  /** Optional element on the trailing (right) side. */
  trailing?: React.ReactNode
  /** Show the bottom 1px divider. */
  divider?: boolean
  /** Search bar placeholder (type='search'). */
  searchPlaceholder?: string
  /** Controlled search value (type='search'). */
  searchValue?: string
  /** Search change handler (type='search'). */
  onSearchChange?: (value: string) => void
  /** Tab definitions (type='tabs'). */
  tabs?: NavigationBarTab[]
  /** Active tab index (type='tabs'). */
  activeTab?: number
  /** Tab change handler (type='tabs'). */
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

    // Tabs type has its own divider inside the tab strip — don't double up.
    const bottomDivider = divider && type !== 'tabs' && <Divider />


    /* ── Bottom add-ons (search bar / tab strip) ── */
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

    // Large + Home / Search / Tabs: 56px nav bar with title + trailing, then optional addon
    if (isLarge && type !== 'default') {
      return (
        <header ref={ref} className={classes}>
          <div className="ui-nav-bar__nav">
            <h1 className="text-display">{title}</h1>
            {trailing && <div className="ui-nav-bar__trailing">{trailing}</div>}
          </div>
          {bottomAddon}
          {bottomDivider}
        </header>
      )
    }

    // Regular: centered title with leading/trailing + optional bottom addon
    if (!isLarge) {
      return (
        <header ref={ref} className={classes}>
          <div className="ui-nav-bar__bar">
            <div className="ui-nav-bar__leading">{leading}</div>
            <h1 className="text-label-large">{title}</h1>
            <div className="ui-nav-bar__trailing">{trailing}</div>
          </div>
          {bottomAddon}
          {bottomDivider}
        </header>
      )
    }

    // Large + Default: nav bar row on top (leading/trailing), title container below
    return (
      <header ref={ref} className={classes}>
        <div className="ui-nav-bar__row">
          <div className="ui-nav-bar__leading">{leading}</div>
          <div className="ui-nav-bar__trailing">{trailing}</div>
        </div>
        <div className="ui-nav-bar__nav">
          <h1 className="text-display">{title}</h1>
        </div>
        {bottomDivider}
      </header>
    )
  }
)
NavigationBar.displayName = 'NavigationBar'
export default NavigationBar
export type { NavigationBarProps, NavigationBarTab }
