import { useLang } from '../i18n/LanguageContext'
import { education } from '../data/cv'
import SectionHead from './SectionHead'
import Timeline from './Timeline'

export default function Education() {
  const { t } = useLang()
  return (
    <section className="section" id="education">
      <span className="watermark" aria-hidden="true">05</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.education.kicker}
          title={t.sections.education.title}
          sub={t.sections.education.sub}
        />
        <Timeline items={education} roleKey="degree" />
      </div>
    </section>
  )
}
