import './auth-animations.css'

export default function AuthLayout({ heading, subheading, children }) {
  return (
    <main className="auth-shell min-h-svh bg-surface font-sans text-slate-800">
      <div className="grid min-h-svh lg:grid-cols-2">
        <section className="relative flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="auth-form-card w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            {children}
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-tkm-950 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <div className="auth-glow absolute -left-[20%] -top-[20%] h-[400px] w-[400px] rounded-full bg-logo-blue/20 blur-[100px]" />
          <div className="auth-glow absolute -bottom-[15%] -right-[15%] h-[350px] w-[350px] rounded-full bg-logo-orange/12 blur-[90px]" style={{ animationDelay: '2s' }} />
          <div className="auth-glow absolute left-[30%] top-[20%] h-[250px] w-[250px] rounded-full bg-logo-green/8 blur-[80px]" style={{ animationDelay: '4s' }} />

          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
            <defs>
              <pattern id="auth-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-dots)" />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-center px-12">
            <img src="/images/tkm-logo.png" alt="TKM Logo" className="mb-6 h-20 w-20 rounded-full bg-white object-cover shadow-xl shadow-tkm-950/30" />
            <p className="font-tamil text-sm font-semibold text-accent-400" lang="ta">தமிழ் கற்றல் மையம்</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-white">{heading}</h2>
            <p className="mt-3 max-w-[28ch] text-sm text-tkm-200/60">{subheading}</p>
          </div>

          {[
            { size: 'h-12 w-12', pos: 'top-[20%] left-[15%]', delay: '0s', color: 'border-logo-orange/15' },
            { size: 'h-8 w-8', pos: 'top-[60%] right-[12%]', delay: '-3s', color: 'border-logo-blue/12' },
            { size: 'h-10 w-10', pos: 'bottom-[25%] left-[20%]', delay: '-5s', color: 'border-logo-green/10' },
          ].map((s, i) => (
            <div key={i} className={`auth-float absolute ${s.pos} ${s.size} rotate-45 rounded-md border-2 ${s.color}`} style={{ animationDelay: s.delay }} aria-hidden="true" />
          ))}

          <div className="relative z-10 mb-2 text-center">
            <p className="font-tamil text-base font-semibold text-blue-700" lang="ta">
              தமிழ் கற்றல் மையம்
            </p>
            {/* <h2 className="mt-1 text-4xl font-extrabold leading-tight text-slate-800">
              {heading}
            </h2> */}
            {/* <p className="mt-2 text-sm text-slate-500">{subheading}</p> */}
          </div>

          {/* <div className="relative z-10 mt-2">
            <img
              src="/images/student-login-illustration.png"
              alt="Student illustration"
              className="auth-illus-float h-80 w-auto"
              style={{
                mixBlendMode: 'multiply',
                WebkitMaskImage: 'radial-gradient(ellipse 55% 65% at 50% 50%, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 55% 65% at 50% 50%, black 60%, transparent 100%)',
              }}
            />
          </div> */}
        </section>
      </div>
    </main>
  )
}
