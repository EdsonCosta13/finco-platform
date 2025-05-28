"use client"

import type React from "react"

import { EmployeeSidebar } from "@/components/navigation/employee-sidebar"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface EmployeeLayoutProps {
  children: React.ReactNode
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 space-y-4 p-4 md:p-8">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
