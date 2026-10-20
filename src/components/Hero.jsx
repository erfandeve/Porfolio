import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import HeroScene from '../three/HeroScene'
import { profile } from '../data/profile'
import { IconArrow, IconDownload, IconPin, IconMail, IconMicroscope } from './Icons'

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { t, pick, rtl } = useLang()

  return (
    <section className="hero" id="home">
      <HeroScene rtl={rtl} />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <motion.span className="hero-badge" variants={fade} custom={0} initial="hidden" animate="show">
          <i className="pulse-dot" />
          {t.hero.badge}
        </motion.span>

        <motion.h1 className="hero-title" variants={fade} custom={1} initial="hidden" animate="show">
          {pick(profile.name)}
        </motion.h1>

        <motion.p className="hero-role" variants={fade} custom={2} initial="hidden" animate="show">
          {pick(profile.role)}
        </motion.p>

        <motion.p className="hero-tagline" variants={fade} custom={3} initial="hidden" animate="show">
          {pick(profile.tagline)}
        </motion.p>

        <motion.div className="hero-actions" variants={fade} custom={4} initial="hidden" animate="show">
          <a className="btn btn-primary" href="#publications">
            <span>{t.hero.cta}</span>
            <IconArrow width={16} height={16} style={{ transform: rtl ? 'scaleX(-1)' : 'none' }} />
          </a>
          <a className="btn btn-ghost" href={profile.cv} download>
            <IconDownload width={16} height={16} />
            <span>{t.hero.cta2}</span>
          </a>
        </motion.div>

        <motion.div className="hero-meta" variants={fade} custom={5} initial="hidden" animate="show">
          <span>
            <i><IconMicroscope width={15} height={15} /></i>
            {pick(profile.affiliation)}
          </span>
          <span>
            <i><IconPin width={15} height={15} /></i>
            {pick(profile.location)}
          </span>
          <span>
            <i><IconMail width={15} height={15} /></i>
            <span dir="ltr">{profile.email}</span>
          </span>
        </motion.div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span>{t.hero.scroll}</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  )
}
