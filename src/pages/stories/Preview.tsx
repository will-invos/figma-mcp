import { useEffect, useState } from 'react'
import type { StoryDef } from './types'
import { buildStorySnippet } from './codegen'
import './Preview.css'

interface PreviewProps {
  story: StoryDef
  values: Record<string, any>
}

export default function Preview({ story, values }: PreviewProps) {
  const [dark, setDark] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mirror theme to <html> so portal'd elements (Toast / Dialog / Sheet) inherit it.
  // Without this, components rendered into document.body via createPortal escape the
  // canvas-scoped data-theme and fall back to :root (light) tokens.
  useEffect(() => {
    const html = document.documentElement
    if (dark) html.dataset.theme = 'dark'
    else delete html.dataset.theme
    return () => { delete html.dataset.theme }
  }, [dark])

  const mergedProps = { ...story.fixedProps, ...values }
  const Component = story.component
  const snippet = buildStorySnippet(story, values)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      /* clipboard API unavailable; silently no-op */
    }
  }

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
        <div style={story.previewWidth ? { width: story.previewWidth } : undefined}>
          {story.Render
            ? <story.Render values={mergedProps} />
            : <Component {...mergedProps} />
          }
        </div>
      </div>

      {!story.hideCode && (
        <section className="cs-preview__code">
          <div className="cs-preview__code-header">
            <span className="cs-preview__code-title">Code</span>
            <button
              type="button"
              className="cs-preview__code-copy"
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          {story.Render && !story.codeProps && !story.codeSnippet && (
            <div className="cs-preview__code-note">
              ✱ 此 story 採自訂渲染，下方僅顯示根元件 props，未含外層包裝或 children
            </div>
          )}
          <pre className="cs-preview__code-block"><code>{snippet}</code></pre>
        </section>
      )}
    </main>
  )
}
