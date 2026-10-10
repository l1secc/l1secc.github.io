import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import type { BlogPost } from '../lib/blog'
import { formatDate, getBlogPost, readingMinutes } from '../lib/blog'

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
    img: [...(defaultSchema.attributes?.img ?? []), 'loading', 'decoding'],
  },
  clobber: ['name', 'id'],
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    getBlogPost(slug ?? '').then(result => {
      if (!active) return
      setPost(result)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    document.title = post?.title ? `${post.title} — Kerem` : 'Kerem — Security, Systems & Technology'
    return () => {
      document.title = 'Kerem — Security, Systems & Technology'
    }
  }, [post])

  if (loading) {
    return <section className="blog-post section-shell section-pad">
      <div className="blog-empty"><span className="loader" aria-hidden="true" /><span>{t('blog.loading')}</span></div>
    </section>
  }

  if (!post) {
    return <section className="blog-post section-shell section-pad">
      <Link to="/blog" className="back-link"><ArrowLeft size={16} strokeWidth={1.5} /> {t('blog.back')}</Link>
      <div className="blog-empty">
        <div><span className="empty-label">{t('blog.notFoundLabel')}</span><p>{t('blog.notFoundBody')}</p></div>
      </div>
    </section>
  }

  return <section className="blog-post section-shell section-pad">
    <Link to="/blog" className="back-link"><ArrowLeft size={16} strokeWidth={1.5} /> {t('blog.back')}</Link>
    <article className="blog-article">
      <Reveal as="header" className="blog-header">
        <div className="blog-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date"><Calendar size={14} strokeWidth={1.5} />{formatDate(post.date, i18n.resolvedLanguage || 'en', 'long')}</span>
          <span className="blog-date"><Clock size={14} strokeWidth={1.5} />{t('blog.minutes', { count: readingMinutes(post.body) })}</span>
        </div>
        <h1>{post.title}</h1>
      </Reveal>
      {post.image && <img src={post.image} alt={post.title} className="blog-image" loading="lazy" decoding="async" />}
      <Reveal className="blog-content">
        <ReactMarkdown rehypePlugins={[[rehypeSanitize, schema]]} skipHtml>{post.body}</ReactMarkdown>
      </Reveal>
    </article>
  </section>
}