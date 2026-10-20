import { useLang } from '../i18n/LanguageContext'
import { talks, courses } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconMic, IconPoster, IconCert } from './Icons'

export default function Talks() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="talks">
      <span className="watermark" aria-hidden="true">07</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.talks.kicker}
          title={t.sections.talks.title}
          sub={t.sections.talks.sub}
        />

        <div className="two-col">
          {talks.map((talk, i) => (
            <Reveal key={talk.id} delay={i * 0.08} className="card">
              <span className="talk-format">
                <em>{talk.formatKey === 'oral' ? <IconMic width={15} height={15} /> : <IconPoster width={15} height={15} />}</em>
                {pick(talk.format)}
              </span>
              <h3 className="talk-title">{pick(talk.title)}</h3>
              <div className="talk-event">{pick(talk.event)}</div>
              <div className="talk-date">{pick(talk.date)}</div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginBlockStart: 'clamp(48px, 7vw, 84px)' }}>
          <SectionHead
            kicker={t.sections.courses.kicker}
            title={t.sections.courses.title}
            sub={t.sections.courses.sub}
          />
          <div className="two-col">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08} className="card">
                <span className="talk-format">
                  <em><IconCert width={15} height={15} /></em>
                  {pick(c.date)}
                </span>
                <h3 className="talk-title">{pick(c.title)}</h3>
                <div className="talk-event">{pick(c.org)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
