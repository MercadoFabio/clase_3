import { clearElement, createElement } from '../utils/dom.js';
import { formatCurrency, formatPercent } from '../utils/formatters.js';

export function renderInvestmentList(rootElement, items = []) {
  if (!(rootElement instanceof HTMLElement)) {
    return { isEmpty: true, count: 0 };
  }

  const safeItems = Array.isArray(items) ? items : [];

  clearElement(rootElement);

  if (safeItems.length === 0) {
    rootElement.append(createEmptyState());
    return { isEmpty: true, count: 0 };
  }

  const fragment = document.createDocumentFragment();

  safeItems.forEach((item) => {
    fragment.append(createInvestmentCard(item));
  });

  rootElement.append(fragment);

  return {
    isEmpty: false,
    count: safeItems.length,
  };
}

function createInvestmentCard(item) {
  const performanceDelta = Number(item.currentValue) - Number(item.investedAmount);
  const isPositiveDay = Number(item.dailyChangePercent) >= 0;

  return createElement('article', {
    className: 'investment-card',
    attributes: {
      'data-investment-id': item.id,
      'aria-labelledby': `investment-title-${item.id}`,
    },
    children: [
      createElement('div', {
        className: 'investment-card__header',
        children: [
          createElement('div', {
            className: 'investment-card__title-block',
            children: [
              createElement('p', { className: 'investment-card__symbol', text: item.symbol }),
              createElement('h3', {
                className: 'investment-card__title',
                attributes: { id: `investment-title-${item.id}` },
                text: item.name,
              }),
              createElement('p', {
                className: 'investment-card__subtitle',
                text: 'Seguimiento diario y lectura táctica del activo.',
              }),
            ],
          }),
          createElement('div', {
            className: 'investment-card__chips',
            children: [
              createCategoryChip(item.category),
              createRiskChip(item.riskLevel),
            ],
          }),
        ],
      }),
      createElement('div', {
        className: 'investment-card__snapshot',
        children: [
          createElement('div', {
            className: 'investment-card__snapshot-main',
            children: [
              createElement('p', { className: 'investment-card__snapshot-label', text: 'Valor actual' }),
              createElement('p', { className: 'investment-card__snapshot-value', text: formatCurrency(item.currentValue) }),
            ],
          }),
          createElement('div', {
            className: 'investment-card__snapshot-side',
            children: [
              createElement('p', {
                className: `performance-pill performance-pill--${isPositiveDay ? 'positive' : 'negative'}`,
                text: formatPercent(item.dailyChangePercent),
              }),
              createElement('p', {
                className: 'investment-card__snapshot-note',
                text: `${formatSignedCurrency(performanceDelta)} acumulado`,
              }),
            ],
          }),
        ],
      }),
      createMetricsList(item),
      createElement('div', {
        className: 'investment-card__actions',
        children: [createFavoriteButton(item), createDetailButton(item)],
      }),
    ],
  });
}

function createMetricsList(item) {
  return createElement('dl', {
    className: 'investment-metrics',
    children: [
      createMetricRow('Monto invertido', formatCurrency(item.investedAmount)),
      createMetricRow('Valor actual', formatCurrency(item.currentValue)),
      createMetricRow('Variación diaria', formatPercent(item.dailyChangePercent), Number(item.dailyChangePercent) >= 0 ? 'positive' : 'negative'),
    ],
  });
}

function createMetricRow(label, value, tone = 'neutral') {
  return createElement('div', {
    className: 'investment-metrics__row',
    children: [
      createElement('dt', { className: 'investment-metrics__label', text: label }),
      createElement('dd', { className: `investment-metrics__value investment-metrics__value--${tone}`, text: value }),
    ],
  });
}

function createFavoriteButton(item) {
  const isFavorite = Boolean(item.favorite);
  const label = isFavorite ? `Quitar ${item.name} de favoritos` : `Marcar ${item.name} como favorito`;

  return createElement('button', {
    className: `button button--ghost ${isFavorite ? 'button--favorite-active' : ''}`.trim(),
    text: isFavorite ? '★ Favorito' : '☆ Seguir',
    attributes: {
      type: 'button',
      'data-action': 'toggle-favorite',
      'data-id': item.id,
      'aria-pressed': String(isFavorite),
      'aria-label': label,
    },
  });
}

function createDetailButton(item) {
  return createElement('button', {
    className: 'button button--primary',
    text: 'Ver detalle',
    attributes: {
      type: 'button',
      'data-action': 'open-detail',
      'data-id': item.id,
      'aria-haspopup': 'dialog',
      'aria-label': `Ver detalle de ${item.name}`,
    },
  });
}

function createCategoryChip(category) {
  return createElement('p', {
    className: 'investment-chip investment-chip--category',
    text: category,
  });
}

function createRiskChip(riskLevel) {
  const normalizedRisk = String(riskLevel ?? '').toLowerCase();

  return createElement('p', {
    className: `investment-chip investment-chip--risk investment-chip--${normalizedRisk}`,
    text: `Riesgo ${riskLevel}`,
  });
}

function createEmptyState() {
  return createElement('article', {
    className: 'placeholder-card placeholder-card--empty',
    attributes: {
      'data-empty-state': 'true',
      role: 'status',
      'aria-live': 'polite',
    },
    children: [
      createElement('p', { className: 'placeholder-card__eyebrow', text: 'Sin coincidencias' }),
      createElement('p', { className: 'placeholder-card__title', text: 'No hay resultados para los filtros actuales.' }),
      createElement('p', { className: 'placeholder-card__description', text: 'Probá limpiar la búsqueda o volver el riesgo a “Todos”.' }),
    ],
  });
}

function formatSignedCurrency(value) {
  return value > 0 ? `+${formatCurrency(value)}` : formatCurrency(value);
}
