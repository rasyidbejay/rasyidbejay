import { useEffect, useState } from 'react'

// Returns true once the element has scrolled into view. Fires once.
export function useInView(ref, rootMargin = '0px 0px -12% 0px') {
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      const t = setTimeout(() => setSeen(true), 0)
      return () => clearTimeout(t)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])

  return seen
}
