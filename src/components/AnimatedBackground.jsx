// Playful School and child themed SVG icons
const Star = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Triangle = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const Circle = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const Square = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-tkm-950">
      {/* Rainbow-inspired gradient mesh from logo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_40%,rgba(0,114,188,0.25),transparent),radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(232,54,58,0.12),transparent),radial-gradient(ellipse_50%_60%_at_50%_80%,rgba(0,166,81,0.12),transparent),radial-gradient(ellipse_40%_30%_at_60%_50%,rgba(102,45,145,0.1),transparent)]" />

      {/* Subtle dot grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden="true">
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Animated gradient orbs — each a color from the logo */}
      <div
        className="absolute -left-[15%] -top-[20%] h-[35rem] w-[35rem] rounded-full bg-logo-blue/20 blur-[120px]"
        style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-[10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-logo-red/10 blur-[100px]"
        style={{ animation: 'pulse-glow 10s ease-in-out infinite 2s' }}
      />
      <div
        className="absolute bottom-[0%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-logo-green/10 blur-[110px]"
        style={{ animation: 'pulse-glow 12s ease-in-out infinite 4s' }}
      />
      <div
        className="absolute bottom-[30%] right-[20%] h-[20rem] w-[20rem] rounded-full bg-logo-purple/10 blur-[90px]"
        style={{ animation: 'pulse-glow 9s ease-in-out infinite 6s' }}
      />

      {/* Floating geometric shapes with logo colors */}
      {[
        { size: 'h-14 w-14', pos: 'top-[15%] left-[10%]', delay: '0s', dur: '20s', color: 'border-logo-orange/15' },
        { size: 'h-8 w-8', pos: 'top-[60%] left-[5%]', delay: '-6s', dur: '18s', color: 'border-logo-blue/12' },
        { size: 'h-16 w-16', pos: 'top-[25%] right-[8%]', delay: '-3s', dur: '22s', color: 'border-logo-green/10' },
        { size: 'h-6 w-6', pos: 'top-[70%] right-[15%]', delay: '-10s', dur: '16s', color: 'border-logo-red/12' },
        { size: 'h-10 w-10', pos: 'bottom-[20%] left-[25%]', delay: '-8s', dur: '24s', color: 'border-logo-purple/10' },
        { size: 'h-12 w-12', pos: 'top-[40%] left-[50%]', delay: '-12s', dur: '19s', color: 'border-logo-yellow/10' },
      ].map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.pos} ${s.size} rotate-45 rounded-md border-2 ${s.color} pointer-events-none`}
          style={{ animation: `float-gentle ${s.dur} ease-in-out infinite ${s.delay}` }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
