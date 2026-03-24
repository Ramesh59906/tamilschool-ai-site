import { useEffect, useRef } from 'react'
import { ANALYTICS } from '../data/landingContent'
import Container from './Container'

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const target = parseInt(value.toString().replace(/,/g, ''), 10) || 0
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let startTs = null, frame
    const step = (ts) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / 2200, 1)
      el.textContent = Math.floor((1 - Math.pow(1 - p, 4)) * target).toLocaleString()
      if (p < 1) frame = requestAnimationFrame(step)
      else el.textContent = target.toLocaleString()
    }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { frame = requestAnimationFrame(step); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => { if (frame) cancelAnimationFrame(frame); obs.disconnect() }
  }, [target])
  return <><span ref={ref}>0</span>{suffix}</>
}

const STAT_ICONS = [
  <svg key="s" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>,
  <svg key="m" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  <svg key="v" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
]

function StatCard({ stat, index, icon }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="reveal aios-card group flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-tkm-400/20 hover:bg-white/[0.06] sm:rounded-3xl sm:p-10" style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-logo-blue/10 text-tkm-300 ring-1 ring-logo-blue/20 transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <span className="mb-2 block font-display text-3xl font-extrabold text-white sm:text-4xl"><AnimatedCounter value={stat.value} suffix={stat.valueSuffix ?? ''} /></span>
      <span className="text-[0.85rem] font-bold uppercase tracking-widest text-tkm-300/60">{stat.label}</span>
    </div>
  )
}

export default function AnalyticsSection() {
  const headRef = useRef(null)
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-tkm-950 py-14 sm:py-20 md:py-28" id="analytics" aria-labelledby="analytics-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,114,188,0.15),transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_80%,rgba(0,166,81,0.08),transparent)]" aria-hidden="true" />
      <Container className="relative z-10">
        <div ref={headRef} className="reveal mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <span className="mb-3 inline-block rounded-full border border-logo-green/20 bg-logo-green/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-emerald-300 sm:px-4 sm:py-1.5 sm:text-[0.75rem]">Insights</span>
          <h2 id="analytics-heading" className="mb-3 font-display text-2xl font-extrabold tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">{ANALYTICS.title}</h2>
          <p className="mb-2 text-base font-semibold text-accent-400 sm:mb-3 sm:text-lg">{ANALYTICS.subtitle}</p>
          <p className="text-sm leading-relaxed text-tkm-200/70 sm:text-base">{ANALYTICS.body}</p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {ANALYTICS.stats.map((s, idx) => <StatCard key={s.label} stat={s} index={idx} icon={STAT_ICONS[idx]} />)}
        </div>
      </Container>
    </section>
  )
}
