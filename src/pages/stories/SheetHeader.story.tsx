import React from 'react'
import SheetHeader from '@/components/ui/SheetHeader'
import IconButton from '@/components/ui/IconButton'
import Button from '@/components/ui/Button'
import type { StoryDef } from './types'

const leadingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  close: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="關閉" icon={<i className="icon-cross" aria-hidden="true" />} />,
  back: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="返回" icon={<i className="icon-chevron-left" aria-hidden="true" />} />,
  search: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="搜尋" icon={<i className="icon-magnifier" aria-hidden="true" />} />,
  text: <Button variant="text" colorType="secondary" size="medium" text="取消" />,
}

const trailingPresets: Record<string, React.ReactNode> = {
  none: undefined,
  more: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="更多" icon={<i className="icon-three-dots" aria-hidden="true" />} />,
  close: <IconButton variant="ghost" colorType="neutral" size="medium" aria-label="關閉" icon={<i className="icon-cross" aria-hidden="true" />} />,
  text: <Button variant="text" colorType="primary" size="medium" text="完成" />,
}

/** 控制項的值 → 實際傳給 SheetHeader 的 props（Render 與 code 區塊共用）。 */
function resolveProps(values: Record<string, any>) {
  const { leading, trailing, ...rest } = values
  return {
    ...rest,
    leading: leadingPresets[leading],
    trailing: trailingPresets[trailing],
  }
}

const SheetHeaderRender: React.FC<{ values: Record<string, any> }> = ({ values }) => (
  <SheetHeader {...resolveProps(values)} />
)

export const SheetHeaderStory: StoryDef = {
  component: SheetHeader,
  name: 'SheetHeader',
  category: 'Overlay',
  previewWidth: 360,
  props: {
    type:         { type: 'enum', options: ['grabber', 'default'], default: 'grabber' },
    /*
     * 元件的預設是 'none'（不顯示標題），但 story 刻意預設 'regular' 才看得到東西。
     * 這種「story 預設 ≠ 元件預設」的情況要標 required，否則 codegen 會把它當
     * 預設值省略，複製出去的程式碼會變成沒有標題的 header。
     */
    headlineSize: { type: 'enum', options: ['none', 'regular', 'large'], default: 'regular', required: true },
    /*
     * 以下三個的顯示條件對齊 SheetHeader.tsx 的 showNav / navShowsLeading /
     * showLargeBlock —— headlineSize='none' 時整個 nav 與 large 區塊都不渲染，
     * 傳了也不會顯示；leading 另外在 grabber + large 這一格也不渲染。
     */
    headline:     { type: 'string', default: 'Headline', when: (v) => v.headlineSize !== 'none' },
    leading:      { type: 'enum', options: ['none', 'close', 'back', 'search', 'text'], default: 'close',
                    when: (v) => v.headlineSize !== 'none' && !(v.type === 'grabber' && v.headlineSize === 'large') },
    trailing:     { type: 'enum', options: ['none', 'more', 'close', 'text'], default: 'none',
                    when: (v) => v.headlineSize !== 'none' },
  },
  Render: SheetHeaderRender,
  codeProps: resolveProps,
}
