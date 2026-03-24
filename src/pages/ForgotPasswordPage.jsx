import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout heading="Don't Worry!" subheading="We'll help you get back in">
      <Link to="/admin-login" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-tkm-600 transition-colors hover:text-tkm-500">
        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Back
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-slate-900">Forgot Password</h1>
      <p className="mt-1 text-sm text-slate-500">Enter your email to receive a password reset link</p>

      <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-tkm-500 focus:ring-4 focus:ring-tkm-500/10" />
        </div>
        <button type="submit" className="w-full rounded-xl bg-tkm-950 px-4 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-tkm-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-tkm-900">Send Reset Link</button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Remember your password?{' '}
        <Link to="/admin-login" className="font-semibold text-tkm-600 transition-colors hover:text-tkm-500">Sign in</Link>
      </p>
    </AuthLayout>
  )
}
