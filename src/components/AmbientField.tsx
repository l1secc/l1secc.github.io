import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useObserver'

export default function AmbientField() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5
      targetY = event.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      frame = requestAnimationFrame(tick)
      x += (targetX - x) * 0.045
      y += (targetY - y) * 0.045
      node.style.setProperty('--ax', x.toFixed(4))
      node.style.setProperty('--ay', y.toFixed(4))
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  return <div className="ambient" ref={ref} aria-hidden="true">
    <span className="ambient-grid" />
    <span className="ambient-blob blob-a" />
    <span className="ambient-blob blob-b" />
    <span className="ambient-blob blob-c" />
  </div>
}
