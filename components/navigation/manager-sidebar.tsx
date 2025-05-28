"use client"

import { Users, CreditCard, BarChart3, FileText, Target } from "lucide-react"
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

const managerMenuItems = [
  {
    title: "Dashboard",
    url: "/manager",
    icon: BarChart3,
  },
  {
    title: "Minha Equipe",
    url: "/manager/team",
    icon: Users,
  },
  {
    title: "Solicitações",
    url: "/manager/requests",
    icon: FileText,
  },
  {
    title: "Créditos",
    url: "/manager/credits",
    icon: CreditCard,
  },
  {
    title: "Metas",
    url: "/manager/goals",
    icon: Target,
  },
]

export function ManagerSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managerMenuItems.map((item) => (
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
