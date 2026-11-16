import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import WorkList from '../components/WorkList'
import { projects, categories } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Projects() {
  const [active, setActive] = useState('All')
  const items = active === 'All' ? projects : projects.filter((p) => p.category === active)
  useDocumentTitle('Work')

  return (
    <PageTransition>
      <section className="page-hero wrap">
        <Reveal as="p" trigger="load" className="overline section__label">
          Portfolio
        </Reveal>
        <h1 className="xl" aria-label="Projects and work.">
          <SplitText text="Projects" trigger="load" />
          <SplitText text="and work." trigger="load" delay={120} />
        </h1>
        <Reveal as="p" trigger="load" delay={400} className="lead page-hero__sub">
          Frontend, full-stack, and e-commerce projects.
        </Reveal>
      </section>

      <section className="wrap section section--tight">
        <Reveal className="filters" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              className={`filter ${active === c ? 'is-active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
              <span className="filter__n tnum">
                {c === 'All' ? projects.length : projects.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </Reveal>

        <WorkList key={active} items={items} />

        <Reveal className="dev">
          <div>
            <p className="overline">In development</p>
            <h2 className="md">SaaS Admin Dashboard</h2>
          </div>
          <p className="body">A modern SaaS admin dashboard, currently in active development. Details coming soon.</p>
        </Reveal>
      </section>
    </PageTransition>
  )
}
