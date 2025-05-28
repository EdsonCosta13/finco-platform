"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function EmployeeRequestPage() {
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [description, setDescription] = useState("")
  const [urgency, setUrgency] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de envio da solicitação
    console.log({ amount, purpose, description, urgency })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nova Solicitação de Crédito</h1>
        <p className="text-muted-foreground">Preencha os dados para solicitar um crédito</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Solicitação</CardTitle>
              <CardDescription>Preencha todas as informações necessárias</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor Solicitado (Kzs)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Finalidade</Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a finalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Compra de Equipamentos</SelectItem>
                      <SelectItem value="training">Curso/Capacitação</SelectItem>
                      <SelectItem value="travel">Viagem de Negócios</SelectItem>
                      <SelectItem value="emergency">Emergência</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Prioridade</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Detalhada</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o motivo da solicitação..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Enviar Solicitação
                  </Button>
                  <Button type="button" variant="outline">
                    Salvar Rascunho
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Seu Limite de Crédito</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Limite Total:</span>
                  <span className="text-sm font-medium">Kzs 25.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Utilizado:</span>
                  <span className="text-sm font-medium">Kzs 8.500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Disponível:</span>
                  <span className="text-sm font-medium text-green-600">Kzs 16.500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "34%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Dicas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Seja específico na descrição</li>
                <li>• Anexe documentos se necessário</li>
                <li>• Solicitações urgentes são priorizadas</li>
                <li>• O prazo de análise é de 2-3 dias úteis</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
