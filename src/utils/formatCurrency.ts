const currency = 'MYSTT'

export default function formatCurrency(amount: number) {
  const val = (amount / 1_000_000).toFixed(3)
  return `${val} ${currency}`
}
