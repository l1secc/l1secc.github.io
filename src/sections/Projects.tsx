import { ArrowUpRight, Blocks } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/site'

export default function Projects() {
  return <section className="projects section-shell section-pad" id="projects">
    <SectionHeading index="03" title="Selected work." detail="Built to answer a question, test an idea, or learn something new." />
    {projects.length ? <div className="project-grid">{projects.map(project => <article className="project-card" key={project.title}>
      {project.image && <img src={project.image} alt="" />}<div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.github && <a href={project.github}>Source <ArrowUpRight size={14} /></a>}{project.demo && <a href={project.demo}>Live demo <ArrowUpRight size={14} /></a>}</div></div>
    </article>)}</div> : <div className="empty-state"><Blocks size={21} strokeWidth={1.3} /><div><span className="empty-label">WORK IN PROGRESS</span><h3>The next experiment starts here.</h3><p>Projects will appear here as they take shape. No placeholders, just work worth sharing.</p></div><span className="empty-coordinate">[ 00 · 00 · 00 ]</span></div>}
  </section>
}
