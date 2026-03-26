import { TESTIMONIALS } from '../data/landingContent'
import Container from './Container'

const nightSkyIcons = [
  { icon: '✨', left: '15%', delay: '0s', duration: '15s', size: '2rem', color: 'text-indigo-300' },
  { icon: '🌟', left: '35%', delay: '-5s', duration: '20s', size: '1.5rem', color: 'text-sky-300' },
  { icon: '⭐', left: '60%', delay: '-10s', duration: '25s', size: '2.5rem', color: 'text-amber-200' },
  { icon: '✨', left: '85%', delay: '-2s', duration: '18s', size: '1.8rem', color: 'text-teal-300' },
  { icon: '🌟', left: '20%', delay: '-8s', duration: '22s', size: '2.2rem', color: 'text-purple-300' },
  { icon: '⭐', left: '75%', delay: '-15s', duration: '19s', size: '1.5rem', color: 'text-rose-200' },
];

const nightSkyStars = nightSkyIcons.map((item, i) => {
  const seed = (Math.sin((i + 1) * 1337) * 10000) % 1
  return { ...item, top: `${Math.abs(seed) * 80}%` }
})

export default function TestimonialsSection() {
  // Duplicate items to ensure a seamless infinite marquee loop
  const carouselItems = [...TESTIMONIALS.items, ...TESTIMONIALS.items, ...TESTIMONIALS.items, ...TESTIMONIALS.items];

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-20 md:py-[6.5rem]"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      {/* Deep Magical Night Sky Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft giant orbs */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[130px] animate-[blob_18s_infinite_ease-in-out]"></div>
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-teal-600/15 blur-[140px] animate-[blob_20s_infinite_ease-in-out]" style={{ animationDelay: '5s' }}></div>
        <div className="absolute -bottom-[20%] left-[15%] w-[65%] h-[65%] rounded-full bg-purple-600/15 blur-[120px] animate-[blob_25s_infinite_ease-in-out]" style={{ animationDelay: '10s' }}></div>

        {/* Floating Stars */}
        {nightSkyStars.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floating_8s_ease-in-out_infinite] opacity-40 select-none ${item.color}`}
             style={{
               left: item.left,
               top: item.top,
               animationDuration: item.duration,
               animationDelay: item.delay,
               fontSize: item.size
             }}
             aria-hidden="true"
          >
             {item.icon}
          </div>
        ))}
        
        {/* Animated dotted grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-70"></div>
      </div>

      <div className="relative z-10">
        <Container className="mb-14 text-center animate-[slideUpFade_0.8s_ease-out_both]">
          <h2
            id="testimonials-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-[2.8rem]"
          >
            {TESTIMONIALS.title}
          </h2>
          <p className="mx-auto max-w-[56ch] text-lg font-medium text-indigo-300">
            {TESTIMONIALS.subtitle}
          </p>
        </Container>

        {/* Auto-scrolling Marquee Carousel Container */}
        <div className="relative flex overflow-hidden w-full py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] items-stretch gap-6 md:gap-8 pr-6 md:pr-8 hover:[animation-play-state:paused]">
            {carouselItems.map((t, idx) => (
              <blockquote
                key={`${t.author}-${idx}`}
                className="group relative m-0 flex w-[320px] sm:w-[420px] flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] hover:border-indigo-400/40"
              >
                {/* Decorative Quote Icon Highlight */}
                <div className="absolute -right-6 -top-6 text-[8rem] text-white/5 font-serif leading-none group-hover:text-indigo-400/10 transition-colors duration-500 select-none">
                  "
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${star * 50}ms` }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-8 text-[1.05rem] italic leading-relaxed text-slate-200 group-hover:text-white transition-colors duration-300">
                    "{t.quote}"
                  </p>
                </div>
                
                <footer className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-white/10 group-hover:border-indigo-400/20 transition-colors duration-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-md shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
                    {t.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <cite className="not-italic text-[1.05rem] font-bold text-white">{t.author}</cite>
                    <span className="text-[0.85rem] font-medium tracking-wide text-indigo-300/80">{t.role}</span>
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
