import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { skillGroups } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

export default function Skills() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="skills">
      <span className="watermark" aria-hidden="true">06</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.skills.kicker}
          title={t.sections.skills.title}
          sub={t.sections.skills.sub}
        />

        <div className="skills-grid">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.id} delay={gi * 0.07} className="card skill-group">
              <h3>
                <span>{String(gi + 1).padStart(2, '0')}</span>
                {pick(g.group)}
              </h3>
              {g.items.map((s, si) => (
                <div className="skill-row" key={si}>
                  <div className="skill-meta">
                    <span>{pick(s.name)}</span>
                    <b>{s.level}%</b>
                  </div>
                  <div className="bar">
                    <motion.div
                      className="bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 1.1, delay: 0.1 + si * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
