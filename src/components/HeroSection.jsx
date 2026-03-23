import { HERO } from '../data/landingContent'
import Container from './Container'
import AnimatedBackground from './AnimatedBackground'

export default function HeroSection() {
  return (
    <>
      <section
        className="relative flex min-h-[min(92vh,820px)] flex-col justify-center overflow-hidden text-white"
      aria-labelledby="hero-heading"
    >
      <AnimatedBackground />

      <Container className="relative z-[1] py-16 pb-36 sm:py-20 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="w-full max-w-xl max-lg:mx-auto max-lg:text-center z-10 shrink-0">
          <h1
            id="hero-heading"
            className="mb-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.35rem] [text-shadow:0_2px_40px_rgba(0,0,0,0.45)]"
          >
            {HERO.title}
          </h1>
          <p className="mb-8 max-w-[36ch] text-lg font-medium leading-snug text-slate-100 max-lg:mx-auto lg:text-xl [text-shadow:0_1px_24px_rgba(0,0,0,0.4)]">
            {HERO.subtitle}
          </p>
          <div className="mb-8 flex flex-wrap gap-4 max-lg:justify-center">
            <a
              href="/admin-login"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-[length:200%_auto] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all ease-out duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] animate-[gradientBg_3s_linear_infinite]"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
              <span className="relative z-10">{HERO.ctaLogin}</span>
            </a>
            <a
              href="#"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-[length:200%_auto] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all ease-out duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] animate-[gradientBg_3s_linear_infinite] hover:animate-[gradientBg_1.5s_linear_infinite]"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
              <span className="relative z-10">{HERO.ctaRequest}</span>
            </a>
          </div>
        </div>

        {/* Hero Illustration (Animated with Soft Blended Edges & Transparency) */}
        <div className="w-full max-w-lg lg:max-w-xl relative hidden lg:flex justify-center flex-1 z-10">
          {/* Subtle magical glow behind the blended image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-sky-500/40 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="animate-[floating_6s_ease-in-out_infinite] w-full max-w-[550px] relative">
            <img 
               src="/images/child_learning_hero.png" 
               alt="A cute child happily studying with magical glowing books and an AI tutor" 
               className="w-full h-auto object-cover opacity-85 mix-blend-screen contrast-110 saturate-150 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
            />
          </div>
        </div>
      </Container>

      <p
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 select-none px-4 pb-3 text-center font-tamil text-[clamp(2.5rem,12vw,7rem)] font-bold leading-none text-white/20 [text-shadow:0_8px_48px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      >
        {HERO.tamilBanner}
      </p>
    </section>

    {/* Dedicated Horizontal Trust Strip */}
    <div className="w-full border-y border-slate-800 bg-slate-950 px-4 py-6 shadow-[inset_0_20px_40px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden flex items-center">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col md:flex-row items-center gap-6 md:gap-12">
        <p className="whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-[0.25em] text-slate-400 shrink-0">
          {HERO.trustTitle}
        </p>
        <div className="hidden h-6 w-[1px] bg-slate-800 md:block shrink-0"></div>
        
        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_20s_linear_infinite] items-center gap-8 md:gap-16 pr-8 md:pr-16 hover:[animation-play-state:paused]">
            {[...HERO.trustPills, ...HERO.trustPills, ...HERO.trustPills, ...HERO.trustPills].map((pill, idx) => (
              <div key={`${pill.replace(/\s+/g, '-')}-${idx}`} className="flex items-center gap-3 shrink-0">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[0.85rem] font-semibold tracking-widest text-slate-300 whitespace-nowrap">
                  {pill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
