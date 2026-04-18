import SearchField from '@/components/ui/SearchField'
import type { StoryDef } from './types'

export const SearchFieldStory: StoryDef = {
  component: SearchField,
  name: 'SearchField',
  category: 'Forms',
  previewWidth: 360,
  props: {
    placeholder: { type: 'string', default: '搜尋發票' },
    showCancel:  { type: 'boolean', default: false },
    cancelLabel: { type: 'string', default: '取消' },
  },
}
