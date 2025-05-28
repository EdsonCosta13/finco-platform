"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, Plus, TrendingUp } from "lucide-react"

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de COntrole</h1>
          <p className="text-muted-foreground">Gerencie seus créditos e solicitações</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédito Disponível</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 25.000</div>
            <p className="text-xs text-muted-foreground">Limite aprovado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédito Utilizado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.500</div>
            <p className="text-xs text-muted-foreground">34% do limite</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 pendente, 2 aprovadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Solicitações</CardTitle>
            <CardDescription>Histórico das suas solicitações de crédito</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Solicitação #001</p>
                  <p className="text-sm text-muted-foreground">R$ 5.000 - 15/01/2024</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aprovado</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Solicitação #002</p>
                  <p className="text-sm text-muted-foreground">R$ 3.500 - 20/01/2024</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Aprovado</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Solicitação #003</p>
                  <p className="text-sm text-muted-foreground">R$ 10.000 - 25/01/2024</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
            <CardDescription>Visão geral dos seus créditos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Limite Total:</span>
                <span className="text-sm font-medium">R$ 25.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Utilizado:</span>
                <span className="text-sm font-medium">R$ 8.500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Disponível:</span>
                <span className="text-sm font-medium text-green-600">R$ 16.500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "34%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
