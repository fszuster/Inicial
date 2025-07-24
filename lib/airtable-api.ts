export async function fetchBondsFromAirtable() {
  const BASE_ID = "SEU_BASE_ID"
  const TABLE_NAME = "Bonds"
  const API_KEY = "SUA_AIRTABLE_API_KEY"

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    const data = await response.json()

    return (
      data.records?.map((record: any) => ({
        emissor: record.fields.Emissor || "",
        cupom: record.fields.Cupom || "",
        vencimento: record.fields.Vencimento || "",
        preco: record.fields.Preco || "",
        ytm: record.fields.YTM || "",
        rating: record.fields.Rating || "",
        isin: record.fields.ISIN || "",
      })) || []
    )
  } catch (error) {
    console.error("Erro ao buscar dados do Airtable:", error)
    return []
  }
}
