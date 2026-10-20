import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { publications } from '../data/cv'
import SectionHead from './SectionHead'
import { IconExternal } from './Icons'

const FILTERS = ['all', 'journal', 'congress']
const SELF = 'Amirreza Khoshniat'

export default function Publications() {
  const { t, pick, rtl } = useLang()
  const [filter, setFilter] = useState('all')

  const list = publications.filter((p) => filter === 'all' || p.kind === filter)

  return (
    <section className="section" id="publications">
      <span className="watermark" aria-hidden="true">03</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.publications.kicker}
          title={t.sections.publications.title}
          sub={t.sections.publications.sub}
        />

        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {t.filters[f]}
              <span style={{ opacity: 0.6, marginInlineStart: 8 }}>
                {f === 'all' ? publications.length : publications.filter((p) => p.kind === f).length}
              </span>
            </button>
          ))}
        </div>

        <motion.div className="pub-list" layout>
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="card"
              >
                <span className="kind-chip">{p.kind === 'journal' ? t.filters.journal : t.filters.congress}</span>
                <div className="pub">
                  <div className="pub-year">
                    {p.year}
                    <small>{pick(p.date)}</small>
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
                    ) : (
                      <span className="pub-nolink">{t.labels.noLink}</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
