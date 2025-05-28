export type UserRole = "employee" | "manager" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface InviteData {
  email: string
  role: UserRole
  token: string
  expiresAt: Date
}
