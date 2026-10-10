import type { ElementType, ReactNode } from 'react'
import { useInView, usePrefersReducedMotion } from '../hooks/useObserver'

type Variant = 'up' | 'left' | 'right' | 'scale'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  id?: string
  variant?: Variant
}

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, id, variant = 'up' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    const Plain = Tag
    return <Plain className={className} id={id}>{children}</Plain>
  }

  return <Tag
    ref={ref}
    id={id}
    className={`reveal reveal--${variant} ${inView ? 'is-visible' : ''} ${className}`.trim()}
    style={delay ? { transitionDelay: `${delay}ms` } : undefined}
  >{children}</Tag>
}
