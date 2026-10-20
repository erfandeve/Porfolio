import { Suspense, lazy } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { about } from '../data/profile'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconVirus, IconFlask, IconShield, IconDna } from './Icons'

const HelixScene = lazy(() => import('../three/HelixScene'))

const ICONS = [IconVirus, IconFlask, IconShield, IconDna]

export default function Research() {
  const { t, pick } = useLang()

  return (
    <section className="section" id="research">
      <span className="watermark" aria-hidden="true">02</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.research.kicker}
          title={t.sections.research.title}
          sub={t.sections.research.sub}
        />

        <div className="research-layout">
          <div className="focus-grid">
            {about.focus.map((f, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <Reveal key={i} delay={0.07 * i} className="card focus-card">
                  <span className="focus-icon">
                    <Icon width={22} height={22} />
                  </span>
                  <h3>{pick(f.title)}</h3>
                  <p>{pick(f.text)}</p>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.15} className="helix-holder">
            <div className="helix-stage">
              <Suspense fallback={null}>
                <HelixScene />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
