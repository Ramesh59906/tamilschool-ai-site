import './auth-animations.css'

const BLOBS = [
  { className: 'absolute -left-16 -top-16 h-72 w-72 bg-blue-300/40 blur-3xl', animation: 'blob-drift 8s ease-in-out infinite' },
  { className: 'absolute -bottom-20 -right-10 h-80 w-80 bg-indigo-300/35 blur-3xl', animation: 'blob-drift2 10s ease-in-out infinite' },
  { className: 'absolute left-1/3 top-1/4 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl', animation: 'blob-pulse 6s ease-in-out infinite' },
  { className: 'absolute right-8 top-12 h-44 w-44 bg-violet-200/30 blur-3xl', animation: 'blob-drift 12s ease-in-out infinite reverse' },
  { className: 'absolute bottom-20 left-10 h-36 w-36 bg-sky-200/35 blur-3xl', animation: 'blob-drift2 9s ease-in-out infinite reverse' },
]

export default function AuthLayout({ heading, subheading, children }) {
  return (
    <main className="min-h-svh bg-slate-100 text-slate-800">
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Left — form area */}
        <section className="relative flex items-center justify-center bg-[#f4f6fa] p-6 sm:p-10 lg:p-14">
          <div className="absolute right-0 top-0 hidden h-36 w-36 rounded-bl-full bg-gradient-to-br from-blue-500/15 to-cyan-400/10 lg:block" />
          <div className="w-full max-w-md">{children}</div>
        </section>

        {/* Right — decorative panel */}
        <section className="relative hidden overflow-hidden bg-[#dce6f6] lg:flex lg:flex-col lg:items-center lg:justify-center">
          {BLOBS.map((blob, i) => (
            <div key={i} className={blob.className} style={{ animation: blob.animation }} />
          ))}

          <div className="relative z-10 mb-2 text-center">
            <p className="font-tamil text-base font-semibold text-blue-700" lang="ta">
              தமிழ் கற்றல் மையம்
            </p>
            <h2 className="mt-1 text-4xl font-extrabold leading-tight text-slate-800">
              {heading}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{subheading}</p>
          </div>

          <div className="relative z-10 mt-2">
            <img
              src="/images/student-login-illustration.png"
              alt="Student illustration"
              className="auth-illus-float h-80 w-auto"
              style={{
                mixBlendMode: 'multiply',
                WebkitMaskImage: 'radial-gradient(ellipse 55% 82% at 50% 50%, black 65%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 55% 55% at 50% 50%, black 55%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 55% 65% at 30% 50%, black 55%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 55% 55% at 50% 50%, black 55%, transparent 100%)',
              }}
            />
          </div>
        </section>
      </div>
    </main>
  )
}
