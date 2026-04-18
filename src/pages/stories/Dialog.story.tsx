import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'
import { useState } from 'react'

const DialogRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        type={values.type}
        cta={values.cta}
        title={values.title}
        description={values.description}
        actions={[
          { label: '取消', onClick: () => setOpen(false), colorType: 'neutral' },
          { label: '確認', onClick: () => setOpen(false), colorType: values.type === 'danger' ? 'danger' : 'primary' },
        ]}
      />
    </>
  )
}

export const DialogStory: StoryDef = {
  component: Dialog,
  name: 'Dialog',
  category: 'Overlay',
  props: {
    title:       { type: 'string', default: '確認動作' },
    description: { type: 'string', default: '確定要執行此動作嗎？此動作無法復原。' },
    type:        { type: 'enum', options: ['default', 'danger'], default: 'default' },
    cta:         { type: 'enum', options: ['2-buttons', '2-buttons-straight', '1-button'], default: '2-buttons' },
  },
  Render: DialogRender,
}
