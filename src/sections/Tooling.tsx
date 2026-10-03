import { Cable } from 'lucide-react'
import { tooling } from '../data/site'

export default function Tooling() {
  return <section className="tooling section-shell"><div className="tooling-head"><span><Cable size={15} /> TOOLS ALONG THE WAY</span><p>A working toolkit, updated as I learn.</p></div><div className="tooling-list">{tooling.length ? tooling.map((tool, i) => <span key={tool}>{tool}{i < tooling.length - 1 && <i>·</i>}</span>) : <span className="tooling-prompt">Tool list ready to personalize as your practice takes shape.</span>}</div></section>
}
