import { useEffect, useRef } from 'react'
import { TESTIMONIALS } from '../data/landingContent'
import Container from './Container'

export default function TestimonialsSection() {
  const headRef = useRef(null)
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const items = [...TESTIMONIALS.items, ...TESTIMONIALS.items, ...TESTIMONIALS.items, ...TESTIMONIALS.items]

  return (
    <section className="relative overflow-hidden bg-tkm-950 py-14 sm:py-20 md:py-28" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="absolute -left-[20%] top-0 h-[500px] w-[500px] rounded-full bg-logo-blue/12 blur-[140px]" aria-hidden="true" />
      <div className="absolute -right-[15%] bottom-0 h-[400px] w-[400px] rounded-full bg-logo-orange/6 blur-[120px]" aria-hidden="true" />
      <div className="relative z-10">
        <Container>
          <div ref={headRef} className="reveal mb-8 text-center sm:mb-14">
            <span className="mb-3 inline-block rounded-full border border-tkm-400/20 bg-tkm-500/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-tkm-300 sm:px-4 sm:py-1.5 sm:text-[0.75rem]">Testimonials</span>
            <h2 id="testimonials-heading" className="mb-3 font-display text-2xl font-extrabold tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl">{TESTIMONIALS.title}</h2>
            <p className="mx-auto max-w-[48ch] text-base text-tkm-200/60 sm:text-lg">{TESTIMONIALS.subtitle}</p>
          </div>
        </Container>
        <div className="relative flex w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-[marquee_45s_linear_infinite] items-stretch gap-4 pr-4 sm:gap-6 sm:pr-6 hover:[animation-play-state:paused]">
            {items.map((t, idx) => (
              <blockquote key={`${t.author}-${idx}`} className="aios-card group relative m-0 flex w-[280px] flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-tkm-400/25 hover:bg-white/[0.06] sm:w-[380px] sm:p-8">
                <div className="mb-5 flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="h-4 w-4 text-logo-yellow" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-8 text-[0.95rem] leading-relaxed text-tkm-100/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-auto flex items-center gap-3.5 border-t border-white/8 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-logo-blue to-logo-purple font-display text-sm font-bold text-white">{t.author.charAt(0)}</div>
                  <div>
                    <cite className="block not-italic text-[0.9rem] font-bold text-white">{t.author}</cite>
                    <span className="text-[0.8rem] text-tkm-300/60">{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
