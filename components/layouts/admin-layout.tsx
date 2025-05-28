"use client"

import type React from "react"

import { AdminSidebar } from "@/components/navigation/admin-sidebar"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 space-y-4 p-4 md:p-8">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
