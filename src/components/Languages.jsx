import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { languages } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

const R = 40
const C = 2 * Math.PI * R

export default function Languages() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="languages">
      <span className="watermark" aria-hidden="true">08</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.languages.kicker}
          title={t.sections.languages.title}
          sub={t.sections.languages.sub}
        />

        <div className="two-col">
          {languages.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.1} className="card lang-card">
              <div className="ring big">
                <svg width="94" height="94" viewBox="0 0 94 94">
                  <defs>
                    <linearGradient id={`ringGrad-${l.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#39ff14" />
                      <stop offset="100%" stopColor="#00ffa3" />
                    </linearGradient>
                  </defs>
                  <circle className="track" cx="47" cy="47" r={R} />
                  <motion.circle
                    className="prog"
                    cx="47"
                    cy="47"
                    r={R}
                    stroke={`url(#ringGrad-${l.id})`}
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    whileInView={{ strokeDashoffset: C - (C * l.level) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <b>{l.level}%</b>
              </div>
              <div className="lang-text">
                <h3>{pick(l.name)}</h3>
                <span>{pick(l.note)}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
