import React, { useEffect, useRef } from 'react'
import { ANALYTICS } from '../data/landingContent'
import Container from './Container'

function AnimatedCounter({ value, duration = 2500 }) {
  const countRef = useRef(null)
  const target = parseInt(value.toString().replace(/,/g, ''), 10) || 0

  useEffect(() => {
    let startTimestamp = null
    let animationFrame
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // easeOutExpo easing function for a very smooth snappy stop
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      if (countRef.current) {
        countRef.current.innerHTML = Math.floor(easeOutExpo * target).toLocaleString()
      }
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step)
      } else {
        if (countRef.current) countRef.current.innerHTML = target.toLocaleString()
      }
    }
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animationFrame = window.requestAnimationFrame(step)
        observer.disconnect() // Only animate once when sliding into view
      }
    }, { threshold: 0.1 })
    
    if (countRef.current) {
      observer.observe(countRef.current)
    }
    
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      if (observer) observer.disconnect()
    }
  }, [target, duration])

  return <span ref={countRef}>0</span>
}

const achievementIcons = [
  { icon: '🏆', left: '10%', delay: '0s', duration: '28s', size: '3.5rem', rotate: '15deg', color: 'text-amber-500' },
  { icon: '⭐', left: '25%', delay: '-5s', duration: '22s', size: '2.5rem', rotate: '-10deg', color: 'text-yellow-400' },
  { icon: '📈', left: '40%', delay: '-12s', duration: '26s', size: '3rem', rotate: '5deg', color: 'text-emerald-500' },
  { icon: '🏅', left: '55%', delay: '-2s', duration: '24s', size: '3.5rem', rotate: '-15deg', color: 'text-amber-600' },
  { icon: '🎓', left: '70%', delay: '-18s', duration: '29s', size: '3rem', rotate: '20deg', color: 'text-indigo-500' },
  { icon: '✨', left: '85%', delay: '-8s', duration: '21s', size: '2rem', rotate: '45deg', color: 'text-amber-400' },
  { icon: '✅', left: '15%', delay: '-15s', duration: '25s', size: '2.5rem', rotate: '-5deg', color: 'text-emerald-400' },
  { icon: '🌟', left: '35%', delay: '-7s', duration: '27s', size: '3rem', rotate: '25deg', color: 'text-yellow-500' },
  { icon: '🎯', left: '60%', delay: '-20s', duration: '23s', size: '3rem', rotate: '-20deg', color: 'text-rose-500' },
  { icon: '🥇', left: '80%', delay: '-10s', duration: '30s', size: '3.5rem', rotate: '10deg', color: 'text-amber-500' },
];

export default function AnalyticsSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50 to-emerald-50 py-16 md:py-[5.5rem]"
      id="analytics"
      aria-labelledby="analytics-heading"
    >
      {/* Background Magic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft radial glows to create depth */}
        <div className="absolute -top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-300/20 blur-[100px] animate-[blob_15s_infinite_ease-in-out]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[45%] h-[45%] rounded-full bg-emerald-300/20 blur-[120px] animate-[blob_18s_infinite_ease-in-out]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[10%] left-[30%] w-[50%] h-[50%] rounded-full bg-sky-300/20 blur-[110px] animate-[blob_20s_infinite_ease-in-out]" style={{ animationDelay: '5s' }}></div>
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Floating Achievement Icons */}
        {achievementIcons.map((item, i) => (
          <div 
             key={i} 
             className={`absolute animate-[floatUp_infinite_linear] opacity-[0.22] select-none drop-shadow-sm ${item.color}`}
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
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16 animate-[slideUpFade_0.8s_ease-out_both]">
          <h2
            id="analytics-heading"
            className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-[2.2rem]"
          >
            {ANALYTICS.title}
          </h2>
          <p className="mb-4 text-lg font-bold uppercase tracking-widest text-emerald-600">{ANALYTICS.subtitle}</p>
          <p className="text-base leading-relaxed text-slate-600">
            {ANALYTICS.body}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {ANALYTICS.stats.map((s, idx) => (
            <div 
              key={s.label}
              className="animate-[slideUpFade_0.8s_ease-out_both]"
              style={{ animationDelay: `${idx * 150 + 200}ms` }}
            >
              <div
                className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[32px] border border-white/80 bg-white/60 px-6 py-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-[0_20px_40px_rgba(16,185,129,0.18)] hover:border-emerald-200"
              >
                {/* Subtle inner hover glow */}
                <div className="absolute -inset-0 rounded-[32px] bg-gradient-to-b from-transparent to-emerald-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

                <span className="relative z-10 mb-2 block text-[3.2rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 transition-transform duration-500 group-hover:scale-110">
                  <AnimatedCounter value={s.value} />
                  {s.valueSuffix ?? ''}
                </span>
                <span className="relative z-10 text-[0.95rem] font-bold uppercase tracking-widest text-slate-500 transition-colors duration-300 group-hover:text-emerald-700">
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
