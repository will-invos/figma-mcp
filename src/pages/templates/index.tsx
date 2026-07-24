import { useEffect, useState } from 'react'
import { NavigationBar, ListHeader, ListItem } from '@/components/ui'
import { templateMap, templates } from './registry'
import './templates.css'

const INDEX_HASH = '#/templates'

function getSlugFromHash(): string {
  const match = window.location.hash.match(/^#\/templates\/(.+)$/)
  return match ? match[1] : ''
}

/** 範本索引頁：列出所有可用 template，點擊進入預覽 */
function TemplateIndex() {
  const go = (slug: string) => {
    window.location.hash = `${INDEX_HASH}/${slug}`
  }
  return (
    <div className="tpl-page">
      <NavigationBar title="頁面範本" titleSize="large" type="home" />
      <div className="tpl-page__body tpl-page__body--sunken">
        <ListHeader headline="從範本開始建立新頁面" size="small" />
        {templates.map((t) => (
          <ListItem
            key={t.slug}
            headline={t.name}
            description={`${t.description}　·　${t.file}`}
            type="rich"
            trailing="drill-in"
            onClick={() => go(t.slug)}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Template 路由：
 *  - #/templates          → 範本索引
 *  - #/templates/<slug>   → 對應範本預覽
 * 掛在 App.tsx，當 hash 以 #/templates 開頭時渲染。
 */
export default function TemplateRouter() {
  const [slug, setSlug] = useState(getSlugFromHash)

  useEffect(() => {
    const onHash = () => setSlug(getSlugFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const def = slug ? templateMap[slug] : undefined
  if (!def) return <TemplateIndex />

  const { Component } = def
  return <Component onBack={() => { window.location.hash = INDEX_HASH }} />
}
