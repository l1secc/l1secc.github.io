import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight, CornerDownLeft, Languages, Moon, Search, Sun,
  BookOpenText, Compass, Cpu, Github, Mail, PenLine, Terminal as TerminalIcon, Wrench,
} from 'lucide-react'
import { sectionOrder, socials } from '../data/site'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'

type Entry = { id: string; label: string; hint?: string; group: string; icon: typeof Search; run: () => void }

const sectionIcons: Record<string, typeof Search> = {
  about: Compass,
  focus: Cpu,
  projects: Wrench,
  research: BookOpenText,
  writing: PenLine,
  tooling: Wrench,
  blog: BookOpenText,
  contact: Mail,
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { theme, toggle: toggleTheme } = useTheme()
  const { language, toggle: toggleLanguage } = useLanguage()
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)

  const entries = useMemo<Entry[]>(() => {
    const navigateTo = (path: string) => () => {
      navigate(path)
      onClose()
    }
    const items: Entry[] = sectionOrder.map(({ path, labelKey }) => ({
      id: `go-${path}`,
      label: t(labelKey),
      hint: path,
      group: t('palette.navigate'),
      icon: sectionIcons[path.slice(1)] || Search,
      run: navigateTo(path),
    }))

    items.push(
      {
        id: 'action-theme',
        label: `${t('theme.label')}: ${theme === 'dark' ? t('theme.light') : t('theme.dark')}`,
        group: t('palette.actions'),
        icon: theme === 'dark' ? Sun : Moon,
        run: () => {
          toggleTheme()
          onClose()
        },
      },
      {
        id: 'action-lang',
        label: `${t('a11y.languageToggle')} (${language === 'en' ? 'TR' : 'EN'})`,
        group: t('palette.actions'),
        icon: Languages,
        run: () => {
          toggleLanguage()
          onClose()
        },
      },
      {
        id: 'action-email',
        label: socials.email,
        hint: 'mailto',
        group: t('palette.actions'),
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${socials.email}`
          onClose()
        },
      },
      {
        id: 'action-github',
        label: 'github.com/l1secc/l1secc',
        hint: 'github',
        group: t('palette.actions'),
        icon: Github,
        run: () => {
          window.open(socials.github, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'action-terminal',
        label: t('terminal.welcome'),
        hint: 'hero',
        group: t('palette.actions'),
        icon: TerminalIcon,
        run: () => {
          navigateTo('/')()
          window.setTimeout(() => document.querySelector<HTMLInputElement>('.terminal-input')?.focus(), 420)
        },
      },
    )
    return items
  }, [t, navigate, onClose, theme, language, toggleTheme, toggleLanguage])

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase()
    if (!needle) return entries
    return entries.filter(entry =>
      `${entry.label} ${entry.hint ?? ''} ${entry.group}`.toLocaleLowerCase().includes(needle),
    )
  }, [entries, query])

  useEffect(() => {
    setCursor(0)
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setCursor(0)
      return
    }
    restoreFocus.current = document.activeElement as HTMLElement | null
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      restoreFocus.current?.focus?.()
    }
  }, [open])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setCursor(index => (results.length ? (index + 1) % results.length : 0))
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setCursor(index => (results.length ? (index - 1 + results.length) % results.length : 0))
        return
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        results[cursor]?.run()
        return
      }
      if (event.key === 'Tab') {
        const nodes = listRef.current?.querySelectorAll<HTMLElement>('[data-active="true"]')
        if (!nodes?.length) return
        const index = Array.from(nodes).indexOf(document.activeElement as HTMLElement)
        const next = event.shiftKey ? index - 1 : index + 1
        if (next < 0 || next >= nodes.length) {
          event.preventDefault()
          inputRef.current?.focus()
        }
      }
    },
    [cursor, onClose, results],
  )

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  if (!open) return null

  let lastGroup = ''

  return <div className="palette-backdrop" onMouseDown={onClose} role="presentation">
    <div className="palette" role="dialog" aria-modal="true" aria-label={t('a11y.paletteDialog')} onKeyDown={onKeyDown} onMouseDown={event => event.stopPropagation()}>
      <div className="palette-top"><Search size={15} /><input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder={t('palette.placeholder')} aria-label={t('a11y.paletteInput')} autoComplete="off" spellCheck={false} /><kbd>ESC</kbd></div>
      <ul className="palette-list" ref={listRef} role="listbox" aria-label={t('a11y.paletteInput')}>
        {results.map((entry, index) => {
          const showGroup = entry.group !== lastGroup
          lastGroup = entry.group
          const Icon = entry.icon
          return <li key={entry.id}>
            {showGroup && <span className="palette-group">{entry.group}</span>}
            <button
              type="button"
              role="option"
              aria-selected={index === cursor}
              data-active={index === cursor}
              data-index={index}
              className={index === cursor ? 'is-active' : ''}
              onMouseEnter={() => setCursor(index)}
              onClick={entry.run}
            >
              <Icon size={14} strokeWidth={1.5} />
              <span className="palette-label">{entry.label}</span>
              {entry.hint && <span className="palette-hint">{entry.hint}</span>}
              {index === cursor && <ArrowRight size={13} strokeWidth={1.5} />}
            </button>
          </li>
        })}
        {!results.length && <li className="palette-empty">{t('palette.empty')}</li>}
      </ul>
      <div className="palette-foot"><span>{t('palette.hint')}</span><span><CornerDownLeft size={11} /> ↵</span></div>
    </div>
  </div>
}