import { Link, Navigate } from 'react-router-dom'
import { getCurrentUserUser, isUserAuthed, userLogout } from '../auth/userAuthStorage'

function ModuleCard({ title, subtitle, bullets, to }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <h3 className="font-display text-xl font-extrabold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-200">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
      >
        Open module <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

export default function StudentHomePage() {
  if (!isUserAuthed()) return <Navigate to="/login?mode=user" replace />

  const me = getCurrentUserUser()

  return (
    <div className="min-h-svh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-2 ring-emerald-500/30">
              <img src="/images/tkm-logo.png" alt="Tamil Katral Maiyam logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-300">Learning modules</div>
              <div className="text-sm font-semibold text-slate-200">Signed in as {me?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/learn/progress"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Progress
            </Link>
            <button
              type="button"
              onClick={() => {
                userLogout()
                window.location.assign('/login?mode=user')
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[90rem] px-4 py-10">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Core Learning Modules</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Explore the four main modules of the AI Tamil Learning Bot. Each module builds fluency through practice—speaking, listening,
            reading, and writing—in a kid-safe, classroom-friendly way.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/learn/conversation"
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(16,185,129,0.25)]"
            >
              Start learning
            </Link>
            <Link to="/" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">
              Back to home
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">What students will use</h2>
          <p className="mt-2 text-sm text-slate-300">Four modules that work together to build fluency.</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ModuleCard
            title="Conversational Learning"
            subtitle="Scenario-based role-play and multi-character dialogues for real speaking confidence."
            bullets={['Role-play situations', 'Pronunciation support', 'Confidence building']}
            to="/learn/conversation"
          />
          <ModuleCard
            title="Creative Expression"
            subtitle="Topic-based writing and voice input with instant feedback to improve clarity and grammar."
            bullets={['Writing prompts', 'Voice-to-text option', 'Mistake-friendly feedback']}
            to="/learn/creative"
          />
          <ModuleCard
            title="Animated Stories"
            subtitle="Age-appropriate narratives for listening, comprehension, and vocabulary growth."
            bullets={['Story-based learning', 'Listening practice', 'New words in context']}
            to="/learn/stories"
          />
          <ModuleCard
            title="Animated Rhymes"
            subtitle="Phonetics and rhythm practice with memorable patterns that boost fluency."
            bullets={['Sounds & rhythm', 'Repeat-and-learn', 'Kid-friendly practice']}
            to="/learn/rhymes"
          />
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="font-display text-xl font-extrabold text-white">Platform highlights</h3>
          <p className="mt-2 text-sm text-slate-300">
            More than content — a complete learning experience for students and visibility for teachers/parents.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Highlight title="AI Tutor Guidance" body="Friendly guidance that adapts to each learner’s pace and level." />
            <Highlight title="Voice Practice" body="Speak Tamil regularly with safe, classroom-friendly conversations." />
            <Highlight title="Can-Do Goals" body="Track progress by skills (Can-Do statements) instead of only scores." />
            <Highlight title="Analytics" body="Teachers and parents can see growth signals over time." />
            <Highlight title="Safety-by-design" body="Role-based access, kid-safe UI, and privacy-first thinking." />
          </div>
        </div>
      </main>
    </div>
  )
}

function Highlight({ title, body }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <p className="text-sm font-extrabold text-white">{title}</p>
      <p className="mt-1 text-sm text-slate-300">{body}</p>
    </div>
  )
}

