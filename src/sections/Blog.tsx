import { NotebookPen, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BlogPost } from '../lib/blog'
import { formatDate, getBlogPosts, readingMinutes } from '../lib/blog'

export default function Blog() {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getBlogPosts().then(result => {
      if (!active) return
      setPosts(result)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const heading = <SectionHeading index="BLOG" title={t('blog.title')} detail={t('blog.detail')} />

  if (loading) {
    return <section className="blog section-shell section-pad">
      {heading}
      <div className="blog-empty"><span className="loader" aria-hidden="true" /><span>{t('blog.loading')}</span></div>
    </section>
  }

  if (posts.length === 0) {
    return <section className="blog section-shell section-pad">
      {heading}
      <Reveal className="blog-empty">
        <NotebookPen size={40} strokeWidth={1.4} />
        <div><span className="empty-label">{t('blog.emptyLabel')}</span><p>{t('blog.emptyBody')}</p></div>
      </Reveal>
    </section>
  }

  return <section className="blog section-shell section-pad">
    {heading}
    <Reveal className="article-list">
      {posts.map((post, index) => <Link
        className="article-row"
        to={`/blog/${encodeURIComponent(post.slug)}`}
        key={post.slug}
        style={{ transitionDelay: `${index * 55}ms` }}
      >
        <time>{formatDate(post.date, i18n.resolvedLanguage || 'en')}</time>
        <span className="article-category">{post.category}</span>
        <h3>{post.title}</h3>
        <span>{t('blog.minutes', { count: post.readingTime ?? readingMinutes(post.body ?? '') })}</span>
        <ArrowUpRight size={15} strokeWidth={1.5} />
      </Link>)}
    </Reveal>
  </section>
}