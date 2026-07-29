import SnackBar from '@/components/ui/SnackBar'
import Button from '@/components/ui/Button'
import { useSnackBar } from '@/components/ui'
import type { StoryDef } from './types'
import { printExpression } from './codegen'

export const SnackBarStory: StoryDef = {
  component: SnackBar,
  name: 'SnackBar',
  category: 'Feedback',
  previewWidth: 360,
  props: {
    text:     { type: 'string', default: 'Message' },
    // success / error 只差在 leading icon，底色與文字色相同
    status:   { type: 'enum', options: ['success', 'error'], default: 'success' },
    trailing: { type: 'enum', options: ['none', 'button', 'spinner'], default: 'none' },
  },
}

/**
 * 實務上都走 provider —— 貼齊頁面底部、由下往上滑入、3 秒自動關閉。
 * 連按會排隊，一則關掉才顯示下一則（不像 Toast 會並存堆疊）。
 */
const SnackBarProviderRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { show } = useSnackBar()
  return (
    <div style={{ display: 'flex', gap: 'var(--space-300)' }}>
      <Button
        size="small"
        variant="outline"
        onClick={() => show({ text: values.text, status: values.status })}
        text="Show SnackBar"
      />
      {/* 連按驗證排隊：三則依序出現，不會疊成三條 */}
      <Button
        size="small"
        variant="text"
        onClick={() => {
          show({ text: '第 1 則', status: 'success' })
          show({ text: '第 2 則', status: 'error' })
          show({ text: '第 3 則', status: 'success' })
        }}
        text="連續三則（排隊）"
      />
    </div>
  )
}

export const SnackBarProviderStory: StoryDef = {
  component: Button,
  name: 'SnackBar (Provider)',
  category: 'Feedback',
  props: {
    text:   { type: 'string', default: '已儲存' },
    status: { type: 'enum', options: ['success', 'error'], default: 'success' },
  },
  Render: SnackBarProviderRender,
  // Provider + hook API，不是渲染一個元件，所以自己組 snippet
  codeSnippet: (values) =>
    [
      'const { show } = useSnackBar()',
      '',
      `show(${printExpression({ text: values.text, status: values.status }, '')})`,
    ].join('\n'),
}
