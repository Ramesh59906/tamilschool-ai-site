export default function AdminLoginPage() {
  return (
    <main className="min-h-svh bg-slate-100 text-slate-800">
      <div className="grid min-h-svh lg:grid-cols-2">
        <section className="relative flex items-center justify-center bg-[#f4f6fa] p-6 sm:p-10 lg:p-14">
          <div className="absolute right-0 top-0 hidden h-36 w-36 rounded-bl-full bg-gradient-to-br from-blue-500/15 to-cyan-400/10 lg:block" />
          <div className="w-full max-w-md">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-500"
            >
              <span aria-hidden="true">←</span>
              <span>Home</span>
            </a>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Hello!</h1>
            <p className="mt-1 text-base text-slate-500">Sign in to your account</p>

            <form className="mt-10 space-y-5" action="#" method="post">
              <div className="rounded-2xl bg-blue-50/80 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.18)]">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400"
                />
              </div>

              <div className="rounded-2xl bg-cyan-50/80 p-1.5 shadow-[0_10px_28px_rgba(8,145,178,0.18)]">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-slate-500">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600"
              >
                Sign in
              </button>
            </form>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 lg:flex lg:items-center lg:justify-center">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-cyan-300/25 blur-2xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-300/25 blur-2xl" />
          <div className="relative z-10 max-w-md px-12 text-white">
            <p className="font-tamil text-lg font-semibold text-cyan-100" lang="ta">
              தமிழ் கற்றல் மையம்
            </p>
            <h2 className="mt-3 text-5xl font-extrabold leading-tight">Welcome Back!</h2>
            <p className="mt-5 text-lg leading-relaxed text-blue-100/95">
              Continue your Tamil learning journey with AI-powered lessons, student-safe access, and real-time progress tracking.
            </p>
            <div className="mt-8 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
                alt="Student in classroom learning"
                className="h-44 w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
