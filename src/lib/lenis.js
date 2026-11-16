import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

let lenis = null
let tick = null

export function getLenis() {
  return lenis
}

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function stopSmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
  tick = null
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true })
  else window.scrollTo(0, 0)
}
