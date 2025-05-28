"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Loader2, CheckCircle, XCircle } from "lucide-react"
import { managerApi, ManagerCreditRequestResponse } from "@/lib/api"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ManagerCreditPage() {
  const [credits, setCredits] = useState<ManagerCreditRequestResponse["data"]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending")

  const fetchCredits = async (status: string) => {
    setIsLoading(true)
    try {
      const response = await managerApi.getCreditRequests(status)
      setCredits(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao carregar solicitações de crédito")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCredits(activeTab)
  }, [activeTab])

  const handleStatusUpdate = async (requestId: number, status: 'approved' | 'rejected') => {
    try {
      await managerApi.updateCreditRequestStatus(requestId, status)
      toast.success(`Solicitação ${status === 'approved' ? 'aprovada' : 'rejeitada'} com sucesso!`)
      fetchCredits(activeTab)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao atualizar status da solicitação")
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-pt', {
      style: 'currency',
      currency: 'Kzs'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-pt', {
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
          <h1 className="text-3xl font-bold tracking-tight">Solicitações de Crédito</h1>
          <p className="text-muted-foreground">Gerencie as solicitações de crédito dos funcionários</p>
        </div>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
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
                        <CardDescription>
                          Solicitado por {credit.employee_name} - {credit.company_name}
                        </CardDescription>
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
                          {credit.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusUpdate(credit.id, 'approved')}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Aprovar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleStatusUpdate(credit.id, 'rejected')}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Rejeitar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">Finalidade:</p>
                      <p className="text-sm mt-1">{credit.purpose}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 