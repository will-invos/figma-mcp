import type { StoryDef } from './types'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui'

const ToastRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show, dismiss } = useToast()

  const handleShow = () => {
    if (values.type === 'loading') {
      const id = show({ type: 'loading' })
      setTimeout(() => dismiss(id), 3000)
    } else {
      show({
        type: 'rich',
        message: values.text,
        action: values.button ? { label: 'Cancel', onClick: () => {} } : undefined,
      })
    }
  }

  return (
    <Button size="small" variant="outline" onClick={handleShow} text="Show Toast" />
  )
}

export const ToastStory: StoryDef = {
  component: Button,
  name: 'Toast',
  category: 'Feedback',
  props: {
    type:   { type: 'enum', options: ['rich', 'loading'], default: 'rich' },
    text:   { type: 'string', default: 'Message', when: { type: 'rich' } },
    button: { type: 'boolean', default: true, when: { type: 'rich' } },
  },
  Render: ToastRender,
}
