import React from 'react'
import ListHeader from '@/components/ui/ListHeader'
import type { StoryDef } from './types'

const ListHeaderRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { trailingText, ...rest } = values
  return (
    <ListHeader
      {...rest}
      trailing={trailingText ? trailingText : undefined}
    />
  )
}

export const ListHeaderStory: StoryDef = {
  component: ListHeader,
  name: 'ListHeader',
  category: 'Display',
  previewWidth: 360,
  props: {
    title:        { type: 'string', default: '區段標題' },
    size:         { type: 'enum', options: ['small', 'medium', 'large'], default: 'small' },
    trailingText: { type: 'string', default: '' },
  },
  Render: ListHeaderRender,
}
