import React from 'react'
import IconButton from './IconButton'
import './PageNavigation.css'

interface PageNavigationProps {
  /** 置中文字，例如發票期數、月份、段落標題 */
  label: React.ReactNode
  onPrev?: () => void
  onNext?: () => void
  /** 沒傳 onPrev 時預設就是 disabled */
  prevDisabled?: boolean
  /** 沒傳 onNext 時預設就是 disabled */
  nextDisabled?: boolean
  prevAriaLabel?: string
  nextAriaLabel?: string
  className?: string
}

/** 上一頁 / 標題 / 下一頁的導覽列 */
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
