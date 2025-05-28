"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Plus, Loader2 } from "lucide-react"
import { RequestCreditModal } from "@/components/credit/request-credit-modal"
import { creditApi, CreditRequestResponse } from "@/lib/api"
import { toast } from "sonner"

export default function EmployeeCreditsPage() {
  const [credits, setCredits] = useState<CreditRequestResponse["data"]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCredits = async () => {
    try {
      const response = await creditApi.getCreditRequests()
      setCredits(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao carregar solicitações de crédito")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCredits()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-pt', {
      style: 'currency',
      currency: 'Kzs'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Pendente", variant: "secondary" },
      approved: { label: "Aprovado", variant: "default" },
      rejected: { label: "Rejeitado", variant: "destructive" },
      funded: { label: "Financiado", variant: "success" }
    }

    const { label, variant } = statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" }

    return (
      <Badge variant={variant as any}>
        {label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Créditos</h1>
          <p className="text-muted-foreground">Visualize todos os seus créditos aprovados e pendentes</p>
        </div>
        <div className="flex gap-2">
          <RequestCreditModal onSuccess={fetchCredits} />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Extrato
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : credits.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-8">
            Nenhuma solicitação de crédito encontrada.
          </p>
        </div>
      ) : (
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
                    <p className="text-2xl font-bold">{formatCurrency(credit.amount)}</p>
                    <p className="text-sm text-muted-foreground">Solicitado em {formatDate(credit.created_at)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      {getStatusBadge(credit.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Prazo:</span>
                      <span className="text-sm">{credit.term_months} meses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Taxa de Juros:</span>
                      <span className="text-sm">{(credit.interest_rate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valor Financiado:</span>
                      <span className="text-sm">{formatCurrency(credit.funded_amount)}</span>
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
      )}
    </div>
  )
}
