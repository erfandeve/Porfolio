import { useLang } from '../i18n/LanguageContext'
import { education, courses } from '../data/cv'
import SectionHead from './SectionHead'
import Timeline from './Timeline'
import Reveal from './Reveal'
import { IconCert } from './Icons'

export default function Education() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="education">
      <span className="watermark" aria-hidden="true">06</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.education.kicker}
          title={t.sections.education.title}
          sub={t.sections.education.sub}
        />
        <Timeline items={education} roleKey="degree" />

        <div className="sub-block">
          <Reveal>
            <h3 className="sub-title">{t.sections.courses.title}</h3>
            <p className="section-sub">{t.sections.courses.sub}</p>
          </Reveal>
          <div className="two-col">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08} className="card">
                <span className="talk-format">
                  <em>
                    <IconCert width={15} height={15} />
                  </em>
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
