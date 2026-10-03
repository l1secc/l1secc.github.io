import SectionHeading from '../components/SectionHeading'
import { focusAreas } from '../data/site'

export default function Focus() {
  return <section className="focus section-shell section-pad" id="focus">
    <SectionHeading index="02" title="Areas of curiosity." detail="A few of the domains I keep coming back to." />
    <div className="focus-grid">{focusAreas.map(({ number, title, description, icon: Icon }) => <article className="focus-card" key={number}>
      <div className="focus-card-top"><span>{number}</span><Icon size={18} strokeWidth={1.5} /></div>
      <h3>{title}</h3><p>{description}</p><span className="focus-rule" />
    </article>)}</div>
  </section>
}
