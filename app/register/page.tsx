"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ArrowRight, Eye, EyeOff, Shield, CheckCircle2, UserCircle2, Building2, KeyRound } from "lucide-react"
import { Logo } from "@/components/brand/logo"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    position: "",
    salary: "",
    phone: "",
    password: "",
    invitation_code: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()

  const steps = [
    { 
      id: 1, 
      icon: UserCircle2
    },
    { 
      id: 2, 
      icon: Building2
    },
    { 
      id: 3, 
      icon: KeyRound
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/signup/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          salary: parseFloat(formData.salary)
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      const data = await response.json()
      toast.success("Registro realizado com sucesso!")
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar registro. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">Nº de Identificação</Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="0123456789LA042"
                value={formData.cpf}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium text-gray-700">Cargo</Label>
              <Input
                id="position"
                name="position"
                type="text"
                placeholder="Seu cargo atual"
                value={formData.position}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-medium text-gray-700">Salário</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.salary}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+244XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-10 pr-12 bg-white"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invitation_code" className="text-sm font-medium text-gray-700">Código de Convite</Label>
              <Input
                id="invitation_code"
                name="invitation_code"
                type="text"
                placeholder="Código de convite"
                value={formData.invitation_code}
                onChange={handleChange}
                className="h-10 bg-white"
                required
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary-600 to-primary-800 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Logo size="md" showText={false} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Finco</h1>
                    <p className="text-primary-100">Finanças para você, por você</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-primary-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Sistema Online</span>
                </div>
                <div className="w-px h-4 bg-primary-300"></div>
                <span>99.9% Uptime</span>
                <div className="w-px h-4 bg-primary-300"></div>
                <span>Suporte 24/7</span>
              </div>
              <p className="text-xs text-primary-200">© 2024 FinCo. Todos os direitos reservados. | Versão 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-[420px] space-y-6">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Logo size="lg" />
            </div>

            {/* Registration Form */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Criar Conta</h1>
                <p className="text-gray-600">Preencha seus dados para criar sua conta</p>
              </div>

              {/* Steps Progress */}
              <div className="px-2">
                <div className="flex items-center justify-between relative">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center justify-center relative z-10 flex-1">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        currentStep >= step.id 
                          ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                          : 'border-gray-200 bg-white text-gray-400'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-[24px] left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-gray-200">
                          <div 
                            className={`h-full bg-primary-600 transition-all duration-300 ${
                              currentStep > step.id ? 'w-full' : 'w-0'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {renderStepContent()}
                </div>

                <div className="flex justify-between pt-2">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="px-6 h-10 border-gray-200 hover:bg-gray-50"
                    >
                      Voltar
                    </Button>
                  )}
                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-6 h-10 bg-primary-600 hover:bg-primary-700 shadow-sm"
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto px-6 h-10 bg-primary-600 hover:bg-primary-700 shadow-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Registrando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Criar Conta</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Security Notice */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-primary-600" />
                <span>Conexão segura SSL/TLS</span>
              </div>
              <p className="text-xs text-gray-500">Seus dados são protegidos por criptografia de nível bancário</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
