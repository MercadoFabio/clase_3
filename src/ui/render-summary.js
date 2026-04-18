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

  clearElement(rootElement);
  rootElement.append(
    createMetricCard('Total invertido', formatCurrency(summary.totalInvested), 'Calculado sobre todas las inversiones cargadas.'),
    createMetricCard('Valor actual total', formatCurrency(summary.totalCurrentValue), 'Útil para comparar contra el capital originalmente invertido.'),
    createMetricCard('Cantidad de activos', String(summary.assetCount), 'Cuenta posiciones únicas del dataset completo.'),
  );

  return summary;
}

function createMetricCard(title, value, description) {
  return createElement('article', {
    className: 'metric-card',
    children: [
      createElement('h3', { text: title }),
      createElement('p', { text: value }),
      createElement('p', { text: description }),
    ],
  });
}

function normalizeNumber(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}
