import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Languages, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { sectionOrder } from '../data/site'
import { useTheme } from '../hooks/useTheme'
import { useLanguage, type Lang } from '../hooks/useLanguage'
import { useScrollProgress, useScrollSpy } from '../hooks/useObserver'
import ScrollProgress from './ScrollProgress'

const spyIds = sectionOrder.map(s => s.id).join('|')
const isApple = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent)

export default function Navigation({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()
  const { toggle: toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const progress = useScrollProgress()
  const activeSection = useScrollSpy(spyIds.split('|'))
  const navRef = useRef<HTMLElement>(null)

  const links = sectionOrder

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const onHome = location.pathname === '/'

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} ref={navRef}>
    <ScrollProgress />
    <Link className="wordmark" to="/" aria-label={t('nav.home')}>
      <span>K.</span><i>SECURITY &amp; SYSTEMS</i>
    </Link>

    <nav className={open ? 'main-nav is-open' : 'main-nav'} id="main-nav" aria-label={t('a11y.main')}>
      {links.map(({ path, labelKey }) => {
        const label = t(labelKey)
        const id = path.slice(1)
        const isActive = onHome ? activeSection === id : location.pathname === path
        return <NavLink key={path} to={path} onClick={() => setOpen(false)} className={isActive ? 'is-current' : undefined}>{label}</NavLink>
      })}

      <div className="nav-controls">
        <button type="button" className="lang-toggle" onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')} aria-label={t('a11y.languageToggle')} title={t('a11y.languageToggle')}>
          <Languages size={13} strokeWidth={1.5} />
          {(['en', 'tr'] as Lang[]).map(code => (
            <span key={code} className={language === code ? 'is-on' : undefined}>{code.toUpperCase()}</span>
          ))}
        </button>
        <button type="button" className="icon-toggle theme-toggle" onClick={toggleTheme} aria-label={t('a11y.themeToggle')} title={t('a11y.themeToggle')}>
          <Sun className="theme-icon-light" size={15} strokeWidth={1.5} />
          <Moon className="theme-icon-dark" size={15} strokeWidth={1.5} />
        </button>
        <button type="button" className="icon-toggle palette-trigger" onClick={onOpenPalette} aria-label={t('a11y.commandPalette')} title={t('a11y.commandPalette')}>
          <Search size={15} strokeWidth={1.5} />
          <kbd>{isApple ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
      </div>

      <Link className="nav-social" to="/contact" onClick={() => setOpen(false)}>{t('nav.social')} <ArrowUpRight size={13} /></Link>
    </nav>

    <div className="nav-mobile-controls">
      <button type="button" className="icon-toggle" onClick={toggleTheme} aria-label={t('a11y.themeToggle')}>
        <Sun className="theme-icon-light" size={16} strokeWidth={1.5} />
        <Moon className="theme-icon-dark" size={16} strokeWidth={1.5} />
      </button>
      <button type="button" className="menu-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')} aria-expanded={open} aria-controls="main-nav">
        {open ? <X /> : <Menu />}
      </button>
    </div>

    <span className="nav-progress" aria-hidden="true">{String(Math.round(progress * 100)).padStart(2, '0')}</span>
  </header>
}