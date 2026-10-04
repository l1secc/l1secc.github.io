import { ArrowDownRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface File {
  name: string
  type: 'file' | 'dir'
  content?: string
}

interface FileSystem {
  [key: string]: File
}

const initialFileSystem: FileSystem = {
  'projects': { name: 'projects', type: 'dir' },
  'research': { name: 'research', type: 'dir' },
  'about.txt': { name: 'about.txt', type: 'file', content: 'Kerem - Security Researcher\nFocus: Cybersecurity, Web Security, Linux' },
  'contact.txt': { name: 'contact.txt', type: 'file', content: 'Email: demir.abdulkerem@gmail.com\nGitHub: https://github.com/l1secc/l1secc\nLinkedIn: https://www.linkedin.com/in/abdulkerem-demir-339262316/\nInstagram: https://instagram.com/l1sec\nX: https://x.com/l1secc' },
  'skills.txt': { name: 'skills.txt', type: 'file', content: 'Python, Bash, Security Research, Linux, Web Security, Red Team' }
}

const commands = {
  help: () => `Available commands:
  whoami     - Display your identity
  focus      - Show current focus areas
  status     - Show current status
  skills     - List technical skills
  social     - Show social links
  clear      - Clear terminal
  date       - Show current date
  ls         - List directory contents
  pwd        - Print working directory
  cd         - Change directory
  cat        - Display file contents
  echo       - Print text
  mkdir      - Create directory
  touch      - Create file
  rm         - Remove file/directory`,
  whoami: () => 'kerem',
  focus: () => 'cybersecurity, web-security, linux, red-team, ai',
  status: () => 'learning... building... researching...',
  skills: () => 'Python, Bash, Security Research, Linux, Web Security',
  social: () => `Email: demir.abdulkerem@gmail.com
GitHub: https://github.com/l1secc/l1secc
LinkedIn: https://www.linkedin.com/in/abdulkerem-demir-339262316/
Instagram: https://instagram.com/l1sec
X: https://x.com/l1secc`,
  clear: () => 'CLEAR',
  date: () => new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export default function TerminalCard() {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Kerem\'s terminal. Type "help" for available commands.' }
  ])
  const [input, setInput] = useState('')
  const [currentDir, setCurrentDir] = useState('')
  const [fileSystem, setFileSystem] = useState<FileSystem>(initialFileSystem)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const executeCommand = (cmd: string, args: string[]): string => {
    switch (cmd) {
      case 'ls':
        const items = Object.values(fileSystem)
          .filter(item => item.name.startsWith(currentDir) || currentDir === '')
          .map(item => {
            const relativeName = currentDir ? item.name.replace(currentDir + '/', '') : item.name
            return !relativeName.includes('/') ? relativeName : null
          })
          .filter(Boolean)
        return items.length > 0 ? items.join('  ') : ''

      case 'pwd':
        return currentDir || '/'

      case 'cd':
        if (args.length === 0) {
          setCurrentDir('')
          return ''
        }
        const targetDir = args[0]
        if (targetDir === '..') {
          if (currentDir) {
            const parts = currentDir.split('/')
            parts.pop()
            setCurrentDir(parts.join('/'))
          }
          return ''
        } else if (targetDir === '/') {
          setCurrentDir('')
          return ''
        } else {
          const newDir = currentDir ? `${currentDir}/${targetDir}` : targetDir
          const exists = Object.values(fileSystem).some(f => f.name === newDir && f.type === 'dir')
          if (exists) {
            setCurrentDir(newDir)
            return ''
          }
          return `cd: ${targetDir}: No such directory`
        }

      case 'cat':
        if (args.length === 0) return 'cat: missing file operand'
        const fileName = args[0]
        const filePath = currentDir ? `${currentDir}/${fileName}` : fileName
        const file = Object.values(fileSystem).find(f => f.name === filePath)
        if (file) {
          if (file.type === 'dir') return `cat: ${fileName}: Is a directory`
          return file.content || ''
        }
        return `cat: ${fileName}: No such file`

      case 'echo':
        return args.join(' ')

      case 'mkdir':
        if (args.length === 0) return 'mkdir: missing operand'
        const dirName = args[0]
        const newDirPath = currentDir ? `${currentDir}/${dirName}` : dirName
        if (Object.values(fileSystem).some(f => f.name === newDirPath)) {
          return `mkdir: ${dirName}: File exists`
        }
        setFileSystem(prev => ({
          ...prev,
          [newDirPath]: { name: newDirPath, type: 'dir' }
        }))
        return ''

      case 'touch':
        if (args.length === 0) return 'touch: missing file operand'
        const touchName = args[0]
        const touchPath = currentDir ? `${currentDir}/${touchName}` : touchName
        if (Object.values(fileSystem).some(f => f.name === touchPath)) {
          return ''
        }
        setFileSystem(prev => ({
          ...prev,
          [touchPath]: { name: touchPath, type: 'file', content: '' }
        }))
        return ''

      case 'rm':
        if (args.length === 0) return 'rm: missing operand'
        const rmName = args[0]
        const rmPath = currentDir ? `${currentDir}/${rmName}` : rmName
        if (!Object.values(fileSystem).some(f => f.name === rmPath)) {
          return `rm: ${rmName}: No such file or directory`
        }
        setFileSystem(prev => {
          const newFs = { ...prev }
          delete newFs[rmPath]
          return newFs
        })
        return ''

      default:
        if (commands[cmd as keyof typeof commands]) {
          return commands[cmd as keyof typeof commands]()
        }
        return `Command not found: ${cmd}. Type "help" for available commands.`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const parts = input.trim().split(/\s+/)
      const cmd = parts[0].toLowerCase()
      const args = parts.slice(1)
      const newHistory = [...history, { type: 'input', content: input }]

      if (cmd === 'clear') {
        setHistory([])
        setInput('')
        return
      }

      if (cmd === '') {
        setHistory(newHistory)
        setInput('')
        return
      }

      const output = executeCommand(cmd, args)

      if (output !== 'CLEAR') {
        setHistory([...newHistory, { type: 'output', content: output }])
      } else {
        setHistory([])
      }
      setInput('')
    }
  }

  return <aside className="terminal-card" aria-label="A snapshot of Kerem's current interests">
    <div className="terminal-top"><span className="terminal-lights"><i /><i /><i /></span><span>FIELD NOTES · 001</span><span>TR / 41°</span></div>
    <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
      {history.map((line, i) => (
        <div key={i}>
          {line.type === 'input' ? (
            <p><span className="prompt">$</span> {line.content}</p>
          ) : (
            <p className="terminal-output">{line.content}</p>
          )}
        </div>
      ))}
      <p>
        <span className="prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          autoComplete="off"
          autoFocus
        />
        <span className="cursor">_</span>
      </p>
    </div>
    <div className="terminal-foot"><span>PERSONAL ENVIRONMENT</span><ArrowDownRight size={15} /></div>
  </aside>
}
