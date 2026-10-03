type Props = { index: string; title: string; detail?: string }

export default function SectionHeading({ index, title, detail }: Props) {
  return <div className="section-heading">
    <span className="section-index">{index} / 06</span>
    <div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>
  </div>
}
