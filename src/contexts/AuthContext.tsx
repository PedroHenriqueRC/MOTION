import React from 'react'
import type { User } from '../data/models'
import { getPlanByKey } from '../data/mock'

const STORAGE_KEY = 'motion_user'
const USERS_KEY = 'motion_users'

type AuthContextValue = {
  user: User | null
  register: (user: Omit<User, 'id'>, password: string) => Promise<User>
  login: (email: string, password: string) => Promise<User>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch (e) {
    return null
  }
}

function writeStoredUser(u: User | null) {
  if (!u) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }
}

function readUsersStore(): Array<{ user: User; password?: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function writeUsersStore(list: Array<{ user: User; password?: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => readStoredUser())

  // ensure demo account exists (convenience for academic demo)
  React.useEffect(() => {
    const users = readUsersStore()
    const demoEmail = 'demo@motion.local'
    const found = users.find(u => u.user.email === demoEmail)
    if (!found) {
      // create a demo account pre-populated as MOTION+ annual
      const plan = getPlanByKey('annual')
      const demoUser: User = {
        id: `u_demo_${Date.now()}`,
        name: 'Usuário Demo',
        email: demoEmail,
        planId: plan?.id ?? 'p_annual',
        subscriptionStatus: 'active'
      }
      users.push({ user: demoUser, password: 'motion123' })
      writeUsersStore(users)
    }
  }, [])

  const register = React.useCallback(async (u: Omit<User, 'id'>, password: string) => {
    // NOTE: For this academic prototype we store credentials locally to allow login after reload.
    // This is NOT secure and exists only to simulate authentication in the client-side prototype.
    const id = `u_${Date.now()}`
    const newUser: User = { id, ...u }
    const users = readUsersStore()
    users.push({ user: newUser, password })
    writeUsersStore(users)
    writeStoredUser(newUser)
    setUser(newUser)
    return newUser
  }, [])

  const login = React.useCallback(async (email: string, password: string) => {
    const users = readUsersStore()
    const found = users.find(u => u.user.email === email)
    if (!found) throw new Error('Usuário não encontrado')
    // prototype-only password check
    if (found.password !== password) throw new Error('Senha incorreta')
    writeStoredUser(found.user)
    setUser(found.user)
    return found.user
  }, [])

  const logout = React.useCallback(() => {
    writeStoredUser(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { STORAGE_KEY, USERS_KEY }
