import { useScrollProgress } from '../hooks/useObserver'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return <div className="scroll-progress" aria-hidden="true">
    <span style={{ transform: `scaleX(${progress})` }} />
  </div>
}