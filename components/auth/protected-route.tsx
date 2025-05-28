"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/types/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      console.log("ProtectedRoute - User:", user)
      console.log("ProtectedRoute - IsAuthenticated:", isAuthenticated)
      console.log("ProtectedRoute - AllowedRoles:", allowedRoles)

      if (!isAuthenticated) {
        console.log("ProtectedRoute - Redirecting to login")
        router.push("/login")
        return
      }

      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        console.log(`ProtectedRoute - User role ${user.role} not in allowed roles, redirecting`)
        // Redirecionar para a página apropriada baseada no role
        switch (user.role) {
          case "admin":
            router.push("/admin")
            break
          case "manager":
            router.push("/manager")
            break
          case "employee":
            router.push("/employee")
            break
          default:
            router.push("/login")
        }
        return
      }

      console.log("ProtectedRoute - Access granted")
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
