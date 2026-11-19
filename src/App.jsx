import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import { startSmoothScroll, stopSmoothScroll, scrollToTop } from './lib/lenis'
import { ScrollTrigger } from './lib/motion'
import { markReady } from './lib/ready'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        scrollToTop()
        ScrollTrigger.refresh()
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    markReady()
    startSmoothScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      stopSmoothScroll()
    }
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <a
          className="skip"
          href="#main"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('main')?.focus()
          }}
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
