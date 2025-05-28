"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye } from "lucide-react"

export default function ManagerRequestsPage() {
  const requests = [
    {
      id: 1,
      user: "João Silva",
      amount: 15000,
      purpose: "Compra de equipamentos",
      date: "2024-01-20",
      status: "pending",
      urgency: "high",
    },
    {
      id: 2,
      user: "Ana Costa",
      amount: 8000,
      purpose: "Curso de capacitação",
      date: "2024-01-19",
      status: "pending",
      urgency: "medium",
    },
    {
      id: 3,
      user: "Pedro Oliveira",
      amount: 12000,
      purpose: "Viagem de negócios",
      date: "2024-01-18",
      status: "approved",
      urgency: "low",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Solicitações de Crédito</h1>
        <p className="text-muted-foreground">Analise e aprove solicitações da sua equipe</p>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{request.user}</CardTitle>
                  <CardDescription>{request.purpose}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">R$ {request.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{request.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {request.status === "approved"
                      ? "Aprovado"
                      : request.status === "pending"
                        ? "Pendente"
                        : "Rejeitado"}
                  </Badge>
                  <Badge
                    variant={
                      request.urgency === "high"
                        ? "destructive"
                        : request.urgency === "medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {request.urgency === "high" ? "Alta" : request.urgency === "medium" ? "Média" : "Baixa"} Prioridade
                  </Badge>
                </div>

                {request.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-4 w-4" />
                      Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="mr-1 h-4 w-4" />
                      Rejeitar
                    </Button>
                    <Button size="sm">
                      <Check className="mr-1 h-4 w-4" />
                      Aprovar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
