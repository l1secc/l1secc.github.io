import ScrambleText from './ScrambleText'
import { SECTION_COUNT } from '../data/site'

type Props = { index: string; title: string; detail?: string }

export default function SectionHeading({ index, title, detail }: Props) {
  const label = index === 'BLOG' ? index : `${index} / ${SECTION_COUNT}`
  return <div className="section-heading">
    <ScrambleText className="section-index" text={label} />
    <div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>
  </div>
}
