import { ArrowUpRight, BookOpenText } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { useTranslation } from 'react-i18next'

const noteKeys = ['ctf', 'web', 'linux', 'reversing', 'ai'] as const

export default function Research() {
  const { t } = useTranslation()
  return <section className="research section-shell section-pad" id="research">
    <SectionHeading index="04" title={t('research.title')} detail={t('research.detail')} />
    <div className="research-layout">
      <Reveal className="lab-cover" variant="left">
        <div className="lab-cover-top"><BookOpenText size={17} strokeWidth={1.5} /><span>{t('research.coverLabel')}</span><span>{t('research.volume')}</span></div>
        <div className="lab-graphic" aria-hidden="true">
          <span className="lab-ring ring-one" /><span className="lab-ring ring-two" /><span className="lab-ring ring-three" />
          <i className="lab-node node-a" /><i className="lab-node node-b" /><i className="lab-node node-c" /><i className="lab-node node-d" />
          <i className="lab-center" />
          <span className="lab-coordinate co-a">41.0082° N</span>
          <span className="lab-coordinate co-b">29.0122° E</span>
          <span className="lab-sweep" />
        </div>
        <div className="lab-cover-foot"><span>{t('research.coverFootA')}</span><span>{t('research.coverFootB')}</span></div>
      </Reveal>
      <Reveal className="research-index" delay={140} variant="right">
        <span className="empty-label">{t('research.notesLabel')}</span>
        <p>{t('research.notesIntro')}</p>
        {noteKeys.map((key, index) => <div className="research-row" key={key} style={{ transitionDelay: `${index * 55}ms` }}>
          <span>0{index + 1}</span><span>{t(`research.notes.${key}`)}</span><ArrowUpRight size={13} strokeWidth={1.5} />
        </div>)}
      </Reveal>
    </div>
  </section>
}