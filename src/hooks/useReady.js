import { useEffect, useState } from 'react'
import { whenReady } from '../lib/ready'

// True shortly after the intro finishes. Use for animations that play on load.
export function useReady(delay = 350) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    let alive = true
    let timer
    whenReady().then(() => {
      timer = setTimeout(() => {
        if (alive) setOn(true)
      }, delay)
    })
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [delay])

  return on
}
