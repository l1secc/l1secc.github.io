import { useTranslation } from 'react-i18next'

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const { t } = useTranslation()
  const raw = t('marquee.items', { returnObjects: true }) as unknown
  const items = Array.isArray(raw) ? (raw as string[]) : []

  const group = <div className="marquee-group">
    {items.map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item}<i>◆</i></span>)}
  </div>

  return <div className={`marquee${reverse ? ' is-reverse' : ''}`} aria-hidden="true">
    <div className="marquee-track">{group}{group}</div>
  </div>
}
