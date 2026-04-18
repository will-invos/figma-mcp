import SnackBar from '@/components/ui/SnackBar'
import { CheckCircleIcon } from './icons'
import type { StoryDef } from './types'

export const SnackBarStory: StoryDef = {
  component: SnackBar,
  name: 'SnackBar',
  category: 'Feedback',
  props: {
    text:       { type: 'string', default: '已成功儲存' },
    trailing:   { type: 'enum', options: ['none', 'button', 'spinner'], default: 'none' },
    buttonText: { type: 'string', default: 'Button' },
  },
  fixedProps: {
    icon: <CheckCircleIcon />,
  },
}
