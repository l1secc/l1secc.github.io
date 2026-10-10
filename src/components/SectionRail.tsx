import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sectionOrder } from '../data/site'
import { usePrefersReducedMotion, useScrollSpy } from '../hooks/useObserver'

const railItems = sectionOrder.filter(section => section.id !== 'blog')
const railIds = railItems.map(section => section.id)

export default function SectionRail() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()
  const active = useScrollSpy(railIds)

  if (pathname !== '/') return null

  return <nav className="section-rail" aria-label={t('a11y.main')}>
    {railItems.map(({ id, labelKey }) => <button
      key={id}
      type="button"
      className={active === id ? 'is-active' : undefined}
      aria-current={active === id ? 'true' : undefined}
      aria-label={t(labelKey)}
      onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}
    >
      <span className="rail-label">{t(labelKey)}</span>
      <span className="rail-dot" />
    </button>)}
  </nav>
}
