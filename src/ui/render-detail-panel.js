import { clearElement, createElement } from '../utils/dom.js';
import { formatCurrency, formatPercent } from '../utils/formatters.js';

export function renderDetailPanel(rootElement, options = {}) {
  if (!(rootElement instanceof HTMLElement)) {
    return null;
  }

  clearDetailPanel(rootElement);

  const item = options.item ?? null;

  if (!item) {
    return null;
  }

  const titleId = `detail-title-${item.id}`;
  const descriptionId = `detail-description-${item.id}`;
  const closeButton = createCloseButton();
  const overlay = createElement('div', {
    className: 'modal-overlay',
    attributes: {
      'data-dialog-overlay': 'true',
    },
    children: [
      createElement('section', {
        className: 'modal-surface',
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
          'aria-labelledby': titleId,
          'aria-describedby': descriptionId,
          tabindex: '-1',
        },
        children: [
          createElement('div', {
            className: 'field-group',
            children: [
              createElement('p', { text: `${item.category} · Riesgo ${item.riskLevel}` }),
              createElement('h2', {
                attributes: { id: titleId },
                text: `${item.name} (${item.symbol})`,
              }),
              createElement('p', {
                attributes: { id: descriptionId },
                text: item.description,
              }),
            ],
          }),
          createMetricsSection(item),
          createFavoriteButton(item),
          closeButton,
        ],
      }),
    ],
  });

  rootElement.removeAttribute('hidden');
  rootElement.append(overlay);

  const dialog = overlay.querySelector('[role="dialog"]');

  if (dialog instanceof HTMLElement) {
    dialog.focus();
  }

  return {
    overlay,
    dialog: dialog instanceof HTMLElement ? dialog : null,
    triggerElement: options.triggerElement ?? null,
  };
}

export function clearDetailPanel(rootElement, options = {}) {
  if (!(rootElement instanceof HTMLElement)) {
    return null;
  }

  clearElement(rootElement);
  rootElement.setAttribute('hidden', 'hidden');

  const triggerElement = options.returnFocusTo ?? null;

  if (triggerElement instanceof HTMLElement) {
    triggerElement.focus();
  }

  return null;
}

function createMetricsSection(item) {
  return createElement('div', {
    className: 'field-group',
    children: [
      createMetricBlock('Monto invertido', formatCurrency(item.investedAmount)),
      createMetricBlock('Valor actual', formatCurrency(item.currentValue)),
      createMetricBlock('Variación diaria', formatPercent(item.dailyChangePercent)),
    ],
  });
}

function createMetricBlock(label, value) {
  return createElement('article', {
    className: 'metric-card',
    children: [createElement('h3', { text: label }), createElement('p', { text: value })],
  });
}

function createFavoriteButton(item) {
  const isFavorite = Boolean(item.favorite);

  return createElement('button', {
    text: isFavorite ? '★ Quitar de favoritos' : '☆ Marcar como favorito',
    attributes: {
      type: 'button',
      'data-action': 'toggle-favorite',
      'data-id': item.id,
      'aria-pressed': String(isFavorite),
      'aria-label': isFavorite
        ? `Quitar ${item.name} de favoritos`
        : `Marcar ${item.name} como favorito`,
    },
  });
}

function createCloseButton() {
  return createElement('button', {
    text: 'Cerrar detalle',
    attributes: {
      type: 'button',
      'data-action': 'close-detail',
      'aria-label': 'Cerrar detalle de la inversión',
    },
  });
}
