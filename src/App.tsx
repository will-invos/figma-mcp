import { useEffect, useState } from 'react'
import Components from './pages/Components'
import TemplateRouter from './pages/templates'

function isTemplatesRoute(): boolean {
  return window.location.hash.startsWith('#/templates')
}

export default function App() {
  const [templates, setTemplates] = useState(isTemplatesRoute)

  useEffect(() => {
    const onHash = () => setTemplates(isTemplatesRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // #/templates[/slug] → 頁面範本；其餘 → 元件展示 gallery
  return templates ? <TemplateRouter /> : <Components />
}
