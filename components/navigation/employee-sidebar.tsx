"use client"

import { CreditCard, FileText, User, History } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const employeeMenuItems = [
  {
    title: "Painel de Controle",
    url: "/employee",
    icon: User,
  },
  {
    title: "Meus Créditos",
    url: "/employee/credits",
    icon: CreditCard,
  },
  {
    title: "Oportunidades",
    url: "/employee/investment-available",
    icon: CreditCard,
  },
  {
    title: "Meus Investimentos",
    url: "/employee/my-investments",
    icon: CreditCard,
  },
]

export function EmployeeSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Funcionário</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {employeeMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
