import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import TextArea from '@/components/ui/TextArea'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import Switch from '@/components/ui/Switch'
import type { StoryDef } from './types'

const demoImage = (
  <img
    src="https://picsum.photos/id/237/200/300"
    alt=""
    style={{
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: 'var(--radius-200)',
      display: 'block',
    }}
  />
)

const ExtraContent: React.FC<{ kind: string }> = ({ kind }) => {
  const [text, setText] = useState('')
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)

  switch (kind) {
    case 'textfield':
      return (
        <TextField
          placeholder="Placeholder"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )
    case 'textarea':
      return (
        <TextArea
          placeholder="Please enter…"
          value={text}
          onChange={setText}
        />
      )
    case 'select':
      return (
        <Select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          placeholder="Please select"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
        />
      )
    case 'checkbox':
      return <Checkbox checked={checked} onChange={setChecked}>I agree to the terms</Checkbox>
    case 'switch':
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span>Enable notifications</span>
          <Switch checked={checked} onChange={setChecked} />
        </div>
      )
    default:
      return null
  }
}

const DialogRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const close = () => setOpen(false)
  const primary = values.type === 'danger'
    ? { label: 'Delete', onClick: close, colorType: 'danger' as const }
    : { label: 'Confirm', onClick: close, colorType: 'primary' as const }
  const secondary = { label: 'Cancel', onClick: close, colorType: 'neutral' as const }

  let actions
  if (values.cta === '1-button') {
    actions = [primary]
  } else if (values.cta === '2-buttons-vertical') {
    // Vertical: top = primary filled, bottom = secondary text
    actions = [primary, secondary]
  } else if (values.type === 'danger') {
    // Horizontal danger: primary on left, secondary on right
    actions = [primary, secondary]
  } else {
    // Horizontal default: secondary on left, primary on right
    actions = [secondary, primary]
  }

  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)}>Open Dialog</Button>
      <div ref={setContainer} />
      {container && (
        <Dialog
          open={open}
          onClose={close}
          type={values.type}
          cta={values.cta}
          title={values.title}
          description={values.description}
          image={values.image ? demoImage : undefined}
          extraContent={values.extra !== 'none' ? <ExtraContent kind={values.extra} /> : undefined}
          container={container}
          actions={actions}
        />
      )}
    </>
  )
}

export const DialogStory: StoryDef = {
  component: Dialog,
  name: 'Dialog',
  category: 'Overlay',
  props: {
    type:        { type: 'enum', options: ['default', 'danger'], default: 'default' },
    title:       { type: 'string', default: 'Are you sure?' },
    description: { type: 'string', default: 'Are you sure you want to perform this action? This action cannot be undone.' },
    cta:         { type: 'enum', options: ['2-buttons-horizontal', '2-buttons-vertical', '1-button'], default: '2-buttons-horizontal' },
    image:       { type: 'boolean', default: false },
    extra:       { type: 'enum', options: ['none', 'textfield', 'textarea', 'select', 'checkbox', 'switch'], default: 'none' },
  },
  Render: DialogRender,
}
