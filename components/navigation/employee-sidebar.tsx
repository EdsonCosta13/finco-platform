"use client"

import { CreditCard, FileText, User, History } from "lucide-react"
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
    title: "Investimentos",
    url: "/employee/investment-available",
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
