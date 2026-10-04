import { NotebookPen, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { BlogPost } from '../lib/blog'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/content/blog/posts.json')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return <section className="blog section-shell section-pad">
      <SectionHeading index="BLOG" title="Blog." detail="Thoughts, ideas, and writeups." />
      <div className="blog-empty">
        <span>Loading...</span>
      </div>
    </section>
  }

  if (posts.length === 0) {
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

  return <section className="blog section-shell section-pad">
    <SectionHeading index="BLOG" title="Blog." detail="Thoughts, ideas, and writeups." />
    <div className="article-list">
      {posts.map(post => (
        <Link className="article-row" to={`/blog/${post.slug}`} key={post.slug}>
          <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
          <span className="article-category">{post.category}</span>
          <h3>{post.title}</h3>
          <span>5 min read</span>
          <ArrowUpRight size={15} />
        </Link>
      ))}
    </div>
  </section>
}