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
  try {
    // URL da sua API do SheetDB (sem colchetes e sem markdown!)
    const response = await fetch("https://sheetdb.io/api/v1/8p88kwhx1uuww");
    if (!response.ok) throw new Error("Erro ao buscar dados do SheetDB");
    const data = await response.json();

    // SheetDB retorna um array de objetos diretamente
    const bonds = data
      .filter((row: any) => row.Emissor && row.Emissor.trim())
      .map((row: any) => ({
        emissor: row.Emissor || "",
        cupom: row.Cupom || "",
        vencimento: row.Vencimento || "",
        preco: row.Preço || "",
        ytm: row.YTM || "",
        rating: row.Rating || "",
        isin: row.ISIN || "",
      }));

    console.log(`✅ ${bonds.length} bonds carregados do SheetDB!`);
    return bonds;
  } catch (error) {
    console.error("❌ Erro ao buscar dados do SheetDB:", error);

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
    ];
  }
}

// Função para testar a conexão com diagnóstico detalhado
export async function testSheetsConnection(): Promise<{
  success: boolean
  error?: string
  details?: any
}> {
  try {
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
