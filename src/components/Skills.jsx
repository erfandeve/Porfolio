import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { skillGroups } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

export default function Skills() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="skills">
      <span className="watermark" aria-hidden="true">07</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.skills.kicker}
          title={t.sections.skills.title}
          sub={t.sections.skills.sub}
        />

        <div className="skills-grid">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.id} delay={gi * 0.06} className="card skill-group">
              <h3>
                <span>{String(gi + 1).padStart(2, '0')}</span>
                {pick(g.group)}
              </h3>
              <div className="chip-row">
                {g.items.map((item, si) => (
                  <motion.span
                    className="chip"
                    key={si}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: si * 0.035 }}
                  >
                    {pick(item)}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
