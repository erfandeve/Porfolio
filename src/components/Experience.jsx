import { useLang } from '../i18n/LanguageContext'
import { experience } from '../data/cv'
import SectionHead from './SectionHead'
import Timeline from './Timeline'

export default function Experience() {
  const { t } = useLang()
  return (
    <section className="section" id="experience">
      <span className="watermark" aria-hidden="true">04</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.experience.kicker}
          title={t.sections.experience.title}
          sub={t.sections.experience.sub}
        />
        <Timeline items={experience} roleKey="role" />
      </div>
    </section>
  )
}
