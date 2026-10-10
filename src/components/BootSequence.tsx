import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const BOOT_KEY = 'kerem.booted'

function shouldBoot() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(BOOT_KEY) !== '1'
  } catch {
    return false
  }
}

export default function BootSequence() {
  const { t } = useTranslation()
  const [active, setActive] = useState(shouldBoot)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!active) return
    const root = document.documentElement
    root.classList.add('is-booting')

    let finished = false
    let leaveTimer = 0
    const finish = () => {
      if (finished) return
      finished = true
      try {
        sessionStorage.setItem(BOOT_KEY, '1')
      } catch {
        void 0
      }
      setLeaving(true)
      leaveTimer = window.setTimeout(() => setActive(false), 640)
    }

    const timer = window.setTimeout(finish, 2400)
    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)
    window.addEventListener('wheel', finish, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(leaveTimer)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
      window.removeEventListener('wheel', finish)
      root.classList.remove('is-booting')
    }
  }, [active])

  if (!active) return null

  const lines = [t('boot.line1'), t('boot.line2'), t('boot.line3'), t('boot.line4'), t('boot.line5')]

  return <div className={`boot${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
    <div className="boot-inner">
      <div className="boot-bar"><span /></div>
      <ul className="boot-log">
        {lines.map((line, index) => <li key={line} style={{ animationDelay: `${index * 300}ms` }}>{line}</li>)}
      </ul>
      <p className="boot-status">{t('boot.status')}</p>
      <p className="boot-skip">{t('boot.skip')}</p>
    </div>
  </div>
}
