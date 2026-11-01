export function discountedPrice(price, discountPercentage) {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100
}

export function discountBadge(discountPercentage) {
  return `-${Math.round(discountPercentage)}%`
}

export function stockLabel(stock) {
  if (stock <= 0) return 'Out of stock'
  if (stock <= 5) return 'Low stock'
  return 'In stock'
}
