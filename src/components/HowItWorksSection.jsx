import { useEffect, useRef } from 'react'
import { HOW } from '../data/landingContent'
import Container from './Container'

const STEP_COLORS = [
  { bg: 'bg-logo-blue', shadow: 'shadow-logo-blue/25', accent: 'text-logo-blue' },
  { bg: 'bg-logo-orange', shadow: 'shadow-logo-orange/25', accent: 'text-logo-orange' },
  { bg: 'bg-logo-green', shadow: 'shadow-logo-green/25', accent: 'text-logo-green' },
  { bg: 'bg-logo-purple', shadow: 'shadow-logo-purple/25', accent: 'text-logo-purple' },
]

function StepCard({ step, index, color }) {
  const ref = useRef(null)
  const isLeft = index % 2 === 0
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <li ref={ref} className="reveal aios-card group relative rounded-2xl px-3 sm:px-4 md:px-0" style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="flex gap-4 pb-8 sm:gap-6 sm:pb-12 md:hidden">
        <div className="flex flex-col items-center">
          <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${color.bg} font-display text-base font-bold text-white shadow-lg sm:text-lg ${color.shadow} ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}>
            {index + 1}
          </div>
          {index < 3 && <div className="mt-2 h-full w-px bg-gradient-to-b from-slate-200 to-transparent" />}
        </div>
        <div>
          <span className={`mb-1 block text-[0.7rem] font-bold uppercase tracking-widest sm:text-[0.75rem] ${color.accent}`}>{step.n}</span>
          <h3 className="mb-1.5 font-display text-lg font-bold text-slate-900 sm:mb-2 sm:text-xl">{step.title}</h3>
          <p className="max-w-[32ch] text-[0.88rem] leading-relaxed text-slate-500 sm:text-[0.95rem]">{step.text}</p>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-7 md:pb-14">
        <div className={isLeft ? 'md:text-right md:pr-2' : ''}>
          {isLeft ? (
            <>
              <span className={`mb-1 block text-[0.75rem] font-bold uppercase tracking-widest ${color.accent}`}>{step.n}</span>
              <h3 className="mb-2 font-display text-xl font-bold text-slate-900">{step.title}</h3>
              <p className={`text-[0.95rem] leading-relaxed text-slate-500 ${isLeft ? 'ml-auto max-w-[34ch]' : 'max-w-[34ch]'}`}>{step.text}</p>
            </>
          ) : null}
        </div>

        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl ${color.bg} font-display text-lg font-bold text-white shadow-lg ${color.shadow} ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}>
          {index + 1}
        </div>

        <div className={!isLeft ? 'md:pl-2' : ''}>
          {!isLeft ? (
            <>
              <span className={`mb-1 block text-[0.75rem] font-bold uppercase tracking-widest ${color.accent}`}>{step.n}</span>
              <h3 className="mb-2 font-display text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-slate-500">{step.text}</p>
            </>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export default function HowItWorksSection() {
  const headRef = useRef(null)
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-surface py-14 sm:py-20 md:py-28" id="how-it-works" aria-labelledby="how-heading">
      <Container>
        <div ref={headRef} className="reveal mx-auto mb-10 max-w-xl text-center sm:mb-16">
          <span className="mb-3 inline-block rounded-full bg-tkm-100 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-tkm-700 sm:px-4 sm:py-1.5 sm:text-[0.75rem]">
            Simple Process
          </span>
          <h2 id="how-heading" className="mb-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl">
            {HOW.title}
          </h2>
          <p className="text-base text-slate-500 sm:text-lg">{HOW.subtitle}</p>
        </div>
        <div className="relative mx-auto max-w-xl md:max-w-5xl">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent md:block" />
          <ol className="list-none p-0 m-0">
            {HOW.steps.map((s, idx) => (
              <StepCard key={s.n} step={s} index={idx} color={STEP_COLORS[idx]} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
