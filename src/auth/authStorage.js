const USERS_KEY = 'tkm_users_v1'
const AUTH_KEY = 'tkm_auth_v1'

const ROLE_LABELS = {
  admin: 'Admin',
  teacher: 'Teacher',
  parent: 'Parent',
}

const seedUsers = [
  { email: 'admin@demo.com', password: '123456', role: 'admin' },
  { email: 'teacher@demo.com', password: '123456', role: 'teacher' },
  { email: 'parent@demo.com', password: '123456', role: 'parent' },
]

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function getRoleLabel(role) {
  return ROLE_LABELS[role] ?? role
}

export function ensureSeededUsers() {
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

export function getUsers() {
  if (typeof window === 'undefined') return {}
  ensureSeededUsers()
  const raw = window.localStorage.getItem(USERS_KEY)
  return safeJsonParse(raw, {})
}

export function getAuth() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(AUTH_KEY)
  return safeJsonParse(raw, null)
}

export function isAuthed() {
  const auth = getAuth()
  return Boolean(auth?.email && auth?.role)
}

export function getCurrentUser() {
  const auth = getAuth()
  if (!auth?.email || !auth?.role) return null
  const users = getUsers()
  const user = users[String(auth.email).toLowerCase()]
  if (!user) return null
  return user
}

export function logout() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_KEY)
}

export function signUp({ email, password, role }) {
  if (!email || !password || !role) {
    throw new Error('Missing fields.')
  }

  const normalizedEmail = String(email).toLowerCase().trim()
  if (!normalizedEmail.includes('@')) {
    throw new Error('Enter a valid email.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.')
  }

  if (!['admin', 'teacher', 'parent'].includes(role)) {
    throw new Error('Invalid role.')
  }

  const users = getUsers()
  if (users[normalizedEmail]) {
    throw new Error('Account already exists for this email.')
  }

  users[normalizedEmail] = {
    email: normalizedEmail,
    password,
    role,
    createdAt: new Date().toISOString(),
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
  window.localStorage.setItem(AUTH_KEY, JSON.stringify({ email: normalizedEmail, role }))

  return users[normalizedEmail]
}

export function login({ email, password, role }) {
  if (!email || !password) throw new Error('Missing email or password.')

  const normalizedEmail = String(email).toLowerCase().trim()
  const users = getUsers()
  const user = users[normalizedEmail]

  const roleLabel = role ? getRoleLabel(role) : null

  // Strict mode: when role is provided, always show role-scoped credentials errors.
  if (role) {
    if (!['admin', 'teacher', 'parent'].includes(role)) {
      throw new Error('Invalid role.')
    }

    if (!user) throw new Error(`${roleLabel} email or password is not correct.`)
    if (user.password !== password) throw new Error(`${roleLabel} email or password is not correct.`)
    if (user.role !== role) throw new Error(`${roleLabel} email or password is not correct.`)

    window.localStorage.setItem(AUTH_KEY, JSON.stringify({ email: normalizedEmail, role: user.role }))
    return user
  }

  // Non-strict fallback: only email/password validation.
  if (!user) throw new Error('No account found for this email.')
  if (user.password !== password) throw new Error('Incorrect password.')

  window.localStorage.setItem(AUTH_KEY, JSON.stringify({ email: normalizedEmail, role: user.role }))
  return user
}

export function resetPassword({ email, newPassword }) {
  if (!email || !newPassword) throw new Error('Missing fields.')

  const normalizedEmail = String(email).toLowerCase().trim()
  const users = getUsers()
  const user = users[normalizedEmail]
  if (!user) throw new Error('No account found for this email.')

  if (newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters.')
  }

  user.password = newPassword
  users[normalizedEmail] = user
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))

  return true
}

