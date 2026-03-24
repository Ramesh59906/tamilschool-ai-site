import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'

export default function SignUpPage() {
  return (
    <AuthLayout heading="Join Us!" subheading="Start your Tamil learning journey today">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">Sign up</h1>
      <p className="mt-1 text-sm text-slate-500">Create an account to get started</p>

      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-slate-700">I am a</label>
          <select id="role" name="role" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-all duration-200 focus:border-tkm-500 focus:ring-4 focus:ring-tkm-500/10">
            <option>Parent</option><option>Teacher</option><option>Student</option>
          </select>
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-tkm-500 focus:ring-4 focus:ring-tkm-500/10" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required placeholder="Create a strong password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-tkm-500 focus:ring-4 focus:ring-tkm-500/10" />
          <p className="mt-1 text-xs text-slate-400">At least 8 characters with uppercase, lowercase, and number</p>
        </div>
        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-semibold text-slate-700">Confirm Password</label>
          <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required placeholder="Confirm your password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-tkm-500 focus:ring-4 focus:ring-tkm-500/10" />
        </div>
        <button type="submit" className="w-full rounded-xl bg-tkm-950 px-4 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-tkm-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-tkm-900">Create Account</button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/admin-login" className="font-semibold text-tkm-600 transition-colors hover:text-tkm-500">Sign in</Link>
      </p>
    </AuthLayout>
  )
}
