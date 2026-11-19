import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import WorkList from '../components/WorkList'
import { projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Projects() {
  useDocumentTitle('Work')

  return (
    <PageTransition>
      <section className="page-hero wrap">
        <Reveal as="p" trigger="load" className="overline section__label">
          Work
        </Reveal>
        <h1 className="xl" aria-label="Things I make.">
          <SplitText text="Things" trigger="load" />
          <SplitText text="I make." trigger="load" delay={120} />
        </h1>
        <Reveal as="p" trigger="load" delay={400} className="lead page-hero__sub">
          Products I build and run myself, with more on the way.
        </Reveal>
      </section>

      <section className="wrap section section--tight">
        <WorkList items={projects} />
      </section>
    </PageTransition>
  )
}
