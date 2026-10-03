import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  ['About', '#about'], ['Focus', '#focus'], ['Projects', '#projects'],
  ['Research', '#research'], ['Writing', '#writing'], ['Contact', '#contact'],
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label="Kerem, home"><span>K.</span><i>SECURITY & SYSTEMS</i></a>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      {links.map(([label, href]) => <a key={href} onClick={() => setOpen(false)} href={href}>{label}</a>)}
      <a className="nav-social" href="#contact">Social <ArrowUpRight size={13} /></a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </header>
}
