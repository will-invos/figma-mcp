import TabBar from '@/components/ui/TabBar'
import { HomeIcon, ReceiptIcon, UserIcon } from './icons'
import type { StoryDef } from './types'
import { useState } from 'react'

const TabBarRender: React.FC<{ values: Record<string, any> }> = () => {
  const [active, setActive] = useState('home')
  return (
    <TabBar
      activeKey={active}
      onChange={setActive}
      items={[
        { key: 'home', label: '首頁', icon: <HomeIcon /> },
        { key: 'invoice', label: '發票', icon: <ReceiptIcon />, badge: 3 },
        { key: 'me', label: '我的', icon: <UserIcon /> },
      ]}
    />
  )
}

export const TabBarStory: StoryDef = {
  component: TabBar,
  name: 'TabBar',
  category: 'Chrome',
  props: {},
  Render: TabBarRender,
}
