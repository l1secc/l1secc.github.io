import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/useObserver'

type Props = { children: ReactNode; className?: string; strength?: number }

export default function Magnetic({ children, className = '', strength = 0.26 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = (event: ReactPointerEvent) => {
    const node = ref.current
    if (!node || reduced || event.pointerType !== 'mouse') return
    const rect = node.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    node.style.transform = `translate3d(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px, 0)`
  }

  const onPointerLeave = () => {
    const node = ref.current
    if (node) node.style.transform = ''
  }

  return <span ref={ref} className={`magnetic ${className}`.trim()} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>{children}</span>
}
