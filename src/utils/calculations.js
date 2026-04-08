export function getTotalProtein(product) {
  return (product.weightGrams * product.proteinPer100g) / 100
}

export function getProteinPerKrona(product) {
  return getTotalProtein(product) / product.price
}