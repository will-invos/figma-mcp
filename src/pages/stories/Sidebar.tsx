import type { StoryCategory } from './types'
import './Sidebar.css'

interface SidebarProps {
  categories: StoryCategory[]
  activeStory: string
  onSelect: (name: string) => void
}

export default function Sidebar({ categories, activeStory, onSelect }: SidebarProps) {
  return (
    <nav className="cs-sidebar" aria-label="Components">
      <h1 className="cs-sidebar__title">UI Kit</h1>
      {categories.map((cat) => (
        <div key={cat.name} className="cs-sidebar__group">
          <span className="cs-sidebar__group-label">{cat.name}</span>
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
    </nav>
  )
}
