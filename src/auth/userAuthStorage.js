const USERS_KEY = 'tkm_user_users_v1'
const AUTH_KEY = 'tkm_user_auth_v1'

const ROLE_LABELS = {
  parent: 'Parent',
  student: 'Student',
  teacher: 'Teacher',
}

const ROLE_IDS = ['parent', 'student', 'teacher']

const seedUsers = [
  { email: 'parent@demo.com', password: '123456', role: 'parent' },
  { email: 'student@demo.com', password: '123456', role: 'student' },
  { email: 'teacher@demo.com', password: '123456', role: 'teacher' },
]

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function getUserRoleLabel(role) {
  return ROLE_LABELS[role] ?? role
}

function ensureSeededUsers() {
  if (typeof window === 'undefined') return

  const raw = window.localStorage.getItem(USERS_KEY)
  if (raw) return

  const usersByEmail = {}
  for (const u of seedUsers) {
    usersByEmail[u.email.toLowerCase()] = {
      email: u.email.toLowerCase(),
      password: u.password,
      role: u.role,
      createdAt: new Date().toISOString(),
    }
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(usersByEmail))
}

export function getUserUsers() {
  if (typeof window === 'undefined') return {}
  ensureSeededUsers()
  const raw = window.localStorage.getItem(USERS_KEY)
  return safeJsonParse(raw, {})
}

export function getUserAuth() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(AUTH_KEY)
  return safeJsonParse(raw, null)
}

export function isUserAuthed() {
  const auth = getUserAuth()
  return Boolean(auth?.email && auth?.role)
}

export function getCurrentUserUser() {
  const auth = getUserAuth()
  if (!auth?.email || !auth?.role) return null
  const users = getUserUsers()
  return users[String(auth.email).toLowerCase()] ?? null
}

export function userLogout() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_KEY)
}

export function userLogin({ email, password, role }) {
  if (!email || !password || !role) throw new Error('Missing email, password, or role.')

  const normalizedEmail = String(email).toLowerCase().trim()
  const users = getUserUsers()
  const user = users[normalizedEmail]

  if (!ROLE_IDS.includes(role)) throw new Error('Invalid role.')
  const roleLabel = getUserRoleLabel(role)

  if (!user || user.role !== role || user.password !== password) {
    throw new Error(`${roleLabel} pass is not correct.`)
  }

  window.localStorage.setItem(AUTH_KEY, JSON.stringify({ email: normalizedEmail, role: user.role }))
  return user
}

