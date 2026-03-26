import { useEffect, useRef } from 'react'
import { SAFETY } from '../data/landingContent'
import Container from './Container'

export default function SafetySection() {
  const cardRef = useRef(null)
  const iconRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const chipsRef = useRef(null)
  const bodyRef = useRef(null)
  const linkRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.15 },
    )

    ;[cardRef.current, iconRef.current, titleRef.current, subtitleRef.current, chipsRef.current, bodyRef.current, linkRef.current]
      .filter(Boolean)
      .forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-surface py-14 sm:py-20 md:py-28" id="safety" aria-labelledby="safety-heading">
      <div className="absolute left-[40%] top-0 h-[400px] w-[400px] rounded-full bg-logo-green/15 blur-[120px] pointer-events-none" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl">
          <div
            ref={cardRef}
            className="reveal reveal-left aios-card rounded-2xl border border-emerald-200/60 bg-gradient-to-b from-white to-emerald-50/50 p-6 text-center shadow-xl shadow-emerald-900/5 sm:rounded-[2rem] sm:p-10 md:p-14"
            data-aos="fade-right"
          >
            <div ref={iconRef} className="reveal mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-logo-green to-teal-600 shadow-lg shadow-logo-green/25" style={{ transitionDelay: '80ms' }}>
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 ref={titleRef} id="safety-heading" className="reveal mb-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl" style={{ transitionDelay: '140ms' }}>{SAFETY.title}</h2>
            <p ref={subtitleRef} className="reveal mx-auto mb-8 max-w-[42ch] text-sm text-slate-500 sm:text-base" style={{ transitionDelay: '200ms' }}>{SAFETY.subtitle}</p>
            <div ref={chipsRef} className="reveal mb-8 flex flex-wrap justify-center gap-2 sm:gap-3" style={{ transitionDelay: '260ms' }}>
              {SAFETY.items.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[0.78rem] font-semibold text-emerald-700 shadow-sm sm:gap-2 sm:px-4 sm:py-2 sm:text-[0.85rem]">
                  <svg className="h-4 w-4 text-logo-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <p ref={bodyRef} className="reveal mb-8 text-[0.95rem] leading-relaxed text-slate-500" style={{ transitionDelay: '320ms' }}>{SAFETY.body}</p>
            <a ref={linkRef} href={SAFETY.privacyHref} target="_blank" rel="noreferrer" className="reveal group inline-flex items-center gap-2 font-display text-[0.9rem] font-bold text-logo-green transition-colors hover:text-emerald-700" style={{ transitionDelay: '380ms' }}>
              {SAFETY.privacyLabel}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
