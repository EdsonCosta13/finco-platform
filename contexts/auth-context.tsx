"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { authApi, LoginResponse } from "@/lib/api"
import { useRouter } from "next/navigation"

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
  isAuthenticated: boolean
  login: (email: string, password: string, role: "colaborador" | "gestor") => Promise<LoginResponse>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("access_token")
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "colaborador" | "gestor"): Promise<LoginResponse> => {
    try {
      setIsLoading(true)
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
        setIsAuthenticated(true)
      }

      return response
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
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
