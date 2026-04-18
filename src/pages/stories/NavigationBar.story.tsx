import NavigationBar from '@/components/ui/NavigationBar'
import IconButton from '@/components/ui/IconButton'
import { ArrowLeftIcon, MoreIcon } from './icons'
import type { StoryDef } from './types'

export const NavigationBarStory: StoryDef = {
  component: NavigationBar,
  name: 'NavigationBar',
  category: 'Chrome',
  previewWidth: 360,
  props: {
    title:     { type: 'string', default: '頁面標題' },
    titleSize: { type: 'enum', options: ['regular', 'large'], default: 'regular' },
    type:      { type: 'enum', options: ['default', 'home'], default: 'default' },
    divider:   { type: 'boolean', default: true },
  },
  fixedProps: {
    leading: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回"><ArrowLeftIcon /></IconButton>,
    trailing: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多"><MoreIcon /></IconButton>,
  },
}
