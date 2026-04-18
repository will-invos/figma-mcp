import type { StoryDef } from './types'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui'

const ToastRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show, dismiss } = useToast()
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="small" variant="outline" onClick={() => show({ message: values.message })}>
        Show Toast
      </Button>
      <Button size="small" variant="outline" onClick={() => show({ message: values.message, action: { label: '確定', onClick: () => {} } })}>
        With Action
      </Button>
      <Button size="small" variant="outline" onClick={() => {
        const id = show({ type: 'loading' })
        setTimeout(() => dismiss(id), 2500)
      }}>
        Loading
      </Button>
    </div>
  )
}

export const ToastStory: StoryDef = {
  component: Button,
  name: 'Toast',
  category: 'Feedback',
  props: {
    message: { type: 'string', default: '已儲存' },
  },
  Render: ToastRender,
}
