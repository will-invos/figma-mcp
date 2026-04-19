import BottomSheet from '@/components/ui/BottomSheet'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'
import { useState } from 'react'

const BottomSheetRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)}>Open BottomSheet</Button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={values.title}
        titleSize={values.titleSize}
        showHandle={values.showHandle}
        footer={<Button onClick={() => setOpen(false)}>Button</Button>}
      >
        <p style={{ padding: '16px 0' }}>Body content</p>
      </BottomSheet>
    </>
  )
}

export const BottomSheetStory: StoryDef = {
  component: BottomSheet,
  name: 'BottomSheet',
  category: 'Overlay',
  props: {
    title:      { type: 'string', default: '選項' },
    titleSize:  { type: 'enum', options: ['large', 'regular'], default: 'regular' },
    showHandle: { type: 'boolean', default: true },
  },
  Render: BottomSheetRender,
}
