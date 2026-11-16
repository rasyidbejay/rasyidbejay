import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { prefersReducedMotion } from '../lib/motion'

// Counts up to a number once it scrolls into view.
export default function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const seen = useInView(ref, '0px 0px -10% 0px')
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!seen) return undefined
    if (prefersReducedMotion()) {
      const t = setTimeout(() => setValue(to), 0)
      return () => clearTimeout(t)
    }
    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])

  return (
    <span ref={ref} className="tnum" aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  )
}
