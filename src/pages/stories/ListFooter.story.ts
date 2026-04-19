import ListFooter from '@/components/ui/ListFooter'
import type { StoryDef } from './types'

export const ListFooterStory: StoryDef = {
  component: ListFooter,
  name: 'ListFooter',
  category: 'Display',
  previewWidth: 360,
  props: {
    text:     { type: 'string', default: '綁定帳戶用於自動匯款中獎獎金，請確認帳號正確。' },
    state:    { type: 'enum', options: ['default', 'danger'], default: 'default' },
    showIcon: { type: 'boolean', default: true },
  },
}
