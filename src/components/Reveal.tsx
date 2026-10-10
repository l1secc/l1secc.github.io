import type { ElementType, ReactNode } from 'react'
import { useInView, usePrefersReducedMotion } from '../hooks/useObserver'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  id?: string
}

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, id }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    const Plain = Tag
    return <Plain className={className} id={id}>{children}</Plain>
  }

  return <Tag
    ref={ref}
    id={id}
    className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
    style={delay ? { transitionDelay: `${delay}ms` } : undefined}
  >{children}</Tag>
}