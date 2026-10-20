import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

export default function LangSwitch() {
  const { lang, setLang, langs, t } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label={t.a11y.langSwitch}>
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-btn ${lang === l.code ? 'active' : ''}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.label}
        >
          {lang === l.code && (
            <motion.span
              layoutId="lang-pill"
              className="lang-pill"
              style={{ inset: 0, position: 'absolute' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>{l.short}</span>
        </button>
      ))}
    </div>
  )
}
