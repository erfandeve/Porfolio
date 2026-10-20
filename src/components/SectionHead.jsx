import Reveal from './Reveal'

export default function SectionHead({ kicker, title, sub }) {
  return (
    <header className="section-head">
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="section-sub">{sub}</p>
        </Reveal>
      )}
    </header>
  )
}
