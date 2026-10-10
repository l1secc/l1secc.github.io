import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import Navigation from './components/Navigation'
import CommandPalette from './components/CommandPalette'
import CursorGlow from './components/CursorGlow'
import About from './sections/About'
import Contact from './sections/Contact'
import Focus from './sections/Focus'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Research from './sections/Research'
import Tooling from './sections/Tooling'
import Writing from './sections/Writing'
import Blog from './sections/Blog'
import BlogPost from './sections/BlogPost'

function unescape(value: string) {
  return value.replace(/~and~/g, '&').replace(/~q~/g, '?').replace(/~h~/g, '#')
}

/**
 * Only same-origin, absolute app paths are accepted. Anything that could escape
 * the origin — protocol-relative "//host", backslashes, control characters,
 * a missing leading slash — is discarded.
 */
function safePath(value: string | null): string | null {
  if (!value) return null
  const decoded = unescape(value)
  if (!/^\/(?!\/)/.test(decoded)) return null
  if (decoded.includes('\\')) return null
  if (/[\x00-\x1f]/.test(decoded)) return null
  if (/^\/+[a-z][a-z0-9+.-]*:/i.test(decoded)) return null
  return decoded
}

function safeQuery(value: string | null): string {
  if (!value) return ''
  const decoded = unescape(value)
  return /[\x00-\x1f<>"']/.test(decoded) ? '' : decoded
}

function safeHash(value: string | null): string {
  if (!value) return ''
  return /[\x00-\x1f<>"'\\]/.test(value) ? '' : value
}

function GitHubPagesRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.search) return
    const params = new URLSearchParams(location.search)
    const path = safePath(params.get('p'))
    const query = safeQuery(params.get('q'))
    const hash = safeHash(params.get('h'))

    if (!path) {
      if (params.has('p')) navigate(`${location.pathname}${query ? `?${query}` : ''}`, { replace: true })
      return
    }

    const target = `${path}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
    window.history.replaceState(null, '', target)
    navigate(target, { replace: true })
  }, [location, navigate])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const node = document.querySelector(hash)
      if (node) {
        node.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

function NotFound() {
  const { t } = useTranslation()
  return <section className="not-found section-shell section-pad">
    <span className="section-index">ERROR / 404</span>
    <h1>Lost in the noise.</h1>
    <p>{t('blog.notFoundBody')}</p>
    <Link className="button-primary" to="/"><ArrowLeft size={15} strokeWidth={1.5} /> {t('nav.home')}</Link>
  </section>
}

function HomePage() {
  return <><Hero /><About /><Focus /><Projects /><Research /><Writing /><Tooling /><Contact /></>
}

function Shell() {
  const { t } = useTranslation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setPaletteOpen(value => !value)
      }
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) {
        event.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return <>
    <a className="skip-link" href="#main">{t('a11y.skip')}</a>
    <GitHubPagesRedirect />
    <ScrollToTop />
    <CursorGlow />
    <Navigation onOpenPalette={openPalette} />
    <main id="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<><Hero /><About /></>} />
        <Route path="/focus" element={<><Hero /><Focus /></>} />
        <Route path="/projects" element={<><Hero /><Projects /></>} />
        <Route path="/research" element={<><Hero /><Research /></>} />
        <Route path="/writing" element={<><Hero /><Writing /></>} />
        <Route path="/tooling" element={<><Hero /><Tooling /></>} />
        <Route path="/contact" element={<><Hero /><Contact /></>} />
        <Route path="/blog" element={<><Hero /><Blog /></>} />
        <Route path="/blog/:slug" element={<><Hero /><BlogPost /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <CommandPalette open={paletteOpen} onClose={closePalette} />
  </>
}

export default function App() {
  return <BrowserRouter>
    <Shell />
  </BrowserRouter>
}