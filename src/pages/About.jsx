import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Parallax from '../components/Parallax'
import { toolkit, certs, socials, email, location } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function About() {
  useDocumentTitle('About')

  return (
    <PageTransition>
      <section className="page-hero wrap">
        <Reveal as="p" trigger="load" className="overline section__label">
          About
        </Reveal>
        <h1 className="xl" aria-label="I build things for the web.">
          <SplitText text="I build things" trigger="load" />
          <SplitText text="for the web." trigger="load" delay={120} />
        </h1>
        <Reveal as="p" trigger="load" delay={450} className="lead page-hero__sub">
          Frontend developer. Clean code. Great UX.
        </Reveal>
      </section>

      <section className="wrap section about">
        <Reveal className="about__photo">
          <Parallax className="about__frame">
            <img src="/profile.jpg" alt="Rashid Abdullah" decoding="async" />
          </Parallax>
        </Reveal>

        <div className="about__text">
          <Reveal as="p" className="overline status">
            <span className="dot" aria-hidden="true" />
            Available for freelance work
          </Reveal>
          <Reveal delay={80}>
            <p className="lead">
              Frontend developer with a Bachelor&rsquo;s in Business Administration (Minor in Information Systems)
              from International Islamic University Malaysia (IIUM), graduating with Dean&rsquo;s List honours.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="body">
              I create responsive, high-performance websites using modern frontend frameworks and tools. I care
              about clean code, great UX, and building things that work beautifully across all devices.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <dl className="defs">
              <div className="defs__row">
                <dt>Location</dt>
                <dd>{location}</dd>
              </div>
              <div className="defs__row">
                <dt>Email</dt>
                <dd>
                  <a className="link" href={`mailto:${email}`}>
                    {email}
                  </a>
                </dd>
              </div>
              <div className="defs__row">
                <dt>Elsewhere</dt>
                <dd className="about__socials">
                  {socials.map((s) => (
                    <a key={s.label} className="link" href={s.href} target="_blank" rel="noreferrer">
                      {s.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="wrap section">
        <Reveal as="p" className="overline section__label">
          Toolkit
        </Reveal>
        <SplitText as="h2" className="xl" text="Tools I work with." />
        <div className="toolkit">
          {toolkit.map((group) => (
            <Reveal key={group.cat} className="toolkit__row">
              <p className="overline">{group.cat}</p>
              <ul className="toolkit__items md">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <Reveal as="p" className="overline section__label">
          Certifications
        </Reveal>
        <SplitText as="h2" className="xl" text="Credentials." />
        <div className="certs">
          {certs.map((c) => {
            const Tag = c.link ? 'a' : 'div'
            const props = c.link ? { href: c.link, target: '_blank', rel: 'noreferrer', 'data-cursor': 'View' } : {}
            return (
              <Reveal key={c.name}>
                <Tag className="cert" {...props}>
                  <span className="cert__when">
                    <span>{c.issuer}</span>
                    <span className="tnum">{c.date}</span>
                  </span>
                  <span className="cert__name md">{c.name}</span>
                  <span className="cert__skills">{c.skills}</span>
                  <span className="cert__arrow" aria-hidden="true">
                    {c.link ? '↗' : ''}
                  </span>
                </Tag>
              </Reveal>
            )
          })}
        </div>
      </section>
    </PageTransition>
  )
}
