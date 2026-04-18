import DatePicker from '@/components/ui/DatePicker'
import type { StoryDef } from './types'

export const DatePickerStory: StoryDef = {
  component: DatePicker,
  name: 'DatePicker',
  category: 'Pickers',
  previewWidth: 360,
  props: {
    value:  { type: 'string', default: '2026-04-18' },
    status: { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
}
