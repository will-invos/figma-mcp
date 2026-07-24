/* ================================================================== *
 * Template：詳情 / 內容頁（單筆資料細節）
 * 返回鍵 + 可捲動內容 + PageNavigation 上下筆。元件選用見 CLAUDE.md 決策樹。
 * 金額 / 期數 / 日期格式照 design.md §2.3（範例見下方 ListItem）。
 * ================================================================== */
import { NavigationBar, IconButton, PageNavigation, ListItem, Divider } from '@/components/ui'

interface DetailTemplateProps {
  onBack?: () => void
}

export default function DetailTemplate({ onBack }: DetailTemplateProps) {
  return (
    <div className="tpl-page">
      <NavigationBar
        title="發票明細"
        titleSize="regular"
        leading={
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="medium"
            aria-label="返回"
            icon={<i className="icon-arrow-left" aria-hidden="true" />}
            onClick={onBack}
          />
        }
        trailing={
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="medium"
            aria-label="更多"
            icon={<i className="icon-dots-arrow-right" aria-hidden="true" />}
          />
        }
      />

      <div className="tpl-page__body">
        {/* 上一筆 / 下一筆導覽 */}
        <PageNavigation
          label="AB-12345678"
          onPrev={() => {}}
          onNext={() => {}}
        />

        <div className="tpl-section" style={{ gap: 'var(--space-200)' }}>
          {/* 金額主資訊 */}
          <span className="text-body-medium" style={{ color: 'var(--color-content-subtle)' }}>
            消費金額
          </span>
          <span className="text-display-small">$1,280</span>
        </div>

        <Divider />

        {/* 明細列 —— 用 ListItem 的 text trailing 呈現 key-value */}
        <ListItem headline="開立日期" trailing="text" trailingText="2026/07/31" />
        <ListItem headline="發票期數" trailing="text" trailingText="115 年 7-8 月" />
        <ListItem headline="賣方" trailing="text" trailingText="全聯實業" showDivider={false} />
      </div>
    </div>
  )
}
