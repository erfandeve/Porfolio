import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { languages } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

const R = 32
const C = 2 * Math.PI * R

function Ring({ level, label }) {
  return (
    <div className="ring-wrap">
      <div className="ring">
        <svg width="74" height="74" viewBox="0 0 74 74">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#39ff14" />
              <stop offset="100%" stopColor="#00ffa3" />
            </linearGradient>
          </defs>
          <circle className="track" cx="37" cy="37" r={R} />
          <motion.circle
            className="prog"
            cx="37"
            cy="37"
            r={R}
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C - (C * level) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <b>{level}%</b>
      </div>
      <small>{label}</small>
    </div>
  )
}

export default function Languages() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="languages">
      <span className="watermark" aria-hidden="true">09</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.languages.kicker}
          title={t.sections.languages.title}
          sub={t.sections.languages.sub}
        />

        <div className="two-col">
          {languages.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.1} className="card lang-card">
              <div className="lang-head">
                <h3>{pick(l.name)}</h3>
                <span>{pick(l.note)}</span>
              </div>
              <div className="lang-skills">
                {l.skills.map((s) => (
                  <Ring key={s.key} level={s.level} label={t.labels.langSkills[s.key]} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
