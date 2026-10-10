import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const [year] = useState(() => new Date().getFullYear())
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString(i18n.resolvedLanguage === 'tr' ? 'tr-TR' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }))
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [i18n.resolvedLanguage])

  return <footer className="site-footer section-shell">
    <div className="footer-brand">
      <span>K.</span>
      <span>© {year} Kerem<br />{t('footer.tagline')}</span>
    </div>
    <div className="footer-meta">
      <span className="footer-clock" aria-label={t('a11y.localTime')}>{time}</span>
      <Link to="/" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {t('footer.backToTop')} <ArrowUp size={13} strokeWidth={1.5} />
      </Link>
    </div>
  </footer>
}