import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Research from './components/Research'
import Publications from './components/Publications'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Talks from './components/Talks'
import Languages from './components/Languages'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'

function Shell() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(8)

  useEffect(() => {
    // Timer-based rather than rAF-based so the intro still finishes in a
    // background tab, where requestAnimationFrame is throttled to a halt.
    const start = Date.now()
    const id = setInterval(() => {
      const p = Math.min(100, 8 + ((Date.now() - start) / 1400) * 92)
      setProgress(p)
      if (p >= 100) {
        clearInterval(id)
        setLoading(false)
      }
    }, 60)
    const failsafe = setTimeout(() => setLoading(false), 3200)
    // A backgrounded tab freezes its timers; drop the intro as soon as the
    // page is actually looked at rather than leaving a stuck splash screen.
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - start > 900) setLoading(false)
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      clearTimeout(failsafe)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader progress={progress} />}</AnimatePresence>
      <ScrollProgress />
      <div className="app">
        <Nav />
        <main>
          <Hero />
          <About />
          <Research />
          <Publications />
          <Talks />
          <Experience />
          <Education />
          <Skills />
          <Languages />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  )
}
