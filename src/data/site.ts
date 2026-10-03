import type { LucideIcon } from 'lucide-react'
import { Bot, Code2, Crosshair, Eye, Fingerprint, Terminal } from 'lucide-react'

export type FocusArea = { number: string; title: string; description: string; icon: LucideIcon }
export type Project = { title: string; description: string; tags: string[]; github: string; demo: string; image: string }
export type Article = { title: string; excerpt: string; date: string; readingTime: string; category: string; href: string }

export const focusAreas: FocusArea[] = [
  { number: '01', title: 'Cybersecurity', description: 'Understanding how systems fail, and how thoughtful security makes them more resilient.', icon: Fingerprint },
  { number: '02', title: 'Web security', description: 'Exploring the assumptions and attack surfaces behind modern web applications.', icon: Eye },
  { number: '03', title: 'Red team', description: 'Learning adversarial methods in ethical, controlled environments.', icon: Crosshair },
  { number: '04', title: 'Linux', description: 'Getting closer to the operating system, one experiment at a time.', icon: Terminal },
  { number: '05', title: 'Programming', description: 'Building small tools and projects to turn curiosity into working code.', icon: Code2 },
  { number: '06', title: 'AI', description: 'Following the new questions that emerge where AI and security meet.', icon: Bot },
]

export const projects: Project[] = []
export const articles: Article[] = []

// Keep this empty until Kerem confirms which tools he actively uses.
export const tooling: string[] = []

export const socials = {
  github: 'https://github.com/l1secc/l1secc',
  email: '',
  linkedin: 'https://www.linkedin.com/in/abdulkerem-demir-339262316/',
  instagram: 'https://instagram.com/l1sec',
  x: 'https://x.com/l1secc',
}
