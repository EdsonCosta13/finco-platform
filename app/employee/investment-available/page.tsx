"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp } from "lucide-react"
import { investmentApi, AvailableInvestment } from "@/lib/api"
import { toast } from "sonner"
import { InvestModal } from "@/components/employee/invest-modal"

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

export default function InvestmentAvailablePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<AvailableInvestment[]>([])
  const [selectedOpportunity, setSelectedOpportunity] = useState<AvailableInvestment | null>(null)
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    setIsLoading(true)
    try {
      const response = await investmentApi.getAvailableInvestments()
      setOpportunities(response.data)
    } catch (error) {
      toast.error("Erro ao carregar oportunidades de investimento")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Oportunidades de Investimento</h1>
          <p className="text-muted-foreground">Invista em créditos de outros colaboradores e obtenha retorno financeiro.</p>
        </div>
      </div>
      <InvestModal
        open={isInvestModalOpen}
        onOpenChange={setIsInvestModalOpen}
        opportunity={selectedOpportunity}
        onSuccess={fetchOpportunities}
      />
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : opportunities.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-8">
            Nenhuma oportunidade de investimento disponível no momento.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((op) => (
            <Card key={op.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{op.employee_name}</CardTitle>
                    <CardDescription>
                      Empresa: {op.company_name}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Aberto</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="text-sm font-bold">{formatCurrency(op.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prazo:</span>
                  <span className="text-sm">{op.term_months} meses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Juros:</span>
                  <span className="text-sm">{(op.interest_rate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Solicitado em:</span>
                  <span className="text-sm">{formatDate(op.created_at)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Finalidade:</span>
                  <span className="text-sm">{op.purpose}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Disponível para investir:</span>
                  <span className="text-sm font-bold">{formatCurrency(op.remaining_amount)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Já investido:</span>
                  <span className="text-sm">{formatCurrency(op.invested_amount)} ({(op.investment_percentage * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={() => {
                      setSelectedOpportunity(op)
                      setIsInvestModalOpen(true)
                    }}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Investir
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