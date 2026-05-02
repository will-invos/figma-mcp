import React, { useState } from 'react'
import PinInput from '@/components/ui/PinInput'
import type { StoryDef } from './types'

const PinInputRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [pin, setPin] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PinInput
        length={values.length}
        value={pin}
        onChange={setPin}
        status={values.status}
        autoFocus={values.autoFocus}
        placeholder={values.placeholder || undefined}
      />
    </div>
  )
}

export const PinInputStory: StoryDef = {
  component: PinInput,
  name: 'PinInput',
  category: 'Forms',
  previewWidth: 360,
  props: {
    length:      { type: 'number', default: 4, min: 1, max: 6 },
    status:      { type: 'enum', options: ['default', 'error', 'disabled'], default: 'default' },
    autoFocus:   { type: 'boolean', default: false },
    placeholder: { type: 'string', default: '' },
  },
  Render: PinInputRender,
}
