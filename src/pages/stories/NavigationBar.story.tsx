import React, { useState } from 'react'
import NavigationBar from '@/components/ui/NavigationBar'
import IconButton from '@/components/ui/IconButton'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import type { StoryDef } from './types'

const leadingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  back: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回" icon={<i className="icon-chevron-left" aria-hidden="true" />} />,
  close: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="關閉" icon={<i className="icon-cross" aria-hidden="true" />} />,
  avatar: <Avatar name="Will" size="small" />,
  text: <Button variant="text" colorType="secondary" size="medium" text="取消" />,
}

const trailingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  icon: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多" icon={<i className="icon-three-dots" aria-hidden="true" />} />,
  icons: (
    <>
      <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="搜尋" icon={<i className="icon-magnifier" aria-hidden="true" />} />
      <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="分享" icon={<i className="icon-share-ios" aria-hidden="true" />} />
    </>
  ),
  text: <Button variant="text" colorType="primary" size="medium" text="完成" />,
  avatar: <Avatar name="Will" size="small" />,
}

const defaultTabs = [
  { label: 'Tab' },
  { label: 'Tab' },
  { label: 'Tab' },
]

/** 控制項的值 → 實際傳給 NavigationBar 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const { leading, trailing, ...rest } = values
  return {
    ...rest,
    leading: leadingPresets[leading],
    trailing: trailingPresets[trailing],
    tabs: rest.type === 'tabs' ? defaultTabs : undefined,
  }
}

const NavigationBarRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  return (
    <NavigationBar
      {...resolveProps(values)}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
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
    type:      { type: 'enum', options: ['default', 'home', 'search', 'tabs'], default: 'default',
      optionsByDep: { titleSize: { regular: ['default', 'search', 'tabs'], large: ['default', 'home', 'search', 'tabs'] } },
    },
    titleSize: { type: 'enum', options: ['regular', 'large'], default: 'regular' },
    title:     { type: 'string', default: 'Title' },
    searchPlaceholder: { type: 'string', default: 'Search', when: { type: 'search' } },
    // leading 只在 regular，或 large + default 版面會渲染；large 的 home/search/tabs 沒有 leading。
    leading:   { type: 'enum', options: ['none', 'back', 'close', 'avatar', 'text'], default: 'back',
      when: (v) => v.titleSize === 'regular' || v.type === 'default' },
    trailing:  { type: 'enum', options: ['none', 'icon', 'icons', 'text', 'avatar'], default: 'icon' },
    divider:   { type: 'boolean', default: true },
  },
  Render: NavigationBarRender,
  codeProps: resolveProps,
}
