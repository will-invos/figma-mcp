import ListHeader from '@/components/ui/ListHeader'
import type { StoryDef } from './types'

export const ListHeaderStory: StoryDef = {
  component: ListHeader,
  name: 'ListHeader',
  category: 'Display',
  previewWidth: 360,
  props: {
    title: { type: 'string', default: '區段標題' },
    size:  { type: 'enum', options: ['small', 'medium', 'large'], default: 'small' },
  },
}
