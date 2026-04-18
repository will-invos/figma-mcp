import { useState } from 'react'
import type { StoryDef } from './types'
import './Preview.css'

interface PreviewProps {
  story: StoryDef
  values: Record<string, any>
}

export default function Preview({ story, values }: PreviewProps) {
  const [dark, setDark] = useState(false)

  const mergedProps = { ...story.fixedProps, ...values }
  const Component = story.component

  return (
    <main className="cs-preview">
      <div className="cs-preview__toolbar">
        <h2 className="cs-preview__name">{story.name}</h2>
        <button
          type="button"
          className="cs-preview__theme-toggle"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? '☀ Light' : '● Dark'}
        </button>
      </div>

      <div
        className="cs-preview__canvas"
        data-theme={dark ? 'dark' : undefined}
      >
        {story.Render
          ? <story.Render values={mergedProps} />
          : <Component {...mergedProps} />
        }
      </div>
    </main>
  )
}
