"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { Logo } from "@/components/brand/logo"
import { toast } from "sonner"
import { Shield, Lock, Eye, EyeOff, ArrowRight, CheckCircle, User, Users, UserCog } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authApi } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [activeTab, setActiveTab] = useState("colaborador")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login(email, password, activeTab as "colaborador" | "gestor")
      toast.success("Login realizado com sucesso!")

      // Redirecionar baseado no role do usuário
      if (activeTab === "admin") {
        router.push("/admin")
      } else if (activeTab === "gestor") {
        router.push("/manager")
      } else {
        router.push("/employee")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao realizar login. Verifique suas credenciais.")
    }
  }

  const handleQuickLogin = async (role: "admin" | "manager" | "employee") => {
    const emails = {
      admin: "admin@empresa.com",
      manager: "manager@empresa.com",
      employee: "funcionario@empresa.com",
    }

    try {
      await login(emails[role], "123456", role === "manager" ? "gestor" : "colaborador")
      toast.success("Login realizado com sucesso!")
      router.push(`/${role}`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao realizar login de demonstração.")
    }
  }

  const features = [
    {
      icon: Shield,
      title: "Segurança Bancária",
      description: "Criptografia de nível bancário e autenticação multifator para máxima proteção dos seus dados.",
    },
    {
      icon: CheckCircle,
      title: "Conformidade Regulatória",
      description: "Totalmente aderente às normas do Banco Central e regulamentações financeiras vigentes.",
    },
    {
      icon: Lock,
      title: "Auditoria Completa",
      description: "Rastreabilidade total de todas as operações com logs de auditoria em tempo real.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding & Features */}
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
                    <h1 className="text-3xl font-bold">FinCo</h1>
                    <p className="text-primary-100">Crédito Colaborativo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                    Gestão Financeira
                    <br />
                    <span className="text-primary-200">Inteligente</span>
                  </h2>
                  <p className="text-xl text-primary-100 max-w-md">
                    Plataforma corporativa para gestão de crédito colaborativo com segurança e eficiência empresarial.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg flex-shrink-0">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-primary-100 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
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

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <Logo size="lg" />
            </div>

            {/* Login Card */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-2 text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Acesso Seguro</CardTitle>
                <CardDescription className="text-gray-600">Entre com suas credenciais corporativas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="colaborador" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="colaborador" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Colaborador
                    </TabsTrigger>
                    <TabsTrigger value="gestor" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Gestor
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      Admin
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="colaborador">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Corporativo
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="colaborador@empresa.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900 placeholder:text-gray-400"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900 placeholder:text-gray-400 pr-12"
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

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-600">Manter conectado</span>
                        </label>
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                          Esqueceu a senha?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Autenticando...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Entrar como Colaborador</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="gestor">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Corporativo
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="gestor@empresa.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900 placeholder:text-gray-400"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900 placeholder:text-gray-400 pr-12"
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

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-600">Manter conectado</span>
                        </label>
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                          Esqueceu a senha?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Autenticando...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Entrar como Gestor</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="admin">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Corporativo
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@empresa.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900 placeholder:text-gray-400"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Senha
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900 placeholder:text-gray-400 pr-12"
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

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-600">Manter conectado</span>
                        </label>
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                          Esqueceu a senha?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Autenticando...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Entrar como Admin</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Demo Access */}
                <div className="pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => setShowDemo(!showDemo)}
                    className="w-full text-sm text-gray-600 hover:text-gray-900"
                  >
                    {showDemo ? "Ocultar" : "Mostrar"} Acesso de Demonstração
                  </Button>

                  {showDemo && (
                    <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 text-center mb-3">Para fins de demonstração e avaliação</p>
                      <div className="grid gap-2">
                        <Button
                          onClick={() => handleQuickLogin("admin")}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs"
                          disabled={isLoading}
                        >
                          <Shield className="mr-2 h-3 w-3" />
                          Administrador do Sistema
                        </Button>
                        <Button
                          onClick={() => handleQuickLogin("manager")}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs"
                          disabled={isLoading}
                        >
                          <CheckCircle className="mr-2 h-3 w-3" />
                          Gerente de Equipe
                        </Button>
                        <Button
                          onClick={() => handleQuickLogin("employee")}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs"
                          disabled={isLoading}
                        >
                          <Lock className="mr-2 h-3 w-3" />
                          Funcionário
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

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
