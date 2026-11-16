import { Fragment, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useReady } from '../hooks/useReady'

// Word-by-word masked reveal. trigger="load" plays after the intro, "view" plays on scroll.
export default function SplitText({
  as: Tag = 'span',
  text,
  className = '',
  trigger = 'view',
  delay = 0,
  readyDelay = 350,
}) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const ready = useReady(readyDelay)
  const on = trigger === 'load' ? ready : inView
  const words = text.split(' ')

  return (
    <Tag
      ref={ref}
      className={`split ${on ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="w" aria-hidden="true">
            <span className="wi" style={{ '--i': i }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
