import React, { useState } from 'react'
import NavigationBar from '@/components/ui/NavigationBar'
import IconButton from '@/components/ui/IconButton'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { ArrowLeftIcon, CloseIcon, MoreIcon, SearchIconBig, ShareIcon } from './icons'
import type { StoryDef } from './types'

const leadingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  back: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>,
  close: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="關閉"><CloseIcon /></IconButton>,
  avatar: <Avatar name="Will" size="small" />,
  text: <Button variant="text" colorType="secondary" size="medium">取消</Button>,
}

const trailingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  icon: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多"><MoreIcon /></IconButton>,
  icons: (
    <>
      <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="搜尋"><SearchIconBig /></IconButton>
      <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="分享"><ShareIcon /></IconButton>
    </>
  ),
  text: <Button variant="text" colorType="primary" size="medium">完成</Button>,
  avatar: <Avatar name="Will" size="small" />,
}

const defaultTabs = [
  { label: '全部' },
  { label: '進行中' },
  { label: '已完成' },
  { label: '已取消' },
]

const NavigationBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leading, trailing, ...rest } = values
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  return (
    <NavigationBar
      {...rest}
      leading={leadingPresets[leading]}
      trailing={trailingPresets[trailing]}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      tabs={rest.type === 'tabs' ? defaultTabs : undefined}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}

export const NavigationBarStory: StoryDef = {
  component: NavigationBar,
  name: 'NavigationBar',
  category: 'Chrome',
  previewWidth: 360,
  props: {
    title:     { type: 'string', default: '頁面標題' },
    titleSize: { type: 'enum', options: ['regular', 'large'], default: 'regular' },
    type:      { type: 'enum', options: ['default', 'home', 'search', 'tabs'], default: 'default',
      optionsByDep: { titleSize: { regular: ['default', 'search', 'tabs'], large: ['default', 'home', 'search', 'tabs'] } },
    },
    leading:   { type: 'enum', options: ['none', 'back', 'close', 'avatar', 'text'], default: 'back' },
    trailing:  { type: 'enum', options: ['none', 'icon', 'icons', 'text', 'avatar'], default: 'icon' },
    divider:   { type: 'boolean', default: true },
    searchPlaceholder: { type: 'string', default: '搜尋', when: { type: 'search' } },
  },
  Render: NavigationBarRender,
}
