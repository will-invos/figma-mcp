import { useState, useCallback } from 'react'
import { categories, storyMap, defaultStoryName } from './stories/registry'
import Sidebar from './stories/Sidebar'
import Preview from './stories/Preview'
import Controls from './stories/Controls'
import { isPropVisible, getEnumOptions, type PropDef } from './stories/types'
import './Components.css'

function getStoryNameFromHash(): string {
  const hash = window.location.hash.replace(/^#/, '')
  const match = hash.match(/^\/components\/(.+)$/)
  return match ? match[1] : ''
}

function getDefaults(propDefs: Record<string, PropDef>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(propDefs).map(([key, def]) => [key, def.default])
  )
}

export default function Components() {
  const initialName = getStoryNameFromHash() || defaultStoryName
  const [activeStory, setActiveStory] = useState(initialName)

  const story = storyMap[activeStory] ?? storyMap[defaultStoryName]

  const [values, setValues] = useState<Record<string, any>>(() => getDefaults(story.props))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(false)

  const handleSelect = useCallback((name: string) => {
    setActiveStory(name)
    window.location.hash = `#/components/${name}`
    const next = storyMap[name]
    if (next) setValues(getDefaults(next.props))
    setSidebarOpen(false)
  }, [])

  const handleChange = useCallback((key: string, value: any) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value }
      for (const [k, def] of Object.entries(story.props)) {
        if (k === key) continue
        if (!isPropVisible(def, next) && next[k] !== def.default) {
          next[k] = def.default
        } else if (def.type === 'enum' && def.optionsByDep) {
          const allowed = getEnumOptions(def, next)
          if (!allowed.includes(next[k])) next[k] = def.default
        }
      }
      return next
    })
  }, [story])

  const handleReset = useCallback(() => {
    setValues(getDefaults(story.props))
  }, [story])

  const closeAll = useCallback(() => {
    setSidebarOpen(false)
    setControlsOpen(false)
  }, [])

  const anyOpen = sidebarOpen || controlsOpen

  return (
    <div className="cs-layout">
      <Sidebar
        categories={categories}
        activeStory={activeStory}
        onSelect={handleSelect}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
      />
      <Preview story={story} values={values} />
      <Controls
        propDefs={story.props}
        values={values}
        onChange={handleChange}
        onReset={handleReset}
        open={controlsOpen}
        onToggle={() => setControlsOpen((o) => !o)}
      />
      <div
        className={`cs-layout__backdrop${anyOpen ? ' cs-layout__backdrop--visible' : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />
    </div>
  )
}
