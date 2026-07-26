/* ================================================================== *
 * Template：404 / 空狀態頁（頁面不存在、資料被刪除、不符合資格）
 * NavigationBar（返回 + 置中標題）→ PageStatus（插圖 + 文案 + 動作）置中
 * status 換成 disconnected / system-error / no-results / empty，
 * 就是斷線、系統忙碌、查無結果、暫無內容頁；文案與插圖由 status 帶入。
 * 元件選用見 CLAUDE.md 決策樹。
 * ================================================================== */
import { NavigationBar, IconButton, PageStatus, Button } from '@/components/ui'

interface NotFoundTemplateProps {
  onBack?: () => void
  onHome?: () => void
}

export default function NotFoundTemplate({ onBack, onHome }: NotFoundTemplateProps) {
  return (
    <div className="tpl-page">
      <NavigationBar
        title="頁面標題"
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
      />

      {/* 內容區：不放其他內容，PageStatus 垂直置中；空狀態頁不用 sunken 底色 */}
      <div className="tpl-page__body tpl-page__body--center">
        {/* 標題與說明由 status 帶預設值（「無法顯示頁面」），
            需要客製時再傳 title / description 覆寫。
            斷線 / 系統忙碌頁的動作通常是「重試」而不是「回首頁」。 */}
        <PageStatus
          status="not-exist"
          action={
            <Button
              variant="outline"
              text="回前一頁"
              onClick={onHome}
            />
          }
        />
      </div>
    </div>
  )
}
