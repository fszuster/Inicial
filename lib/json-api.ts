export async function fetchBondsFromJSON() {
  try {
    const response = await fetch("/bonds-data.json")
    const data = await response.json()
    return data.bonds || []
  } catch (error) {
    console.error("Erro ao buscar dados do JSON:", error)
    return []
  }
}
