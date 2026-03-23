import { Link } from 'react-router-dom'
import { CORE_MODULES } from '../data/landingContent'
import Container from './Container'
import ModuleIcon from './ModuleIcon'

const floatingIcons = [
  { icon: '🎤', left: '10%', delay: '0s', duration: '28s', size: '2.5rem', rotate: '15deg', color: 'text-violet-600' },
  { icon: '📚', left: '25%', delay: '-5s', duration: '25s', size: '3rem', rotate: '-10deg', color: 'text-sky-600' },
  { icon: '🪶', left: '40%', delay: '-12s', duration: '30s', size: '3.5rem', rotate: '25deg', color: 'text-lime-700' },
  { icon: '🎵', left: '55%', delay: '-2s', duration: '22s', size: '2.5rem', rotate: '5deg', color: 'text-violet-600' },
  { icon: '💬', left: '70%', delay: '-18s', duration: '26s', size: '3rem', rotate: '-15deg', color: 'text-sky-600' },
  { icon: '🎶', left: '85%', delay: '-8s', duration: '24s', size: '2.5rem', rotate: '10deg', color: 'text-lime-700' },
  { icon: '✨', left: '15%', delay: '-15s', duration: '32s', size: '2rem', rotate: '45deg', color: 'text-violet-400' },
  { icon: '📖', left: '35%', delay: '-7s', duration: '27s', size: '3rem', rotate: '-5deg', color: 'text-sky-600' },
  { icon: '📝', left: '65%', delay: '-22s', duration: '25s', size: '2.5rem', rotate: '20deg', color: 'text-lime-700' },
  { icon: '⭐', left: '80%', delay: '-10s', duration: '21s', size: '2rem', rotate: '45deg', color: 'text-violet-500' },
];

export default function ModulesSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-sky-100 to-lime-100 bg-[length:200%_auto] animate-[gradientBg_15s_ease-in-out_infinite] py-16 md:py-[4.5rem]"
      id="modules"
      aria-labelledby="modules-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35 animate-[slideBackground_12s_linear_infinite]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath fill='none' stroke='%236366f1' stroke-opacity='0.15' d='M0 40h80M40 0v80'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Floating Education/Module Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingIcons.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floatUp_infinite_linear] opacity-20 select-none drop-shadow-sm ${item.color}`}
             style={{
               left: item.left,
               animationDuration: item.duration,
               animationDelay: item.delay,
             }}
             aria-hidden="true"
          >
            <div style={{ transform: `rotate(${item.rotate})`, fontSize: item.size }}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16">
          <h2
            id="modules-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-[2.5rem]"
          >
            {CORE_MODULES.title}
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            {CORE_MODULES.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {CORE_MODULES.modules.map((m, idx) => (
             <div 
               key={m.title}
               className="animate-[slideUpFade_0.8s_ease-out_both]"
               style={{ animationDelay: `${idx * 150}ms` }}
             >
                <article
                  className="group relative h-full overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)] hover:border-indigo-200"
                >
                  {/* Subtle inner hover glow */}
                  <div className="absolute -inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

                  {/* Icon Box */}
                  <div className="relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/50 text-indigo-600 shadow-inner ring-1 ring-indigo-100/60 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[8deg] group-hover:bg-gradient-to-br group-hover:from-indigo-100 group-hover:to-purple-100">
                    <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                      <ModuleIcon type={m.icon} />
                    </div>
                  </div>

                  <h3 className="relative z-10 mb-3 text-[1.35rem] font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
                    {m.title}
                  </h3>
                  <p className="relative z-10 mb-6 text-[0.98rem] leading-relaxed text-slate-500">
                    {m.subtitle}
                  </p>
                  
                  <ul className="relative z-10 m-0 flex flex-col gap-3.5 p-0">
                    {m.items.map((item, i) => (
                      <li key={item} className="flex items-start gap-3.5 text-[0.95rem] font-medium text-slate-600 transition-all duration-300 group-hover:text-slate-700">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-sm shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
             </div>
          ))}
        </div>

        <div className="mt-14 text-center animate-[slideUpFade_0.8s_ease-out_both]" style={{ animationDelay: '600ms' }}>
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_auto] px-9 py-4 text-[1.05rem] font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all ease-out duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] animate-[gradientBg_3s_linear_infinite]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative z-10 tracking-wide">{CORE_MODULES.cta}</span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
