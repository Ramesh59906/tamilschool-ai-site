import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getCurrentUser, getRoleLabel, isAuthed, logout } from '../auth/authStorage'

function Card({ title, children, isDark }) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm ${
        isDark
          ? 'border-slate-800 bg-slate-900 shadow-black/30'
          : 'border-slate-200/80 bg-white shadow-slate-200/40'
      }`}
    >
      <h3 className={`mb-3 text-lg font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{title}</h3>
      <div className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{children}</div>
    </div>
  )
}

function NavIcon({ name }) {
  const common = 'h-5 w-5 shrink-0'
  switch (name) {
    case 'overview':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    case 'teachers':
    case 'class':
    case 'child':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case 'reports':
    case 'progress':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'settings':
    case 'safety':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'vocabulary':
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    default:
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
  }
}

function tabIconId(tabId) {
  if (['teachers', 'class', 'child'].includes(tabId)) return tabId === 'teachers' ? 'teachers' : tabId === 'class' ? 'class' : 'child'
  if (['reports', 'progress'].includes(tabId)) return tabId
  if (tabId === 'vocabulary') return 'vocabulary'
  if (tabId === 'settings' || tabId === 'safety') return tabId
  return 'overview'
}

const roleAccent = {
  admin: {
    ring: 'ring-emerald-500/30',
    active: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    dot: 'bg-emerald-400',
    stat: 'from-emerald-500 to-teal-600',
  },
  teacher: {
    ring: 'ring-tkm-400/30',
    active: 'bg-tkm-500/20 text-tkm-200 border-tkm-400/40',
    dot: 'bg-tkm-400',
    stat: 'from-tkm-500 to-tkm-700',
  },
  parent: {
    ring: 'ring-amber-400/30',
    active: 'bg-amber-500/15 text-amber-200 border-amber-500/35',
    dot: 'bg-amber-400',
    stat: 'from-amber-500 to-orange-600',
  },
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [dashboardTheme, setDashboardTheme] = useState(() => localStorage.getItem('dashboard-theme') || 'light')

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

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    localStorage.setItem('dashboard-theme', dashboardTheme)
  }, [dashboardTheme])

  if (!isAuthed()) {
    return <Navigate to="/admin-login" replace />
  }

  const user = getCurrentUser()
  const role = user?.role ?? 'admin'
  const accent = roleAccent[role] ?? roleAccent.admin

  const tabs = tabsByRole[role] ?? tabsByRole.admin
  const activeLabel = tabs.find((t) => t.id === activeTab)?.label ?? 'Dashboard'

  function handleLogout() {
    logout()
    navigate('/admin-login')
  }

  function selectTab(id) {
    setActiveTab(id)
    setSidebarOpen(false)
  }

  const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  const isDark = dashboardTheme === 'dark'

  function toggleDashboardTheme() {
    setDashboardTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={`flex min-h-svh font-sans ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(17.5rem,88vw)] flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl transition-transform duration-200 md:static md:translate-x-0 md:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className={`flex items-center gap-3 border-b border-white/10 px-5 py-5`}>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-display text-lg font-extrabold ring-2 ${accent.ring}`}
          >
            {role === 'admin' ? 'A' : role === 'teacher' ? 'T' : 'P'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold uppercase tracking-wider text-white/50">Tamil School</p>
            <p className="truncate font-display text-sm font-bold text-white">{getRoleLabel(role)}</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          <p className="mb-1 px-3 text-[0.65rem] font-bold uppercase tracking-widest text-white/40">Navigation</p>
          {tabs.map((t) => {
            const isActive = activeTab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  isActive ? accent.active : 'text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                <NavIcon name={tabIconId(t.id)} />
                {t.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="mb-2 truncate text-xs text-slate-400">Signed in</p>
          <p className="truncate text-sm font-medium text-white/90">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className={`sticky top-0 z-30 border-b shadow-sm backdrop-blur-md ${isDark ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200/80 bg-white/90'}`}>
          <div className="flex h-14 items-center gap-3 px-4 sm:h-16 sm:px-6">
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm md:hidden ${isDark ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="min-w-0 flex-1">
              <p className={`text-[0.65rem] font-bold uppercase tracking-widest sm:text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Workspace</p>
              <h1 className={`truncate font-display text-lg font-extrabold sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeLabel}</h1>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className={`inline-flex h-2 w-2 animate-pulse rounded-full ${accent.dot}`} aria-hidden />
              <span className="text-xs font-semibold text-emerald-600">Live</span>
            </div>

            <div className="hidden text-right sm:block">
              <p className={`font-mono text-sm font-bold tabular-nums ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{timeStr}</p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{dateStr}</p>
            </div>

            <div className={`hidden h-9 w-px sm:block ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />

            <button
              type="button"
              onClick={toggleDashboardTheme}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${isDark ? 'border-slate-700 bg-slate-900 text-amber-300 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
              aria-label={isDark ? 'Switch dashboard to light theme' : 'Switch dashboard to dark theme'}
              title={isDark ? 'Light theme' : 'Dark theme'}
            >
              {isDark ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 14.6A9 9 0 1111.4 3a1 1 0 00-.36 1.95A7 7 0 1019.05 13a1 1 0 001.95.36z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className={`hidden rounded-xl border px-3 py-2 text-sm font-bold transition-colors sm:inline-flex ${isDark ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          {activeTab === 'overview' && (
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {role === 'admin' && (
                <>
                  <StatPill label="Active teachers" value="24" sub="↑ 3 this week" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Students" value="412" sub="Across grades" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Sessions today" value="186" sub="Updated live" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Reports ready" value="12" sub="Export anytime" accentClass={accent.stat} isDark={isDark} />
                </>
              )}
              {role === 'teacher' && (
                <>
                  <StatPill label="My classes" value="4" sub="This term" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Students" value="112" sub="Total roster" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Due reviews" value="8" sub="Needs attention" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Vocab sets" value="36" sub="Assigned" accentClass={accent.stat} isDark={isDark} />
                </>
              )}
              {role === 'parent' && (
                <>
                  <StatPill label="Children" value="2" sub="Linked profiles" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="This week" value="4h 20m" sub="Learning time" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Streak" value="5 days" sub="Keep it up" accentClass={accent.stat} isDark={isDark} />
                  <StatPill label="Achievements" value="7" sub="New this month" accentClass={accent.stat} isDark={isDark} />
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {role === 'admin' && activeTab === 'overview' && (
              <>
                <Card title="School overview" isDark={isDark}>
                  <p>
                    Manage overall learning setup and coordinate teacher access. (UI placeholder for now)
                  </p>
                </Card>
                <Card title="Quick actions" isDark={isDark}>
                  <div className="flex flex-col gap-2">
                    <div className={`rounded-xl px-4 py-3 font-bold ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>Invite teachers</div>
                    <div className={`rounded-xl px-4 py-3 font-bold ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>Open reports</div>
                    <div className={`rounded-xl px-4 py-3 font-bold ${isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>Configure safety policy</div>
                  </div>
                </Card>
              </>
            )}

            {role === 'admin' && activeTab === 'teachers' && (
              <>
                <Card title="Teachers" isDark={isDark}>
                  <p>Teacher list + assignments UI placeholder.</p>
                </Card>
                <Card title="Access control" isDark={isDark}>
                  <p>Add/remove teacher accounts and manage modules UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'admin' && activeTab === 'reports' && (
              <>
                <Card title="Reports & analytics" isDark={isDark}>
                  <p>Show session totals, mastery %, and vocabulary growth UI placeholder.</p>
                </Card>
                <Card title="Export (placeholder)" isDark={isDark}>
                  <p>Add CSV/PDF exports once backend is connected.</p>
                </Card>
              </>
            )}

            {role === 'admin' && activeTab === 'settings' && (
              <>
                <Card title="Settings" isDark={isDark}>
                  <p>Branding and safety rule settings UI placeholder.</p>
                </Card>
                <Card title="Privacy" isDark={isDark}>
                  <p>Privacy controls UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'teacher' && activeTab === 'overview' && (
              <>
                <Card title="Class overview" isDark={isDark}>
                  <p>Track class progress and upcoming activities UI placeholder.</p>
                </Card>
                <Card title="Assignments (placeholder)" isDark={isDark}>
                  <p>Assign lessons by grade and topic UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'teacher' && activeTab === 'class' && (
              <>
                <Card title="Class management" isDark={isDark}>
                  <p>Manage students, lessons, and time spent UI placeholder.</p>
                </Card>
                <Card title="Progress updates" isDark={isDark}>
                  <p>See which students need more practice UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'teacher' && activeTab === 'vocabulary' && (
              <>
                <Card title="Vocabulary tracking" isDark={isDark}>
                  <p>Monitor vocabulary growth and pronunciation confidence UI placeholder.</p>
                </Card>
                <Card title="Activities (placeholder)" isDark={isDark}>
                  <p>Generate practice sets based on mastery gaps UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'teacher' && activeTab === 'reports' && (
              <>
                <Card title="Reports" isDark={isDark}>
                  <p>View progress summaries for students UI placeholder.</p>
                </Card>
                <Card title="Download (placeholder)" isDark={isDark}>
                  <p>Export reports UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'parent' && activeTab === 'overview' && (
              <>
                <Card title="Family overview" isDark={isDark}>
                  <p>See learning progress and achievements UI placeholder.</p>
                </Card>
                <Card title="Learning safety" isDark={isDark}>
                  <p>Review safety & privacy features UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'parent' && activeTab === 'child' && (
              <>
                <Card title="My child" isDark={isDark}>
                  <p>Select child profile and track learning sessions UI placeholder.</p>
                </Card>
                <Card title="Recommendations (placeholder)" isDark={isDark}>
                  <p>Suggest topics based on progress UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'parent' && activeTab === 'progress' && (
              <>
                <Card title="Progress" isDark={isDark}>
                  <p>View time spent, mastery %, and vocabulary improvements UI placeholder.</p>
                </Card>
                <Card title="Reports (placeholder)" isDark={isDark}>
                  <p>Generate shareable progress summaries UI placeholder.</p>
                </Card>
              </>
            )}

            {role === 'parent' && activeTab === 'safety' && (
              <>
                <Card title="Safety controls" isDark={isDark}>
                  <p>Confirm privacy settings UI placeholder.</p>
                </Card>
                <Card title="Policy link (placeholder)" isDark={isDark}>
                  <p>Link to detailed safety policy pages UI placeholder.</p>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function StatPill({ label, value, sub, accentClass, isDark }) {
  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200/80 bg-white'}`}>
      <p className={`text-[0.65rem] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
      <p className={`mt-1 bg-gradient-to-br bg-clip-text font-display text-2xl font-extrabold text-transparent ${accentClass}`}>
        {value}
      </p>
      <p className={`mt-0.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{sub}</p>
    </div>
  )
}
