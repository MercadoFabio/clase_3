const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

export function formatPercent(value) {
  const numericValue = Number(value) || 0;
  const sign = numericValue > 0 ? '+' : '';

  return `${sign}${percentFormatter.format(numericValue)}%`;
}
