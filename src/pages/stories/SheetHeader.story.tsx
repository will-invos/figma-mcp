import SheetHeader from '@/components/ui/SheetHeader'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

export const SheetHeaderStory: StoryDef = {
  component: SheetHeader,
  name: 'SheetHeader',
  category: 'Overlay',
  previewWidth: 360,
  props: {
    title:      { type: 'string', default: '頁面標題' },
    showHandle: { type: 'boolean', default: true },
    divider:    { type: 'boolean', default: true },
  },
  fixedProps: {
    trailing: <Button variant="text" size="small">完成</Button>,
  },
}
