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

export default function App() {
  return <><Navigation /><main><Hero /><About /><Focus /><Projects /><Research /><Writing /><Tooling /><Contact /></main><Footer /></>
}
