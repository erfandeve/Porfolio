import { useLang } from '../i18n/LanguageContext'
import { talks } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconMic, IconPoster, IconExternal } from './Icons'

export default function Talks() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="talks">
      <span className="watermark" aria-hidden="true">04</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.talks.kicker}
          title={t.sections.talks.title}
          sub={t.sections.talks.sub}
        />

        <div className="talk-grid">
          {talks.map((talk, i) => (
            <Reveal key={talk.id} delay={i * 0.08} className="card talk-card">
              <div className="talk-top">
                <span className="talk-format">
                  <em>
                    {talk.formatKey === 'oral' ? <IconMic width={15} height={15} /> : <IconPoster width={15} height={15} />}
                  </em>
                  {pick(talk.format)}
                </span>
                <span className="talk-year">{talk.year}</span>
              </div>
              <h3 className="talk-title">{pick(talk.title)}</h3>
              <p className="talk-authors" dir="ltr">{talk.authorLine}</p>
              <div className="talk-event">{pick(talk.event)}</div>
              {talk.link && (
                <a className="pub-link" href={talk.link} target="_blank" rel="noopener noreferrer" dir="ltr">
                  <IconExternal width={14} height={14} />
                  <span>{talk.link.replace('https://', '')}</span>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
