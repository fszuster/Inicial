"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const senhas = ["0102", "0103", "0104"]

    if (username.trim() === "cliente" && senhas.includes(password.trim())) {
      if (typeof window !== "undefined") {
        localStorage.setItem("cammaleonLogado", "sim")
        // Usar router.push ao invés de window.location
        window.location.replace("/dashboard")
      }
    } else {
      setError("Usuário ou senha incorretos.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => window.location.replace("/")}
            className="inline-flex items-center text-slate-600 hover:text-green-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao site
          </button>

          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="Logo CAMMALEON" width={450} height={180} className="h-40 w-auto" priority />
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Área Restrita</CardTitle>
            <CardDescription className="text-slate-600 text-lg">
              Acesse sua área do cliente para acompanhar seus investimentos
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="username" className="text-slate-700 font-semibold text-lg">
                  Usuário
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-700 font-semibold text-lg">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-300">
                  <AlertDescription className="text-lg">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-xl font-semibold shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar na Área do Cliente"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500">
                Problemas para acessar?{" "}
                <a href="mailto:suporte@cammaleon.com" className="text-green-600 hover:text-green-700 font-semibold">
                  Entre em contato
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-slate-500">🔒 Conexão segura e criptografada</p>
        </div>
      </div>
    </div>
  )
}
