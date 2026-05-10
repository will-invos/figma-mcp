import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import IconButton from './IconButton'
import './InAppNotification.css'

type InAppNotificationVariant =
  | 'default'
  | 'completion'
  | 'danger'
  | 'announcement'
  | 'reward'

type InAppNotificationTrailing = 'none' | 'button' | 'icon'

interface InAppNotificationButton {
  label: string
  onClick: () => void
}

interface InAppNotificationIconButton {
  icon?: React.ReactNode
  ariaLabel: string
  onClick: () => void
}

interface InAppNotificationOptions {
  variant?: InAppNotificationVariant
  icon?: React.ReactNode
  image?: React.ReactNode
  headline: string
  description?: string
  trailing?: InAppNotificationTrailing
  button?: InAppNotificationButton
  iconButton?: InAppNotificationIconButton
  onPress?: () => void
  duration?: number
}

interface InAppNotificationContextValue {
  show: (opts: InAppNotificationOptions) => string
  update: (id: string, patch: Partial<InAppNotificationOptions>) => void
  dismiss: (id: string) => void
}

interface NotificationItem extends InAppNotificationOptions {
  id: string
}

type Phase = 'entering' | 'visible' | 'exiting'

const DEFAULT_DURATION = 3000
/** Past this many px upward, treat the touch release as "dismiss". */
const SWIPE_DISMISS_DISTANCE = 32
/** Or past this velocity (px/ms upward), still dismiss even on a short swipe. */
const SWIPE_DISMISS_VELOCITY = 0.3

const VARIANT_ICON_CLASS: Record<InAppNotificationVariant, string> = {
  default: 'icon-bell-filled',
  completion: 'icon-check-bold',
  danger: 'icon-alert-circle-filled',
  announcement: 'icon-loud-speaker-filled',
  reward: 'icon-gift-filled',
}

const InAppNotificationContext = createContext<InAppNotificationContextValue | null>(null)

function useInAppNotification(): InAppNotificationContextValue {
  const ctx = useContext(InAppNotificationContext)
  if (!ctx) {
    throw new Error('useInAppNotification must be used within an InAppNotificationProvider')
  }
  return ctx
}

function InAppNotificationProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<NotificationItem | null>(null)
  const [phase, setPhase] = useState<Phase>('entering')
  const queueRef = useRef<NotificationItem[]>([])
  const counterRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const dragRef = useRef<{
    startY: number
    startTime: number
    delta: number
    active: boolean
  } | null>(null)
  /** Set to true on touchend after a non-trivial drag, so the synthetic click
   *  iOS fires right after touchend doesn't double-trigger onPress. */
  const suppressClickRef = useRef(false)

  // Promote next from queue when nothing is showing.
  const promoteNext = useCallback(() => {
    const next = queueRef.current.shift() ?? null
    setCurrent(next)
    setPhase('entering')
  }, [])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startExit = useCallback(() => {
    clearTimer()
    setPhase('exiting')
  }, [clearTimer])

  const dismiss = useCallback(
    (id: string) => {
      // Only the currently-mounted notification can be dismissed; others get
      // dropped from the queue silently.
      if (current?.id === id) {
        startExit()
        return
      }
      const idx = queueRef.current.findIndex((n) => n.id === id)
      if (idx !== -1) queueRef.current.splice(idx, 1)
    },
    [current, startExit]
  )

  const show = useCallback(
    (opts: InAppNotificationOptions): string => {
      counterRef.current += 1
      const id = String(counterRef.current)
      const item: NotificationItem = { ...opts, id }
      if (current) {
        queueRef.current.push(item)
      } else {
        setCurrent(item)
        setPhase('entering')
      }
      return id
    },
    [current]
  )

  const update = useCallback(
    (id: string, patch: Partial<InAppNotificationOptions>) => {
      setCurrent((prev) => {
        if (!prev || prev.id !== id) return prev
        return { ...prev, ...patch, id }
      })
      // Reset auto-dismiss timer for the patched duration if visible.
      if (current?.id === id && phase === 'visible') {
        clearTimer()
        const duration = patch.duration ?? current.duration ?? DEFAULT_DURATION
        timerRef.current = setTimeout(startExit, duration)
      }
    },
    [current, phase, clearTimer, startExit]
  )

  // Auto-dismiss timer: starts when phase becomes 'visible'.
  useEffect(() => {
    if (!current || phase !== 'visible') return
    const duration = current.duration ?? DEFAULT_DURATION
    timerRef.current = setTimeout(startExit, duration)
    return () => {
      clearTimer()
    }
  }, [current, phase, clearTimer, startExit])

  // Cleanup timer on unmount.
  useEffect(() => () => clearTimer(), [clearTimer])

  const handleAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      // Only react to our own enter/exit animations, not nested ones.
      if (event.target !== event.currentTarget) return
      if (phase === 'entering') {
        setPhase('visible')
      } else if (phase === 'exiting') {
        setCurrent(null)
        // Promote next on the next tick so animation node fully unmounts first.
        queueMicrotask(() => {
          if (queueRef.current.length > 0) promoteNext()
        })
      }
    },
    [phase, promoteNext]
  )

  // === Drag handlers ===
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (phase !== 'visible' || !cardRef.current) return
      const touch = e.touches[0]
      dragRef.current = {
        startY: touch.clientY,
        startTime: e.timeStamp,
        delta: 0,
        active: true,
      }
      clearTimer()
      const card = cardRef.current
      card.dataset.dragging = 'true'
      // Clear any previous spring-back state.
      delete card.dataset.springback
      card.style.transform = ''
      card.style.opacity = ''
    },
    [phase, clearTimer]
  )

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || !drag.active || !cardRef.current) return
    const touch = e.touches[0]
    const delta = touch.clientY - drag.startY
    drag.delta = delta
    if (delta < 0) {
      const card = cardRef.current
      card.style.transform = `translateY(${delta}px)`
      const dimming = Math.min(Math.abs(delta) / 64, 0.3)
      card.style.opacity = String(1 - dimming)
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      const card = cardRef.current
      if (!drag || !drag.active || !card) return
      drag.active = false
      delete card.dataset.dragging
      const elapsed = Math.max(1, e.timeStamp - drag.startTime)
      const velocity = Math.abs(drag.delta) / elapsed // px per ms
      const movedMeaningfully = Math.abs(drag.delta) > 4
      const shouldDismiss =
        drag.delta < -SWIPE_DISMISS_DISTANCE ||
        (drag.delta < 0 && velocity > SWIPE_DISMISS_VELOCITY)

      if (movedMeaningfully) {
        suppressClickRef.current = true
        // Clear after the synthetic click has had a chance to fire.
        setTimeout(() => {
          suppressClickRef.current = false
        }, 50)
      }

      if (shouldDismiss) {
        // Clear inline styles and let the exit animation take over.
        card.style.transform = ''
        card.style.opacity = ''
        startExit()
      } else {
        // Spring back via CSS transition, then clear inline styles.
        card.dataset.springback = 'true'
        card.style.transform = ''
        card.style.opacity = ''
        const onTransitionEnd = () => {
          delete card.dataset.springback
          card.removeEventListener('transitionend', onTransitionEnd)
        }
        card.addEventListener('transitionend', onTransitionEnd)
        // Restart auto-dismiss timer.
        if (current) {
          const duration = current.duration ?? DEFAULT_DURATION
          timerRef.current = setTimeout(startExit, duration)
        }
      }
      dragRef.current = null
    },
    [current, startExit]
  )

  // === Click handlers ===
  const handleCardClick = useCallback(() => {
    if (phase !== 'visible' || !current) return
    if (suppressClickRef.current) return
    current.onPress?.()
    startExit()
  }, [current, phase, startExit])

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleCardClick()
      }
    },
    [handleCardClick]
  )

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!current?.button) return
      current.button.onClick()
      startExit()
    },
    [current, startExit]
  )

  const handleIconButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!current?.iconButton) return
      current.iconButton.onClick()
      startExit()
    },
    [current, startExit]
  )

  const value = useMemo<InAppNotificationContextValue>(
    () => ({ show, update, dismiss }),
    [show, update, dismiss]
  )

  return (
    <InAppNotificationContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="ui-in-app-notification__viewport" aria-live="polite" role="status">
          {current && (
            <InAppNotificationCard
              ref={cardRef}
              key={current.id}
              item={current}
              phase={phase}
              onAnimationEnd={handleAnimationEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onCardClick={handleCardClick}
              onCardKeyDown={handleCardKeyDown}
              onButtonClick={handleButtonClick}
              onIconButtonClick={handleIconButtonClick}
            />
          )}
        </div>,
        document.body
      )}
    </InAppNotificationContext.Provider>
  )
}

interface CardProps {
  item: NotificationItem
  phase: Phase
  onAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void
  onCardClick: () => void
  onCardKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  onIconButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const InAppNotificationCard = React.forwardRef<HTMLDivElement, CardProps>(
  function InAppNotificationCard(props, ref) {
    const {
      item,
      phase,
      onAnimationEnd,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onCardClick,
      onCardKeyDown,
      onButtonClick,
      onIconButtonClick,
    } = props

    const variant = item.variant ?? 'default'
    const trailing = item.trailing ?? 'none'
    const isImage = item.image != null
    const pressable = !!item.onPress

    const classes = [
      'ui-in-app-notification',
      pressable ? 'ui-in-app-notification--pressable' : '',
    ]
      .filter(Boolean)
      .join(' ')

    const leadingClasses = [
      'ui-in-app-notification__leading',
      isImage
        ? 'ui-in-app-notification__leading--image'
        : `ui-in-app-notification__leading--${variant}`,
    ].join(' ')

    const defaultIcon = <i className={VARIANT_ICON_CLASS[variant]} aria-hidden="true" />
    const iconNode = item.icon ?? defaultIcon
    const trailingIconNode = item.iconButton?.icon ?? (
      <i className="icon-chevron-right" aria-hidden="true" />
    )

    return (
      <div
        ref={ref}
        className={classes}
        data-state={phase}
        role={pressable ? 'button' : undefined}
        tabIndex={pressable ? 0 : undefined}
        onClick={pressable ? onCardClick : undefined}
        onKeyDown={pressable ? onCardKeyDown : undefined}
        onAnimationEnd={onAnimationEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={leadingClasses}>
          {isImage ? (
            item.image
          ) : (
            <span className="ui-in-app-notification__leading-icon">{iconNode}</span>
          )}
        </div>

        <div className="ui-in-app-notification__content">
          <p className="text-label-large ui-in-app-notification__headline">{item.headline}</p>
          {item.description && (
            <p className="text-body-medium ui-in-app-notification__description">
              {item.description}
            </p>
          )}
        </div>

        {trailing === 'button' && item.button && (
          <div className="ui-in-app-notification__trailing">
            <button
              type="button"
              className="text-label-large ui-in-app-notification__trailing-button"
              onClick={onButtonClick}
              aria-label={item.button.label}
            >
              {item.button.label}
            </button>
          </div>
        )}

        {trailing === 'icon' && item.iconButton && (
          <div className="ui-in-app-notification__trailing">
            <IconButton
              variant="ghost"
              colorType="neutral"
              size="small"
              icon={trailingIconNode}
              onClick={onIconButtonClick}
              aria-label={item.iconButton.ariaLabel}
            />
          </div>
        )}
      </div>
    )
  }
)

// eslint-disable-next-line react-refresh/only-export-components
export { InAppNotificationProvider, useInAppNotification }
export type {
  InAppNotificationOptions,
  InAppNotificationVariant,
  InAppNotificationTrailing,
  InAppNotificationButton,
  InAppNotificationIconButton,
  InAppNotificationContextValue,
}
