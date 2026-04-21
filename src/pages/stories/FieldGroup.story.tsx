import React, { useState } from 'react'
import FieldGroup from '@/components/ui/FieldGroup'
import TextField from '@/components/ui/TextField'
import TextArea from '@/components/ui/TextArea'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Select from '@/components/ui/Select'
import type { StoryDef } from './types'

const DEMO_OPTIONS = [
  { label: '選項一', value: '1' },
  { label: '選項二', value: '2' },
  { label: '選項三', value: '3' },
]

const FieldGroupRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [checked, setChecked] = useState(false)
  const [checkedB, setCheckedB] = useState(false)
  const [radioValue, setRadioValue] = useState('a')

  const renderField = () => {
    const fieldStatus = values.status === 'error' ? 'error' : 'default'
    switch (values.field) {
      case 'textfield':
        return <TextField placeholder="Placeholder" status={fieldStatus} />
      case 'textarea':
        return <TextArea placeholder="Placeholder" status={fieldStatus} />
      case 'checkbox':
        return (
          <div style={{ display: 'flex', gap: 24 }}>
            <Checkbox checked={checked} onChange={setChecked}>Option A</Checkbox>
            <Checkbox checked={checkedB} onChange={setCheckedB}>Option B</Checkbox>
          </div>
        )
      case 'radio':
        return (
          <div style={{ display: 'flex', gap: 24 }}>
            <Radio checked={radioValue === 'a'} onChange={() => setRadioValue('a')} name="fg-radio" value="a" status={fieldStatus}>Option A</Radio>
            <Radio checked={radioValue === 'b'} onChange={() => setRadioValue('b')} name="fg-radio" value="b" status={fieldStatus}>Option B</Radio>
          </div>
        )
      case 'select':
        return <Select placeholder="Please select..." options={DEMO_OPTIONS} status={fieldStatus} />
      default:
        return <TextField placeholder="Placeholder" status={fieldStatus} />
    }
  }

  return (
    <FieldGroup
      label={values.label}
      helpText={values.helpText ? values.helpTextBody : undefined}
      helpIcon={values.helpText ? <i className="icon-info" aria-hidden="true" /> : undefined}
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
    field:         { type: 'enum', options: ['textfield', 'textarea', 'checkbox', 'radio', 'select'], default: 'textfield' },
    label:         { type: 'string', default: 'Label', when: { header: true } },
    helpText:      { type: 'boolean', default: true },
    helpTextBody: { type: 'string', default: 'Help text', when: { helpText: true } },
    status:        { type: 'enum', options: ['default', 'error'], default: 'default' },
  },
  Render: FieldGroupRender,
}
