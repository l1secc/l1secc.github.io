import { NotebookPen } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

export default function Blog() {
  return <section className="blog section-shell section-pad">
    <SectionHeading index="BLOG" title="Blog." detail="Thoughts, ideas, and writeups." />
    <div className="blog-empty">
      <NotebookPen size={40} strokeWidth={1.4} />
      <div>
        <span className="empty-label">COMING SOON</span>
        <p>Blog posts will be published here.</p>
      </div>
    </div>
  </section>
}