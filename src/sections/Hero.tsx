import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TerminalCard from '../components/TerminalCard'
import ParticleField from '../components/ParticleField'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import ScrambleText from '../components/ScrambleText'
import networkVisual from '../assets/network-visual.svg'
import { usePrefersReducedMotion } from '../hooks/useObserver'

function SplitTitle({ highlight }: { highlight: string }) {
  const words = highlight.split(' ')
  return <em className="hero-highlight">
    {words.map((word, index) => <span key={`${word}-${index}`}>
      <span className="hero-word"><span style={{ animationDelay: `${140 + index * 70}ms` }}>{word}</span></span>
      {index < words.length - 1 && ' '}
    </span>)}
  </em>
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    if (reduced) return
    const node = sectionRef.current
    if (!node || window.matchMedia('(hover: none)').matches) return
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      node.style.setProperty('--parallax-x', `${x.toFixed(3)}`)
      node.style.setProperty('--parallax-y', `${y.toFixed(3)}`)
    }
    node.addEventListener('pointermove', onMove)
    return () => node.removeEventListener('pointermove', onMove)
  }, [reduced])

  useEffect(() => {
    const tick = () => {
      setGreeting(new Date().toLocaleTimeString(i18n.resolvedLanguage === 'tr' ? 'tr-TR' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }))
    }
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [i18n.resolvedLanguage])

  return <section className="hero section-shell" id="home" ref={sectionRef}>
    <ParticleField />
    {reduced && <img className="hero-network" src={networkVisual} alt="" aria-hidden="true" />}
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-mark" /> {t('hero.eyebrow')}</p>
      <h1>
        {t('hero.title')}{' '}
        <SplitTitle highlight={t('hero.titleHighlight')} />
      </h1>
      <Reveal className="hero-reveal" delay={620}>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-actions">
          <Magnetic><Link className="button-primary" to="/projects">{t('hero.cta')} <ArrowDown size={15} strokeWidth={1.5} /></Link></Magnetic>
          <Link className="button-text" to="/blog">{t('hero.ctaSecondary')} <ArrowUpRight size={15} strokeWidth={1.5} /></Link>
        </div>
        <div className="hero-status"><span className="status-dot" /> {t('hero.status')}</div>
      </Reveal>
    </div>
    <Reveal as="div" className="hero-aside" delay={140}>
      <div className="hero-index"><span>{t('hero.indexA')}</span><ScrambleText text={t('hero.indexB')} /></div>
      <TerminalCard />
    </Reveal>
    <Link className="scroll-cue" to="/about" aria-label={t('a11y.scrollCue')}>
      <span>{t('hero.scrollCue')}</span>
      <ArrowDown size={14} strokeWidth={1.5} />
    </Link>
    <span className="hero-clock" aria-hidden="true">{greeting}</span>
  </section>
}