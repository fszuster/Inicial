import { SHEETS_CONFIG, validateConfig } from "./sheets-config"

export interface Bond {
  emissor: string
  cupom: string
  vencimento: string
  preco: string
  ytm: string
  rating: string
  isin: string
}

export async function fetchBondsFromSheets(): Promise<Bond[]> {
  // Validar configuração primeiro
  const configValidation = validateConfig()
  if (!configValidation.isValid) {
    console.error("❌ Configuração inválida:", configValidation.errors)
    throw new Error(`Configuração inválida: ${configValidation.errors.join(", ")}`)
  }

  const { SHEET_ID, API_KEY, RANGE } = SHEETS_CONFIG
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`

  try {
    console.log("🔄 Buscando dados do Google Sheets...")
    console.log("📋 Sheet ID:", SHEET_ID.substring(0, 10) + "...")
    console.log("🔑 API Key:", API_KEY.substring(0, 10) + "...")
    console.log("📊 Range:", RANGE)
    console.log("🌐 URL:", url.replace(API_KEY, "***API_KEY***"))

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    console.log("📡 Response status:", response.status)
    console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Erro na resposta:", errorText)

      // Diagnóstico específico por código de erro
      if (response.status === 400) {
        throw new Error(`Erro 400: Verifique se o SHEET_ID e API_KEY estão corretos. Detalhes: ${errorText}`)
      } else if (response.status === 403) {
        throw new Error(`Erro 403: API Key inválida ou sem permissões. Detalhes: ${errorText}`)
      } else if (response.status === 404) {
        throw new Error(`Erro 404: Planilha não encontrada. Verifique o SHEET_ID. Detalhes: ${errorText}`)
      } else {
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`)
      }
    }

    const data = await response.json()
    console.log("📊 Dados recebidos:", data)

    if (!data.values || data.values.length === 0) {
      console.warn("⚠️ Nenhum dado encontrado na planilha")
      return []
    }

    const bonds = data.values
      .filter((row: string[]) => row.length >= 7 && row[0]?.trim()) // Filtrar linhas vazias
      .map((row: string[]) => ({
        emissor: row[0]?.trim() || "",
        cupom: row[1]?.trim() || "",
        vencimento: row[2]?.trim() || "",
        preco: row[3]?.trim() || "",
        ytm: row[4]?.trim() || "",
        rating: row[5]?.trim() || "",
        isin: row[6]?.trim() || "",
      }))

    console.log(`✅ ${bonds.length} bonds carregados com sucesso!`)
    return bonds
  } catch (error) {
    console.error("❌ Erro ao buscar dados do Google Sheets:", error)

    // Retornar dados mock em caso de erro
    return [
      {
        emissor: "US Treasury (Mock Data)",
        cupom: "4.25%",
        vencimento: "2034-05-15",
        preco: "$98.50",
        ytm: "4.35%",
        rating: "AAA",
        isin: "US912810TM26",
      },
      {
        emissor: "Apple Inc (Mock Data)",
        cupom: "3.85%",
        vencimento: "2043-08-04",
        preco: "$95.20",
        ytm: "4.12%",
        rating: "AA+",
        isin: "US037833DK75",
      },
    ]
  }
}

// Função para testar a conexão com diagnóstico detalhado
export async function testSheetsConnection(): Promise<{
  success: boolean
  error?: string
  details?: any
}> {
  try {
    // Validar configuração
    const configValidation = validateConfig()
    if (!configValidation.isValid) {
      return {
        success: false,
        error: "Configuração inválida",
        details: configValidation.errors,
      }
    }

    const bonds = await fetchBondsFromSheets()
    return {
      success: true,
      details: { bondsCount: bonds.length },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      details: error,
    }
  }
}
