import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { login } from '../auth/authStorage'

const ROLE_OPTIONS = [
  { id: 'admin', label: 'Admin' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'parent', label: 'Parent' },
]

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      login({ email, password, role })
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'Login failed.')
    }
  }

  return (
    <AuthLayout heading="Welcome Back!" subheading="Sign in to continue your learning journey">
      <Link to="/" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-tkm-600 transition-colors hover:text-tkm-500">
        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Home
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-slate-900">Hello!</h1>
      <p className="mt-1 text-sm text-slate-500">Sign in to your account</p>

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-slate-700">
            I am a
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base font-semibold text-slate-700 outline-none transition focus:border-blue-400"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl bg-blue-50/80 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.18)]">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="E-mail"
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-tkm-600 focus:ring-tkm-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-tkm-600 transition-colors hover:text-tkm-500">Forgot password?</Link>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
        )}

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600"
        >
          Sign in
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-tkm-600 transition-colors hover:text-tkm-500">Sign up</Link>
      </p>
    </AuthLayout>
  )
}
