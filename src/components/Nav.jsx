import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import LangSwitch from './LangSwitch'
import { IconMenu, IconClose } from './Icons'

const SECTIONS = ['home', 'about', 'research', 'publications', 'experience', 'education', 'skills', 'talks', 'contact']

export default function Nav() {
  const { t, pick } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="brand" onClick={() => setOpen(false)}>
            <img src="/virus.svg" alt="" className="brand-mark" aria-hidden="true" />
            <span className="brand-text">
              <b>{pick({ en: 'A. Khoshniat', de: 'A. Khoshniat', fa: 'ا. خوش‌نیت' })}</b>
              <small>{pick({ en: 'Medical Virology', de: 'Medizinische Virologie', fa: 'ویروس‌شناسی پزشکی' })}</small>
            </span>
          </a>

          <ul className="nav-links">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'active' : ''}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <LangSwitch />
            <button
              type="button"
              className="burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.a11y.close : t.a11y.menu}
              aria-expanded={open}
            >
              {open ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 6%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 6%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 6%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {SECTIONS.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.045 }}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {t.nav[id]}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
