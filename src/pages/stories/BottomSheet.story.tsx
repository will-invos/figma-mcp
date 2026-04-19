import React from 'react'
import BottomSheet from '@/components/ui/BottomSheet'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import type { StoryDef } from './types'
import { useState } from 'react'

const BottomSheetRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [checked, setChecked] = useState(false)

  const renderFooter = () => {
    if (!values.footer) return undefined
    switch (values.footerType) {
      case '1-button':
        return <Button onClick={() => setOpen(false)}>確認</Button>
      case '2-buttons-horizontal':
        return (
          <div style={{ display: 'flex', gap: 16, width: '100%' }}>
            <Button variant="filled" colorType="neutral" style={{ flex: 1 }} onClick={() => setOpen(false)}>取消</Button>
            <Button variant="filled" colorType="primary" style={{ flex: 1 }} onClick={() => setOpen(false)}>確認</Button>
          </div>
        )
      case '2-buttons-vertical':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <Button onClick={() => setOpen(false)}>確認</Button>
            <Button variant="text" onClick={() => setOpen(false)}>取消</Button>
          </div>
        )
      case 'checkbox-button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <Checkbox checked={checked} onChange={setChecked}>我已閱讀並同意條款</Checkbox>
            <Button onClick={() => setOpen(false)}>確認</Button>
          </div>
        )
      default:
        return <Button onClick={() => setOpen(false)}>確認</Button>
    }
  }

  return (
    <>
      <Button size="small" variant="outline" onClick={() => setOpen(true)}>Open BottomSheet</Button>
      <div ref={setContainer} />
      {container && (
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title={values.title}
          titleSize={values.titleSize}
          showHandle={values.showHandle}
          footer={renderFooter()}
          container={container}
        >
          <p style={{ padding: '16px 0' }}>Body content</p>
        </BottomSheet>
      )}
    </>
  )
}

export const BottomSheetStory: StoryDef = {
  component: BottomSheet,
  name: 'BottomSheet',
  category: 'Overlay',
  props: {
    showHandle: { type: 'boolean', default: true },
    title:      { type: 'string', default: '選項' },
    titleSize:  { type: 'enum', options: ['regular', 'large'], default: 'regular' },
    footer:     { type: 'boolean', default: true },
    footerType: { type: 'enum', options: ['1-button', '2-buttons-horizontal', '2-buttons-vertical', 'checkbox-button'], default: '1-button', when: { footer: true } },
  },
  Render: BottomSheetRender,
}
