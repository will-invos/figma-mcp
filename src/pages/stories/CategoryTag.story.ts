import CategoryTag from '@/components/ui/CategoryTag'
import type { StoryDef } from './types'

export const CategoryTagStory: StoryDef = {
  component: CategoryTag,
  name: 'CategoryTag',
  category: 'Display',
  props: {
    // 前六個是消費分類，其餘是發票屬性（捐贈 / 中獎有專屬色，來源三種走中性底）
    category: {
      type: 'enum',
      options: [
        'shopping', 'food', 'transportation', 'entertainment', 'life', 'other',
        'donation', 'prize', 'manual', 'carrier', 'scanner',
      ],
      default: 'shopping',
      required: true,
    },
    size: { type: 'enum', options: ['medium', 'small'], default: 'medium' },
    showIcon: { type: 'boolean', default: true },
  },
  // props 都是可直接傳的純值，用預設渲染即可（<CategoryTag {...values} />）
}
