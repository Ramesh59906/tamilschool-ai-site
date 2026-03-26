import { Link, Navigate, useParams } from 'react-router-dom'
import { isUserAuthed } from '../auth/userAuthStorage'

export default function PlaceholderModulePage() {
  const { moduleId } = useParams()
  if (!isUserAuthed()) return <Navigate to="/login?mode=user" replace />

  const label =
    moduleId === 'creative'
      ? 'Creative Expression'
      : moduleId === 'stories'
        ? 'Animated Stories'
        : moduleId === 'rhymes'
          ? 'Animated Rhymes'
          : 'Module'

  return (
    <div className="min-h-svh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3">
          <Link to="/learn" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white hover:bg-white/10">
            ← Modules
          </Link>
          <Link
            to="/learn/progress"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Progress
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[60rem] px-4 py-14">
        <h1 className="font-display text-4xl font-extrabold text-white">{label}</h1>
        <p className="mt-3 text-sm text-slate-300">
          This module is next. For now, Conversational Learning is implemented with a mocked AI flow.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/learn/conversation"
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(16,185,129,0.25)]"
          >
            Try Conversational Learning
          </Link>
          <Link to="/learn" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">
            Back to modules
          </Link>
        </div>
      </main>
    </div>
  )
}

