import { useEffect, useRef } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/motion'

// Trailing dot that grows over links and shows a label over [data-cursor] targets.
export default function Cursor() {
  const root = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.dataset.on = 'true'
    }
    const over = (e) => {
      const t = e.target instanceof Element ? e.target.closest('[data-cursor], a, button, input, textarea') : null
      if (!t) {
        el.dataset.state = ''
        return
      }
      const custom = t.getAttribute('data-cursor')
      if (custom) {
        label.current.textContent = custom
        el.dataset.state = 'label'
      } else {
        el.dataset.state = 'link'
      }
    }
    const leave = () => {
      el.dataset.on = 'false'
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={root} className="cursor" data-on="false" data-state="" aria-hidden="true">
      <div className="cursor__dot">
        <span ref={label} className="cursor__label" />
      </div>
    </div>
  )
}
