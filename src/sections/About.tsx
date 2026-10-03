import SectionHeading from '../components/SectionHeading'

export default function About() {
  return <section className="about section-shell section-pad" id="about">
    <SectionHeading index="01" title="Curious by default." />
    <div className="about-content">
      <p className="about-lead">I’m drawn to the space between <span>how technology is built</span> and how it can be understood, tested and made more secure.</p>
      <div className="about-notes"><p>Cybersecurity, web security, Linux, red team methodologies, programming, AI and security research all give me a different way to ask the same question: <i>how does this system really work?</i></p><p>I’m learning by experimenting, making small things, and studying what happens when assumptions meet reality. There’s always more to understand.</p><span className="annotation">BUILD <b>↗</b> BREAK <b>↗</b> UNDERSTAND</span></div>
    </div>
  </section>
}
