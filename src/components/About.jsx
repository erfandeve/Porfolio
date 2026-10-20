import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { profile, about, stats } from '../data/profile'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconCalendar, IconUser, IconShield, IconPin } from './Icons'

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
            <div className="portrait">
              <span className="portrait-scan" aria-hidden="true" />
              <img src={profile.photo} alt={pick(profile.name)} loading="lazy" />
            </div>
            <ul className="facts">
              <li>
                <IconCalendar width={16} height={16} />
                {pick(profile.birth)}
              </li>
              <li>
                <IconUser width={16} height={16} />
                {pick(profile.marital)}
              </li>
              <li>
                <IconShield width={16} height={16} />
                {pick(profile.military)}
              </li>
              <li>
                <IconPin width={16} height={16} />
                {pick(profile.location)}
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
                    <div className="stat-value">{s.value}</div>
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
