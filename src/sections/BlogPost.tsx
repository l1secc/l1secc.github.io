import { ArrowLeft, Calendar } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import type { BlogPost } from '../lib/blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      if (!slug) return
      try {
        const response = await fetch(`/content/blog/${slug}.md`)
        if (response.ok) {
          const content = await response.text()
          const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
          if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1]
            const body = frontMatterMatch[2]
            const meta: Partial<BlogPost> = {}
            frontMatter.split('\n').forEach(line => {
              const match = line.match(/^(\w+):\s*(.*)$/)
              if (match) {
                const [, key, value] = match
                meta[key as keyof BlogPost] = value
              }
            })
            setPost({
              title: meta.title || '',
              date: meta.date || '',
              category: meta.category || '',
              image: meta.image,
              body,
              slug
            })
          }
        }
      } catch (error) {
        console.error('Failed to load blog post:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading) {
    return <section className="blog-post section-shell section-pad">
      <div>Loading...</div>
    </section>
  }

  if (!post) {
    return <section className="blog-post section-shell section-pad">
      <div>Post not found</div>
    </section>
  }

  return <section className="blog-post section-shell section-pad">
    <Link to="/blog" className="back-link">
      <ArrowLeft size={16} /> Back to Blog
    </Link>
    <article className="blog-article">
      <header className="blog-header">
        <div className="blog-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-date">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <h1>{post.title}</h1>
      </header>
      {post.image && <img src={post.image} alt={post.title} className="blog-image" />}
      <div className="blog-content">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  </section>
}