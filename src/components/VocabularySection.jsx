import { useEffect, useRef } from 'react'
import { VOCABULARY } from '../data/landingContent'
import Container from './Container'

const TAB_THEMES = [
  { icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>, accent: 'bg-logo-blue/10 text-logo-blue ring-logo-blue/20', hover: 'group-hover:border-logo-blue/40' },
  { icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L12 17.25 6.43 14.25m11.142 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25" /></svg>, accent: 'bg-logo-orange/10 text-logo-orange ring-logo-orange/20', hover: 'group-hover:border-logo-orange/40' },
  { icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>, accent: 'bg-logo-green/10 text-logo-green ring-logo-green/20', hover: 'group-hover:border-logo-green/40' },
]

export default function VocabularySection() {
  const headRef = useRef(null)
  const cardRefs = useRef([])
  useEffect(() => {
    const els = [headRef.current, ...cardRefs.current].filter(Boolean)
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: 0.15 })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-surface-alt py-14 sm:py-20 md:py-28" id="vocabulary" aria-labelledby="vocabulary-heading">
      <Container className="relative z-10">
        <div ref={headRef} className="reveal mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-emerald-700 sm:px-4 sm:py-1.5 sm:text-[0.75rem]">Interactive Learning</span>
          <h2 id="vocabulary-heading" className="mb-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl">{VOCABULARY.title}</h2>
          <p className="text-base text-slate-500 sm:text-lg">{VOCABULARY.subtitle}</p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {VOCABULARY.tabs.map((tab, idx) => {
            const theme = TAB_THEMES[idx]
            return (
              <article
                key={tab.label}
                ref={(el) => { cardRefs.current[idx] = el }}
                className={`reveal ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} aios-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/5 sm:rounded-3xl sm:p-8 ${theme.hover}`}
                style={{ transitionDelay: `${idx * 120}ms` }}
                data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={idx * 120}
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${theme.accent}`}>{theme.icon}</div>
                <h3 className="mb-3 font-display text-xl font-bold text-slate-900">{tab.label}</h3>
                <p className="text-[0.92rem] leading-relaxed text-slate-500">{tab.text}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
