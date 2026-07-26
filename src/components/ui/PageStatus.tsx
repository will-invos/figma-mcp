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

/** 各 status 的預設插圖與文案 */
const PRESETS: Record<PageStatusType, StatusPreset> = {
  'disconnected': { illustration: disconnectedSrc, title: '沒有網路連線', description: '請檢查您的網路狀態，或是稍後再試' },
  'system-error': { illustration: systemErrorSrc, title: '系統忙碌中', description: '系統忙碌中，請稍後再試' },
  'no-results': { illustration: noResultsSrc, title: '沒有搜尋結果', description: '請重新輸入關鍵字' },
  'empty': { illustration: emptySrc, title: '暫時沒有內容', description: '內容還在累積中...' },
  'not-exist': { illustration: notExistSrc, title: '無法顯示頁面', description: '此頁面已被刪除或不存在，或您不符合資格' },
}

interface PageStatusProps {
  /** 決定預設的插圖與文案 */
  status: PageStatusType
  /** 覆寫 status 帶入的標題 */
  title?: React.ReactNode
  description?: React.ReactNode
  image?: boolean
  /** 覆寫 status 帶入的插圖 */
  illustration?: React.ReactNode
  /** 動作區，通常放一顆 <Button> */
  action?: React.ReactNode
  className?: string
}

/** 整頁的空狀態 / 錯誤狀態 */
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
