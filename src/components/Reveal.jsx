import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useReady } from '../hooks/useReady'

// Fade and rise on scroll (or after the intro with trigger="load").
export default function Reveal({
  as: Tag = 'div',
  trigger = 'view',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const ready = useReady()
  const on = trigger === 'load' ? ready : inView

  return (
    <Tag
      {...rest}
      ref={ref}
      className={`reveal ${on ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}
