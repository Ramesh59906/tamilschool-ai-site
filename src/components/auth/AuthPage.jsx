import { useEffect, useMemo, useState } from 'react'
import { getUsers, isAuthed, login, resetPassword, signUp } from '../../auth/authStorage'

const ROLE_OPTIONS = [
  { id: 'admin', label: 'Admin' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'parent', label: 'Parent' },
]

export default function AuthPage({ mode = 'login' }) {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [isRoleManuallySet, setIsRoleManuallySet] = useState(false)

  const isLogin = mode === 'login'
  const isSignup = mode === 'signup'
  const isForgot = mode === 'forgot-password'

  const rightTitle = useMemo(() => {
    if (isLogin) return 'Welcome Back!'
    if (isSignup) return 'Join Us!'
    if (isForgot) return 'Reset Password'
    return 'Welcome!'
  }, [isLogin, isSignup, isForgot])

  const rightSubtitle = useMemo(() => {
    if (isLogin) {
      return 'Continue your Tamil learning journey with AI-powered lessons, student-safe access, and real-time progress tracking.'
    }
    if (isSignup) {
      return 'Start your Tamil learning journey today'
    }
    if (isForgot) {
      return 'Update your password to keep learning safely.'
    }
    return 'Role-based access for schools and families.'
  }, [isLogin, isSignup, isForgot])

  const title = useMemo(() => {
    if (isLogin) return 'Sign in'
    if (isSignup) return 'Create account'
    if (isForgot) return 'Reset password'
    return 'Authentication'
  }, [isLogin, isSignup, isForgot])

  const subtitle = useMemo(() => {
    if (isLogin) return 'Access your role dashboard'
    if (isSignup) return 'Choose your role and create an account'
    if (isForgot) return 'Set a new password for your account'
    return ''
  }, [isLogin, isSignup, isForgot])

  function go(to) {
    window.location.hash = `#/${to}`
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      if (isForgot) {
        if (password !== confirmPassword) {
          setError('Passwords do not match.')
          return
        }
        resetPassword({ email, newPassword: password })
        go('login')
        return
      }

      if (isSignup) {
        if (password !== confirmPassword) {
          setError('Passwords do not match.')
          return
        }
        signUp({ email, password, role })
        go('dashboard')
        return
      }

      if (isLogin) {
        // For frontend-only demo auth, derive role from the saved account.
        // Strict mode: validate email + password + selected role.
        const user = login({ email, password, role })
        if (user?.role) go('dashboard')
        return
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong.')
    }
  }

  // If already logged in, send them to dashboard.
  useEffect(() => {
    if (isAuthed() && (isLogin || isSignup || isForgot)) {
      go('dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-select role from saved account for easier login.
  useEffect(() => {
    if (!isLogin) return
    if (isRoleManuallySet) return
    const normalizedEmail = String(email).toLowerCase().trim()
    if (!normalizedEmail) return

    const users = getUsers()
    const user = users[normalizedEmail]
    if (user?.role) setRole(user.role)
  }, [email, isLogin, isRoleManuallySet])

  return (
    <main className="min-h-svh bg-slate-100 text-slate-800">
      <div className="grid min-h-svh lg:grid-cols-2">
        <section className="relative flex items-center justify-center bg-[#f4f6fa] p-6 sm:p-10 lg:p-14">
          <div className="absolute right-0 top-0 hidden h-36 w-36 rounded-bl-full bg-gradient-to-br from-blue-500/15 to-cyan-400/10 lg:block" />
          <div className="w-full max-w-md">
            <a
              href="#/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-500"
            >
              <span aria-hidden="true">←</span>
              <span>Home</span>
            </a>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-1 text-base text-slate-500">{subtitle}</p>

            <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
              {(isLogin || isSignup) && (
                <div className="rounded-2xl bg-blue-50/80 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.18)]">
                  <label htmlFor="role" className="sr-only">
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value)
                      setIsRoleManuallySet(true)
                    }}
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 px-2 text-xs text-slate-500">
                    We use the role saved for your account to route your dashboard.
                  </p>
                </div>
              )}

              <div className="rounded-2xl bg-blue-50/80 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.18)]">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setIsRoleManuallySet(false)
                  }}
                  type="email"
                  placeholder="E-mail"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400"
                  autoComplete="email"
                />
              </div>

              <div className="rounded-2xl bg-cyan-50/80 p-1.5 shadow-[0_10px_28px_rgba(8,145,178,0.18)]">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder={isForgot ? 'New password' : 'Password'}
                  className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
                  autoComplete={isForgot ? 'new-password' : 'current-password'}
                />
              </div>

              {(isSignup || isForgot) && (
                <div className="rounded-2xl bg-cyan-50/80 p-1.5 shadow-[0_10px_28px_rgba(8,145,178,0.18)]">
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder={isSignup ? 'Confirm password' : 'Confirm new password'}
                    className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                {isLogin ? (
                  <a
                    href="#/forgot-password"
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                ) : (
                  <span />
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600"
              >
                {isLogin ? 'Sign in' : isSignup ? 'Create account' : 'Reset password'}
              </button>

              {(isLogin || isSignup) && (
                <div className="text-center text-sm text-slate-600">
                  {isLogin ? (
                    <>
                      Don’t have an account?{' '}
                      <a href="#/signup" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
                        Sign up
                      </a>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <a href="#/login" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
                        Sign in
                      </a>
                    </>
                  )}
                </div>
              )}

              {isForgot && (
                <div className="text-center text-sm text-slate-600">
                  Remembered your password?{' '}
                  <a href="#/login" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
                    Back to sign in
                  </a>
                </div>
              )}
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-4 text-xs text-slate-600">
              <p className="font-bold text-slate-800">Demo login (frontend only)</p>
              <p>
                Admin: <span className="font-mono">admin@demo.com</span> / <span className="font-mono">123456</span>
              </p>
              <p>
                Teacher: <span className="font-mono">teacher@demo.com</span> / <span className="font-mono">123456</span>
              </p>
              <p>
                Parent: <span className="font-mono">parent@demo.com</span> / <span className="font-mono">123456</span>
              </p>
            </div>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-[#eaf4ff] lg:flex lg:items-center lg:justify-center">
          {/* soft decoration blobs */}
          <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="absolute -bottom-14 -right-14 h-64 w-64 rounded-full bg-sky-200/70 blur-3xl" />

          <div className="relative z-10 max-w-md px-12 text-slate-900">
            <p className="font-tamil text-lg font-semibold text-cyan-800/95" lang="ta">
              தமிழ் கற்றல் மையம்
            </p>
            <h2 className="mt-3 text-5xl font-extrabold leading-tight text-slate-900">{rightTitle}</h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-700/85">{rightSubtitle}</p>

            <div className="relative mt-8 flex items-center justify-center">
              {/* The illustration you shared (girl + tablet + floating icons) */}
              <img
                src="/images/hero-tkm-illustration.svg"
                alt="Join Us illustration"
                className="h-[22rem] w-auto select-none animate-[floating_7s_ease-in-out_infinite]"
              />

              {/* extra floating dots to match the animated feel */}
              <div className="pointer-events-none absolute -left-3 top-10 h-3 w-3 rounded-full bg-white/80 animate-[floating_5s_ease-in-out_infinite]" />
              <div className="pointer-events-none absolute right-10 top-24 h-2 w-2 rounded-full bg-white/70 animate-[floating_6s_ease-in-out_infinite]" />
              <div className="pointer-events-none absolute right-10 bottom-10 h-2.5 w-2.5 rounded-full bg-white/60 animate-[floating_8s_ease-in-out_infinite]" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

