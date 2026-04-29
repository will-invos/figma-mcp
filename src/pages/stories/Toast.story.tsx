import type { StoryDef } from './types'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui'

const ToastRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show, update, dismiss } = useToast()

  const handleShow = () => {
    if (values.type === 'loading') {
      const id = show({ type: 'loading' })
      setTimeout(() => dismiss(id), 3000)
    } else {
      // rich: 一直保持 rich 樣式，3s 後把預設 Spinner icon 換成 check icon。
      // duration 設大於 3s 避免 icon 切換前就被 auto-dismiss；update 後 timer 會重置為預設 3s。
      const id = show({
        type: 'rich',
        message: values.text,
        action: values.button ? { label: 'Cancel', onClick: () => {} } : undefined,
        duration: 5000,
      })
      setTimeout(
        () => update(id, { icon: <i className="icon-check" aria-hidden="true" /> }),
        3000
      )
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
