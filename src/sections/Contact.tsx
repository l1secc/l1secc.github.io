import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { socials } from '../data/site'

export default function Contact() {
  const links = [
    { label: 'GitHub', href: socials.github, icon: Github }, { label: 'Email', href: socials.email ? `mailto:${socials.email}` : '', icon: Mail }, { label: 'LinkedIn', href: socials.linkedin, icon: Linkedin },
  ]
  return <section className="contact section-shell section-pad" id="contact">
    <SectionHeading index="06" title="Let's build something interesting." />
    <div className="contact-bottom"><p>Interested in security, systems, or an idea worth exploring? I’m always glad to connect and learn from people building thoughtful things.</p><div className="contact-links">{links.map(({ label, href, icon: Icon }) => href ? <a href={href} key={label} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon size={16} /> {label}<ArrowUpRight size={13} /></a> : <span className="contact-placeholder" key={label}><Icon size={16} /> {label}<i>ADD LINK</i></span>)}</div></div>
  </section>
}
