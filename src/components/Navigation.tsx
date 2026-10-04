import { ArrowUpRight, Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const links = [
    [t('nav.about'), '/about'],
    [t('nav.focus'), '/focus'],
    [t('nav.projects'), '/projects'],
    [t('nav.research'), '/research'],
    [t('nav.writing'), '/writing'],
    ['Blog', '/blog'],
    [t('nav.contact'), '/contact'],
  ]

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en'
    i18n.changeLanguage(newLang)
  }

  return <header className="site-header">
    <Link className="wordmark" to="/" aria-label="Kerem, home"><span>K.</span><i>SECURITY & SYSTEMS</i></Link>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      {links.map(([label, href]) => <Link key={href} onClick={() => setOpen(false)} to={href}>{label}</Link>)}
      <Link className="nav-social" to="/contact">Social <ArrowUpRight size={13} /></Link>
      <button
        onClick={toggleLanguage}
        className="lang-toggle"
        aria-label="Toggle language"
        style={{
          marginLeft: '10px',
          padding: '0 10px',
          border: '1px solid var(--line)',
          background: 'transparent',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#666b61'
          e.currentTarget.style.background = '#181a18'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--line)'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        <Globe size={13} />
        {i18n.language.toUpperCase()}
      </button>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </header>
}
