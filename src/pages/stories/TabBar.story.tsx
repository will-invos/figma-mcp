import React, { useState } from 'react'
import TabBar from '@/components/ui/TabBar'
import type { StoryDef } from './types'

const TabBarRender: React.FC<{ values: Record<string, any> }> = () => {
  const [active, setActive] = useState('invoice')
  return (
    <TabBar
      activeKey={active}
      onChange={setActive}
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
  )
}

export const TabBarStory: StoryDef = {
  component: TabBar,
  name: 'TabBar',
  category: 'Chrome',
  previewWidth: 360,
  props: {},
  Render: TabBarRender,
}
