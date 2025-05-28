"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { investmentApi, AvailableInvestment } from "@/lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface InvestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: AvailableInvestment | null;
  onSuccess?: () => void;
}

export function InvestModal({ open, onOpenChange, opportunity, onSuccess }: InvestModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!opportunity) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await investmentApi.createInvestment({
        credit_request_id: opportunity.id,
        amount: parseFloat(amount)
      })
      toast.success("Investimento realizado com sucesso!")
      onOpenChange(false)
      setAmount("")
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao realizar investimento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Investir em Crédito</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Colaborador</Label>
            <div className="text-sm font-medium">{opportunity.employee_name}</div>
          </div>
          <div>
            <Label>Empresa</Label>
            <div className="text-sm">{opportunity.company_name}</div>
          </div>
          <div>
            <Label>Disponível para investir</Label>
            <div className="text-sm font-bold">{opportunity.remaining_amount.toLocaleString("pt-PT", { style: "currency", currency: "Kzs" })}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor a investir</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              max={opportunity.remaining_amount}
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > opportunity.remaining_amount}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Investindo...
                </>
              ) : (
                "Investir"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 