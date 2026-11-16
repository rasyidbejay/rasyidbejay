import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Paragraph whose words light up as it scrolls through the viewport.
export default function ScrubText({ text, className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.sw'),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [text])

  return (
    <p ref={ref} className={`scrub ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="sw" aria-hidden="true">
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}
