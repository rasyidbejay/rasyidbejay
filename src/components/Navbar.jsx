import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/useTheme'
import { navLinks, email } from '../data/profile'
import { useClock } from '../hooks/useClock'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const time = useClock()

  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 0)
    return () => clearTimeout(t)
  }, [location.pathname])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) setHidden(false)
      else if (y > last + 6) setHidden(true)
      else if (y < last - 6) setHidden(false)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])

  return (
    <>
      <header className={`nav ${hidden && !open ? 'nav--hidden' : ''}`}>
        <Link to="/" className="nav__logo" aria-label="Rashid Abdullah, home" data-cursor="Home">
          <img src="/logo-dark.png" alt="" width="40" height="40" />
        </Link>

        <nav className="nav__pill" aria-label="Primary">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            className="nav__theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>

        <button
          type="button"
          className="nav__menu"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu__links" aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...navLinks].map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <NavLink to={to} end={to === '/'} className="menu__link xl">
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot">
              <a href={`mailto:${email}`}>{email}</a>
              <span className="tnum">Kuala Lumpur {time}</span>
              <button type="button" onClick={toggleTheme} className="menu__theme">
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
