import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

export const SelectStory: StoryDef = {
  component: Select,
  name: 'Select',
  category: 'Forms',
  previewWidth: 360,
  props: {
    variant:     { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:       { type: 'string', default: '部門' },
    placeholder: { type: 'string', default: '請選擇' },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
  fixedProps: {
    options: [
      { label: 'Design', value: 'design' },
      { label: 'Engineering', value: 'engineering' },
      { label: 'Product', value: 'product' },
    ],
  },
}
