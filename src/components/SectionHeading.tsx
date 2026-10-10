import { SECTION_COUNT } from '../data/site'

type Props = { index: string; title: string; detail?: string }

export default function SectionHeading({ index, title, detail }: Props) {
  const total = index === 'BLOG' ? 'BLOG' : SECTION_COUNT
  return <div className="section-heading">
    <span className="section-index">{index}{total === 'BLOG' ? '' : ` / ${total}`}</span>
    <div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>
  </div>
}