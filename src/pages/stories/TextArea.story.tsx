import TextArea from '@/components/ui/TextArea'
import type { StoryDef } from './types'

/**
 * wrap="off" 的驗證內容：三行，其中一行刻意超長 ——
 * 應顯示為三行且可左右捲動，最後一行不因水平捲軸被裁掉。
 */
const NOWRAP_SAMPLE = [
  'npm install @invos/design-system',
  'npx invos-cli sync --token=ory_at_0123456789abcdefghijklmnopqrstuvwxyz --endpoint=https://api.example.com/v1/tokens/sync --verbose',
  'npm run build',
].join('\n')

/** 控制項的值 → 實際傳給 TextArea 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  return {
    variant: values.variant,
    label: values.label,
    placeholder: values.placeholder,
    status: values.status,
    wrap: values.wrap,
    // 不折行時要有內容才看得出效果；defaultValue 走原生屬性（元件已轉傳 rest）
    defaultValue: values.wrap === 'off' ? NOWRAP_SAMPLE : undefined,
  }
}

const TextAreaRender: React.FC<{ values: Record<string, any> }> = ({ values }) => (
  <TextArea {...resolveProps(values)} />
)

export const TextAreaStory: StoryDef = {
  component: TextArea,
  name: 'TextArea',
  category: 'Forms',
  previewWidth: 360,
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: 'Label' },
    placeholder: { type: 'string', default: 'Placeholder' },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    // off：一行就是一行，過長橫向捲動（終端機指令、金鑰這類內容）
    wrap:        { type: 'enum', options: ['soft', 'off'], default: 'soft' },
  },
  Render: TextAreaRender,
  codeProps: resolveProps,
}
