import Banner from '@/components/ui/Banner'
import type { StoryDef } from './types'

export const BannerStory: StoryDef = {
  component: Banner,
  name: 'Banner',
  category: 'Feedback',
  previewWidth: 360,
  props: {
    variant:      { type: 'enum', options: ['default', 'full-width'], default: 'default' },
    colorType:    { type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger', 'prize'], default: 'primary' },
    message:      { type: 'string', default: 'Message' },
    // 元件預設不顯示 icon；story 預設兩顆都開，required 讓開啟時 code 區塊一定印出來。
    leadingIcon:  { type: 'boolean', default: true, required: true },
    trailingIcon: { type: 'boolean', default: true, required: true },
  },
  // 關掉時不印 `leadingIcon={false}`——那與元件預設相同。
  codeProps: (v) => ({
    ...v,
    leadingIcon: v.leadingIcon || undefined,
    trailingIcon: v.trailingIcon || undefined,
  }),
}
