import { useLang } from '../i18n/LanguageContext'
import { researchExperience, experience } from '../data/cv'
import { profile } from '../data/profile'
import SectionHead from './SectionHead'
import Timeline from './Timeline'
import Reveal from './Reveal'

export default function Experience() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="experience">
      <span className="watermark" aria-hidden="true">05</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.researchExp.kicker}
          title={t.sections.researchExp.title}
          sub={t.sections.researchExp.sub}
        />

        <Reveal className="lab-strip">
          <img src={profile.labPhoto} alt={pick(profile.name)} loading="lazy" />
          <span className="lab-strip-caption">{t.labels.labCaption}</span>
        </Reveal>

        <Timeline items={researchExperience} roleKey="role" />

        <div className="sub-block">
          <Reveal>
            <h3 className="sub-title">{t.sections.clinical.title}</h3>
            <p className="section-sub">{t.sections.clinical.sub}</p>
          </Reveal>
          <Timeline items={experience} roleKey="role" />
        </div>
      </div>
    </section>
  )
}
