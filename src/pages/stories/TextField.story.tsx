import React, { useState, useEffect } from 'react'
import TextField from '@/components/ui/TextField'
import IconButton from '@/components/ui/IconButton'
import type { StoryDef } from './types'

const userIcon = <i className="icon-user" aria-hidden="true" />

const clearButton = (
  <IconButton
    variant="ghost"
    colorType="neutral"
    size="xsmall"
    aria-label="Clear"
    icon={<i className="icon-cross" aria-hidden="true" />}
  />
)

/** 控制項的值 → 實際傳給 TextField 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>): Record<string, any> {
  const { leadingIcon, trailingIcon, ...rest } = values
  return {
    ...rest,
    leadingIcon: leadingIcon ? userIcon : undefined,
    trailingIcon: trailingIcon ? clearButton : undefined,
  }
}

const TextFieldRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const { value: controlValue, ...rest } = resolveProps(values)
  const [value, setValue] = useState(controlValue ?? '')

  // Sync when Controls panel changes value
  useEffect(() => { setValue(controlValue ?? '') }, [controlValue])

  return (
    <TextField
      {...rest}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      trailingIcon={
        rest.trailingIcon ? (
          <IconButton
            variant="ghost"
            colorType="neutral"
            size="xsmall"
            aria-label="Clear"
            icon={<i className="icon-cross" aria-hidden="true" />}
            onClick={() => setValue('')}
          />
        ) : undefined
      }
    />
  )
}

export const TextFieldStory: StoryDef = {
  component: TextField,
  name: 'TextField',
  category: 'Forms',
  previewWidth: 360,
  props: {
    variant:      { type: 'enum', options: ['default', 'inner-label'], default: 'default' },
    label:        { type: 'string', default: 'Label' },
    placeholder:  { type: 'string', default: 'Placeholder' },
    value:        { type: 'string', default: '' },
    leadingIcon:  { type: 'boolean', default: false },
    trailingIcon: { type: 'boolean', default: false },
    status:       { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
  },
  Render: TextFieldRender,
  codeProps: resolveProps,
}
