import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

/* Shared timeline used by research, clinical and education blocks. */
export default function Timeline({ items, roleKey = 'role' }) {
  const { pick, t } = useLang()

  return (
    <div className="timeline">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.06} className={`tl-item ${item.current ? 'current' : ''}`}>
          <span className="tl-dot" aria-hidden="true" />
          <div className="card">
            <div className="tl-head">
              <h3 className="tl-role">
                {pick(item[roleKey])}
                {item.current && <span className="badge-now">{t.labels.present}</span>}
              </h3>
              <span className="tl-period">{pick(item.period)}</span>
            </div>
            <div className="tl-org">{pick(item.org)}</div>
            <div className="tl-place">{pick(item.place)}</div>
            {item.highlights?.length > 0 && (
              <div className="tl-highlights">
                {item.highlights.map((h, hi) => (
                  <span className="highlight-chip" key={hi}>
                    {pick(h)}
                  </span>
                ))}
              </div>
            )}
            <p className="tl-detail">{pick(item.detail)}</p>
            {item.tags?.length > 0 && (
              <div className="tag-row" style={{ marginBlockStart: 14, marginBlockEnd: 0 }}>
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
