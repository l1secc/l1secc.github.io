import type { LucideIcon } from 'lucide-react'
import { Bot, Code2, Crosshair, Eye, Fingerprint, Terminal } from 'lucide-react'

export type FocusArea = { number: string; key: string; icon: LucideIcon }
export type Project = { title: string; description: string; tags: string[]; github: string; demo: string; image: string }
export type Article = { title: string; excerpt: string; date: string; readingTime: string; category: string; href: string }

export const focusAreas: FocusArea[] = [
  { number: '01', key: 'cybersecurity', icon: Fingerprint },
  { number: '02', key: 'webSecurity', icon: Eye },
  { number: '03', key: 'redTeam', icon: Crosshair },
  { number: '04', key: 'linux', icon: Terminal },
  { number: '05', key: 'programming', icon: Code2 },
  { number: '06', key: 'ai', icon: Bot },
]

export const projects: Project[] = []
export const articles: Article[] = []

// Keep this empty until Kerem confirms which tools he actively uses.
export const tooling: string[] = []

export const socials = {
  github: 'https://github.com/l1secc/l1secc',
  email: 'demir.abdulkerem@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdulkerem-demir-339262316/',
  instagram: 'https://instagram.com/l1sec',
  x: 'https://x.com/l1secc',
}

export const SECTION_COUNT = '06'

export const sectionOrder = [
  { id: 'about', path: '/about', labelKey: 'nav.about' },
  { id: 'focus', path: '/focus', labelKey: 'nav.focus' },
  { id: 'projects', path: '/projects', labelKey: 'nav.projects' },
  { id: 'research', path: '/research', labelKey: 'nav.research' },
  { id: 'writing', path: '/writing', labelKey: 'nav.writing' },
  { id: 'tooling', path: '/tooling', labelKey: 'nav.tooling' },
  { id: 'blog', path: '/blog', labelKey: 'nav.blog' },
  { id: 'contact', path: '/contact', labelKey: 'nav.contact' },
] as const