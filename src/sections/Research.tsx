import { ArrowUpRight, BookOpenText } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const futureNotes = ['CTF writeups', 'Web security experiments', 'Linux & tooling', 'Reverse engineering', 'AI security']
export default function Research() {
  return <section className="research section-shell section-pad" id="research">
    <SectionHeading index="04" title="The lab notebook." detail="An open record of questions, tests, and things learned along the way." />
    <div className="research-layout"><div className="lab-cover"><div className="lab-cover-top"><BookOpenText size={17} /><span>RESEARCH JOURNAL</span><span>VOL. 01</span></div><div className="lab-graphic" aria-hidden="true"><span className="lab-ring ring-one" /><span className="lab-ring ring-two" /><span className="lab-ring ring-three" /><i className="lab-node node-a" /><i className="lab-node node-b" /><i className="lab-node node-c" /><i className="lab-node node-d" /><i className="lab-center" /><span className="lab-coordinate co-a">41.0082° N</span><span className="lab-coordinate co-b">29.0122° E</span></div><div className="lab-cover-foot"><span>OBSERVE / TEST / LEARN</span><span>FIELD STUDY SERIES</span></div></div>
      <div className="research-index"><span className="empty-label">NOTES TAKING SHAPE</span><p>Future entries may include:</p>{futureNotes.map((note, i) => <div className="research-row" key={note}><span>0{i + 1}</span><span>{note}</span><ArrowUpRight size={13} /></div>)}</div></div>
  </section>
}
