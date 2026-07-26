import React from 'react'
import './Avatar.css'

interface AvatarProps {
  /** 未提供或載入失敗時退回文字縮寫 */
  src?: string
  /** 沒有圖時顯示的縮寫；不傳就從 name 自動取字 */
  initials?: string
  /** 同時用於無障礙標籤與縮寫來源 */
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
