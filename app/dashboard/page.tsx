"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Download,
  LogOut,
  TrendingUp,
  DollarSign,
  Shield,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  FileText,
} from "lucide-react"
import Image from "next/image"
import { fetchBonds, type Bond } from "@/lib/data-manager"

export default function DashboardPage() {
  const [bonds, setBonds] = useState<Bond[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [dataSource, setDataSource] = useState<"json" | "sheets" | "mock">("mock")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    // Verificar autenticação
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("cammaleonLogado")
      if (isLoggedIn !== "sim") {
        alert("Acesso restrito. Faça login primeiro.")
        window.location.replace("/login")
        return
      }
    }

    // Carregar dados
    const loadBonds = async () => {
      setIsLoading(true)

      try {
        const result = await fetchBonds()
        setBonds(result.bonds)
        setDataSource(result.source)
        setError(result.error || "")
        console.log(`✅ ${result.bonds.length} bonds carregados da fonte: ${result.source}`)
      } catch (error) {
        console.error("❌ Erro ao carregar bonds:", error)
        setError("Erro ao carregar dados")
        setBonds([])
      }

      setLastUpdate(new Date())
      setIsLoading(false)
    }

    loadBonds()

    // Atualizar dados a cada 5 minutos
    const interval = setInterval(loadBonds, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cammaleonLogado")
      window.location.replace("/logout")
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const result = await fetchBonds()
      setBonds(result.bonds)
      setDataSource(result.source)
      setError(result.error || "")
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Erro ao atualizar:", error)
    }
    setIsLoading(false)
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "AAA":
        return "bg-green-100 text-green-800 border-green-300"
      case "AA+":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "AA":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getSourceInfo = () => {
    switch (dataSource) {
      case "json":
        return {
          icon: <FileText className="h-4 w-4 text-blue-600" />,
          text: "Dados carregados do arquivo JSON local",
          color: "border-blue-300 bg-blue-50 text-blue-800",
        }
      case "sheets":
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
          text: "Dados atualizados mensalmente",
          color: "border-green-300 bg-green-50 text-green-800",
        }
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
          text: "Usando dados de exemplo - Configure uma fonte de dados real",
          color: "border-yellow-300 bg-yellow-50 text-yellow-800",
        }
    }
  }

  if (isLoading && bonds.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-slate-600 text-xl">Carregando sua área do cliente...</p>
          <p className="text-slate-500 text-sm mt-2">Buscando dados...</p>
        </div>
      </div>
    )
  }

  const sourceInfo = getSourceInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <Image src="/logo.png" alt="Logo CAMMALEON" width={350} height={140} className="h-24 w-auto mb-2" />
              <p className="text-lg text-slate-600 font-medium">Área do Cliente</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={refreshData}
                variant="outline"
                size="lg"
                disabled={isLoading}
                className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                size="lg"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bem-vindo à Área do Cliente</h1>
          <p className="text-xl text-slate-600">
            Acompanhe seus investimentos e acesse informações atualizadas da sua carteira
          </p>
        </div>

        {/* Data Source Status */}
        <div className="mb-6">
          <Alert className={sourceInfo.color}>
            {sourceInfo.icon}
            <AlertDescription>✅ {sourceInfo.text}</AlertDescription>
          </Alert>
          {error && (
            <Alert className="border-red-300 bg-red-50 mt-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-green-100">Valor Total da Carteira</CardTitle>
              <DollarSign className="h-6 w-6 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$350,000</div>
              <p className="text-sm text-green-100">+2.5% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-yellow-100">Rendimento Médio</CardTitle>
              <TrendingUp className="h-6 w-6 text-yellow-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.23%</div>
              <p className="text-sm text-yellow-100">Yield to Maturity médio</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-blue-100">Rating Médio</CardTitle>
              <Shield className="h-6 w-6 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">AA+</div>
              <p className="text-sm text-blue-100">Excelente qualidade de crédito</p>
            </CardContent>
          </Card>
        </div>

        {/* Download Section */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">📄 Documentos</CardTitle>
            <CardDescription className="text-lg">
              Acesse sua proposta personalizada e relatórios detalhados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-6 py-3 shadow-lg">
              <Download className="h-5 w-5 mr-2" />
              Baixar Proposta PDF
            </Button>
          </CardContent>
        </Card>

        {/* Bonds Table */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
  <CardDescription className="text-lg">
    Última atualização: {lastUpdate.toLocaleString("pt-BR")}
  </CardDescription>
</div>
              {isLoading && <RefreshCw className="h-6 w-6 animate-spin text-green-600" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-green-50 to-purple-50">
                    <TableHead className="font-bold text-slate-800">Emissor</TableHead>
                    <TableHead className="font-bold text-slate-800">Cupom</TableHead>
                    <TableHead className="font-bold text-slate-800">Vencimento</TableHead>
                    <TableHead className="font-bold text-slate-800">Preço</TableHead>
                    <TableHead className="font-bold text-slate-800">YTM</TableHead>
                    <TableHead className="font-bold text-slate-800">Rating</TableHead>
                    <TableHead className="font-bold text-slate-800">ISIN</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bonds.length > 0 ? (
                    bonds.map((bond, index) => (
                      <TableRow key={index} className="hover:bg-green-50 transition-colors">
                        <TableCell className="font-semibold text-slate-900">{bond.emissor}</TableCell>
                        <TableCell className="font-medium">{bond.cupom}</TableCell>
                        <TableCell>
                          {bond.vencimento ? new Date(bond.vencimento).toLocaleDateString("pt-BR") : "-"}
                        </TableCell>
                        <TableCell className="font-medium">{bond.preco}</TableCell>
                        <TableCell className="text-green-600 font-bold">{bond.ytm}</TableCell>
                        <TableCell>
                          <Badge className={`${getRatingColor(bond.rating)} font-semibold border`}>{bond.rating}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{bond.isin}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        Nenhum bond encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
