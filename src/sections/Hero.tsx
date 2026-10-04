import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import TerminalCard from '../components/TerminalCard'
import networkVisual from '../assets/network-visual.svg'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return <section className="hero section-shell" id="home">
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-mark" /> CYBERSECURITY <b>·</b> TECHNOLOGY <b>·</b> RESEARCH</p>
      <h1>{t('hero.title')} <em>{t('hero.titleHighlight')}</em></h1>
      <p className="hero-description">{t('hero.description')}</p>
      <div className="hero-actions"><Link className="button-primary" to="/projects">{t('hero.cta')} <ArrowDown size={15} /></Link><Link className="button-text" to="/blog">Read the blog <ArrowUpRight size={15} /></Link></div>
      <div className="hero-status"><span className="status-dot" /> {t('hero.status')}</div>
    </div>
    <div className="hero-aside"><img className="hero-network" src={networkVisual} alt="Abstract network topology diagram representing interconnected systems" /><div className="hero-index"><span>INDEPENDENT PRACTICE</span><span>01 — 06</span></div><TerminalCard /></div>
    <Link className="scroll-cue" to="/about" aria-label="Go to about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></Link>
  </section>
}
