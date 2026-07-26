/*
 * 範本：列表頁（票券 / 商品 / 圖文資料列表）
 * NavigationBar（關閉 + large 標題 + 編輯）→ 圖文 ListItem（縮圖 + 標題 + Tag／到期時間）
 * 元件選用見 CLAUDE.md 決策樹；日期時間格式照 design.md §2.3。
 */
import type { ReactNode } from 'react'
import { NavigationBar, IconButton, ListItem, Tag } from '@/components/ui'

interface ListTemplateProps {
  onClose?: () => void
}

/* 示範用縮圖；實作時換成 API 回傳的商品圖 */
const SAMPLE_THUMB = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=128&h=128&fit=crop'

/** 第二行：狀態 Tag（可省略）+ 到期時間 */
function ItemMeta({ tag, expiredAt }: { tag?: ReactNode; expiredAt: string }) {
  if (!tag) return <>{expiredAt}</>
  return (
    <span className="tpl-item-meta">
      {tag}
      <span>{expiredAt}</span>
    </span>
  )
}

export default function ListTemplate({ onClose }: ListTemplateProps) {
  return (
    <div className="tpl-page">
      {/* large 標題列：關閉鍵 + 右側編輯鍵，標題另起一行 */}
      <NavigationBar
        title="我的票券"
        titleSize="large"
        leading={
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="medium"
            aria-label="關閉"
            icon={<i className="icon-cross" aria-hidden="true" />}
            onClick={onClose}
          />
        }
        trailing={
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="medium"
            aria-label="編輯"
            icon={<i className="icon-pencil" aria-hidden="true" />}
            onClick={() => {}}
          />
        }
      />

      <div className="tpl-page__body">
        <ListItem
          type="rich"
          headline="【抽獎券】黑醋栗+金盞花葉黃素精華飲 60ml 18入 (抽1名)"
          description={
            <ItemMeta
              tag={<Tag variant="light" colorType="primary" size="small" message="待填寫" />}
              expiredAt="2026/06/01 23:59:59"
            />
          }
          leadingExtra={<img className="tpl-thumb" src={SAMPLE_THUMB} alt="" />}
          onClick={() => {}}
        />
        <ListItem
          type="rich"
          headline="【兌換券】全家 Fami 霜淇淋（口味不限）"
          description={
            <ItemMeta
              tag={<Tag variant="light" colorType="danger" size="small" message="已過期" />}
              expiredAt="2026/06/01 23:59:59"
            />
          }
          leadingExtra={<img className="tpl-thumb" src={SAMPLE_THUMB} alt="" />}
          onClick={() => {}}
        />
        <ListItem
          type="rich"
          headline="【募捐】浪愛發生－用金幣讓浪浪溫飽"
          description={<ItemMeta expiredAt="2026/06/01 23:59:59" />}
          leadingExtra={<img className="tpl-thumb" src={SAMPLE_THUMB} alt="" />}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
