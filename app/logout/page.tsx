"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home } from "lucide-react"
import Image from "next/image"

export default function LogoutPage() {
  useEffect(() => {
    // Limpar dados de autenticação
    if (typeof window !== "undefined") {
      localStorage.removeItem("cammaleonLogado")
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Logo CAMMALEON" width={300} height={120} className="h-24 w-auto" />
        </div>

        {/* Logout Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Logout Realizado</CardTitle>
            <CardDescription className="text-slate-600 text-lg">
              Você saiu com segurança da sua área do cliente
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center px-8 pb-8">
            <p className="text-xl text-slate-600 mb-8">Até breve! 👋</p>
            <p className="text-lg text-slate-500 mb-8">Obrigado por confiar na CAMMALEON Consultoria</p>

            <div className="space-y-3">
              <Button
                onClick={() => window.location.replace("/")}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg font-semibold shadow-xl"
              >
                <Home className="mr-2 h-5 w-5" />
                Voltar à Página Inicial
              </Button>

              <Button
                onClick={() => window.location.replace("/login")}
                variant="outline"
                className="w-full bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-50"
              >
                Fazer Login Novamente
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">🔒 Sessão encerrada com segurança</p>
        </div>
      </div>
    </div>
  )
}
