import { ArrowDownRight } from 'lucide-react'

export default function TerminalCard() {
  return <aside className="terminal-card" aria-label="A snapshot of Kerem's current interests">
    <div className="terminal-top"><span className="terminal-lights"><i /><i /><i /></span><span>FIELD NOTES · 001</span><span>TR / 41°</span></div>
    <div className="terminal-body">
      <p><span className="prompt">$</span> whoami</p><strong className="terminal-output">kerem<span className="cursor">_</span></strong>
      <p className="terminal-gap"><span className="prompt">$</span> focus</p>
      <div className="terminal-list"><span>cybersecurity</span><span>web-security</span><span>linux</span><span>red-team</span><span>ai</span></div>
      <p className="terminal-gap"><span className="prompt">$</span> status</p>
      <div className="terminal-status"><span>learning...</span><span>building...</span><span>researching...</span></div>
    </div>
    <div className="terminal-foot"><span>PERSONAL ENVIRONMENT</span><ArrowDownRight size={15} /></div>
  </aside>
}
