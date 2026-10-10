import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useObserver'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(hover: none)').matches) return
    const node = ref.current
    if (!node) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      node.dataset.active = 'true'
    }
    const onLeave = () => {
      node.dataset.active = 'false'
    }
    const tick = () => {
      frame = requestAnimationFrame(tick)
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      node.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}