"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { invitationApi } from "@/lib/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface InviteEmployeeModalProps {
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteEmployeeModal({ onSuccess, open, onOpenChange }: InviteEmployeeModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {

      const profile = await invitationApi.getProfile()

      console.log("profile", profile)
      const company_id = profile.data.user.company_id
      console.log("company_id", company_id)
  
      await invitationApi.inviteEmployee({ email, company_id })
      toast.success("Convite enviado com sucesso!")
      onOpenChange(false)
      setEmail("")
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao enviar convite. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Convidar Colaborador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email do Colaborador</Label>
            <Input
              id="email"
              type="email"
              placeholder="colaborador@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Convite"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 