import ListFooter from '@/components/ui/ListFooter'
import type { StoryDef } from './types'

export const ListFooterStory: StoryDef = {
  component: ListFooter,
  name: 'ListFooter',
  category: 'Display',
  previewWidth: 360,
  props: {
    footer:   { type: 'string', default: 'This is a footer.' },
    icon: { type: 'boolean', default: true },
    state:    { type: 'enum', options: ['default', 'danger'], default: 'default' },
  },
}
