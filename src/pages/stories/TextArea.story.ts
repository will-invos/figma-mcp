import TextArea from '@/components/ui/TextArea'
import type { StoryDef } from './types'

export const TextAreaStory: StoryDef = {
  component: TextArea,
  name: 'TextArea',
  category: 'Forms',
  previewWidth: 360,
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: '備註' },
    placeholder: { type: 'string', default: '請輸入內容' },
    status:      { type: 'enum', options: ['default', 'error'], default: 'default' },
    disabled:    { type: 'boolean', default: false },
  },
}
