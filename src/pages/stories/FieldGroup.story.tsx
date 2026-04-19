import React, { useState } from 'react'
import FieldGroup from '@/components/ui/FieldGroup'
import TextField from '@/components/ui/TextField'
import TextArea from '@/components/ui/TextArea'
import Checkbox from '@/components/ui/Checkbox'
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

const DEMO_OPTIONS = [
  { label: '選項一', value: '1' },
  { label: '選項二', value: '2' },
  { label: '選項三', value: '3' },
]

const FieldGroupRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)

  const renderField = () => {
    const fieldStatus = values.status === 'error' ? 'error' : 'default'
    switch (values.field) {
      case 'textfield':
        return <TextField placeholder="Placeholder" status={fieldStatus} />
      case 'textarea':
        return <TextArea placeholder="Placeholder" status={fieldStatus} />
      case 'checkbox':
        return <Checkbox checked={checked} onChange={setChecked}>Checkbox label</Checkbox>
      case 'select':
        return <Select placeholder="請選擇" options={DEMO_OPTIONS} status={fieldStatus} />
      default:
        return <TextField placeholder="Placeholder" status={fieldStatus} />
    }
  }

  return (
    <FieldGroup
      label={values.header ? values.label : undefined}
      helpText={values.helpText ? values.helpTextValue : undefined}
      status={values.status}
    >
      {renderField()}
    </FieldGroup>
  )
}

export const FieldGroupStory: StoryDef = {
  component: FieldGroup,
  name: 'FieldGroup',
  category: 'Forms',
  previewWidth: 360,
  props: {
    field:         { type: 'enum', options: ['textfield', 'textarea', 'checkbox', 'select'], default: 'textfield' },
    status:        { type: 'enum', options: ['default', 'error'], default: 'default' },
    header:        { type: 'boolean', default: true },
    label:         { type: 'string', default: 'Label', when: { header: true } },
    helpText:      { type: 'boolean', default: true },
    helpTextValue: { type: 'string', default: 'Help text', when: { helpText: true } },
  },
  Render: FieldGroupRender,
}
