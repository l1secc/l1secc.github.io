import { createElement, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/useObserver'

type Props = {
  children: ReactNode
  className?: string
  as?: 'article' | 'div' | 'li'
  max?: number
}

export default function TiltCard({ children, className = '', as = 'div', max = 6 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = (event: ReactPointerEvent) => {
    const node = ref.current
    if (!node || reduced || event.pointerType !== 'mouse') return
    const rect = node.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
    node.style.setProperty('--rx', `${((0.5 - py) * max).toFixed(2)}deg`)
    node.style.setProperty('--ry', `${((px - 0.5) * max).toFixed(2)}deg`)
    node.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    node.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }

  const onPointerLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
  }

  return createElement(as, {
    ref,
    className: `tiltable ${className}`.trim(),
    onPointerMove,
    onPointerLeave,
  }, children)
}
