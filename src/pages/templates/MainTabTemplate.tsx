/* ================================================================== *
 * Template：五個主要 tab 的頁面起手式
 * NavigationBar（large 標題 + 頁內子分頁）→ 內容區（自由捲動）→ TabBar
 * 從這份複製新頁面，再依需求修改；細節規則見 CLAUDE.md「新頁面起手式」。
 * ================================================================== */
import { useState } from 'react'
import { NavigationBar, IconButton, TabBar } from '@/components/ui'

export default function MainTabTemplate() {
  const [tab, setTab] = useState('invoice')
  // 頂部頁內子分頁（type="tabs" 需搭配 tabs / activeTab / onTabChange）
  const [navTab, setNavTab] = useState(0)

  return (
    <div className="tpl-page">
      <NavigationBar
        title="頁面標題"
        titleSize="large"
        type="tabs"
        tabs={[{ label: '子分頁一' }, { label: '子分頁二' }, { label: '子分頁三' }]}
        activeTab={navTab}
        onTabChange={setNavTab}
        trailing={
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="medium"
            aria-label="更多"
            icon={<i className="icon-three-dots" aria-hidden="true" />}
          />
        }
      />

      {/* 內容區：把頁面內容放這裡。*/}
      <div className="tpl-page__body" />

      <TabBar
        activeKey={tab}
        onChange={setTab}
        items={[
          {
            key: 'invoice',
            label: '我的發票',
            icon: <i className="icon-invoice" aria-hidden="true" />,
            activeIcon: <i className="icon-invoice-filled" aria-hidden="true" />,
          },
          {
            key: 'rewards',
            label: '集點兌禮',
            icon: <i className="icon-shopping-bag" aria-hidden="true" />,
            activeIcon: <i className="icon-shopping-bag-filled" aria-hidden="true" />,
          },
          {
            key: 'scan',
            label: '掃描對獎',
            icon: <i className="icon-barcode-book" aria-hidden="true" />,
            activeIcon: <i className="icon-barcode-book-filled" aria-hidden="true" />,
          },
          {
            key: 'carrier',
            label: '載具管理',
            icon: <i className="icon-scanner" aria-hidden="true" />,
            activeIcon: <i className="icon-scanner-filled" aria-hidden="true" />,
          },
          {
            key: 'home',
            label: '首頁',
            icon: <i className="icon-home-user" aria-hidden="true" />,
            activeIcon: <i className="icon-home-user-filled" aria-hidden="true" />,
          },
        ]}
      />
    </div>
  )
}
