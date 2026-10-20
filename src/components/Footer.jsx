import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/profile'

export default function Footer() {
  const { t, pick } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {year} {pick(profile.name)} — {t.footer.rights}
        </span>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>{t.labels.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            {t.labels.linkedin}
          </a>
          <a href={profile.cv} download>
            {t.labels.cv}
          </a>
        </div>
        <span style={{ opacity: 0.7 }}>{t.footer.built}</span>
      </div>
    </footer>
  )
}
