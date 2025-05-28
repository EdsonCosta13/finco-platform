"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, Plus, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { invitationApi } from "@/lib/api"
import { InviteEmployeeModal } from "@/components/team/invite-employee-modal"

interface Invitation {
  id: number
  email: string
  status: "pending" | "accepted" | "rejected"
  created_at: string
}

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Convites</h1>
          <p className="text-muted-foreground mt-1">
            Envie convites para novos colaboradores informando apenas o e-mail.
          </p>
        </div>
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Novo Convite
        </Button>
      </div>

      <InviteEmployeeModal
        onSuccess={() => {}}
        open={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
      />
    </div>
  )
}