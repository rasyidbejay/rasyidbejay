import { useCallback, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'

const KEY = 'rb-theme'

const initial = () =>
  typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initial)

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
      else document.documentElement.removeAttribute('data-theme')
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
