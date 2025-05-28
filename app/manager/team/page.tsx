"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { invitationApi, CompanyInvitation, CompanyUser } from "@/lib/api"
import { InviteEmployeeModal } from "@/components/team/invite-employee-modal"

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [invitations, setInvitations] = useState<CompanyInvitation[]>([])
  const [users, setUsers] = useState<CompanyUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("invites")
  const [inviteStatusTab, setInviteStatusTab] = useState("pending")

  useEffect(() => {
    if (activeTab === "invites") fetchInvitations()
    if (activeTab === "users") fetchUsers()
  }, [activeTab])

  const fetchInvitations = async () => {
    setIsLoading(true)
    try {
      const response = await invitationApi.getCompanyInvitations()
      setInvitations(response.data)
    } catch (error) {
      toast.error("Erro ao carregar convites")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await invitationApi.getCompanyUsers()
      setUsers(response.data)
    } catch (error) {
      toast.error("Erro ao carregar usuários")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Pendente", variant: "secondary" },
      used: { label: "Utilizado", variant: "default" },
      expired: { label: "Expirado", variant: "destructive" }
    }
    const { label, variant } = statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" }
    return <Badge variant={variant as any}>{label}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }

  const filteredInvitations =
    inviteStatusTab === "all"
      ? invitations
      : invitations.filter((invite) => invite.status === inviteStatusTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Equipe</h1>
          <p className="text-muted-foreground">Gerencie os convites e colaboradores da sua empresa</p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Convite
        </Button>
      </div>

      <InviteEmployeeModal
        onSuccess={fetchInvitations}
        open={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full border-b bg-transparent p-0">
          <TabsTrigger value="invites" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-12">Convites</TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-12">Usuários</TabsTrigger>
        </TabsList>
        <TabsContent value="invites">
          <Tabs value={inviteStatusTab} onValueChange={setInviteStatusTab} className="w-full mt-4">
            <TabsList className="w-full border-b bg-transparent p-0">
              <TabsTrigger value="pending" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-10">Pendentes</TabsTrigger>
              <TabsTrigger value="used" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-10">Utilizados</TabsTrigger>
              <TabsTrigger value="expired" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-10">Expirados</TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-10">Todos</TabsTrigger>
            </TabsList>
            <TabsContent value={inviteStatusTab}>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredInvitations.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-500 text-center py-8">
                    Nenhum convite encontrado.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredInvitations.map((invite) => (
                    <Card key={invite.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{invite.email}</CardTitle>

                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Enviado em:</span>
                          <span className="text-sm">{formatDate(invite.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Expira em:</span>
                          <span className="text-sm">{formatDate(invite.expires_at)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="users">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-center py-8">
                Nenhum usuário encontrado.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">E-mail</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Cargo</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Data de Criação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 capitalize">{user.role}</td>
                      <td className="px-4 py-2">{user.is_active ? <Badge variant="default">Ativo</Badge> : <Badge variant="destructive">Inativo</Badge>}</td>
                      <td className="px-4 py-2">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}