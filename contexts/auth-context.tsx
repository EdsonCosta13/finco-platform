"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { authApi } from "@/lib/api"

interface User {
  id: number
  email: string
  name: string
  role: string
  company_id: number
  is_active: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: "colaborador" | "gestor") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "colaborador" | "gestor") => {
    try {
      // Use the correct endpoint based on the role
      let response
      if (role === "gestor") {
        response = await authApi.loginManager({ email, password })
      } else {
        response = await authApi.loginEmployee({ email, password })
      }

      if (response?.data?.access_token) {
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setUser(response.data.user)
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
