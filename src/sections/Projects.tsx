import { ArrowUpRight, Blocks } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { projects } from '../data/site'
import { useTranslation } from 'react-i18next'

export default function Projects() {
  const { t } = useTranslation()
  return <section className="projects section-shell section-pad" id="projects">
    <SectionHeading index="03" title={t('projects.title')} detail={t('projects.detail')} />
    {projects.length ? <div className="project-grid">{projects.map(project => <article className="project-card" key={project.title}>
      {project.image && <img src={project.image} alt="" loading="lazy" decoding="async" />}
      <div className="project-info">
        <div><h3>{project.title}</h3><p>{project.description}</p></div>
        <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">{t('projects.source')} <ArrowUpRight size={14} /></a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{t('projects.demo')} <ArrowUpRight size={14} /></a>}
        </div>
      </div>
    </article>)}</div> : <Reveal className="empty-state">
      <Blocks size={21} strokeWidth={1.3} className="empty-pulse" />
      <div>
        <span className="empty-label">{t('projects.emptyLabel')}</span>
        <h3>{t('projects.emptyTitle')}</h3>
        <p>{t('projects.emptyBody')}</p>
      </div>
      <span className="empty-coordinate">{t('projects.emptyCoordinate')}</span>
    </Reveal>}
  </section>
}