import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { markReady } from '../lib/ready'

const KEY = 'rb-intro-seen'

const seenBefore = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

// Short counter intro. Plays once per session and never blocks for long.
export default function Intro() {
  const [show, setShow] = useState(() => !prefersReducedMotion() && !seenBefore())
  const panel = useRef(null)
  const count = useRef(null)

  useEffect(() => {
    if (!show) {
      markReady()
      return undefined
    }
    const root = document.documentElement
    root.classList.add('is-loading')

    const finish = () => {
      root.classList.remove('is-loading')
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* storage unavailable */
      }
      setShow(false)
    }

    const state = { n: 0 }
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const failsafe = setTimeout(() => {
      markReady()
      finish()
    }, 5000)

    const tl = gsap.timeline({ paused: true })
    tl.to(state, {
      n: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(state.n)).padStart(3, '0')
      },
    })
      .add(() => markReady(), '+=0.05')
      .to(panel.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '<')
      .add(() => {
        clearTimeout(failsafe)
        finish()
      })

    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => tl.play())

    return () => {
      clearTimeout(failsafe)
      tl.kill()
      root.classList.remove('is-loading')
    }
  }, [show])

  if (!show) return null

  return (
    <div ref={panel} className="intro" role="status" aria-label="Loading">
      <img className="intro__logo" src="/logo-dark.png" alt="" width="120" height="120" />
      <span ref={count} className="intro__count tnum">
        000
      </span>
    </div>
  )
}
