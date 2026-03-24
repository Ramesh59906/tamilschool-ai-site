import { Link } from 'react-router-dom'
import { HERO } from '../data/landingContent'
import Container from './Container'
import AnimatedBackground from './AnimatedBackground'
import useReveal from '../hooks/useReveal'

export default function HeroSection() {
  const revealRef = useReveal(0.1)

  return (
    <>
      <section
        className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden sm:min-h-[min(90vh,820px)] xl:min-h-[86vh]"
        aria-labelledby="hero-heading"
      >
        <AnimatedBackground />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block xl:w-[50%] 2xl:w-[46%]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_60%_50%,rgba(0,114,188,0.2),transparent_72%)]"
            style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
          />
          <div
            className="absolute inset-y-[-10%] left-[18%] w-[18%] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
            style={{ animation: 'hero-sweep 9s ease-in-out infinite' }}
          />
          <img
            src="/images/hero-child-black-bg.png"
            alt=""
            className="absolute right-[-4%] top-1/2 w-[112%] max-w-[980px] opacity-90 2xl:right-0 2xl:w-[104%]"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.08) contrast(1.04)',
              animation: 'hero-drift 16s ease-in-out infinite',
            }}
          />
        </div>

        <Container className="relative z-10 py-14 sm:py-20 lg:py-28 xl:py-24 2xl:py-28">
          <div ref={revealRef} className="reveal">
            {/* Left — Text */}
            <div className="max-w-2xl text-center lg:max-w-[47rem] lg:text-left xl:max-w-[45rem]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-tkm-400/20 bg-tkm-900/40 px-3.5 py-1.5 backdrop-blur-sm sm:mb-8 sm:px-5 sm:py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-logo-green sm:h-2 sm:w-2 animate-[pulse-glow_2s_ease-in-out_infinite]" />
                <span className="text-[0.7rem] font-semibold tracking-wide text-tkm-200 sm:text-[0.8rem]">
                  {HERO.trustTitle}
                </span>
              </div>

              <h1
                id="hero-heading"
                className="mb-4 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-[3rem] xl:text-[3.35rem] 2xl:text-[3.6rem]"
              >
                <span className="block">Reimagining</span>
                <span className="rainbow-text">Tamil Education</span>
                <span className="block">for the AI Generation.</span>
              </h1>

              <p className="mx-auto mb-8 max-w-md text-base font-medium leading-relaxed text-tkm-200/80 sm:mb-10 sm:text-lg lg:mx-0 lg:text-[1.15rem]">
                {HERO.subtitle}
              </p>

              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start sm:gap-4">
                <Link
                  to="/admin-login"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-display text-[0.88rem] font-bold text-tkm-950 shadow-xl shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-7 sm:py-3"
                >
                  <span>{HERO.ctaLogin}</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 font-display text-[0.88rem] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto sm:px-7 sm:py-3"
                >
                  {HERO.ctaRequest}
                </Link>
              </div>
            </div>
          </div>
        </Container>

        {/* Tamil watermark */}
        <p
          className="pointer-events-none absolute bottom-0 left-0 right-0 select-none px-4 pb-3 text-center font-tamil text-[clamp(2rem,10vw,6rem)] font-bold leading-none text-white/[0.03]"
          aria-hidden="true"
        >
          {HERO.tamilBanner}
        </p>
      </section>

      {/* Trust strip */}
      <div className="relative z-10 overflow-hidden border-y border-tkm-900/50 bg-tkm-950 px-4 py-4 sm:py-5">
        <div className="mx-auto flex w-full max-w-[85rem] flex-col items-center gap-3 sm:flex-row sm:gap-8">
          <p className="shrink-0 whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.2em] text-tkm-400 sm:text-[0.7rem]">
            Trusted by
          </p>
          <div className="hidden h-5 w-px bg-tkm-800 sm:block" />
          <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center gap-6 pr-6 sm:gap-10 sm:pr-10 hover:[animation-play-state:paused]">
              {[...HERO.trustPills, ...HERO.trustPills, ...HERO.trustPills, ...HERO.trustPills].map((pill, idx) => (
                <div key={`${pill}-${idx}`} className="flex items-center gap-2 shrink-0">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-logo-green/15 text-logo-green sm:h-5 sm:w-5">
                    <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[0.75rem] font-semibold tracking-wide text-tkm-200/80 sm:text-[0.82rem]">
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
