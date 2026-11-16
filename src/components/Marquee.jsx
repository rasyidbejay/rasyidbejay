import { Fragment, useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { getLenis } from '../lib/lenis'

// Endless outlined type. Speeds up and reverses with scroll velocity.
export default function Marquee({ items, speed = 70 }) {
  const track = useRef(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return undefined
    let x = 0
    let dir = 1
    const tick = (_time, deltaMs) => {
      const lenis = getLenis()
      const v = lenis ? lenis.velocity : 0
      if (Math.abs(v) > 0.2) dir = v > 0 ? 1 : -1
      const boost = 1 + Math.min(Math.abs(v), 40) * 0.12
      const half = el.scrollWidth / 2
      x -= ((speed * deltaMs) / 1000) * boost * dir
      if (x <= -half) x += half
      if (x > 0) x -= half
      el.style.transform = `translate3d(${x}px,0,0)`
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [speed])

  const run = (key) => (
    <div className="marquee__half" key={key} aria-hidden="true">
      {[...items, ...items].map((item, i) => (
        <Fragment key={`${key}-${i}`}>
          <span className={`marquee__item ${i % 2 ? 'is-solid' : ''}`}>{item}</span>
          <span className="marquee__dot" />
        </Fragment>
      ))}
    </div>
  )

  return (
    <div className="marquee" role="presentation">
      <div ref={track} className="marquee__track">
        {run('a')}
        {run('b')}
      </div>
    </div>
  )
}
