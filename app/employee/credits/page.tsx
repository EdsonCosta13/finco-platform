"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Plus } from "lucide-react"
import { RequestCreditModal } from "@/components/credit/request-credit-modal"

export default function EmployeeCreditsPage() {
  const credits = [
    {
      id: 1,
      amount: 5000,
      purpose: "Compra de equipamentos",
      date: "2024-01-15",
      status: "approved",
      dueDate: "2024-07-15",
      installments: "6x R$ 833,33",
    },
    {
      id: 2,
      amount: 3500,
      purpose: "Curso de capacitação",
      date: "2024-01-20",
      status: "approved",
      dueDate: "2024-06-20",
      installments: "5x R$ 700,00",
    },
    {
      id: 3,
      amount: 10000,
      purpose: "Viagem de negócios",
      date: "2024-01-25",
      status: "pending",
      dueDate: "-",
      installments: "-",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Créditos</h1>
          <p className="text-muted-foreground">Visualize todos os seus créditos aprovados e pendentes</p>
        </div>
        <div className="flex gap-2">
          <RequestCreditModal />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Extrato
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {credits.map((credit) => (
          <Card key={credit.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Crédito #{credit.id.toString().padStart(3, "0")}</CardTitle>
                  <CardDescription>{credit.purpose}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">R$ {credit.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Solicitado em {credit.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge
                      variant={
                        credit.status === "approved"
                          ? "default"
                          : credit.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {credit.status === "approved"
                        ? "Aprovado"
                        : credit.status === "pending"
                          ? "Pendente"
                          : "Rejeitado"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Vencimento:</span>
                    <span className="text-sm">{credit.dueDate}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Parcelas:</span>
                    <span className="text-sm">{credit.installments}</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-4 w-4" />
                      Detalhes
                    </Button>
                    {credit.status === "approved" && (
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Contrato
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
