// Configurações do Google Sheets
export const SHEETS_CONFIG = {
  // ✅ ID da planilha configurado
  SHEET_ID: "AIzaSyDcLjm07XlFWYsqJE4Rk6rsBbJQFfZEMxM",

  // ✅ COLE AQUI SUA API KEY DO GOOGLE CLOUD
  // Exemplo: AIzaSyC4K8B2Hq7X9Y1Z2A3B4C5D6E7F8G9H0I1
  API_KEY: AIzaSyDcLjm07XlFWYsqJE4Rk6rsBbJQFfZEMxM,

  // Nome da aba e range dos dados
  RANGE: "Sheet1!A2:G100", // Da linha 2 até 100, colunas A-G
}

// Função para validar configuração
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!SHEETS_CONFIG.SHEET_ID || SHEETS_CONFIG.SHEET_ID === "COLE_SEU_SHEET_ID_AQUI") {
    errors.push("SHEET_ID não configurado")
  }

  if (!SHEETS_CONFIG.API_KEY || SHEETS_CONFIG.API_KEY === "COLE_SUA_API_KEY_AQUI") {
    errors.push("API_KEY não configurada")
  }

  if (SHEETS_CONFIG.SHEET_ID && SHEETS_CONFIG.SHEET_ID.length < 20) {
    errors.push("SHEET_ID parece estar incorreto (muito curto)")
  }

  if (SHEETS_CONFIG.API_KEY && !SHEETS_CONFIG.API_KEY.startsWith("AIza")) {
    errors.push("API_KEY parece estar incorreta (deve começar com 'AIza')")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
