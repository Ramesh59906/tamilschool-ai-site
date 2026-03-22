import { VOCABULARY } from '../data/landingContent'
import Container from './Container'

const gameIcons = [
  { icon: '🧩', left: '10%', delay: '0s', duration: '28s', size: '3.5rem', rotate: '15deg', color: 'text-indigo-500' },
  { icon: '🎲', left: '25%', delay: '-5s', duration: '25s', size: '3rem', rotate: '-10deg', color: 'text-fuchsia-500' },
  { icon: '🃏', left: '40%', delay: '-12s', duration: '30s', size: '3.5rem', rotate: '25deg', color: 'text-cyan-500' },
  { icon: '🎯', left: '55%', delay: '-2s', duration: '22s', size: '3rem', rotate: '5deg', color: 'text-rose-400' },
  { icon: '🎮', left: '70%', delay: '-18s', duration: '26s', size: '3rem', rotate: '-15deg', color: 'text-violet-500' },
  { icon: '🧠', left: '85%', delay: '-8s', duration: '24s', size: '4rem', rotate: '10deg', color: 'text-pink-500' },
  { icon: '🕹️', left: '15%', delay: '-15s', duration: '32s', size: '2.5rem', rotate: '45deg', color: 'text-indigo-400' },
  { icon: '🏆', left: '80%', delay: '-10s', duration: '21s', size: '2.5rem', rotate: '45deg', color: 'text-amber-500' },
];

// Map specific playful icons to the vocabulary tabs
const TabIcons = {
  'Dictionary': '📖',
  'Flashcards': '🃏',
  'Word of the day': '🌟'
}

export default function VocabularySection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-indigo-50 to-fuchsia-50 py-16 md:py-[5.5rem]"
      id="vocabulary"
      aria-labelledby="vocabulary-heading"
    >
      {/* Magical Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft floating orbs */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-300/20 blur-[100px] animate-[blob_13s_infinite_ease-in-out]"></div>
        <div className="absolute top-[30%] -right-[10%] w-[45%] h-[45%] rounded-full bg-fuchsia-300/15 blur-[120px] animate-[blob_15s_infinite_ease-in-out]" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-300/20 blur-[110px] animate-[blob_18s_infinite_ease-in-out]" style={{ animationDelay: '6s' }}></div>
        
        {/* Animated wave pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)]"></div>

        {/* Floating Game Icons */}
        {gameIcons.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floatUp_infinite_linear] opacity-25 select-none drop-shadow-md ${item.color}`}
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
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-16 animate-[slideUpFade_0.8s_ease-out_both]">
          <h2
            id="vocabulary-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-[2.6rem]"
          >
            {VOCABULARY.title}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            {VOCABULARY.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {VOCABULARY.tabs.map((tab, idx) => (
            <div 
              key={tab.label}
              className="animate-[slideUpFade_0.8s_ease-out_both]"
              style={{ animationDelay: `${idx * 150 + 200}ms` }}
            >
              <article
                className="group relative h-full overflow-hidden rounded-[24px] border border-white/80 bg-white/60 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] hover:border-indigo-200"
              >
                {/* Subtle inner hover glow */}
                <div className="absolute -inset-0 rounded-[24px] bg-gradient-to-br from-cyan-500/5 to-indigo-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

                <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 shadow-inner ring-1 ring-indigo-100/60 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[10deg] group-hover:bg-gradient-to-br group-hover:from-cyan-100 group-hover:to-indigo-100">
                  <span className="text-3xl drop-shadow-sm transition-transform group-hover:scale-110">
                    {TabIcons[tab.label] || '🎮'}
                  </span>
                </div>

                <h3 className="relative z-10 mb-3 text-[1.25rem] font-bold text-slate-800 transition-colors duration-300 group-hover:text-indigo-600">
                  {tab.label}
                </h3>
                <p className="relative z-10 m-0 text-[0.95rem] leading-relaxed text-slate-500 group-hover:text-slate-600">
                  {tab.text}
                </p>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
