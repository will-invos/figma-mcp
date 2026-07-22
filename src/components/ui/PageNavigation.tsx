import React from 'react'
import IconButton from './IconButton'
import './PageNavigation.css'

interface PageNavigationProps {
  /** Center label — current page, month, section title, etc. */
  label: React.ReactNode
  onPrev?: () => void
  onNext?: () => void
  /** Disable the prev button. Defaults to true when `onPrev` is omitted. */
  prevDisabled?: boolean
  /** Disable the next button. Defaults to true when `onNext` is omitted. */
  nextDisabled?: boolean
  /** Accessible label for the prev button. */
  prevAriaLabel?: string
  /** Accessible label for the next button. */
  nextAriaLabel?: string
  className?: string
}

/**
 * Per Figma (Android UI Kit) 5474:21691 — Page Navigation.
 * A prev / label / next row for stepping through pages, months, sections, etc.
 * Built from `IconButton` (ghost / neutral) with chevron icons.
 */
const PageNavigation = React.forwardRef<HTMLDivElement, PageNavigationProps>(
  (
    {
      label,
      onPrev,
      onNext,
      prevDisabled,
      nextDisabled,
      prevAriaLabel = '上一頁',
      nextAriaLabel = '下一頁',
      className,
    },
    ref
  ) => {
    const classes = ['ui-page-navigation', className].filter(Boolean).join(' ')
    return (
      <div ref={ref} className={classes}>
        <IconButton
          variant="ghost"
          colorType="neutral"
          size="medium"
          aria-label={prevAriaLabel}
          icon={<i className="icon-chevron-left" aria-hidden="true" />}
          disabled={prevDisabled ?? onPrev === undefined}
          onClick={onPrev}
        />
        <span className="text-body-large ui-page-navigation__label">{label}</span>
        <IconButton
          variant="ghost"
          colorType="neutral"
          size="medium"
          aria-label={nextAriaLabel}
          icon={<i className="icon-chevron-right" aria-hidden="true" />}
          disabled={nextDisabled ?? onNext === undefined}
          onClick={onNext}
        />
      </div>
    )
  }
)
PageNavigation.displayName = 'PageNavigation'
export default PageNavigation
export type { PageNavigationProps }
