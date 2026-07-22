import PageNavigation from '@/components/ui/PageNavigation'
import type { StoryDef } from './types'
import { useState } from 'react'

const TOTAL = 5

const PageNavigationRender: React.FC<{ values: Record<string, any> }> = ({ values }) => {
  const [page, setPage] = useState(0)
  return (
    <PageNavigation
      label={values.showCount ? `第 ${page + 1} 頁，共 ${TOTAL} 頁` : `第 ${page + 1} 頁`}
      onPrev={page > 0 ? () => setPage((p) => p - 1) : undefined}
      onNext={page < TOTAL - 1 ? () => setPage((p) => p + 1) : undefined}
    />
  )
}

export const PageNavigationStory: StoryDef = {
  component: PageNavigation,
  name: 'PageNavigation',
  category: 'Chrome',
  previewWidth: 360,
  props: {
    showCount: { type: 'boolean', default: true },
  },
  Render: PageNavigationRender,
}
