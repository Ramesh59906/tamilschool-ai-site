import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { getCurrentUserUser, getUserRoleLabel, isUserAuthed, userLogin } from '../auth/userAuthStorage'

const ROLE_OPTIONS = [
  { id: 'parent', label: 'Parent' },
  { id: 'student', label: 'Student' },
  { id: 'teacher', label: 'Teacher' },
]

function roleTabClass(active) {
  return `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
    active ? 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/30' : 'bg-white/5 text-slate-300 hover:bg-white/10'
  }`
}

export default function UserLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')

  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = useMemo(() => {
    const stateFrom = location.state?.from?.pathname
    return typeof stateFrom === 'string' && stateFrom.length > 0 ? stateFrom : '/learn'
  }, [location.state])

  if (mode && mode !== 'user') {
    return <Navigate to="/admin-login" replace />
  }

  if (isUserAuthed()) {
    const me = getCurrentUserUser()
    return <Navigate to={me?.role === 'student' ? '/learn' : '/learn'} replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      userLogin({ email, password, role })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Login failed.')
    }
  }

  return (
    <AuthLayout heading="Login" subheading="Continue to learning modules">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-500">
        <span aria-hidden="true">←</span>
        <span>Home</span>
      </Link>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Login</h1>
      <p className="mt-1 text-base text-slate-500">Choose your role and sign in</p>

      <div className="mt-6 rounded-2xl bg-slate-950 p-2 shadow-[0_18px_48px_rgba(2,6,23,0.35)]">
        <div className="grid grid-cols-3 gap-2">
          {ROLE_OPTIONS.map((r) => (
            <button key={r.id} type="button" onClick={() => setRole(r.id)} className={roleTabClass(role === r.id)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="rounded-2xl bg-blue-50/80 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.18)]">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="E-mail (try student@demo.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400"
          />
        </div>

        <div className="rounded-2xl bg-cyan-50/80 p-1.5 shadow-[0_10px_28px_rgba(8,145,178,0.18)]">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password (try 123456)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
        </div>

        {/* <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="font-semibold">Role: {getUserRoleLabel(role)}</span>
          <span className="font-semibold">Demo accounts</span>
        </div> */}

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(16,185,129,0.35)] transition hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-500"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}

