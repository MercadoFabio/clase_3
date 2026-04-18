import { clearElement, createElement } from '../utils/dom.js';
import { formatCurrency } from '../utils/formatters.js';

export function calculateSummaryMetrics(items = []) {
  const safeItems = Array.isArray(items) ? items : [];

  return safeItems.reduce(
    (summary, item) => ({
      totalInvested: summary.totalInvested + normalizeNumber(item?.investedAmount),
      totalCurrentValue: summary.totalCurrentValue + normalizeNumber(item?.currentValue),
      assetCount: summary.assetCount + 1,
    }),
    {
      totalInvested: 0,
      totalCurrentValue: 0,
      assetCount: 0,
    },
  );
}

export function renderSummary(rootElement, items = []) {
  if (!(rootElement instanceof HTMLElement)) {
    return null;
  }

  const summary = calculateSummaryMetrics(items);
  const unrealizedResult = summary.totalCurrentValue - summary.totalInvested;

  clearElement(rootElement);
  rootElement.append(
    createMetricCard({
      eyebrow: 'Capital desplegado',
      title: 'Total invertido',
      value: formatCurrency(summary.totalInvested),
      description: 'Base total comprometida en el portfolio completo.',
      variant: 'hero',
    }),
    createMetricCard({
      eyebrow: unrealizedResult >= 0 ? 'Resultado latente' : 'Presión del mercado',
      title: 'Valor actual total',
      value: formatCurrency(summary.totalCurrentValue),
      description: `${formatSignedCurrency(unrealizedResult)} frente al capital inicial.`,
      variant: unrealizedResult >= 0 ? 'positive' : 'warning',
    }),
    createMetricCard({
      eyebrow: 'Cobertura',
      title: 'Cantidad de activos',
      value: String(summary.assetCount),
      description: 'Posiciones únicas disponibles para análisis y seguimiento.',
      variant: 'neutral',
    }),
  );

  return summary;
}

function createMetricCard({ eyebrow, title, value, description, variant }) {
  return createElement('article', {
    className: `metric-card metric-card--summary metric-card--${variant}`,
    children: [
      createElement('p', { className: 'metric-card__eyebrow', text: eyebrow }),
      createElement('h3', { className: 'metric-card__title', text: title }),
      createElement('p', { className: 'metric-card__value', text: value }),
      createElement('p', { className: 'metric-card__description', text: description }),
    ],
  });
}

function normalizeNumber(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function formatSignedCurrency(value) {
  return value > 0 ? `+${formatCurrency(value)}` : formatCurrency(value);
}
