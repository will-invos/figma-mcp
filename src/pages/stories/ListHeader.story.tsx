import React from 'react'
import ListHeader from '@/components/ui/ListHeader'
import { Button } from '@/components/ui'
import type { StoryDef } from './types'

/** Button size matched to the trailing text size:
 *  small → medium Button (label-medium 14px = body-medium trailing text),
 *  medium/large → large Button (label-large 16px = body-large trailing text). */
const BUTTON_SIZE = {
  small:  'medium',
  medium: 'large',
  large:  'large',
} as const

const ListHeaderRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { headline, trailing, size = 'small', ...rest } = values
  const trailingNode =
    trailing === 'text' ? 'Text' :
    trailing === 'button' ? (
      <Button
        variant="text"
        colorType="secondary"
        size={BUTTON_SIZE[size as keyof typeof BUTTON_SIZE]}
        text="Button"
        leadingIcon={<i className="icon-plus" aria-hidden="true" />}
      />
    ) : undefined
  return <ListHeader headline={headline} size={size} {...rest} trailing={trailingNode} />
}

export const ListHeaderStory: StoryDef = {
  component: ListHeader,
  name: 'ListHeader',
  category: 'Display',
  previewWidth: 360,
  props: {
    size:     { type: 'enum', options: ['small', 'medium', 'large'], default: 'small' },
    headline: { type: 'string', default: 'Headline' },
    trailing: { type: 'enum', options: ['none', 'text', 'button'], default: 'none' },
  },
  Render: ListHeaderRender,
}
