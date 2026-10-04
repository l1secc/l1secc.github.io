export interface BlogPost {
  title: string
  date: string
  category: string
  image?: string
  body: string
  slug: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/content/blog/posts.json')
    if (!response.ok) return []
    return response.json()
  } catch {
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/content/blog/${slug}.md`)
    if (!response.ok) return null
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
      return {
        title: meta.title || '',
        date: meta.date || '',
        category: meta.category || '',
        image: meta.image,
        body,
        slug
      }
    }
    return null
  } catch {
    return null
  }
}
