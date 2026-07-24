import { useState } from 'react'
import type { StorySection } from './types'
import './Sidebar.css'

interface SidebarProps {
  sections: StorySection[]
  activeStory: string
  onSelect: (name: string) => void
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ sections, activeStory, onSelect, open, onToggle }: SidebarProps) {
  const className = ['cs-sidebar', open && 'cs-sidebar--open'].filter(Boolean).join(' ')

  // 收合狀態（key = section 名稱）；預設全部展開
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const toggleSection = (name: string) =>
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }))

  return (
    <nav className={className} aria-label="Components">
      <button
        type="button"
        className="cs-sidebar__toggle"
        onClick={onToggle}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
      >
        <i className={open ? 'icon-cross' : 'icon-three-line'} aria-hidden="true" />
      </button>
      <div className="cs-sidebar__content">
        {sections.map((section) => {
          const isCollapsed = collapsed[section.name]
          return (
            <div key={section.name} className="cs-sidebar__section">
              <button
                type="button"
                className="cs-sidebar__section-header"
                onClick={() => toggleSection(section.name)}
                aria-expanded={!isCollapsed}
              >
                <i
                  className={isCollapsed ? 'icon-chevron-right' : 'icon-chevron-down'}
                  aria-hidden="true"
                />
                <span>{section.name}</span>
              </button>

              {!isCollapsed &&
                section.categories.map((cat) => (
                  <div key={cat.name} className="cs-sidebar__group">
                    {cat.name && <span className="cs-sidebar__group-label">{cat.name}</span>}
                    {cat.stories.map((story) => (
                      <button
                        key={story.name}
                        type="button"
                        className={[
                          'cs-sidebar__item',
                          story.name === activeStory && 'cs-sidebar__item--active',
                        ].filter(Boolean).join(' ')}
                        onClick={() => onSelect(story.name)}
                      >
                        {story.name}
                      </button>
                    ))}
                  </div>
                ))}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
