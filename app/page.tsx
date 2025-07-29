"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Shield, TrendingUp, Building2, Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const services = [
    {
      icon: Globe,
      title: "Alocação Global",
      description:
        "Montamos carteiras com ativos internacionais, proteção cambial e estratégia geográfica diversificada.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      title: "Proteção Patrimonial",
      description:
        "Estruturas jurídicas seguras para preservar bens em cenários adversos, sucessão e blindagem judicial.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Inteligência Tributária",
      description:
        "Diagnóstico fiscal e soluções para redução legal de encargos, otimização de dividendos e compliance.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Building2,
      title: "Estratégia para Empresas",
      description:
        "Consultoria financeira para operações corporativas, expansão internacional e compliance regulatório.",
      gradient: "from-blue-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            {/* Logo Centralizado */}
            <div className="flex justify-center w-full md:w-auto mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Logo CAMMALEON"
                width={500}
                height={200}
                className="h-32 md:h-36 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#servicos" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Serviços
              </a>
              <a href="#sobre" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Sobre
              </a>
              <a href="#contato" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Contato
              </a>
              <Button
                onClick={() => (window.location.href = "/login")}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg"
              >
                Acesso ao Painel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden absolute top-6 right-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-green-200">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#servicos"
                  className="text-slate-700 hover:text-green-600 transition-colors font-medium text-center"
                >
                  Serviços
                </a>
                <a
                  href="#sobre"
                  className="text-slate-700 hover:text-green-600 transition-colors font-medium text-center"
                >
                  Sobre
                </a>
                <a
                  href="#contato"
                  className="text-slate-700 hover:text-green-600 transition-colors font-medium text-center"
                >
                  Contato
                </a>
                <Button
                  onClick={() => (window.location.href = "/login")}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Acesso ao Painel
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Consultoria de
              <span className="text-slate-700"> Inteligência Patrimonial</span>
            </h1>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Somos uma consultoria de inteligência patrimonial e estratégica que une proteção jurídica, alocação
              internacional e soluções fiscais para quem quer crescer com segurança.
            </p>
            <p className="text-lg text-slate-600 mb-10">
              Atendemos indivíduos, famílias e empresas que desejam blindar, rentabilizar e expandir seu capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => (window.location.href = "/login")}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4 shadow-xl"
              >
                Acessar Área do Cliente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
              >
                Falar com Consultor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Soluções completas para proteção, crescimento e otimização do seu patrimônio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-3"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Proteger e Expandir seu Patrimônio?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Entre em contato conosco e descubra como podemos ajudar você a alcançar seus objetivos financeiros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3 bg-white text-green-700 hover:bg-green-50"
            >
              Agendar Consulta Gratuita
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "/login")}
              className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              Área do Cliente
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col items-center md:items-start mb-6">
                <Image src="/logo.png" alt="Logo CAMMALEON" width={300} height={120} className="h-16 w-auto mb-4" />
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold">CAMMALEON</h3>
                  <p className="text-slate-400">Consultoria Estratégica</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-md text-center md:text-left">
                Consultoria de inteligência patrimonial e estratégica para proteção, crescimento e otimização do seu
                capital.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4 text-green-400">Serviços</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Alocação Global</li>
                <li>Proteção Patrimonial</li>
                <li>Inteligência Tributária</li>
                <li>Estratégia Empresarial</li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-4 text-green-400">Contato</h4>
              <ul className="space-y-2 text-slate-400">
                <li>contato@cammaleon.com</li>
                <li>+55 (11) 99823-2260</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 CAMMALEON Consultoria Estratégica • Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
