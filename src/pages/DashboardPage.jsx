import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getCurrentUser, getRoleLabel, isAuthed, logout } from '../auth/authStorage'

function Card({ title, children }) {
  return (
    <div className="rounded-[28px] border border-slate-200/70 bg-white/70 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <h3 className="mb-3 text-xl font-extrabold tracking-tight text-slate-900">{title}</h3>
      <div className="text-slate-700">{children}</div>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()

  if (!isAuthed()) {
    return <Navigate to="/admin-login" replace />
  }

  const user = getCurrentUser()
  const role = user?.role ?? 'admin'
  const [activeTab, setActiveTab] = useState('overview')

  const tabsByRole = useMemo(() => {
    return {
      admin: [
        { id: 'overview', label: 'Overview' },
        { id: 'teachers', label: 'Teachers' },
        { id: 'reports', label: 'Reports' },
        { id: 'settings', label: 'Settings' },
      ],
      teacher: [
        { id: 'overview', label: 'Overview' },
        { id: 'class', label: 'Class' },
        { id: 'vocabulary', label: 'Vocabulary' },
        { id: 'reports', label: 'Reports' },
      ],
      parent: [
        { id: 'overview', label: 'Overview' },
        { id: 'child', label: 'My Child' },
        { id: 'progress', label: 'Progress' },
        { id: 'safety', label: 'Safety' },
      ],
    }
  }, [])

  const tabs = tabsByRole[role] ?? tabsByRole.admin

  function handleLogout() {
    logout()
    navigate('/admin-login')
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
                {getRoleLabel(role)} Dashboard
              </div>
              <div className="text-base font-extrabold">
                Signed in as <span className="text-emerald-200/90">{user?.email}</span>
              </div>
            </div>
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

      <div className="mx-auto max-w-[85rem] px-4 py-10">
        <div className="mb-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  activeTab === t.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.25)]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-300">Use these tabs to navigate your role dashboard.</div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {role === 'admin' && activeTab === 'overview' && (
            <>
              <Card title="School overview">
                <p>
                  Manage overall learning setup and coordinate teacher access. (UI placeholder for now)
                </p>
              </Card>
              <Card title="Quick actions">
                <div className="flex flex-col gap-2">
                  <div className="rounded-xl bg-white/60 px-4 py-3 font-bold text-slate-800">Invite teachers</div>
                  <div className="rounded-xl bg-white/60 px-4 py-3 font-bold text-slate-800">Open reports</div>
                  <div className="rounded-xl bg-white/60 px-4 py-3 font-bold text-slate-800">Configure safety policy</div>
                </div>
              </Card>
            </>
          )}

          {role === 'admin' && activeTab === 'teachers' && (
            <>
              <Card title="Teachers">
                <p>Teacher list + assignments UI placeholder.</p>
              </Card>
              <Card title="Access control">
                <p>Add/remove teacher accounts and manage modules UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'admin' && activeTab === 'reports' && (
            <>
              <Card title="Reports & analytics">
                <p>Show session totals, mastery %, and vocabulary growth UI placeholder.</p>
              </Card>
              <Card title="Export (placeholder)">
                <p>Add CSV/PDF exports once backend is connected.</p>
              </Card>
            </>
          )}

          {role === 'admin' && activeTab === 'settings' && (
            <>
              <Card title="Settings">
                <p>Branding and safety rule settings UI placeholder.</p>
              </Card>
              <Card title="Privacy">
                <p>Privacy controls UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'overview' && (
            <>
              <Card title="Class overview">
                <p>Track class progress and upcoming activities UI placeholder.</p>
              </Card>
              <Card title="Assignments (placeholder)">
                <p>Assign lessons by grade and topic UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'class' && (
            <>
              <Card title="Class management">
                <p>Manage students, lessons, and time spent UI placeholder.</p>
              </Card>
              <Card title="Progress updates">
                <p>See which students need more practice UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'vocabulary' && (
            <>
              <Card title="Vocabulary tracking">
                <p>Monitor vocabulary growth and pronunciation confidence UI placeholder.</p>
              </Card>
              <Card title="Activities (placeholder)">
                <p>Generate practice sets based on mastery gaps UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'teacher' && activeTab === 'reports' && (
            <>
              <Card title="Reports">
                <p>View progress summaries for students UI placeholder.</p>
              </Card>
              <Card title="Download (placeholder)">
                <p>Export reports UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'overview' && (
            <>
              <Card title="Family overview">
                <p>See learning progress and achievements UI placeholder.</p>
              </Card>
              <Card title="Learning safety">
                <p>Review safety & privacy features UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'child' && (
            <>
              <Card title="My child">
                <p>Select child profile and track learning sessions UI placeholder.</p>
              </Card>
              <Card title="Recommendations (placeholder)">
                <p>Suggest topics based on progress UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'progress' && (
            <>
              <Card title="Progress">
                <p>View time spent, mastery %, and vocabulary improvements UI placeholder.</p>
              </Card>
              <Card title="Reports (placeholder)">
                <p>Generate shareable progress summaries UI placeholder.</p>
              </Card>
            </>
          )}

          {role === 'parent' && activeTab === 'safety' && (
            <>
              <Card title="Safety controls">
                <p>Confirm privacy settings UI placeholder.</p>
              </Card>
              <Card title="Policy link (placeholder)">
                <p>Link to detailed safety policy pages UI placeholder.</p>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

