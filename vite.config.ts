import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-src 'self'",
  "upgrade-insecure-requests"
].join('; ')

function cspPlugin(): Plugin {
  return {
    name: 'inject-csp',
    apply: 'build',
    transformIndexHtml() {
      return [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' }]
    }
  }
}

const BLOG_DIR = 'public/content/blog'
const BLOG_INDEX_URL = '/content/blog/posts.json'
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,120}$/i

interface BlogIndexEntry {
  slug: string
  title: string
  date: string
  category: string
  readingTime: number
  image?: string
  excerpt?: string
}

function parseFrontMatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return null
  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const parsed = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (parsed) meta[parsed[1].toLowerCase()] = parsed[2].trim().replace(/^["']|["']$/g, '')
  }
  return { meta, body: match[2] }
}

function readPost(file: string): BlogIndexEntry | null {
  const slug = path.basename(file).replace(/\.md$/i, '')
  if (!SLUG_PATTERN.test(slug)) return null
  const parsed = parseFrontMatter(fs.readFileSync(file, 'utf8'))
  if (!parsed) return null
  const words = parsed.body.trim().split(/\s+/).filter(Boolean).length
  const entry: BlogIndexEntry = {
    slug,
    title: parsed.meta.title || slug,
    date: parsed.meta.date || '',
    category: parsed.meta.category || '',
    readingTime: Math.max(1, Math.round(words / 200)),
  }
  if (parsed.meta.image) entry.image = parsed.meta.image
  if (parsed.meta.excerpt) entry.excerpt = parsed.meta.excerpt
  return entry
}

function buildBlogIndex(blogDir: string): BlogIndexEntry[] {
  if (!fs.existsSync(blogDir)) return []
  return fs.readdirSync(blogDir)
    .filter(name => name.endsWith('.md') && !name.startsWith('_') && !name.startsWith('.'))
    .map(name => readPost(path.join(blogDir, name)))
    .filter((entry): entry is BlogIndexEntry => entry !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function blogIndexPlugin(): Plugin {
  let blogDir = ''
  const serialize = () => JSON.stringify(buildBlogIndex(blogDir), null, 2)
  return {
    name: 'blog-index',
    configResolved(config) {
      blogDir = path.resolve(config.root, BLOG_DIR)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.url ?? '').split('?')[0] !== BLOG_INDEX_URL) return next()
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(serialize())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: BLOG_INDEX_URL.slice(1), source: serialize() })
    }
  }
}

export default defineConfig({
  plugins: [react(), cspPlugin(), blogIndexPlugin()],
  base: '/',
  build: {
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'rehype-sanitize']
        }
      }
    }
  }
})
