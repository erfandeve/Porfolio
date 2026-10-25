import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { referees } from '../data/cv'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import { IconMail, IconPhone, IconPin, IconLinkedin, IconDownload, IconArrow, IconUser } from './Icons'

export default function Contact() {
  const { t, pick, rtl } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(form.subject || `Contact from ${form.name || 'portfolio'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const items = [
    { icon: IconMail, label: t.labels.email, value: profile.email, href: `mailto:${profile.email}`, ltr: true },
    { icon: IconPhone, label: t.labels.phone, value: profile.phone, href: `tel:${profile.phoneHref}`, ltr: true },
    {
      icon: IconLinkedin,
      label: t.labels.linkedin,
      value: profile.linkedinLabel,
      href: profile.linkedin,
      external: true,
      ltr: true,
    },
    { icon: IconPin, label: t.labels.location, value: pick(profile.address) },
  ]

  return (
    <section className="section" id="contact">
      <span className="watermark" aria-hidden="true">09</span>
      <div className="container">
        <SectionHead
          kicker={t.sections.contact.kicker}
          title={t.sections.contact.title}
          sub={t.sections.contact.sub}
        />

        <div className="contact-grid">
          <Reveal>
            <p className="contact-lead">{t.contact.lead}</p>

            <div className="contact-list">
              {items.map((it, i) => {
                const Icon = it.icon
                const inner = (
                  <>
                    <span className="ci-icon">
                      <Icon width={17} height={17} />
                    </span>
                    <span className="ci-body">
                      <small>{it.label}</small>
                      <span dir={it.ltr ? 'ltr' : undefined} style={{ display: 'block' }}>
                        {it.value}
                      </span>
                    </span>
                  </>
                )
                return it.href ? (
                  <a
                    className="contact-item"
                    key={i}
                    href={it.href}
                    target={it.external ? '_blank' : undefined}
                    rel={it.external ? 'noopener noreferrer' : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="contact-item" key={i}>
                    {inner}
                  </div>
                )
              })}

              <a className="contact-item" href={profile.cv} download>
                <span className="ci-icon">
                  <IconDownload width={17} height={17} />
                </span>
                <span className="ci-body">
                  <small>{t.labels.cv}</small>
                  <span>{t.labels.downloadCv}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="card">
            <form className="form" onSubmit={onSubmit}>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="c-name">{t.contact.formName}</label>
                  <input id="c-name" name="name" value={form.name} onChange={onChange} required />
                </div>
                <div className="field">
                  <label htmlFor="c-email">{t.contact.formEmail}</label>
                  <input id="c-email" name="email" type="email" value={form.email} onChange={onChange} required dir="ltr" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-subject">{t.contact.formSubject}</label>
                <input id="c-subject" name="subject" value={form.subject} onChange={onChange} />
              </div>
              <div className="field">
                <label htmlFor="c-message">{t.contact.formMessage}</label>
                <textarea id="c-message" name="message" value={form.message} onChange={onChange} required />
              </div>
              <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center' }}>
                <span>{t.contact.formSend}</span>
                <IconArrow width={16} height={16} style={{ transform: rtl ? 'scaleX(-1)' : 'none' }} />
              </button>
              <p className="form-note">{t.contact.formNote}</p>
            </form>
          </Reveal>
        </div>

        <div className="sub-block">
          <Reveal>
            <h3 className="sub-title">{t.sections.referees.title}</h3>
            <p className="section-sub">{t.sections.referees.sub}</p>
          </Reveal>
          <div className="referee-grid">
            {referees.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06} className="card referee">
                <span className="ci-icon">
                  <IconUser width={17} height={17} />
                </span>
                <div>
                  <h4>{pick(r.name)}</h4>
                  <span className="referee-role">{pick(r.role)}</span>
                  <span className="referee-org">{pick(r.org)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
