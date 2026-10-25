import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { profile, about, stats } from '../data/profile'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconPin, IconMicroscope, IconFlask } from './Icons'

export default function About() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="about">
      <span className="watermark" aria-hidden="true">01</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.about.kicker}
          title={t.sections.about.title}
          sub={t.sections.about.sub}
        />

        <div className="about-grid">
          <Reveal className="portrait-wrap">
            <figure className="portrait">
              <span className="portrait-scan" aria-hidden="true" />
              <img src={profile.photo} alt={pick(profile.name)} loading="lazy" />
              <figcaption>{t.labels.portraitCaption}</figcaption>
            </figure>
            <ul className="facts">
              <li>
                <IconMicroscope width={16} height={16} />
                {pick(profile.affiliation)}
              </li>
              <li>
                <IconPin width={16} height={16} />
                {pick(profile.location)}
              </li>
              <li>
                <IconFlask width={16} height={16} />
                {pick(profile.seeking)}
              </li>
            </ul>
          </Reveal>

          <div className="about-body">
            {pick(about.paragraphs).map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p>{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="stats" style={{ marginBlockStart: 28 }}>
                {stats.map((s, i) => (
                  <motion.div
                    className="stat"
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <div className="stat-value">
                      {s.value}
                      {s.suffix && <small>{s.suffix}</small>}
                    </div>
                    <div className="stat-label">{pick(s.label)}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
