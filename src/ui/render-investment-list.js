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
  return createElement('article', {
    className: 'metric-card',
    attributes: {
      'data-investment-id': item.id,
      'aria-labelledby': `investment-title-${item.id}`,
    },
    children: [
      createElement('div', {
        children: [
          createElement('h3', {
            attributes: { id: `investment-title-${item.id}` },
            text: `${item.name} (${item.symbol})`,
          }),
          createElement('p', { text: `${item.category} · Riesgo ${item.riskLevel}` }),
        ],
      }),
      createMetricsList(item),
      createElement('div', {
        className: 'field-group',
        children: [createFavoriteButton(item), createDetailButton(item)],
      }),
    ],
  });
}

function createMetricsList(item) {
  return createElement('dl', {
    children: [
      createMetricRow('Monto invertido', formatCurrency(item.investedAmount)),
      createMetricRow('Valor actual', formatCurrency(item.currentValue)),
      createMetricRow('Variación diaria', formatPercent(item.dailyChangePercent)),
    ],
  });
}

function createMetricRow(label, value) {
  return createElement('div', {
    children: [createElement('dt', { text: label }), createElement('dd', { text: value })],
  });
}

function createFavoriteButton(item) {
  const isFavorite = Boolean(item.favorite);
  const label = isFavorite ? `Quitar ${item.name} de favoritos` : `Marcar ${item.name} como favorito`;

  return createElement('button', {
    text: isFavorite ? '★ Favorito' : '☆ Favorito',
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

function createEmptyState() {
  return createElement('article', {
    className: 'placeholder-card',
    attributes: {
      'data-empty-state': 'true',
      role: 'status',
      'aria-live': 'polite',
    },
    children: [
      createElement('p', { text: 'No hay resultados para los filtros actuales.' }),
      createElement('p', { text: 'Probá limpiar la búsqueda o volver el riesgo a “Todos”.' }),
    ],
  });
}
