import type { StoryCategory } from './types'
import './Sidebar.css'

interface SidebarProps {
  categories: StoryCategory[]
  activeStory: string
  onSelect: (name: string) => void
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ categories, activeStory, onSelect, open, onToggle }: SidebarProps) {
  const className = ['cs-sidebar', open && 'cs-sidebar--open'].filter(Boolean).join(' ')
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
      </div>
    </nav>
  )
}
