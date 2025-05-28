"use client"

import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/layouts/admin-layout"

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  )
}
