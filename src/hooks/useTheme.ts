import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'kerem.theme'
const listeners = new Set<(theme: Theme) => void>()

function read(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f7f4' : '#101110')
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* storage blocked — theme still applies for this session */
  }
  root.classList.add('is-theming')
  window.setTimeout(() => root.classList.remove('is-theming'), 420)
  listeners.forEach(fn => fn(theme))
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    setTheme(read())
    const onChange = (next: Theme) => setTheme(next)
    listeners.add(onChange)
    return () => {
      listeners.delete(onChange)
    }
  }, [])

  const toggle = useCallback(() => {
    applyTheme(read() === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggle, setTheme: applyTheme }
}