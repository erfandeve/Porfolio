import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

export default function Loader({ progress = 0 }) {
  const { t } = useLang()
  return (
    <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="loader-inner">
        <motion.img
          src="/virus.svg"
          alt=""
          width={64}
          height={64}
          style={{ filter: 'drop-shadow(0 0 18px rgba(57,255,20,.8))' }}
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
        />
        <span className="loader-text">{t.loader.line1}</span>
        <div className="loader-bar">
          <motion.div className="loader-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  )
}
