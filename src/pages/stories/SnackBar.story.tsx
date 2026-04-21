import SnackBar from '@/components/ui/SnackBar'
import { CheckCircleIcon } from './icons'
import type { StoryDef } from './types'

export const SnackBarStory: StoryDef = {
  component: SnackBar,
  name: 'SnackBar',
  category: 'Feedback',
  previewWidth: 360,
  props: {
    text:     { type: 'string', default: 'Message' },
    trailing: { type: 'enum', options: ['none', 'button', 'spinner'], default: 'none' },
  },
  fixedProps: {
    icon: <CheckCircleIcon />,
  },
}
