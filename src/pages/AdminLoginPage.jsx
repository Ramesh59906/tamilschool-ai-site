import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'

export default function AdminLoginPage() {
  return (
    <AuthLayout heading="Welcome Back!" subheading="Sign in to continue your learning journey">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-500"
      >
        <span aria-hidden="true">←</span>
        <span>Home</span>
      </Link>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Hello!</h1>
      <p className="mt-1 text-base text-slate-500">Sign in to your account</p>

      <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-2xl bg-blue-50/80 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.18)]">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="E-mail"
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
            className="w-full rounded-xl border border-cyan-100 bg-white px-4 py-3 text-base text-slate-700 outline-none transition focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-4 py-3 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)] transition hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-blue-600 transition-colors hover:text-blue-500">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
