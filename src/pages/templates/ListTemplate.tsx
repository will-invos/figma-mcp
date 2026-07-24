/* ================================================================== *
 * Template：列表頁（設定 / 選單 / 清單）
 * large 標題 + 分組 ListItem + 底部 TabBar。元件選用見 CLAUDE.md 決策樹。
 * ================================================================== */
import { useState } from 'react'
import { NavigationBar, IconButton, ListHeader, ListItem, TabBar } from '@/components/ui'

interface ListTemplateProps {
  onBack?: () => void
}

export default function ListTemplate({ onBack }: ListTemplateProps) {
  const [tab, setTab] = useState('settings')

  return (
    <div className="tpl-page">
      {/* large 標題列：左對齊大標，適合清單型頁面 */}
      <NavigationBar
        title="設定"
        titleSize="large"
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
            aria-label="搜尋"
            icon={<i className="icon-magnifier" aria-hidden="true" />}
          />
        }
      />

      <div className="tpl-page__body tpl-page__body--sunken">
        {/* 分組一 */}
        <ListHeader headline="帳號" size="small" />
        <ListItem
          headline="個人資料"
          leadingIcon={<i className="icon-user" aria-hidden="true" />}
          trailing="drill-in"
          onClick={() => {}}
        />
        <ListItem
          headline="通知設定"
          description="推播、電子郵件"
          leadingIcon={<i className="icon-bell" aria-hidden="true" />}
          trailing="drill-in"
          onClick={() => {}}
        />
        <ListItem
          headline="接收推播"
          leadingIcon={<i className="icon-bell" aria-hidden="true" />}
          trailing="switch"
          trailingChecked
          onTrailingChange={() => {}}
        />

        {/* 分組二 */}
        <ListHeader headline="其他" size="small" />
        <ListItem
          headline="關於發票存摺"
          trailing="text"
          trailingText="v2.4.0"
          showDivider={false}
        />
      </div>

      <TabBar
        activeKey={tab}
        onChange={setTab}
        items={[
          {
            key: 'home',
            label: '首頁',
            icon: <i className="icon-home-user" aria-hidden="true" />,
            activeIcon: <i className="icon-home-user-filled" aria-hidden="true" />,
          },
          {
            key: 'settings',
            label: '設定',
            icon: <i className="icon-scanner" aria-hidden="true" />,
            activeIcon: <i className="icon-scanner-filled" aria-hidden="true" />,
          },
        ]}
      />
    </div>
  )
}
