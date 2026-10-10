import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { focusAreas } from '../data/site'
import { useTranslation } from 'react-i18next'

export default function Focus() {
  const { t } = useTranslation()
  return <section className="focus section-shell section-pad" id="focus">
    <SectionHeading index="02" title={t('focus.heading')} detail={t('focus.detail')} />
    <Reveal className="focus-grid">{focusAreas.map(({ number, key, icon: Icon }) => <TiltCard as="article" className="focus-card" key={number}>
      <div className="focus-card-top"><span>{number}</span><Icon size={18} strokeWidth={1.5} /></div>
      <h3>{t(`focus.${key}.title`)}</h3>
      <p>{t(`focus.${key}.description`)}</p>
      <span className="focus-rule" />
    </TiltCard>)}</Reveal>
  </section>
}