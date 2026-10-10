import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { Trans, useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return <section className="about section-shell section-pad" id="about">
    <SectionHeading index="01" title={t('about.title')} />
    <div className="about-content">
      <Reveal as="p" className="about-lead">{t('about.description')}</Reveal>
      <Reveal className="about-notes" delay={120}>
        <p><Trans i18nKey="about.noteOne" components={{ em: <i /> }} /></p>
        <p>{t('about.noteTwo')}</p>
        <span className="annotation">{t('about.annotation')} <b>{t('about.location')}</b></span>
      </Reveal>
    </div>
  </section>
}