import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
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

function GitHubPagesRedirect() {
  const location = useLocation()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const redirectPath = searchParams.get('p')
    if (redirectPath) {
      window.history.replaceState(null, '', redirectPath)
    }
  }, [location])
  return null
}

function HomePage() {
  return <><Hero /><About /><Focus /><Projects /><Research /><Writing /><Tooling /><Contact /></>
}

export default function App() {
  return <BrowserRouter>
    <GitHubPagesRedirect />
    <Navigation />
    <main>
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
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
}
