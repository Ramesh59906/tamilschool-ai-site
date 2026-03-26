import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { resetPassword } from '../auth/authStorage'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match.')
      }
      resetPassword({ email, newPassword })
      navigate('/admin-login')
    } catch (err) {
      setError(err?.message || 'Reset failed.')
    }
  }

  return (
    <AuthLayout heading="Don't Worry!" subheading="We'll help you get back in">
      <Link
        to="/admin-login"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-500"
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </Link>

      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">Forgot Password</h1>
      <p className="mt-1 text-base text-slate-500">
        Enter your email to receive a password reset link
      </p>

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400"
          />
        </div>

        <div>
          <label htmlFor="new-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
            New Password
          </label>
          <input
            id="new-password"
            name="new-password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Create a new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
        )}

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600"
        >
          Reset Password
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Remember your password?{' '}
        <Link to="/admin-login" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
