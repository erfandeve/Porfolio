import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { publications, manuscripts } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconExternal, IconDoc } from './Icons'

const SELF = 'Amirreza Khoshniat'

export default function Publications() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="publications">
      <span className="watermark" aria-hidden="true">03</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.publications.kicker}
          title={t.sections.publications.title}
          sub={t.sections.publications.sub}
        />

        <div className="pub-list">
          {publications.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="card"
            >
              <span className="kind-chip">{t.kinds[p.kind]}</span>
              <div className="pub">
                <div className="pub-year">
                  {p.year}
                  {pick(p.date) !== p.year && <small>{pick(p.date)}</small>}
                </div>
                <div>
                  <h3 className="pub-title">{pick(p.title)}</h3>
                  {p.authors?.length > 0 && (
                    <p className="pub-authors" dir="ltr">
                      {p.authors.map((a, ai) => (
                        <span key={a} className={a === SELF ? 'author-self' : undefined}>
                          {a}
                          {ai < p.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                  <div className="pub-venue">
                    <span style={{ color: 'var(--neon-soft)' }}>{t.labels.venue}</span>
                    <span className="dot-sep">/</span>
                    <span>{pick(p.venue)}</span>
                  </div>
                  {p.details && <div className="pub-details">{pick(p.details)}</div>}
                  <p className="pub-summary">{pick(p.summary)}</p>
                  <div className="tag-row">
                    {p.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.links?.length > 0 ? (
                    <div className="pub-links">
                      {p.links.map((l) => (
                        <a
                          className="pub-link"
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          dir="ltr"
                        >
                          <IconExternal width={14} height={14} />
                          <span>{l.label ?? t.labels.readPaper}</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="sub-block">
          <Reveal>
            <h3 className="sub-title">{t.sections.manuscripts.title}</h3>
            <p className="section-sub">{t.sections.manuscripts.sub}</p>
          </Reveal>

          <div className="ms-list">
            {manuscripts.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.06} className={`ms-item status-${m.status}`}>
                <span className="ms-icon" aria-hidden="true">
                  <IconDoc width={16} height={16} />
                </span>
                <div className="ms-body">
                  <h4>{pick(m.title)}</h4>
                  <div className="ms-meta">
                    <span className="ms-authors" dir="ltr">{m.authorLine}</span>
                    <span className="dot-sep">/</span>
                    <span>{pick(m.type)}</span>
                  </div>
                  <p className="ms-note">{pick(m.note)}</p>
                </div>
                <span className="ms-status">{t.status[m.status]}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
