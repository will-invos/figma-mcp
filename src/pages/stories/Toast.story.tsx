import type { StoryDef } from './types'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui'
import { printExpression } from './codegen'

/** 控制項的 auto 對應「不傳 blocking」，走元件預設（一律擋） */
function resolveBlocking(value: string): boolean | undefined {
  if (value === 'on') return true
  if (value === 'off') return false
  return undefined
}

const ToastRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show, update, dismiss } = useToast()

  const handleShow = () => {
    const blocking = resolveBlocking(values.blocking)
    if (values.type === 'loading') {
      const id = show({ type: 'loading', blocking })
      setTimeout(() => dismiss(id), 3000)
    } else {
      // rich: 一直保持 rich 樣式，3s 後把預設 Spinner icon 換成 check icon。
      // duration 設大於 3s 避免 icon 切換前就被 auto-dismiss；update 會把 timer 重新計時
      // （沿用同一個 duration，所以換 icon 後還有 5s）。
      const id = show({
        type: 'rich',
        message: values.text,
        action: values.button ? { label: 'Cancel', onClick: () => {} } : undefined,
        duration: 5000,
        blocking,
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
    // auto = 不傳 blocking：一律擋（點擊 + 捲動）
    blocking: { type: 'enum', options: ['auto', 'on', 'off'], default: 'auto' },
  },
  Render: ToastRender,
  // Toast 是 Provider + hook API，不是渲染一個元件，所以自己組 snippet
  // blocking 是 auto 時 resolveBlocking 回 undefined，printExpression 會自動略過該欄位
  codeSnippet: (values) =>
    values.type === 'loading'
      ? [
          'const { show, dismiss } = useToast()',
          '',
          `const id = show(${printExpression(
            { type: 'loading', blocking: resolveBlocking(values.blocking) },
            ''
          )})`,
          'try {',
          '  await submitInvoice()',
          '} finally {',
          '  dismiss(id)',
          '}',
        ].join('\n')
      : [
          'const { show } = useToast()',
          '',
          `show(${printExpression(
            {
              type: 'rich',
              message: values.text,
              action: values.button ? { label: 'Cancel', onClick: () => {} } : undefined,
              blocking: resolveBlocking(values.blocking),
            },
            ''
          )})`,
        ].join('\n'),
}
