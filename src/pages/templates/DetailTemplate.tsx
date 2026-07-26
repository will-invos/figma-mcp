/* ================================================================== *
 * Template：詳情 / 內容頁（單筆資料細節）
 * NavigationBar（返回 + 置中標題）→ 主視覺 → 堆疊白色卡片（段落文字 / 項目列表）
 * 元件選用見 CLAUDE.md 決策樹；金額 / 期數 / 日期格式照 design.md §2.3。
 * ================================================================== */
import { NavigationBar, IconButton, Button } from '@/components/ui'

interface DetailTemplateProps {
  onBack?: () => void
}

/* 示範用主視覺；實作時換成 API 回傳的圖 */
const SAMPLE_HERO = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=960&h=480&fit=crop'

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

      {/* 內容區：sunken 底色，白色卡片以間距堆疊 */}
      <div className="tpl-page__body">
        <div className="tpl-card-stack">
          {/* 主視覺 */}
          <img className="tpl-hero" src={SAMPLE_HERO} alt="" />

          {/* 主標題卡片 */}
          <section className="tpl-card">
            <h2 className="text-heading-medium">標題</h2>
            <p className="text-body-large">說明文字，補充這筆資料的重點描述。</p>
            <Button
              className="tpl-inline"
              variant="outline"
              size="small"
              text="分享"
              leadingIcon={<i className="icon-share-ios" aria-hidden="true" />}
            />
          </section>

          {/* 內容卡片（可複製多個） */}
          <section className="tpl-card">
            <h3 className="text-heading-small">段落標題</h3>
            <p className="text-body-large">段落內容，放這個區塊要呈現的細節。</p>
          </section>

          {/* 項目列表卡片（條款、步驟說明等） */}
          <section className="tpl-card">
            <h3 className="text-heading-small">段落標題</h3>
            <ol className="text-body-large tpl-ordered-list">
              <li>列表項目，說明這個段落的第一點。</li>
              <li>列表項目較長時會自動換行，第二行會對齊文字而不是編號。</li>
              <li>列表項目，說明這個段落的第三點。</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
