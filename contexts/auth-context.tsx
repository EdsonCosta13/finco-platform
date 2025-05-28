"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState } from "@/types/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  token: string
}

type UserRole = "admin" | "manager" | "employee"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Simular verificação de token armazenado
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth-token")
        const userData = localStorage.getItem("user-data")

        if (token && userData) {
          const user = JSON.parse(userData) as User
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          })
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simular login - substituir por API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Melhorar a lógica de determinação do role
      let userRole: UserRole = "employee" // default

      if (email.includes("admin") || email.startsWith("admin")) {
        userRole = "admin"
      } else if (email.includes("manager") || email.includes("gerente")) {
        userRole = "manager"
      }

      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: "User Name",
        role: userRole,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      localStorage.setItem("auth-token", "mock-token")
      localStorage.setItem("user-data", JSON.stringify(mockUser))

      setAuthState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  const register = async (data: RegisterData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simular registro - substituir por API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: "employee", // Será determinado pelo token de convite
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      localStorage.setItem("auth-token", "mock-token")
      setAuthState({
        user: newUser,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
      }}
    >
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
