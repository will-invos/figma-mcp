import React from 'react'
import './Avatar.css'

interface AvatarProps {
  /** Image URL — falls back to initials if missing or fails. */
  src?: string
  /** Initials shown when no image. Auto-generated from `name` if not provided. */
  initials?: string
  /** Full name for accessible label and initials extraction. */
  name?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
}

function deriveInitials(name?: string): string {
  if (!name) return ''
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase() || '').join('')
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, initials, name, size = 'medium'}, ref) => {
    const [errored, setErrored] = React.useState(false)
    React.useEffect(() => { setErrored(false) }, [src])
    const showImg = src && !errored
    const fallback = initials ?? deriveInitials(name)
    const classes = [
      'ui-avatar',
      `ui-avatar--${size}`,
    ].join(' ')
    return (
      <span ref={ref} className={classes} role="img" aria-label={name || 'avatar'}>
        {showImg ? (
          <img src={src} alt={name || ''} onError={() => setErrored(true)} />
        ) : (
          <span className="ui-avatar__initials">{fallback}</span>
        )}
      </span>
    )
  }
)
Avatar.displayName = 'Avatar'
export default Avatar
export type { AvatarProps }
