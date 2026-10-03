import { ArrowDown, ArrowUpRight } from 'lucide-react'
import TerminalCard from '../components/TerminalCard'
import networkVisual from '../assets/network-visual.svg'

export default function Hero() {
  return <section className="hero section-shell" id="home">
    <div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-mark" /> CYBERSECURITY <b>·</b> TECHNOLOGY <b>·</b> RESEARCH</p>
      <h1>Building at the<br className="desktop-break" /> intersection of <em>security,</em><br className="desktop-break" /> systems and technology.</h1>
      <p className="hero-description">Exploring cybersecurity, web security, Linux, programming and AI through a build, break and learn mindset.</p>
      <div className="hero-actions"><a className="button-primary" href="#projects">Explore my work <ArrowDown size={15} /></a><a className="button-text" href="#writing">Read the blog <ArrowUpRight size={15} /></a></div>
      <div className="hero-status"><span className="status-dot" /> Currently learning <span>·</span> building <span>·</span> breaking</div>
    </div>
    <div className="hero-aside"><img className="hero-network" src={networkVisual} alt="Abstract network topology diagram representing interconnected systems" /><div className="hero-index"><span>INDEPENDENT PRACTICE</span><span>01 — 06</span></div><TerminalCard /></div>
    <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
  </section>
}
