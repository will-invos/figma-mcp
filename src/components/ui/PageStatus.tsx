import React from 'react'
import disconnectedSrc from '@/assets/illustrations/page-status/disconnected.svg'
import systemErrorSrc from '@/assets/illustrations/page-status/system-error.svg'
import noResultsSrc from '@/assets/illustrations/page-status/no-results.svg'
import emptySrc from '@/assets/illustrations/page-status/empty.svg'
import notExistSrc from '@/assets/illustrations/page-status/not-exist.svg'
import './PageStatus.css'

type PageStatusType =
  | 'disconnected'
  | 'system-error'
  | 'no-results'
  | 'empty'
  | 'not-exist'

interface StatusPreset {
  illustration: string
  title: string
  description: string
}

/** Default illustration + copy per status, from Figma 6416:7094. */
const PRESETS: Record<PageStatusType, StatusPreset> = {
  'disconnected': { illustration: disconnectedSrc, title: '沒有網路連線', description: '請檢查您的網路狀態，或是稍後再試' },
  'system-error': { illustration: systemErrorSrc, title: '系統忙碌中', description: '系統忙碌中，請稍後再試' },
  'no-results': { illustration: noResultsSrc, title: '沒有搜尋結果', description: '請重新輸入關鍵字' },
  'empty': { illustration: emptySrc, title: '暫時沒有內容', description: '內容還在累積中...' },
  'not-exist': { illustration: notExistSrc, title: '無法顯示頁面', description: '此頁面已被刪除或不存在，或您不符合資格' },
}

interface PageStatusProps {
  /** Which status to show — sets the default illustration, title and description. */
  status: PageStatusType
  /** Override the default title for this status. */
  title?: React.ReactNode
  /** Override the default description for this status. */
  description?: React.ReactNode
  /** Show the illustration. Defaults to true. */
  image?: boolean
  /** Override the default illustration (e.g. a custom illustration / image). */
  illustration?: React.ReactNode
  /** Action slot — typically a `<Button>`. Rendered below the text when provided. */
  action?: React.ReactNode
  className?: string
}

/**
 * Per Figma 6416:7094 — Page Status.
 * A full-width empty / error state: illustration + title + description + optional action.
 * `status` supplies faithful defaults; any part can be overridden.
 */
const PageStatus = React.forwardRef<HTMLDivElement, PageStatusProps>(
  ({ status, title, description, image = true, illustration, action, className }, ref) => {
    const preset = PRESETS[status]
    const classes = ['ui-page-status', className].filter(Boolean).join(' ')
    const resolvedIllustration =
      illustration ?? (image ? <img src={preset.illustration} alt="" /> : null)

    return (
      <div ref={ref} className={classes} role="status">
        {resolvedIllustration && (
          <div className="ui-page-status__image">{resolvedIllustration}</div>
        )}
        <div className="ui-page-status__text">
          <p className="text-heading-small ui-page-status__title">{title ?? preset.title}</p>
          <p className="text-body-large ui-page-status__description">{description ?? preset.description}</p>
        </div>
        {action && <div className="ui-page-status__action">{action}</div>}
      </div>
    )
  }
)
PageStatus.displayName = 'PageStatus'
export default PageStatus
export type { PageStatusProps, PageStatusType }
