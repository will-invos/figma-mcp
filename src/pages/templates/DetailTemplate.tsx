/* ================================================================== *
 * Template：詳情 / 內容頁（單筆資料細節）
 * 對齊 Figma「Detail」母版：NavigationBar（back + 置中標題）→ sunken 底色上
 * 堆疊白色 section 卡片 → 置底 CTA 按鈕（上緣 divider）。
 * 元件選用見 CLAUDE.md 決策樹；金額 / 期數 / 日期格式照 design.md §2.3。
 * ================================================================== */
import { NavigationBar, IconButton, Button, Divider } from '@/components/ui'

interface DetailTemplateProps {
  onBack?: () => void
}

export default function DetailTemplate({ onBack }: DetailTemplateProps) {
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

      {/* 內容區：sunken 底色，白色 section 卡片以間距堆疊 */}
      <div className="tpl-page__body">
        <div className="tpl-section-stack">
          {/* 主標題 section */}
          <section className="tpl-section-card">
            <h2 className="text-heading-large" style={{ color: 'var(--color-content-bold)' }}>
              標題
            </h2>
            <p className="text-body-large">說明文字，補充這筆資料的重點描述。</p>
          </section>

          {/* 內容 section（可複製多個） */}
          <section className="tpl-section-card">
            <h3 className="text-heading-small">段落標題</h3>
            <p className="text-body-large">段落內容，放這個區塊要呈現的細節。</p>
          </section>

          <section className="tpl-section-card">
            <h3 className="text-heading-small">段落標題</h3>
            <p className="text-body-large">段落內容，放這個區塊要呈現的細節。</p>
          </section>
        </div>
      </div>

      {/* 置底 CTA：上緣 divider + 整寬主要動作按鈕 */}
      <Divider />
      <div className="tpl-actions">
        <Button variant="filled" colorType="primary" size="large" text="主要動作" onClick={() => {}} />
      </div>
    </div>
  )
}
