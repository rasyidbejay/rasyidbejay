import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/motion'
import { useInView } from '../hooks/useInView'

function Row({ project, index, onEnter }) {
  const ref = useRef(null)
  const seen = useInView(ref, '0px 0px -8% 0px')
  const idx = String(index + 1).padStart(2, '0')

  // Placeholder: listed, not clickable, no preview.
  if (project.soon) {
    return (
      <div
        ref={ref}
        className={`work-row work-row--soon ${seen ? 'is-in' : ''}`}
        style={{ '--i': index }}
        onMouseEnter={onEnter}
      >
        <span className="work-row__idx tnum">{idx}</span>
        <span className="work-row__name lg">{project.name}</span>
        <span className="work-row__meta" />
        <span className="work-row__arrow" aria-hidden="true" />
      </div>
    )
  }

  return (
    <Link
      ref={ref}
      to={`/projects/${project.id}`}
      className={`work-row ${seen ? 'is-in' : ''}`}
      style={{ '--i': index }}
      data-cursor="View"
      onMouseEnter={onEnter}
      onFocus={onEnter}
    >
      <span className="work-row__idx tnum">{idx}</span>
      <span className="work-row__name lg">{project.name}</span>
      <span className="work-row__meta">
        <span>{project.category}</span>
        <span className="work-row__tools">{project.tools.slice(0, 3).join(' · ')}</span>
      </span>
      <span className="work-row__arrow" aria-hidden="true">
        →
      </span>
      {project.image && (
        <img className="work-row__thumb" src={project.image} alt="" loading="lazy" decoding="async" />
      )}
    </Link>
  )
}

// Editorial project index. On desktop a preview follows the pointer.
export default function WorkList({ items }) {
  const list = useRef(null)
  const preview = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const el = preview.current
    const host = list.current
    if (!el || !host || !hasFinePointer() || prefersReducedMotion()) return undefined

    gsap.set(el, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.7, ease: 'power3' })
    let last = 0
    let idle

    const move = (e) => {
      xTo(e.clientX + 120)
      yTo(e.clientY)
      const dx = e.clientX - last
      last = e.clientX
      rTo(Math.max(-8, Math.min(8, dx * 0.35)))
      clearTimeout(idle)
      idle = setTimeout(() => rTo(0), 120)
    }
    host.addEventListener('pointermove', move)
    return () => {
      host.removeEventListener('pointermove', move)
      clearTimeout(idle)
    }
  }, [])

  return (
    <div ref={list} className="work-list" onMouseLeave={() => setActive(-1)}>
      <div className="work-preview" ref={preview} data-on={active >= 0} aria-hidden="true">
        {items.map((p, i) =>
          p.soon ? null : (
            <div key={p.id} className={`work-preview__item ${i === active ? 'is-active' : ''}`}>
              {p.image ? <img src={p.image} alt="" decoding="async" /> : <span className="lg">{p.name}</span>}
            </div>
          ),
        )}
      </div>
      {items.map((p, i) => (
        <Row key={p.id} project={p} index={i} onEnter={() => setActive(p.soon ? -1 : i)} />
      ))}
    </div>
  )
}
