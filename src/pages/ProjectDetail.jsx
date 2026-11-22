import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Parallax from '../components/Parallax'
import Magnetic from '../components/Magnetic'
import { liveProjects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ProjectDetail() {
  const { id } = useParams()
  const index = liveProjects.findIndex((p) => p.id === id)
  const project = liveProjects[index]
  const next = liveProjects.length > 1 ? liveProjects[(index + 1) % liveProjects.length] : null
  useDocumentTitle(project ? project.name : 'Project not found')

  if (!project) {
    return (
      <PageTransition>
        <section className="page-hero wrap">
          <h1 className="lg">Project not found.</h1>
          <p className="lead page-hero__sub">
            <Link to="/projects" className="link">
              ← Back to work
            </Link>
          </p>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="page-hero wrap">
        <Reveal trigger="load">
          <Link to="/projects" className="back link">
            ← All work
          </Link>
        </Reveal>
        <Reveal as="p" trigger="load" delay={100} className="overline section__label">
          {project.category}
        </Reveal>
        <SplitText as="h1" className="xl detail__name" text={project.name} trigger="load" />
        <Reveal as="p" trigger="load" delay={400} className="lead page-hero__sub">
          {project.desc}
        </Reveal>
        <Reveal trigger="load" delay={500} className="detail__actions">
          {project.live && (
            <Magnetic>
              <a className="btn" href={project.live} target="_blank" rel="noreferrer">
                Live site ↗
              </a>
            </Magnetic>
          )}
          {project.github && (
            <Magnetic>
              <a className="btn btn--ghost" href={project.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </Magnetic>
          )}
        </Reveal>
      </section>

      <section className="wrap detail__meta">
        {[
          ['Type', project.category],
          ['Role', project.role],
          ['Built with', project.tools[0]],
        ].map(([label, value]) => (
          <Reveal key={label}>
            <p className="overline">{label}</p>
            <p className="detail__meta-v">{value}</p>
          </Reveal>
        ))}
      </section>

      <section className="wrap detail__media">
        {project.gallery ? (
          // Device mockups are shown whole: no parallax overscan, which would crop their edges.
          <div className="detail__shots">
            {[{ src: project.image, alt: `${project.name} on desktop and iPhone` }, ...project.gallery].map((g) => (
              <Reveal key={g.src}>
                <div className="shot">
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <Parallax className="detail__frame">
              {project.image ? (
                <img src={project.image} alt={`${project.name} preview`} decoding="async" />
              ) : (
                <div className="tile lg">{project.name}</div>
              )}
            </Parallax>
          </Reveal>
        )}
      </section>

      <section className="wrap section detail__body">
        <Reveal>
          <p className="overline section__label">About this project</p>
          <p className="lead detail__about">{project.about}</p>
        </Reveal>
        <Reveal delay={120} className="detail__stack">
          <p className="overline">Stack and features</p>
          <ul className="tags">
            {project.tools.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {next ? (
        <Link to={`/projects/${next.id}`} className="next wrap" data-cursor="Next">
          <p className="overline">Next project</p>
          <span className="xl next__name">{next.name} →</span>
        </Link>
      ) : (
        <Link to="/projects" className="next wrap" data-cursor="Open">
          <p className="overline">More on the way</p>
          <span className="xl next__name">All work →</span>
        </Link>
      )}
    </PageTransition>
  )
}
