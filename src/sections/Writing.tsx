import { ArrowUpRight, NotebookPen } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { articles } from '../data/site'

export default function Writing() {
  return <section className="writing section-shell section-pad" id="writing">
    <SectionHeading index="05" title="Notes & writing." detail="Ideas make more sense when you put them into words." />
    {articles.length ? <div className="article-list">{articles.map(article => <a className="article-row" href={article.href} key={article.title}><time>{article.date}</time><span className="article-category">{article.category}</span><h3>{article.title}</h3><span>{article.readingTime}</span><ArrowUpRight size={15} /></a>)}</div> : <div className="writing-empty"><NotebookPen size={20} strokeWidth={1.4} /><div><span className="empty-label">THE FIRST NOTE IS IN PROGRESS</span><p>Short writeups and practical notes will find a home here soon.</p></div></div>}
  </section>
}
