import { Link } from 'react-router-dom'
import { TEACHERS } from '../data/landingContent'
import Container from './Container'

const floatingIcons = [
  { icon: '🍎', left: '10%', delay: '0s', duration: '28s', size: '2.5rem', rotate: '15deg', color: 'text-rose-500' },
  { icon: '👩‍🏫', left: '25%', delay: '-5s', duration: '25s', size: '3.5rem', rotate: '-10deg', color: 'text-indigo-500' },
  { icon: '🔔', left: '40%', delay: '-12s', duration: '30s', size: '2.5rem', rotate: '25deg', color: 'text-amber-500' },
  { icon: '⏰', left: '55%', delay: '-2s', duration: '22s', size: '3rem', rotate: '5deg', color: 'text-rose-400' },
  { icon: '👓', left: '70%', delay: '-18s', duration: '26s', size: '3rem', rotate: '-15deg', color: 'text-sky-500' },
  { icon: '📏', left: '85%', delay: '-8s', duration: '24s', size: '2.5rem', rotate: '10deg', color: 'text-lime-500' },
  { icon: '📝', left: '15%', delay: '-15s', duration: '32s', size: '3rem', rotate: '45deg', color: 'text-indigo-400' },
  { icon: '💡', left: '80%', delay: '-10s', duration: '21s', size: '2.5rem', rotate: '45deg', color: 'text-yellow-500' },
];

function CheckItem({ children, delay }) {
  return (
    <li 
      className="group flex gap-4 text-[1rem] font-medium text-slate-600 transition-all duration-300 hover:text-indigo-900 hover:-translate-y-1 animate-[slideUpFade_0.8s_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 6l2.5 2.5L10 3"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function TeachersSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-rose-50 to-indigo-50 py-16 md:py-[5.5rem]" id="teachers" aria-labelledby="teachers-heading">
      {/* Magical Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft floating orbs */}
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-rose-300/20 blur-[100px] animate-[blob_13s_infinite_ease-in-out]"></div>
        <div className="absolute top-[30%] -left-[10%] w-[45%] h-[45%] rounded-full bg-indigo-300/15 blur-[120px] animate-[blob_15s_infinite_ease-in-out]" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-orange-300/20 blur-[110px] animate-[blob_18s_infinite_ease-in-out]" style={{ animationDelay: '6s' }}></div>
        
        {/* Animated wave pattern or grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_80%,transparent_100%)]"></div>

        {/* Floating Educational Icons */}
        {floatingIcons.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floatUp_infinite_linear] opacity-25 select-none drop-shadow-sm ${item.color}`}
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

      <Container className="relative z-10 mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="w-full rounded-[36px] border border-white/60 bg-white/70 px-8 py-12 shadow-[0_8px_40px_rgba(0,0,0,0.05)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] sm:px-16 sm:py-16 animate-[slideUpFade_0.8s_ease-out_both]">
            
            {/* Inner Glow */}
            <div className="absolute -inset-0 rounded-[36px] bg-gradient-to-b from-transparent to-indigo-500/5 opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center justify-center rounded-full bg-rose-100 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-rose-600 shadow-sm">
                For Educators
              </span>
              <h2
                id="teachers-heading"
                className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-[2.8rem]"
              >
                {TEACHERS.title}
              </h2>
              <p className="mx-auto mb-10 max-w-[56ch] text-lg leading-relaxed text-slate-500">
                {TEACHERS.subtitle}
              </p>
              
              <ul className="mx-auto mb-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 text-left sm:grid-cols-2">
                {TEACHERS.bullets.map((b, idx) => (
                  <CheckItem key={b} delay={`${idx * 150 + 400}ms`}>{b}</CheckItem>
                ))}
              </ul>
              
              <div className="mt-2 animate-[slideUpFade_0.8s_ease-out_both]" style={{ animationDelay: '800ms' }}>
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 via-rose-500 to-indigo-600 bg-[length:200%_auto] px-10 py-4 text-[1.05rem] font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all ease-out duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] animate-[gradientBg_3s_linear_infinite]"
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10 tracking-wide">{TEACHERS.cta}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
