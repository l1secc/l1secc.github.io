import { ArrowUpRight, Github, Linkedin, Mail, Instagram, Twitter } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
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
    <div className="contact-bottom">
      <Reveal as="p" delay={80}>{t('contact.description')}</Reveal>
      <Reveal className="contact-links" delay={160} variant="right">
        {links.map(({ label, href, icon: Icon }) => href
          ? <a href={href} key={label} target={label === 'Email' ? undefined : '_blank'} rel="noopener noreferrer nofollow">
              <Icon size={16} strokeWidth={1.5} /> {label}<ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          : <span className="contact-placeholder" key={label}>
              <Icon size={16} strokeWidth={1.5} /> {label}<i>{t('contact.addLink')}</i>
            </span>)}
      </Reveal>
    </div>
  </section>
}