import React, { useState } from 'react'
import SearchField from '@/components/ui/SearchField'
import type { StoryDef } from './types'

const SearchFieldRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [value, setValue] = useState('')

  return (
    <SearchField
      {...values}
      value={value}
      onChange={setValue}
    />
  )
}

export const SearchFieldStory: StoryDef = {
  component: SearchField,
  name: 'SearchField',
  category: 'Forms',
  previewWidth: 360,
  props: {
    placeholder: { type: 'string', default: 'Search' },
    clearable:   { type: 'boolean', default: true },
  },
  Render: SearchFieldRender,
}
