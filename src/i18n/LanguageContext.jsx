import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { LANGS, strings } from './strings'

const TITLES = {
  en: 'Amirreza Khoshniat — Medical Virology',
  de: 'Amirreza Khoshniat — Medizinische Virologie',
  fa: 'امیررضا خوش‌نیت — ویروس‌شناسی پزشکی',
}

const LanguageContext = createContext(null)
const STORAGE_KEY = 'ak-portfolio-lang'

function detectLang() {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && LANGS.some((l) => l.code === stored)) return stored
  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('fa') || nav.startsWith('pe')) return 'fa'
  if (nav.startsWith('de')) return 'de'
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  const dir = LANGS.find((l) => l.code === lang)?.dir ?? 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    root.dataset.lang = lang
    document.title = TITLES[lang] ?? TITLES.en
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir])

  const setLang = useCallback((code) => setLangState(code), [])

  // Pick the right variant out of a {en, de, fa} object; falls back to English.
  const pick = useCallback(
    (value) => {
      if (value == null) return ''
      if (typeof value === 'string') return value
      return value[lang] ?? value.en ?? ''
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, setLang, dir, rtl: dir === 'rtl', t: strings[lang], pick, langs: LANGS }),
    [lang, setLang, dir, pick],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
