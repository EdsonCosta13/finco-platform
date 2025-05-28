"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download } from "lucide-react"

export default function AdminCreditsPage() {
  const credits = [
    { id: 1, user: "João Silva", amount: 15000, status: "approved", date: "2024-01-15", manager: "Maria Santos" },
    { id: 2, user: "Ana Costa", amount: 8000, status: "pending", date: "2024-01-20", manager: "Carlos Lima" },
    { id: 3, user: "Pedro Oliveira", amount: 12000, status: "rejected", date: "2024-01-18", manager: "Maria Santos" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Créditos</h1>
          <p className="text-muted-foreground">Visualize e monitore todas as solicitações de crédito</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar solicitações..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Crédito</CardTitle>
          <CardDescription>Todas as solicitações do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {credits.map((credit) => (
              <div key={credit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{credit.user}</p>
                  <p className="text-sm text-muted-foreground">Gerente: {credit.manager}</p>
                  <p className="text-sm text-muted-foreground">{credit.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold">R$ {credit.amount.toLocaleString()}</p>
                  <Badge
                    variant={
                      credit.status === "approved"
                        ? "default"
                        : credit.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {credit.status === "approved" ? "Aprovado" : credit.status === "pending" ? "Pendente" : "Rejeitado"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
