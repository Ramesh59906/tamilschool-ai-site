import { HOW } from '../data/landingContent'
import Container from './Container'

const floatingIcons = [
  { icon: 'அ', left: '5%', delay: '0s', duration: '25s', size: '3rem', rotate: '15deg', color: 'text-indigo-600' },
  { icon: '🎒', left: '20%', delay: '-5s', duration: '22s', size: '2.5rem', rotate: '-10deg', color: 'text-pink-600' },
  { icon: 'ஆ', left: '35%', delay: '-12s', duration: '28s', size: '4rem', rotate: '25deg', color: 'text-amber-600' },
  { icon: '📐', left: '50%', delay: '-2s', duration: '20s', size: '2rem', rotate: '0deg', color: 'text-teal-600' },
  { icon: 'இ', left: '65%', delay: '-18s', duration: '26s', size: '3.5rem', rotate: '-15deg', color: 'text-indigo-600' },
  { icon: '🎨', left: '80%', delay: '-8s', duration: '24s', size: '2.5rem', rotate: '10deg', color: 'text-purple-600' },
  { icon: 'A', left: '15%', delay: '-15s', duration: '29s', size: '3rem', rotate: '45deg', color: 'text-rose-600' },
  { icon: 'ஈ', left: '30%', delay: '-7s', duration: '27s', size: '3rem', rotate: '-5deg', color: 'text-cyan-600' },
  { icon: '1', left: '60%', delay: '-22s', duration: '23s', size: '2.5rem', rotate: '20deg', color: 'text-emerald-600' },
  { icon: '★', left: '90%', delay: '-10s', duration: '21s', size: '2rem', rotate: '45deg', color: 'text-orange-600' },
  { icon: 'உ', left: '45%', delay: '-25s', duration: '25s', size: '2.5rem', rotate: '30deg', color: 'text-indigo-600' },
  { icon: '✏️', left: '75%', delay: '-14s', duration: '22s', size: '2.5rem', rotate: '-20deg', color: 'text-pink-600' },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-[4.5rem] bg-slate-50/50" id="how-it-works" aria-labelledby="how-heading">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft pastel animated blobs for light background */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[100px] animate-[blob_12s_infinite_ease-in-out]"></div>
        <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-400/15 blur-[120px] animate-[blob_14s_infinite_ease-in-out]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-400/15 blur-[100px] animate-[blob_16s_infinite_ease-in-out]" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Relatable School/Learning Elements */}
        {floatingIcons.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floatUp_infinite_linear] opacity-[0.12] font-bold font-tamil select-none ${item.color}`}
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
        <h2
          id="how-heading"
          className="mb-3 text-center text-3xl font-bold tracking-tight text-slate-900 md:text-[2rem]"
        >
          {HOW.title}
        </h2>
        <p className="mx-auto mb-10 max-w-[52ch] text-center text-slate-500">{HOW.subtitle}</p>
        <ol className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.steps.map((s, idx) => (
            <div 
              key={s.n} 
              className="animate-[floating_6s_ease-in-out_infinite]"
              style={{ animationDelay: `${idx * 0.8}s` }}
            >
              <li
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white/50 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 ease-out animate-[slideUpFade_0.8s_ease-out_both] hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl hover:shadow-indigo-500/15 hover:border-indigo-200"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Subtle background glow on hover */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-[20px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"></div>

                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-[1rem] bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-black text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110">
                  {idx + 1}
                </div>
                
                <h3 className="relative z-10 mb-2 text-[1.1rem] font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">{s.title}</h3>
                <p className="relative z-10 m-0 text-[0.95rem] leading-relaxed text-slate-500">{s.text}</p>
              </li>
            </div>
          ))}
        </ol>
      </Container>
    </section>
  )
}
