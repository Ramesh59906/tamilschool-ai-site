import { Link, Navigate } from 'react-router-dom'
import { getCurrentUserUser, isUserAuthed } from '../auth/userAuthStorage'
import { getLearningProgress } from '../mock/learningApi'

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-white/50">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-white">{value}</p>
    </div>
  )
}

export default function LearningProgressPage() {
  if (!isUserAuthed()) return <Navigate to="/login?mode=user" replace />
  const me = getCurrentUserUser()

  const prog = getLearningProgress({ userEmail: me?.email })

  return (
    <div className="min-h-svh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/learn" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white hover:bg-white/10">
              ← Modules
            </Link>
            <div className="flex flex-col">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-300">Tracking</div>
              <div className="text-sm text-slate-200">{me?.email}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[90rem] px-4 py-10">
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Progress</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          This is mocked tracking stored in your browser (localStorage). When backend is ready, we’ll replace the data source.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Sessions" value={prog.totalSessions} />
          <Stat label="Messages" value={prog.totalMessages} />
          <Stat label="Can-Do mastery %" value={`${prog.masteryPct}%`} />
          <Stat label="Vocabulary growth" value={`${prog.vocabCount} words`} />
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-extrabold text-white">Recent sessions</h2>
            <Link
              to="/learn/conversation"
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(16,185,129,0.25)]"
            >
              Start a session
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-1 bg-slate-950/40 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/50 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
              <div>When</div>
              <div>Module</div>
              <div>Scenario</div>
              <div className="text-right">Messages</div>
            </div>
            <div className="divide-y divide-white/10">
              {prog.recentSessions.length === 0 ? (
                <div className="px-4 py-5 text-sm text-slate-300">No sessions yet. Start Conversational Learning to record progress.</div>
              ) : (
                prog.recentSessions.map((s) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-1 gap-2 px-4 py-4 text-sm text-slate-200 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr] sm:items-center"
                  >
                    <div className="text-slate-300">{new Date(s.createdAt).toLocaleString()}</div>
                    <div className="font-semibold text-white">{formatModule(s.moduleId)}</div>
                    <div className="text-slate-300">{s.scenarioId}</div>
                    <div className="text-right font-mono tabular-nums text-white">{s.messageCount}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function formatModule(id) {
  if (id === 'conversational-learning') return 'Conversational Learning'
  return id || '—'
}

