import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../hooks/useObserver'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—/#'

type Props = { text: string; className?: string; speed?: number }

export default function ScrambleText({ text, className, speed = 2 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduced || !inView) {
      setDisplay(text)
      return
    }
    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 1
      const revealed = Math.floor(frame / speed)
      if (revealed >= text.length) {
        setDisplay(text)
        return
      }
      setDisplay(text.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < revealed) return char
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }).join(''))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, text, speed])

  return <span ref={ref} className={className}>{display}</span>
}
