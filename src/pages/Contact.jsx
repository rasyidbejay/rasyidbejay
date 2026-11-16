import { useRef, useState } from 'react'
import PageTransition from '../components/PageTransition'
import SplitText from '../components/SplitText'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import ContourField from '../components/ContourField'
import { email, phone, location, socials } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const FORM_ENDPOINT = 'https://formspree.io/f/xldnzogn'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)
  useDocumentTitle('Contact')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(formRef.current),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        formRef.current.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <section className="page-hero page-hero--field wrap">
        <ContourField className="page-hero__field" seed={3.7} lines={8} />
        <div className="page-hero__inner">
          <Reveal as="p" trigger="load" className="overline section__label">
            Contact
          </Reveal>
          <h1 className="xl" aria-label="Let's work together.">
            <SplitText text="Let's work" trigger="load" />
            <SplitText text="together." trigger="load" delay={120} />
          </h1>
          <Reveal as="p" trigger="load" delay={450} className="lead page-hero__sub">
            Have a project in mind? Get in touch.
          </Reveal>
        </div>
      </section>

      <section className="wrap section contact">
        <div className="contact__info">
          <Reveal>
            <p className="overline">Email</p>
            <a className="md contact__mail link" href={`mailto:${email}`}>
              {email}
            </a>
          </Reveal>
          <Reveal delay={80}>
            <p className="body">Open to freelance projects, collaborations, and full-time opportunities.</p>
          </Reveal>
          <Reveal delay={160}>
            <dl className="defs">
              <div className="defs__row">
                <dt>Location</dt>
                <dd>{location}</dd>
              </div>
              <div className="defs__row">
                <dt>Phone</dt>
                <dd>{phone}</dd>
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

        <Reveal delay={120}>
          <form ref={formRef} className="form" onSubmit={handleSubmit}>
          <div className="form__row">
            <div className="field-input">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
            </div>
            <div className="field-input">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" required autoComplete="email" />
            </div>
          </div>
          <div className="field-input">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Project inquiry" required />
          </div>
          <div className="field-input">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Tell me about your project." required rows={6} />
          </div>
          <div className="form__actions">
            <Magnetic>
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>
            </Magnetic>
            <p className="form__status" role="status">
              {status === 'sent' && 'Message sent. Thank you, I will reply soon.'}
              {status === 'error' && 'Something went wrong. Try emailing directly.'}
            </p>
          </div>
          </form>
        </Reveal>
      </section>
    </PageTransition>
  )
}
