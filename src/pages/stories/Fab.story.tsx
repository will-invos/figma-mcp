import Fab from '@/components/ui/Fab'
import type { StoryDef } from './types'

export const FabStory: StoryDef = {
  component: Fab,
  name: 'FAB',
  category: 'Forms',
  props: {
    text:     { type: 'string', default: '' },
    disabled: { type: 'boolean', default: false },
    loading:  { type: 'boolean', default: false },
  },
  fixedProps: {
    'aria-label': 'create',
  },
}
