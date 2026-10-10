import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useObserver'

type Node = { x: number; y: number; vx: number; vy: number; r: number }

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const host = canvas.parentElement
    if (!host) return

    let width = 0
    let height = 0
    let ratio = 1
    let nodes: Node[] = []
    let frame = 0
    let visible = true
    const pointer = { x: -9999, y: -9999 }

    const palette = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light'
      return {
        line: light ? 'rgba(26,30,24,.34)' : 'rgba(180,188,174,.4)',
        dot: light ? 'rgba(26,30,24,.5)' : 'rgba(206,212,200,.62)',
        accent: light ? 'rgba(164,70,58,.75)' : 'rgba(189,102,89,.9)',
      }
    }
    let colors = palette()

    const density = () => Math.max(28, Math.min(64, Math.round((width * height) / 16000)))

    const seed = () => {
      const count = density()
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.3 + 0.7,
      }))
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      seed()
    }

    const draw = () => {
      frame = requestAnimationFrame(draw)
      if (!visible) return
      ctx.clearRect(0, 0, width, height)
      const linkDistance = Math.max(130, Math.min(210, width / 4.4))

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < -20) a.x = width + 20
        if (a.x > width + 20) a.x = -20
        if (a.y < -20) a.y = height + 20
        if (a.y > height + 20) a.y = -20

        const dxPointer = a.x - pointer.x
        const dyPointer = a.y - pointer.y
        const pointerDist = Math.hypot(dxPointer, dyPointer)
        if (pointerDist < 150 && pointerDist > 0.01) {
          a.x += (dxPointer / pointerDist) * 0.35
          a.y += (dyPointer / pointerDist) * 0.35
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < linkDistance) {
            ctx.strokeStyle = colors.line
            ctx.globalAlpha = (1 - dist / linkDistance) * 0.5
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const near = pointerDist < 150
        ctx.globalAlpha = 1
        ctx.fillStyle = near ? colors.accent : colors.dot
        ctx.beginPath()
        ctx.arc(a.x, a.y, near ? a.r + 0.9 : a.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const onThemeChange = () => {
      colors = palette()
    }

    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true
    })

    const themeObserver = new MutationObserver(onThemeChange)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    resize()
    frame = requestAnimationFrame(draw)
    observer.observe(host)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduced])

  if (reduced) return null
  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />
}