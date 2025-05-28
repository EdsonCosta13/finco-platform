"use client"

import type React from "react"

import { ManagerSidebar } from "@/components/navigation/manager-sidebar"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface ManagerLayoutProps {
  children: React.ReactNode
}

export function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <SidebarProvider>
      <ManagerSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 space-y-4 p-4 md:p-8">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
