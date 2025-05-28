"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Eye } from "lucide-react"
import { toast } from "sonner"
import { investmentApi, MyInvestment } from "@/lib/api"

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-pt', {
    style: 'currency',
    currency: 'Kzs'
  }).format(value)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function getStatusBadge(status: string) {
  if (status === "active" || status === "approved") return <Badge variant="secondary">Ativo</Badge>
  if (status === "finished") return <Badge variant="default">Finalizado</Badge>
  return <Badge variant="outline">{status}</Badge>
}

export default function MyInvestmentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [investments, setInvestments] = useState<MyInvestment[]>([])

  useEffect(() => {
    fetchInvestments()
  }, [])

  const fetchInvestments = async () => {
    setIsLoading(true)
    try {
      const response = await investmentApi.getMyInvestments()
      setInvestments(response.data)
    } catch (error) {
      toast.error("Erro ao carregar seus investimentos")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Investimentos</h1>
          <p className="text-muted-foreground">Acompanhe todos os investimentos realizados por você em créditos de outros colaboradores.</p>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : investments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-8">
            Você ainda não realizou nenhum investimento.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {investments.map((inv) => (
            <Card key={inv.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{inv.credit_request.employee_name}</CardTitle>
                    <CardDescription>
                      Empresa: {inv.credit_request.company_name}
                    </CardDescription>
                  </div>
                  {getStatusBadge(inv.credit_request.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor Investido:</span>
                  <span className="text-sm font-bold">{formatCurrency(inv.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor do Crédito:</span>
                  <span className="text-sm">{formatCurrency(inv.credit_request.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prazo:</span>
                  <span className="text-sm">{inv.credit_request.term_months} meses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Juros:</span>
                  <span className="text-sm">{(inv.credit_request.interest_rate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Investido em:</span>
                  <span className="text-sm">{formatDate(inv.created_at)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Finalidade:</span>
                  <span className="text-sm">{inv.credit_request.purpose}</span>
                </div>
                <div className="flex justify-end mt-4">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
