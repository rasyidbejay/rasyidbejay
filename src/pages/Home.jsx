import { Link } from 'react-router-dom'
import ContourField from '../components/ContourField'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import ScrubText from '../components/ScrubText'
import Marquee from '../components/Marquee'
import WorkList from '../components/WorkList'
import Counter from '../components/Counter'
import SearchDiagram from '../components/SearchDiagram'
import Magnetic from '../components/Magnetic'
import PageTransition from '../components/PageTransition'
import { projects, featuredIds } from '../data/projects'
import { toolkit, email } from '../data/profile'
import { useClock } from '../hooks/useClock'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const featured = featuredIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

const statement =
  'I build responsive, high-performance websites with modern frontend frameworks, then tune them for search. Based in Kuala Lumpur, delivering for clients in Malaysia and the UK.'

const services = [
  {
    n: '01',
    title: 'Frontend',
    text: 'Responsive, high-performance interfaces built with modern frameworks.',
    items: toolkit[0].items,
  },
  {
    n: '02',
    title: 'Search',
    text: 'Technical and on-page work that helps sites get found in search and in AI answers.',
    items: ['SEO', 'GEO', 'AEO', 'Core Web Vitals', 'Google Search Console', 'PageSpeed Insights', 'GA4'],
  },
  {
    n: '03',
    title: 'CMS and e-commerce',
    text: 'Custom themes, storefronts, and booking flows on the platforms your team already runs.',
    items: ['WordPress', 'Shopify', 'Webflow', 'SiteGiant', 'Elementor', 'WooCommerce'],
  },
]

const discoverability = [
  {
    key: 'SEO',
    name: 'Search engine optimisation',
    text: 'Making a site easy for search engines to crawl, understand, and rank.',
  },
  {
    key: 'AEO',
    name: 'Answer engine optimisation',
    text: 'Structuring content so it can be chosen as the direct answer, such as a featured snippet.',
  },
  {
    key: 'GEO',
    name: 'Generative engine optimisation',
    text: 'Shaping content so AI assistants can understand it, trust it, and cite it.',
  },
]

const stats = [
  { to: 5, label: 'Years experience' },
  { to: 9, label: 'Projects delivered' },
  { to: 15, label: 'Technologies' },
]

export default function Home() {
  const time = useClock()
  useDocumentTitle('')

  return (
    <PageTransition>
      <section className="hero">
        <ContourField className="hero__field" />
        <div className="hero__inner wrap">
          <div className="hero__top">
            <Reveal as="p" trigger="load" delay={150} className="overline">
              Frontend developer · SEO specialist
            </Reveal>
            <Reveal as="p" trigger="load" delay={250} className="overline hero__status">
              <span className="dot" aria-hidden="true" />
              Available for freelance work
            </Reveal>
          </div>

          <h1 className="display hero__name" aria-label="Rashid Abdullah">
            <SplitText text="Rashid" trigger="load" />
            <SplitText text="Abdullah." trigger="load" delay={140} className="hero__line2" />
          </h1>

          <div className="hero__bottom">
            <Reveal as="p" trigger="load" delay={650} className="lead hero__tag">
              Sites that rank.
              <br />
              Interfaces that convert.
            </Reveal>
            <Reveal trigger="load" delay={750} className="hero__meta">
              <p className="overline">Kuala Lumpur</p>
              <p className="tnum">{time} GMT+8</p>
            </Reveal>
            <Reveal trigger="load" delay={850} className="hero__scroll overline" aria-hidden="true">
              Scroll
              <span className="hero__scroll-line" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <Reveal as="p" className="overline section__label">
          Introduction
        </Reveal>
        <ScrubText text={statement} className="statement" />
      </section>

      <Marquee items={['Frontend', 'SEO', 'Vue 3', 'React', 'WordPress', 'Shopify']} />

      <section className="section wrap">
        <div className="section__head">
          <div>
            <Reveal as="p" className="overline section__label">
              Selected work
            </Reveal>
            <SplitText as="h2" className="xl" text="Recent projects." />
          </div>
          <Reveal>
            <Link to="/projects" className="link" data-cursor="Open">
              All projects →
            </Link>
          </Reveal>
        </div>
        <WorkList items={featured} />
      </section>

      <section className="section wrap">
        <Reveal as="p" className="overline section__label">
          Capabilities
        </Reveal>
        <SplitText as="h2" className="xl" text="What I do." />
        <div className="services">
          {services.map((s) => (
            <Reveal key={s.n} className="service">
              <span className="service__n tnum">{s.n}</span>
              <h3 className="md service__t">{s.title}</h3>
              <div className="service__b">
                <p className="body">{s.text}</p>
                <ul className="tags">
                  {s.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap found">
        <Reveal as="p" className="overline section__label">
          Search, answers, and AI
        </Reveal>
        <SplitText as="h2" className="xl" text="Built to be found." />
        <div className="found__grid">
          <SearchDiagram className="found__art" />
          <ul className="found__list">
            {discoverability.map((d) => (
              <Reveal as="li" key={d.key} className="found__item">
                <span className="found__key">{d.key}</span>
                <div>
                  <h3 className="found__name">{d.name}</h3>
                  <p className="body">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap stats">
        {stats.map((s) => (
          <Reveal key={s.label} className="stat">
            <div className="xl">
              <Counter to={s.to} suffix="+" />
            </div>
            <p className="overline">{s.label}</p>
          </Reveal>
        ))}
      </section>

      <section className="cta wrap">
        <Reveal as="p" className="overline section__label">
          Contact
        </Reveal>
        <SplitText as="h2" className="xl cta__title" text="Let's work together." />
        <Reveal className="cta__actions" delay={200}>
          <Magnetic>
            <a className="btn" href={`mailto:${email}`}>
              {email}
            </a>
          </Magnetic>
          <Magnetic>
            <Link className="btn btn--ghost" to="/contact">
              Start a project →
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </PageTransition>
  )
}
