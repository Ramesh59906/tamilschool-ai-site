import { getRoleLabel } from '../../auth/authStorage'

const NAV_BY_ROLE = {
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

export default function RoleNav({ role, activeTab, onChangeTab }) {
  const items = NAV_BY_ROLE[role] ?? NAV_BY_ROLE.admin

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <span className="hidden sm:inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-bold tracking-widest text-slate-200">
        {getRoleLabel(role)} Dashboard
      </span>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChangeTab(item.id)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            activeTab === item.id
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.25)]'
              : 'bg-white/5 text-slate-200 hover:bg-white/10'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

