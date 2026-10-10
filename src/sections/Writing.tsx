import { ArrowUpRight, NotebookPen } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { articles } from '../data/site'
import { useTranslation } from 'react-i18next'

export default function Writing() {
  const { t } = useTranslation()
  return <section className="writing section-shell section-pad" id="writing">
    <SectionHeading index="05" title={t('writing.title')} detail={t('writing.detail')} />
    {articles.length ? <div className="article-list">{articles.map(article => <a className="article-row" href={article.href} key={article.title} target="_blank" rel="noopener noreferrer">
      <time>{article.date}</time><span className="article-category">{article.category}</span><h3>{article.title}</h3><span>{article.readingTime}</span><ArrowUpRight size={15} strokeWidth={1.5} />
    </a>)}</div> : <Reveal className="writing-empty">
      <NotebookPen size={20} strokeWidth={1.4} />
      <div><span className="empty-label">{t('writing.emptyLabel')}</span><p>{t('writing.emptyBody')}</p></div>
    </Reveal>}
  </section>
}