import SectionHeading from '../components/SectionHeading'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return <section className="about section-shell section-pad" id="about">
    <SectionHeading index="01" title={t('about.title')} />
    <div className="about-content">
      <p className="about-lead">{t('about.description')}</p>
      <div className="about-notes"><p>Cybersecurity, web security, Linux, red team methodologies, programming, AI and security research all give me a different way to ask the same question: <i>how does this system really work?</i></p><p>I'm learning by experimenting, making small things, and studying what happens when assumptions meet reality. There's always more to understand.</p><span className="annotation">{t('about.annotation')}</span></div>
    </div>
  </section>
}
