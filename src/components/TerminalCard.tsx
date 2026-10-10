import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { ArrowDownRight } from 'lucide-react'
import { socials } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/useObserver'

type EntryType = 'file' | 'dir'
type Entry = { name: string; type: EntryType; content?: string }
type FileSystem = Record<string, Entry>
type Line = { type: 'input' | 'output'; content: string; cwd?: string }

const buildFileSystem = (t: TFunction): FileSystem => ({
  projects: { name: 'projects', type: 'dir' },
  research: { name: 'research', type: 'dir' },
  'about.txt': {
    name: 'about.txt',
    type: 'file',
    content: `Kerem — Security Researcher\n${t('terminal.status')}\n${t('about.location')}`,
  },
  'contact.txt': {
    name: 'contact.txt',
    type: 'file',
    content: `Email: ${socials.email}\nGitHub: ${socials.github}\nLinkedIn: ${socials.linkedin}\nInstagram: ${socials.instagram}\nX: ${socials.x}`,
  },
  'skills.txt': {
    name: 'skills.txt',
    type: 'file',
    content: t('focus.cybersecurity.description'),
  },
})

const socialBlock = `Email: ${socials.email}
GitHub: ${socials.github}
LinkedIn: ${socials.linkedin}
Instagram: ${socials.instagram}
X: ${socials.x}`

/** Resolves "~", "..", "/" and relative paths against the current directory. */
function normalize(cwd: string, input: string): string | null {
  if (!input || input === '.') return cwd
  const absolute = input === '/' || input.startsWith('~/') ? input.slice(2) : input.startsWith('/') ? input.slice(1) : cwd ? `${cwd}/${input}` : input
  const stack: string[] = []
  for (const part of absolute.split('/')) {
    if (!part || part === '.') continue
    if (part === '..') {
      stack.pop()
      continue
    }
    if (!/^[\w.-]{1,64}$/.test(part)) return null
    stack.push(part)
  }
  return stack.join('/')
}

export default function TerminalCard() {
  const { t, i18n } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const [history, setHistory] = useState<Line[]>(() => [{ type: 'output', content: t('terminal.welcome') }])
  const [input, setInput] = useState('')
  const [currentDir, setCurrentDir] = useState('')
  const [fileSystem, setFileSystem] = useState<FileSystem>(() => buildFileSystem(t))
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHistory(previous => {
      const welcome = previous[0]
      return welcome ? [{ ...welcome, content: t('terminal.welcome') }, ...previous.slice(1)] : previous
    })
    setFileSystem(buildFileSystem(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  useEffect(() => {
    const node = bodyRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [history])

  const resolve = (name: string) => normalize(currentDir, name)

  const runCommand = useCallback(
    (cmd: string, args: string[]): string => {
      const locale = i18n.resolvedLanguage === 'tr' ? 'tr-TR' : 'en-US'
      switch (cmd) {
        case 'whoami':
          return t('terminal.whoami')
        case 'focus':
          return 'cybersecurity · web-security · linux · red-team · ai'
        case 'status':
          return t('terminal.status')
        case 'skills':
          return 'Python · Bash · Linux · Web Security · Red Team · Threat Modelling'
        case 'social':
          return socialBlock
        case 'help':
          return t('terminal.help')
        case 'date':
          return new Date().toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        case 'clear':
          return 'CLEAR'
        case 'ls': {
          const items = Object.values(fileSystem)
            .filter(item => (currentDir ? item.name.startsWith(`${currentDir}/`) : true))
            .map(item => (currentDir ? item.name.slice(currentDir.length + 1) : item.name))
            .filter(name => !name.includes('/'))
            .sort()
          return items.join('  ')
        }
        case 'pwd':
          return currentDir ? `~/${currentDir}` : '~'
        case 'cd': {
          if (!args.length) {
            setCurrentDir('')
            return ''
          }
          const next = normalize(currentDir, args[0])
          if (next === null) return `cd: ${args[0]}: ${t('terminal.noSuchDirectory')}`
          const node = Object.values(fileSystem).find(file => file.name === next)
          if (!node) return `cd: ${args[0]}: ${t('terminal.noSuchDirectory')}`
          if (node.type !== 'dir') return `cd: ${args[0]}: ${t('terminal.notDirectory')}`
          setCurrentDir(next)
          return ''
        }
        case 'cat': {
          if (!args.length) return `cat: ${t('terminal.missingOperand')}`
          const file = Object.values(fileSystem).find(item => item.name === resolve(args[0]))
          if (!file) return `cat: ${args[0]}: ${t('terminal.noSuchFile')}`
          if (file.type === 'dir') return `cat: ${args[0]}: ${t('terminal.isDirectory')}`
          return file.content || ''
        }
        case 'echo':
          return args.join(' ')
        case 'mkdir': {
          if (!args.length) return `mkdir: ${t('terminal.missingOperand')}`
          const next = resolve(args[0])
          if (!next) return `mkdir: ${args[0]}: ${t('terminal.noSuchDirectory')}`
          if (Object.values(fileSystem).some(file => file.name === next)) {
            return `mkdir: ${args[0]}: ${t('terminal.exists')}`
          }
          setFileSystem(previous => ({ ...previous, [next]: { name: next, type: 'dir' } }))
          return ''
        }
        case 'touch': {
          if (!args.length) return `touch: ${t('terminal.missingOperand')}`
          const next = resolve(args[0])
          if (!next || Object.values(fileSystem).some(file => file.name === next)) return ''
          setFileSystem(previous => ({ ...previous, [next]: { name: next, type: 'file', content: '' } }))
          return ''
        }
        case 'rm': {
          const flags = args.filter(arg => arg.startsWith('-'))
          const targets = args.filter(arg => !arg.startsWith('-'))
          const recursive = flags.some(flag => flag.includes('r'))
          const force = flags.some(flag => flag.includes('f'))
          if (!targets.length) return `rm: ${t('terminal.missingOperand')}`
          const messages: string[] = []
          const removals: string[] = []
          targets.forEach(target => {
            const next = resolve(target)
            const node = next ? Object.values(fileSystem).find(file => file.name === next) : undefined
            if (!node) {
              if (!force) messages.push(`rm: ${target}: ${t('terminal.noSuchFile')}`)
              return
            }
            if (node.type === 'dir' && !recursive) {
              messages.push(`rm: ${target}: ${t('terminal.isDirectory')}`)
              return
            }
            removals.push(node.name)
            if (node.type === 'dir') {
              Object.values(fileSystem).forEach(child => {
                if (child.name.startsWith(`${node.name}/`)) removals.push(child.name)
              })
            }
          })
          if (removals.length) {
            setFileSystem(previous => {
              const copy = { ...previous }
              removals.forEach(name => delete copy[name])
              return copy
            })
          }
          return messages.join('\n')
        }
        default:
          return t('terminal.notFound', { cmd })
      }
    },
    [currentDir, fileSystem, i18n.resolvedLanguage, t],
  )

  const submit = () => {
    const parts = input.trim().split(/\s+/)
    const cmd = (parts[0] || '').toLowerCase()
    const args = parts.slice(1)

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    if (cmd === '') {
      setInput('')
      return
    }

    const cwd = currentDir ? `~${currentDir}` : '~'
    const output = runCommand(cmd, args)
    setHistory(previous =>
      output === 'CLEAR'
        ? []
        : [...previous, { type: 'input', content: input, cwd }, { type: 'output', content: output }],
    )
    setInput('')
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submit()
    }
    if (event.key === 'Tab') event.preventDefault()
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      setHistory([])
    }
  }

  return <aside className="terminal-card" aria-label={t('a11y.terminal')}>
    <div className="terminal-top">
      <span className="terminal-lights"><i /><i /><i /></span>
      <span>{t('terminal.brand')}</span>
      <span>{t('terminal.coordinate')}</span>
    </div>
    <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
      <div className="terminal-scroll" role="log" aria-live="polite" aria-relevant="additions text">
        {history.map((line, index) => (
          <div key={`${index}-${line.type}`} className="terminal-line">
            {line.type === 'input' ? (
              <p><span className="prompt">{line.cwd ?? '~'}$</span> {line.content}</p>
            ) : (
              <pre className="terminal-output">{line.content}</pre>
            )}
          </div>
        ))}
      </div>
      <p className="terminal-entry">
        <span className="prompt">{currentDir ? `~${currentDir}` : '~'}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          className="terminal-input"
          aria-label={t('a11y.terminal')}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={200}
        />
        {!reduced && <span className="cursor" aria-hidden="true" />}
      </p>
    </div>
    <div className="terminal-foot">
      <span>{t('terminal.title')}</span>
      <span className="terminal-hint">{t('terminal.hint')}</span>
      <ArrowDownRight size={15} />
    </div>
  </aside>
}