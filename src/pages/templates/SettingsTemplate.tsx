/* ================================================================== *
 * Template：設定頁（設定 / 選單）
 * NavigationBar（返回 + 置中標題）→ 分組 ListHeader + ListItem
 * → 版號 ListFooter → 獨立「登出」列。
 * 對齊 Figma「個人設定」母版（4hJVIr7fkiE1UTrUkfpbBt · 2905:6882）；
 * 元件選用見 CLAUDE.md 決策樹。
 * ================================================================== */
import { useState } from 'react'
import { NavigationBar, IconButton, ListHeader, ListItem, ListFooter } from '@/components/ui'

interface SettingsTemplateProps {
  onBack?: () => void
}

export default function SettingsTemplate({ onBack }: SettingsTemplateProps) {
  const [pushEnabled, setPushEnabled] = useState(true)

  return (
    <div className="tpl-page">
      {/* regular 標題列：次層頁面用置中標題 + 返回鍵 */}
      <NavigationBar
        title="個人設定"
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

      <div className="tpl-page__body">
        <ListItem
          headline="會員資料"
          description="0987654321"
          type="rich"
          leadingIcon={<i className="icon-user" aria-hidden="true" />}
          trailing="text-button"
          trailingText="編輯"
          onClick={() => {}}
        />
        <ListItem
          headline="手機載具"
          description="/INV.888"
          type="rich"
          leadingIcon={<i className="icon-mobile-barcode" aria-hidden="true" />}
          onClick={() => {}}
        />

        <ListHeader headline="使用偏好" size="small" />
        <ListItem
          headline="外觀樣式"
          leadingIcon={<i className="icon-square-flash" aria-hidden="true" />}
          trailing="drill-in"
          onClick={() => {}}
        />
        <ListItem
          headline="接收推播"
          leadingIcon={<i className="icon-bell" aria-hidden="true" />}
          trailing="switch"
          trailingChecked={pushEnabled}
          onTrailingChange={setPushEnabled}
        />
        <ListFooter footer="v7.38.1" icon={false} align="end" />

        <ListItem
          headline="登出"
          leadingIcon={<i className="icon-container-arrow-right" aria-hidden="true" />}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
