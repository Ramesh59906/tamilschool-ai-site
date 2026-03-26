import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { TEACHERS } from '../data/landingContent'
import Container from './Container'

function CheckItem({ children, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <li ref={ref} className="reveal group flex items-start gap-4 text-[0.95rem] font-medium text-slate-600 transition-colors hover:text-slate-900" style={{ transitionDelay: delay }}>
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-logo-orange to-logo-red text-white shadow-sm shadow-logo-orange/20 transition-transform duration-300 group-hover:scale-110">
        <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function TeachersSection() {
  const headRef = useRef(null)
  const cardRef = useRef(null)
  const ctaRef = useRef(null)

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

    ;[headRef.current, cardRef.current, ctaRef.current].filter(Boolean).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-surface py-14 sm:py-20 md:py-28" id="teachers" aria-labelledby="teachers-heading">
      <div className="absolute -right-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-accent-200/30 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-[15%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-tkm-200/20 blur-[100px] pointer-events-none" aria-hidden="true" />
      <Container className="relative z-10">
        <div ref={headRef} className="reveal mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <span className="mb-3 inline-block rounded-full bg-rose-100 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-logo-red sm:px-4 sm:py-1.5 sm:text-[0.75rem]">For Educators</span>
          <h2 id="teachers-heading" className="mb-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl">{TEACHERS.title}</h2>
          <p className="text-base text-slate-500 sm:text-lg">{TEACHERS.subtitle}</p>
        </div>
        <div
          ref={cardRef}
          className="reveal reveal-right aios-card mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:rounded-[2rem] sm:p-10 md:p-14"
          data-aos="fade-left"
        >
          <ul className="mb-10 grid grid-cols-1 gap-x-10 gap-y-5 p-0 m-0 list-none sm:grid-cols-2">
            {TEACHERS.bullets.map((b, idx) => <CheckItem key={b} delay={`${idx * 100 + 200}ms`}>{b}</CheckItem>)}
          </ul>
          <div ref={ctaRef} className="reveal flex justify-center border-t border-slate-100 pt-8" style={{ transitionDelay: '220ms' }}>
            <Link to="/register" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-tkm-600 to-tkm-700 px-8 py-3.5 font-display text-[0.9rem] font-bold text-white shadow-lg shadow-tkm-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              <span>{TEACHERS.cta}</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
