"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrencyDisplay } from "@/components/ui/currency-display"
import { Users, CreditCard, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Visão geral completa do sistema de crédito colaborativo</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Usuários</CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +20.1% em relação ao mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Créditos Ativos</CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <CreditCard className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <CurrencyDisplay value={2350000} size="lg" variant="success" />
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +180.1% em relação ao mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Aprovação</CardTitle>
            <div className="bg-primary-100 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">89.2%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +19% em relação ao mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendências</CardTitle>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2 em relação ao dia anterior
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 financial-card">
          <CardHeader>
            <CardTitle className="text-gray-900">Visão Geral Financeira</CardTitle>
            <CardDescription>Evolução dos créditos nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="text-center space-y-2">
                <TrendingUp className="h-12 w-12 text-primary-600 mx-auto" />
                <p className="text-primary-700 font-medium">Gráfico de Evolução Financeira</p>
                <p className="text-sm text-primary-600">Dados em tempo real</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 financial-card">
          <CardHeader>
            <CardTitle className="text-gray-900">Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Novo usuário registrado</p>
                  <p className="text-xs text-gray-600">João Silva - Funcionário</p>
                  <p className="text-xs text-gray-500">há 2 minutos</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Crédito aprovado</p>
                  <p className="text-xs text-gray-600">
                    <CurrencyDisplay value={15000} size="sm" /> - Maria Santos
                  </p>
                  <p className="text-xs text-gray-500">há 15 minutos</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-900">Solicitação pendente</p>
                  <p className="text-xs text-gray-600">
                    <CurrencyDisplay value={8000} size="sm" /> - Pedro Costa
                  </p>
                  <p className="text-xs text-gray-500">há 1 hora</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
