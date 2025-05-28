"use client"

import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { EmployeeLayout } from "@/components/layouts/employee-layout"

export default function EmployeeRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <EmployeeLayout>{children}</EmployeeLayout>
    </ProtectedRoute>
  )
}
