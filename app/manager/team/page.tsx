"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MessageCircle, TrendingUp } from "lucide-react"

export default function ManagerTeamPage() {
  const teamMembers = [
    { id: 1, name: "João Silva", email: "joao@empresa.com", creditLimit: 25000, creditUsed: 8500, requests: 3 },
    { id: 2, name: "Ana Costa", email: "ana@empresa.com", creditLimit: 20000, creditUsed: 12000, requests: 2 },
    { id: 3, name: "Pedro Oliveira", email: "pedro@empresa.com", creditLimit: 30000, creditUsed: 5000, requests: 1 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minha Equipe</h1>
          <p className="text-muted-foreground">Gerencie os funcionários da sua equipe</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Convidar Funcionário
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription className="text-xs">{member.email}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Limite:</span>
                  <span className="font-medium">R$ {member.creditLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Utilizado:</span>
                  <span className="font-medium">R$ {member.creditUsed.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(member.creditUsed / member.creditLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{member.requests} solicitações</Badge>
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
