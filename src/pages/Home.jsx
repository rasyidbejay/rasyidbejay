import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import PageTransition from '../components/PageTransition'
import { projects } from '../data/projects'
import { email } from '../data/profile'
import { useClock } from '../hooks/useClock'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { stage, resetStage } from '../lib/stage'
import { getLenis } from '../lib/lenis'

// Three.js loads in its own chunk so the text paints first.
const LayerStage = lazy(() => import('../components/LayerStage'))

const CHAPTERS = [
  ['top', 'Hero'],
  ['work', 'Work'],
  ['readers', 'Two readers'],
  ['about', 'Introduction'],
  ['contact', 'Contact'],
]
const SOON_META = ['Three layers built', 'Two layers built', 'Foundations laid']
const PEOPLE = ['Interfaces in React, Vue and Astro', 'Fast loading, healthy Core Web Vitals', 'Accessible on every device', 'WordPress, Shopify and Webflow builds']
const MACHINES = ['Crawlable markup for search (SEO)', 'Answers search can lift (AEO)', 'Content AI can trust and cite (GEO)', 'Structured data and language tags']

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  const time = useClock()
  useDocumentTitle('')
  const [ch, setCh] = useState(0)
  const [row, setRow] = useState(0)
  const [reader, setReaderState] = useState('people')
  const sections = useRef([])
  const work = useRef(null)
  const readers = useRef(null)

  const setReader = (r, byUser) => {
    if (byUser) stage.touched = true
    stage.reader = r
    setReaderState(r)
  }

  useEffect(() => {
    resetStage()
    const onScroll = () => {
      if (!work.current || !readers.current) return
      const vh = window.innerHeight
      let current = 0
      sections.current.forEach((s, i) => {
        if (!s) return
        const r = s.getBoundingClientRect()
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) current = i
      })
      if (current !== stage.ch) {
        stage.ch = current
        setCh(current)
      }

      const w = work.current.getBoundingClientRect()
      const p = clamp(-w.top / Math.max(1, w.height - vh), 0, 0.999)
      const nextRow = Math.floor(p * projects.length)
      if (nextRow !== stage.row) {
        stage.row = nextRow
        setRow(nextRow)
      }

      if (!stage.touched) {
        const rd = readers.current.getBoundingClientRect()
        const pr = clamp(-rd.top / Math.max(1, rd.height - vh), 0, 1)
        const want = pr > 0.45 ? 'machines' : 'people'
        if (want !== stage.reader) {
          stage.reader = want
          setReaderState(want)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const bind = (i) => (el) => {
    sections.current[i] = el
  }

  return (
    <PageTransition>
      <Suspense fallback={null}>
        <LayerStage />
      </Suspense>

      <nav className="home-rail mono" aria-label="Chapters">
        {CHAPTERS.map(([id, label], i) => (
          <button key={id} type="button" className={ch === i ? 'is-on' : ''} onClick={() => goTo(id)}>
            {String(i + 1).padStart(2, '0')} {label}
          </button>
        ))}
      </nav>

      <div className="home">
        <section className="home-hero" id="top" ref={bind(0)}>
          <Reveal as="p" trigger="load" delay={200} className="mono home-status">
            <i aria-hidden="true" />
            Available for freelance work
          </Reveal>
          <div className="home-hero__foot">
            <Reveal as="p" trigger="load" delay={500} className="home-hero__line">
              Building small corners of the internet.
            </Reveal>
            <h1 className="home-hero__name" aria-label="Rashid Abdullah">
              <SplitText text="Rashid" trigger="load" />
              <SplitText text="Abdullah" trigger="load" delay={140} />
            </h1>
            <Reveal trigger="load" delay={700} className="home-hero__meta mono">
              <span>
                Kuala Lumpur · <span className="tnum">{time}</span> GMT+8
              </span>
              <span>Scroll</span>
            </Reveal>
          </div>
        </section>

        <section className="home-work" id="work" ref={(el) => { bind(1)(el); work.current = el }}>
          <div className="home-pin">
            <div className="home-col">
              <p className="overline home-label">Work</p>
              <SplitText as="h2" className="home-h2" text="Things I make." />
              <ol className="home-rows">
                {projects.map((p, i) => {
                  const active = row === i
                  const idx = String(i + 1).padStart(2, '0')
                  if (p.soon) {
                    return (
                      <li key={p.id} className={`home-row ${active ? 'is-active' : ''}`}>
                        <span className="mono home-row__idx">{idx}</span>
                        <span className="home-row__name">{p.name}</span>
                        <span className="mono home-row__meta">{SOON_META[i - 1] || 'In progress'}</span>
                      </li>
                    )
                  }
                  return (
                    <li key={p.id}>
                      <Link to={`/projects/${p.id}`} className={`home-row ${active ? 'is-active' : ''}`}>
                        <span className="mono home-row__idx">{idx}</span>
                        <span className="home-row__name">{p.name}</span>
                        <span className="home-row__arrow" aria-hidden="true">
                          →
                        </span>
                        <span className="mono home-row__meta">
                          {p.category} · {p.tools.slice(0, 3).join(' · ')}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
              <p className="mono home-hint">Scroll to move through the list</p>
            </div>
          </div>
        </section>

        <section className="home-readers" id="readers" ref={(el) => { bind(2)(el); readers.current = el }}>
          <div className="home-pin">
            <div className="home-col">
              <p className="overline home-label">How I build</p>
              <SplitText as="h2" className="home-h2" text="Every page has two readers." />
              <p className="home-lead">
                People see the design. Search engines and AI assistants read what’s underneath. I build for both, and
                sometimes I build the tools too.
              </p>
              <div className="home-toggle" role="group" aria-label="Choose a reader">
                <button type="button" aria-pressed={reader === 'people'} onClick={() => setReader('people', true)}>
                  People see
                </button>
                <button type="button" aria-pressed={reader === 'machines'} onClick={() => setReader('machines', true)}>
                  Machines read
                </button>
              </div>
              <div className="home-cols">
                <ul className={reader === 'people' ? 'on' : ''}>
                  {PEOPLE.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <ul className={reader === 'machines' ? 'on' : ''}>
                  {MACHINES.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="home-sec" id="about" ref={bind(3)}>
          <p className="overline home-label">Introduction</p>
          <Reveal as="p" className="home-statement">
            I build responsive, high-performance websites, <span>then tune them for search.</span>
          </Reveal>
          <ul className="home-facts">
            <Reveal as="li">
              <span className="mono">Based in</span>Kuala Lumpur, Malaysia
            </Reveal>
            <Reveal as="li" delay={100}>
              <span className="mono">Works across</span>Web development, SEO, AEO, GEO and my own tools
            </Reveal>
            <Reveal as="li" delay={200}>
              <span className="mono">Clients in</span>Malaysia and the UK
            </Reveal>
          </ul>
        </section>

        <section className="home-sec home-cta" id="contact" ref={bind(4)}>
          <p className="overline home-label">Contact</p>
          <SplitText as="h2" className="home-cta__title" text="Let’s work together." />
          <Reveal className="home-cta__actions" delay={200}>
            <a className="home-btn" href={`mailto:${email}`}>
              {email}
            </a>
            <Link className="home-btn home-btn--ghost" to="/contact">
              Start a project →
            </Link>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  )
}
