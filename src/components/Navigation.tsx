import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  ['About', '/about'], ['Focus', '/focus'], ['Projects', '/projects'],
  ['Research', '/research'], ['Writing', '/writing'], ['Blog', '/blog'], ['Contact', '/contact'],
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Link className="wordmark" to="/" aria-label="Kerem, home"><span>K.</span><i>SECURITY & SYSTEMS</i></Link>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      {links.map(([label, href]) => <Link key={href} onClick={() => setOpen(false)} to={href}>{label}</Link>)}
      <Link className="nav-social" to="/contact">Social <ArrowUpRight size={13} /></Link>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </header>
}
