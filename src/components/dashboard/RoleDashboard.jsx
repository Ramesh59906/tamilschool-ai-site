import { useMemo, useState } from 'react'
import { getCurrentUser, getRoleLabel, logout, isAuthed } from '../../auth/authStorage'
import RoleNav from './RoleNav'

function Card({ title, children }) {
  return (
    <div className="rounded-[28px] border border-slate-200/60 bg-white/70 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <h3 className="mb-3 text-xl font-extrabold tracking-tight text-slate-900">{title}</h3>
      <div className="text-slate-700">{children}</div>
    </div>
  )
}

export default function RoleDashboard() {
  // Keep it defensive: App should protect this route, but we also guard here.
  if (!isAuthed()) {
    window.location.hash = '#/login'
    return null
  }

  const user = getCurrentUser()
  const role = user?.role ?? 'admin'
  const [activeTab, setActiveTab] = useState('overview')

  const headerSubtitle = useMemo(() => {
    if (role === 'admin') return 'Manage schools and teachers from one place.'
    if (role === 'teacher') return 'Track learning progress and support students.'
    return 'View progress and keep learning safe.'
  }, [role])

  function handleLogout() {
    logout()
    window.location.hash = '#/login'
  }

  return (
    <div className="min-h-svh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-[85rem] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              {role === 'admin' ? 'A' : role === 'teacher' ? 'T' : 'P'}
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold uppercase tracking-widest text-emerald-300">
                {getRoleLabel(role)}
              </div>
              <div className="text-base font-extrabold">{headerSubtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm text-slate-300">
              Signed in as <span className="font-semibold text-white">{user?.email}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/15"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[85rem] px-4 py-10">
        <div className="mb-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <RoleNav role={role} activeTab={activeTab} onChangeTab={setActiveTab} />
          <div className="mt-4 text-sm text-slate-300">
            Use the menu above to navigate your role dashboard.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {role === 'admin' && activeTab === 'overview' && (
            <>
              <Card title="School overview">
                <p>
                  You can manage overall learning setup, review analytics summaries, and coordinate teacher access.
                </p>
              </Card>
              <Card title="Quick actions">
                <div className="flex flex-col gap-2 text-slate-800">
                  <div className="rounded-xl bg-white/60 px-4 py-3 font-bold">Invite teachers (UI placeholder)</div>
                  <div className="rounded-xl bg-white/60 px-4 py-3 font-bold">Open reports (UI placeholder)</div>
                  <div className="rounded-xl bg-white/60 px-4 py-3 font-bold">Configure safety policy (UI placeholder)</div>
                </div>
              </Card>
            </>
          )}

          {role === 'admin' && activeTab === 'teachers' && (
            <>
              <Card title="Teachers">
                <p className="text-slate-700">
                  This is where your school teacher list and assignments would appear.
                </p>
              </Card>
              <Card title="Access control">
                <p className="text-slate-700">
                  Add/remove teacher accounts and manage what modules they can use.
                </p>
              </Card>
            </>
          )}

          {role === 'admin' && activeTab === 'reports' && (
            <>
              <Card title="Reports & analytics">
                <p>
                  Show session totals, mastery %, and vocabulary growth for the selected school.
                </p>
              </Card>
              <Card title="Export (placeholder)">
                <p>
                  Add CSV/PDF exports once you connect a backend.
                </p>
              </Card>
            </>
          )}

          {role === 'admin' && activeTab === 'settings' && (
            <>
              <Card title="Settings">
                <p>
                  Configure app branding, safety rules, and default lesson options.
                </p>
              </Card>
              <Card title="Privacy">
                <p>
                  Ensure child privacy controls match your school policies.
                </p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'overview' && (
            <>
              <Card title="Class overview">
                <p>
                  Track overall class progress and upcoming activities.
                </p>
              </Card>
              <Card title="Assignments (placeholder)">
                <p>
                  Assign lessons by grade and topic.
                </p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'class' && (
            <>
              <Card title="Class management">
                <p>
                  Manage students, lessons, and time spent.
                </p>
              </Card>
              <Card title="Progress updates">
                <p>
                  See who is improving and who needs more practice.
                </p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'vocabulary' && (
            <>
              <Card title="Vocabulary tracking">
                <p>
                  Monitor vocabulary growth and pronunciation confidence.
                </p>
              </Card>
              <Card title="Activities (placeholder)">
                <p>
                  Generate practice sets based on mastery gaps.
                </p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'reports' && (
            <>
              <Card title="Reports">
                <p>
                  View progress summaries for students and classes.
                </p>
              </Card>
              <Card title="Download (placeholder)">
                <p>
                  Export reports for parents and admins once backend is connected.
                </p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'overview' && (
            <>
              <Card title="Family overview">
                <p>
                  See learning progress and celebrate achievements.
                </p>
              </Card>
              <Card title="Learning safety">
                <p>
                  Review safety & privacy features for your child.
                </p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'child' && (
            <>
              <Card title="My child">
                <p>
                  Add/select your child profile and track their learning sessions.
                </p>
              </Card>
              <Card title="Recommendations (placeholder)">
                <p>
                  Suggest topics based on progress.
                </p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'progress' && (
            <>
              <Card title="Progress">
                <p>
                  View time spent, mastery %, and vocabulary improvements.
                </p>
              </Card>
              <Card title="Reports (placeholder)">
                <p>
                  Generate shareable progress summaries.
                </p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'safety' && (
            <>
              <Card title="Safety controls">
                <p>
                  Confirm privacy settings and safe learning experience.
                </p>
              </Card>
              <Card title="Policy link (placeholder)">
                <p>
                  Link to detailed safety policy pages.
                </p>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

