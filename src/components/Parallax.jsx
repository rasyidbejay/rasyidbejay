import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Masked frame whose content drifts slower than the page.
export default function Parallax({ children, amount = 9, className = '' }) {
  const wrap = useRef(null)
  const inner = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, wrap)
    return () => ctx.revert()
  }, [amount])

  return (
    <div ref={wrap} className={`parallax ${className}`}>
      <div ref={inner} className="parallax__inner">
        {children}
      </div>
    </div>
  )
}
