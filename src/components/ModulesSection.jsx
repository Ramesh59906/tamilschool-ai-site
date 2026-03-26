import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CORE_MODULES } from '../data/landingContent'
import Container from './Container'
import ModuleIcon from './ModuleIcon'

const CARD_THEMES = [
  { gradient: 'from-logo-blue/8 to-tkm-600/4', border: 'hover:border-logo-blue/40', tag: 'bg-tkm-100 text-tkm-700', check: 'from-logo-blue to-tkm-600' },
  { gradient: 'from-logo-orange/8 to-accent-500/4', border: 'hover:border-logo-orange/40', tag: 'bg-accent-100 text-accent-600', check: 'from-logo-orange to-accent-500' },
  { gradient: 'from-logo-green/8 to-emerald-500/4', border: 'hover:border-logo-green/40', tag: 'bg-emerald-100 text-emerald-700', check: 'from-logo-green to-emerald-500' },
  { gradient: 'from-logo-purple/8 to-purple-500/4', border: 'hover:border-logo-purple/40', tag: 'bg-purple-100 text-purple-700', check: 'from-logo-purple to-purple-500' },
]

function ModuleCard({ module, index, theme }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'} aios-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 sm:rounded-3xl sm:p-8 ${theme.border}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
      data-aos-delay={index * 120}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:ring-2">
          <ModuleIcon type={module.icon} />
        </div>
        <span className={`rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${theme.tag}`}>Module</span>
      </div>
      <h3 className="relative z-10 mb-2 font-display text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-tkm-700">{module.title}</h3>
      <p className="relative z-10 mb-6 text-[0.92rem] leading-relaxed text-slate-500">{module.subtitle}</p>
      <ul className="relative z-10 mt-auto flex flex-col gap-3 p-0 m-0 list-none">
        {module.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[0.9rem] font-medium text-slate-600">
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${theme.check} text-white`}>
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </div>
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function ModulesSection() {
  const headRef = useRef(null)
  const ctaRef = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.2 },
    )

    ;[headRef.current, ctaRef.current].filter(Boolean).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-surface-alt py-14 sm:py-20 md:py-28" id="modules" aria-labelledby="modules-heading">
      <Container className="relative z-10">
        <div ref={headRef} className="reveal mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <span className="mb-3 inline-block rounded-full bg-accent-100 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-accent-600 sm:px-4 sm:py-1.5 sm:text-[0.75rem]">
            Learning Paths
          </span>
          <h2 id="modules-heading" className="mb-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl">
            {CORE_MODULES.title}
          </h2>
          <p className="text-base text-slate-500 sm:text-lg">{CORE_MODULES.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {CORE_MODULES.modules.map((m, idx) => (
            <ModuleCard key={m.title} module={m} index={idx} theme={CARD_THEMES[idx % CARD_THEMES.length]} />
          ))}
        </div>
        <div ref={ctaRef} className="reveal mt-10 text-center sm:mt-14">
          <Link
            to="/login?mode=user"
            className="group inline-flex items-center gap-2 rounded-full bg-tkm-950 px-8 py-4 font-display text-[0.95rem] font-bold text-white shadow-lg shadow-tkm-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span>{CORE_MODULES.cta}</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}
