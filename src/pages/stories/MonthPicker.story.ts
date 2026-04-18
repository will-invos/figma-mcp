import MonthPicker from '@/components/ui/MonthPicker'
import type { StoryDef } from './types'

export const MonthPickerStory: StoryDef = {
  component: MonthPicker,
  name: 'MonthPicker',
  category: 'Pickers',
  previewWidth: 360,
  props: {
    value:  { type: 'string', default: '2026-04' },
    status: { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
}
