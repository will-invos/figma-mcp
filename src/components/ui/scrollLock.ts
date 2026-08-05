import { useEffect } from 'react'

/**
 * body 捲動鎖 —— modal 層（Dialog / Sheet / blocking Toast）共用。
 *
 * ref-count 計數：多層覆蓋同開（例如 Sheet 上出 loading Toast、Dialog 換場）時，
 * 要等最後一層關閉才解鎖，不能任一層關閉就還原。
 *
 * 只鎖 overflow 是不夠的：手指在 overlay 上滑動、或可捲區捲到底之後，捲動仍會
 * 鏈到背景（scroll chaining）。所以各元件的 overlay 另配 `touch-action: none`、
 * 可捲區配 `overscroll-behavior: contain`，三件套一起才擋得完整。
 */
let lockCount = 0
let prevOverflow = ''
let prevPaddingRight = ''

function lockScroll() {
  lockCount += 1
  if (lockCount > 1) return

  const body = document.body
  prevOverflow = body.style.overflow
  prevPaddingRight = body.style.paddingRight

  // 桌面（component explorer）鎖定時 scrollbar 消失會讓版面向右跳一下，
  // 補上等寬 padding 抵銷；手機的 overlay scrollbar 寬度為 0，不受影響
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    const basePadding = parseFloat(window.getComputedStyle(body).paddingRight) || 0
    body.style.paddingRight = `${basePadding + scrollbarWidth}px`
  }
  body.style.overflow = 'hidden'
}

function unlockScroll() {
  if (lockCount === 0) return
  lockCount -= 1
  if (lockCount > 0) return

  const body = document.body
  body.style.overflow = prevOverflow
  body.style.paddingRight = prevPaddingRight
}

/** active 期間鎖住 body 捲動；關閉或 unmount 自動解鎖 */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    lockScroll()
    return unlockScroll
  }, [active])
}

export { useScrollLock }
