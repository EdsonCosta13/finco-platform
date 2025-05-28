"use client"

import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { ManagerLayout } from "@/components/layouts/manager-layout"

export default function ManagerRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <ManagerLayout>{children}</ManagerLayout>
    </ProtectedRoute>
  )
}
