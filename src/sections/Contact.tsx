import { ArrowUpRight, Github, Linkedin, Mail, Instagram, Twitter } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { socials } from '../data/site'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const links = [
    { label: 'GitHub', href: socials.github, icon: Github },
    { label: 'LinkedIn', href: socials.linkedin, icon: Linkedin },
    { label: 'Instagram', href: socials.instagram, icon: Instagram },
    { label: 'X', href: socials.x, icon: Twitter },
    { label: 'Email', href: socials.email ? `mailto:${socials.email}` : '', icon: Mail },
  ]
  return <section className="contact section-shell section-pad" id="contact">
    <SectionHeading index="06" title={t('contact.title')} />
    <div className="contact-bottom"><p>{t('contact.description')}</p><div className="contact-links">{links.map(({ label, href, icon: Icon }) => href ? <a href={href} key={label} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon size={16} /> {label}<ArrowUpRight size={13} /></a> : <span className="contact-placeholder" key={label}><Icon size={16} /> {label}<i>ADD LINK</i></span>)}</div></div>
  </section>
}
