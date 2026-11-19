import { Link } from 'react-router-dom'
import { navLinks, socials, email } from '../data/profile'
import { useClock } from '../hooks/useClock'
import { scrollToTop } from '../lib/lenis'

export default function Footer() {
  const time = useClock()

  return (
    <footer className="footer wrap">
      <div className="footer__top">
        <Link to="/" className="footer__logo">
          Rashid
          <br />
          Abdullah
        </Link>

        <div className="footer__cols">
          <div>
            <p className="overline">Pages</p>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="overline">Elsewhere</p>
            <ul>
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="overline">Contact</p>
            <ul>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li className="tnum">Kuala Lumpur, {time}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Rashid Abdullah</p>
        <button type="button" onClick={() => scrollToTop(false)} className="footer__top-btn">
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
