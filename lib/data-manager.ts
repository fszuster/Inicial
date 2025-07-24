export interface Bond {
  emissor: string
  cupom: string
  vencimento: string
  preco: string
  ytm: string
  rating: string
  isin: string
}

// Função principal que tenta várias fontes de dados
export async function fetchBonds(): Promise<{
  bonds: Bond[]
  source: "json" | "sheets" | "mock"
  error?: string
}> {
  // 1. Tentar carregar do JSON local primeiro
  try {
    console.log("🔄 Tentando carregar dados do JSON local...")
    const response = await fetch("/bonds-data.json")
    if (response.ok) {
      const data = await response.json()
      console.log("✅ Dados carregados do JSON local!")
      return {
        bonds: data.bonds || [],
        source: "json",
      }
    }
  } catch (error) {
    console.log("⚠️ JSON local não disponível:", error)
  }

  // 2. Tentar Google Sheets (se configurado)
  try {
    console.log("🔄 Tentando carregar do Google Sheets...")
    const { fetchBondsFromSheets } = await import("./sheets-api")
    const sheetsBonds = await fetchBondsFromSheets()
    if (sheetsBonds.length > 0 && !sheetsBonds[0].emissor.includes("Mock")) {
      console.log("✅ Dados carregados do Google Sheets!")
      return {
        bonds: sheetsBonds,
        source: "sheets",
      }
    }
  } catch (error) {
    console.log("⚠️ Google Sheets não disponível:", error)
  }

  // 3. Usar dados mock como fallback
  console.log("📋 Usando dados de exemplo...")
  return {
    bonds: [
      {
        emissor: "US Treasury (Exemplo)",
        cupom: "4.25%",
        vencimento: "2034-05-15",
        preco: "$98.50",
        ytm: "4.35%",
        rating: "AAA",
        isin: "US912810TM26",
      },
      {
        emissor: "Apple Inc (Exemplo)",
        cupom: "3.85%",
        vencimento: "2043-08-04",
        preco: "$95.20",
        ytm: "4.12%",
        rating: "AA+",
        isin: "US037833DK75",
      },
    ],
    source: "mock",
    error: "Usando dados de exemplo - Configure Google Sheets para dados reais",
  }
}
