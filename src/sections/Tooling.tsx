import { Cable } from 'lucide-react'
import Reveal from '../components/Reveal'
import { tooling } from '../data/site'
import { useTranslation } from 'react-i18next'

export default function Tooling() {
  const { t } = useTranslation()
  return <Reveal className="tooling section-shell" delay={60}>
    <div className="tooling-head"><span><Cable size={15} strokeWidth={1.5} /> {t('tooling.label')}</span><p>{t('tooling.description')}</p></div>
    <div className="tooling-list">
      {tooling.length
        ? tooling.map((tool, index) => <span key={tool}>{tool}{index < tooling.length - 1 && <i>·</i>}</span>)
        : <span className="tooling-prompt">{t('tooling.prompt')}</span>}
    </div>
  </Reveal>
}