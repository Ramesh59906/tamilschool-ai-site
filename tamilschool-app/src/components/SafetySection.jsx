import { SAFETY } from '../data/landingContent'
import Container from './Container'

const safetyIcons = [
  { icon: '🛡️', left: '15%', delay: '0s', duration: '20s', size: '3.5rem', color: 'text-emerald-400' },
  { icon: '🔒', left: '80%', delay: '-5s', duration: '25s', size: '3rem', color: 'text-sky-400' },
  { icon: '💚', left: '35%', delay: '-12s', duration: '22s', size: '2.5rem', color: 'text-emerald-300' },
  { icon: '👁️', left: '60%', delay: '-2s', duration: '28s', size: '2.8rem', color: 'text-indigo-400' },
  { icon: '✅', left: '25%', delay: '-18s', duration: '19s', size: '2.2rem', color: 'text-teal-400' },
  { icon: '🛡️', left: '70%', delay: '-8s', duration: '24s', size: '2.5rem', color: 'text-emerald-500' },
];

export default function SafetySection() {
  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-20 pb-[6.5rem] md:py-28"
      id="safety"
      aria-labelledby="safety-heading"
    >
      {/* Magical Ambient Safety Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft floating orbs */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-emerald-600/10 blur-[130px] animate-[blob_15s_infinite_ease-in-out]"></div>
        <div className="absolute top-[20%] -right-[15%] w-[55%] h-[60%] rounded-full bg-sky-600/10 blur-[140px] animate-[blob_18s_infinite_ease-in-out]" style={{ animationDelay: '4s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-600/15 blur-[120px] animate-[blob_22s_infinite_ease-in-out]" style={{ animationDelay: '8s' }}></div>

        {/* Animated wave pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_80%,transparent_100%)]"></div>

        {/* Floating Safety Icons */}
        {safetyIcons.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floatUp_infinite_linear] opacity-25 select-none drop-shadow-lg ${item.color}`}
             style={{
               left: item.left,
               animationDuration: item.duration,
               animationDelay: item.delay,
             }}
             aria-hidden="true"
          >
            <div style={{ fontSize: item.size }} className="animate-[pulse_4s_ease-in-out_infinite]">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <Container className="relative z-10 mx-auto max-w-3xl">
        <div className="animate-[slideUpFade_0.8s_ease-out_both] flex flex-col items-center">
          
          <div className="group relative w-full overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] px-8 py-14 text-center shadow-[0_8px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 sm:px-16 sm:py-16">
            
            {/* Inner Glow on Hover */}
            <div className="absolute -inset-0 rounded-[40px] bg-gradient-to-b from-transparent to-emerald-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h2
                id="safety-heading"
                className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-[2.8rem]"
              >
                {SAFETY.title}
              </h2>
              <p className="mx-auto mb-10 max-w-[48ch] text-lg text-emerald-200/80">
                {SAFETY.subtitle}
              </p>

              <ul className="mb-12 flex list-none flex-wrap justify-center gap-4 p-0" role="list">
                {SAFETY.items.map((item, idx) => (
                  <li
                    key={item}
                    className="flex animate-[slideUpFade_0.8s_ease-out_both] items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-[0.95rem] font-semibold text-emerald-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500/20 hover:shadow-emerald-500/20 hover:border-emerald-400/50"
                    style={{ animationDelay: `${idx * 150 + 300}ms` }}
                    role="listitem"
                  >
                    <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mb-8 text-[1.05rem] leading-relaxed text-slate-300/90">{SAFETY.body}</p>
              
              <div className="mt-8">
                <a
                  href={SAFETY.privacyHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-2 text-[1.1rem] font-bold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  {SAFETY.privacyLabel}
                  <svg className="h-5 w-5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
