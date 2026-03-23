import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'

export default function SignUpPage() {
  return (
    <AuthLayout heading="Join Us!" subheading="Start your Tamil learning journey today">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Sign up</h1>
      <p className="mt-1 text-base text-slate-500">Create an account to get started</p>

      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-slate-700">
            I am a
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base font-semibold text-slate-700 outline-none transition focus:border-blue-400"
          >
            <option>Parent</option>
            <option>Teacher</option>
            <option>Student</option>
          </select>
        </div>

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
            className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Create a strong password"
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
          <p className="mt-1 text-xs text-slate-400">
            Must be at least 8 characters with uppercase, lowercase, and number
          </p>
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
            placeholder="Confirm your password"
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/admin-login" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
