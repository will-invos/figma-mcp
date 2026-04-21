import React from 'react'
import SheetHeader from '@/components/ui/SheetHeader'
import IconButton from '@/components/ui/IconButton'
import Button from '@/components/ui/Button'
import { ArrowLeftIcon, CloseIcon, MoreIcon, SearchIconBig } from './icons'
import type { StoryDef } from './types'

const leadingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  close: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="關閉"><CloseIcon /></IconButton>,
  back: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>,
  search: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="搜尋"><SearchIconBig /></IconButton>,
  text: <Button variant="text" colorType="secondary" size="medium" text="取消" />,
}

const trailingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  more: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多"><MoreIcon /></IconButton>,
  close: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="關閉"><CloseIcon /></IconButton>,
  text: <Button variant="text" colorType="primary" size="medium" text="完成" />,
}

const SheetHeaderRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { leading, trailing, ...rest } = values
  return (
    <SheetHeader
      {...rest}
      leading={leadingPresets[leading]}
      trailing={trailingPresets[trailing]}
    />
  )
}

export const SheetHeaderStory: StoryDef = {
  component: SheetHeader,
  name: 'SheetHeader',
  category: 'Overlay',
  previewWidth: 360,
  props: {
    type:         { type: 'enum', options: ['grabber', 'default'], default: 'grabber' },
    headlineSize: { type: 'enum', options: ['none', 'regular', 'large'], default: 'regular' },
    headline:     { type: 'string', default: 'Headline' },
    leading:      { type: 'enum', options: ['none', 'close', 'back', 'search', 'text'], default: 'close' },
    trailing:     { type: 'enum', options: ['none', 'more', 'close', 'text'], default: 'none' },
  },
  Render: SheetHeaderRender,
}
