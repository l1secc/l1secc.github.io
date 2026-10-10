export interface BlogPost {
  title: string
  date: string
  category: string
  image?: string
  body: string
  slug: string
  excerpt?: string
  readingTime?: string
}

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,120}$/i
const BASE = import.meta.env.BASE_URL || '/'

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && SLUG_PATTERN.test(slug)
}

function contentUrl(path: string) {
  return `${BASE.replace(/\/$/, '')}/content/blog/${path}`
}

export function isSafeUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value) return false
  if (/^\s*javascript:/i.test(value) || /^\s*data:/i.test(value) || /^\s*vbscript:/i.test(value)) return false
  return true
}

function parseFrontMatter(source: string, slug: string): BlogPost | null {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return null
  const meta: Record<string, string> = {}
  match[1].split(/\r?\n/).forEach(line => {
    const parsed = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!parsed) return
    meta[parsed[1].toLowerCase()] = parsed[2].trim().replace(/^["']|["']$/g, '')
  })
  return {
    title: meta.title || '',
    date: meta.date || '',
    category: meta.category || '',
    image: isSafeUrl(meta.image) ? meta.image : undefined,
    excerpt: meta.excerpt,
    readingTime: meta.readingtime,
    body: match[2],
    slug,
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(contentUrl('posts.json'), { cache: 'no-cache' })
    if (!response.ok) return []
    const data: unknown = await response.json()
    if (!Array.isArray(data)) return []
    return data
      .filter((item): item is BlogPost => Boolean(item) && typeof item === 'object')
      .map(item => ({ ...item, slug: isValidSlug(item.slug) ? item.slug : '' }))
      .filter(item => item.slug !== '')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!isValidSlug(slug)) return null
  try {
    const response = await fetch(contentUrl(`${slug}.md`), { cache: 'no-cache' })
    if (!response.ok) return null
    return parseFrontMatter(await response.text(), slug)
  } catch {
    return null
  }
}

export function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(date: string, locale: string, style: 'short' | 'long' = 'short') {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    ...(style === 'long' ? { month: 'long' as const } : { month: 'short' as const }),
    day: 'numeric',
  })
}