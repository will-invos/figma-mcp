import TextArea from '@/components/ui/TextArea'
import type { StoryDef } from './types'

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
  },
}
