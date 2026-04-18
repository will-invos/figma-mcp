import React from 'react'
import './NavigationBar.css'

interface NavigationBarProps {
  title?: string
  /** 'regular' shows centered title (48px), 'large' shows large left-aligned title. */
  titleSize?: 'regular' | 'large'
  /** 'default' has leading/trailing slots, 'home' has no leading (title directly in nav). */
  type?: 'default' | 'home'
  /** Optional element on the leading (left) side, e.g. a back IconButton. */
  leading?: React.ReactNode
  /** Optional element on the trailing (right) side. */
  trailing?: React.ReactNode
  /** Show the bottom 1px divider. */
  divider?: boolean
}

const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(
  ({ title, titleSize = 'regular', type = 'default', leading, trailing, divider = true }, ref) => {
    const isHome = type === 'home'
    const isLarge = titleSize === 'large'

    const classes = [
      'ui-nav-bar',
      `ui-nav-bar--${titleSize}`,
      isHome && 'ui-nav-bar--home',
      divider && 'ui-nav-bar--divider',
    ].filter(Boolean).join(' ')

    // Home + Large: title directly in a 56px nav bar, trailing floats right
    if (isHome && isLarge) {
      return (
        <header ref={ref} className={classes}>
          <div className="ui-nav-bar__nav">
            <h1 className="text-ios-display">{title}</h1>
            {trailing && <div className="ui-nav-bar__trailing">{trailing}</div>}
          </div>
        </header>
      )
    }

    // Default + Regular: centered title with leading/trailing
    if (!isLarge) {
      return (
        <header ref={ref} className={classes}>
          <div className="ui-nav-bar__leading">{leading}</div>
          <h1 className="text-ios-label-large">{title}</h1>
          <div className="ui-nav-bar__trailing">{trailing}</div>
        </header>
      )
    }

    // Default + Large: nav bar row on top, title container below
    return (
      <header ref={ref} className={classes}>
        <div className="ui-nav-bar__row">
          <div className="ui-nav-bar__leading">{leading}</div>
          <div className="ui-nav-bar__trailing">{trailing}</div>
        </div>
        <div className="ui-nav-bar__nav">
          <h1 className="text-ios-display">{title}</h1>
        </div>
      </header>
    )
  }
)
NavigationBar.displayName = 'NavigationBar'
export default NavigationBar
export type { NavigationBarProps }
