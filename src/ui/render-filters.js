import { createElement } from '../utils/dom.js';

const DEFAULT_FILTERS = Object.freeze({
  query: '',
  risk: 'Todos',
  sortBy: 'investedAmount',
});

const VALID_RISK_OPTIONS = new Set(['Todos', 'Bajo', 'Medio', 'Alto']);
const VALID_SORT_OPTIONS = new Set(['investedAmount', 'dailyChangePercent']);

export function getFilterElements(formElement) {
  if (!(formElement instanceof HTMLFormElement)) {
    return null;
  }

  return {
    form: formElement,
    queryInput: formElement.elements.namedItem('query'),
    riskSelect: formElement.elements.namedItem('risk'),
    sortSelect: formElement.elements.namedItem('sortBy'),
  };
}

export function normalizeFilters(filters = {}) {
  const query = String(filters.query ?? DEFAULT_FILTERS.query).trim();
  const risk = String(filters.risk ?? DEFAULT_FILTERS.risk).trim();
  const sortBy = String(filters.sortBy ?? DEFAULT_FILTERS.sortBy).trim();

  return {
    query,
    risk: VALID_RISK_OPTIONS.has(risk) ? risk : DEFAULT_FILTERS.risk,
    sortBy: VALID_SORT_OPTIONS.has(sortBy) ? sortBy : DEFAULT_FILTERS.sortBy,
  };
}

export function readFiltersFromForm(formElement) {
  const elements = getFilterElements(formElement);

  if (!elements) {
    return { ...DEFAULT_FILTERS };
  }

  return normalizeFilters({
    query: elements.queryInput?.value,
    risk: elements.riskSelect?.value,
    sortBy: elements.sortSelect?.value,
  });
}

export function renderFilters(formElement, filters = {}) {
  const elements = getFilterElements(formElement);

  if (!elements) {
    return null;
  }

  const normalizedFilters = normalizeFilters(filters);

  syncFilterValues(elements, normalizedFilters);
  syncAccessibleHints(elements);
  syncSortOptionLabels(elements.sortSelect);

  return {
    ...elements,
    values: normalizedFilters,
  };
}

export function syncFilterValues(elementsOrForm, filters = {}) {
  const elements = resolveFilterElements(elementsOrForm);

  if (!elements) {
    return null;
  }

  const normalizedFilters = normalizeFilters(filters);

  if (elements.queryInput instanceof HTMLInputElement) {
    elements.queryInput.value = normalizedFilters.query;
    elements.queryInput.setAttribute('autocomplete', 'off');
    elements.queryInput.setAttribute('spellcheck', 'false');
  }

  if (elements.riskSelect instanceof HTMLSelectElement) {
    elements.riskSelect.value = normalizedFilters.risk;
  }

  if (elements.sortSelect instanceof HTMLSelectElement) {
    elements.sortSelect.value = normalizedFilters.sortBy;
  }

  return normalizedFilters;
}

function resolveFilterElements(elementsOrForm) {
  if (!elementsOrForm) {
    return null;
  }

  if (elementsOrForm.form instanceof HTMLFormElement) {
    return elementsOrForm;
  }

  return getFilterElements(elementsOrForm);
}

function syncAccessibleHints(elements) {
  const helpId = 'filters-help';
  let helpText = elements.form.querySelector(`#${helpId}`);

  if (!helpText) {
    helpText = createElement('p', {
      attributes: { id: helpId },
      text: 'La búsqueda acepta coincidencias parciales por nombre o ticker, por ejemplo AAPL.',
    });
    elements.form.prepend(helpText);
  }

  elements.form.setAttribute('aria-describedby', helpId);

  if (elements.queryInput instanceof HTMLInputElement) {
    elements.queryInput.setAttribute('placeholder', 'Ej.: AAPL');
    elements.queryInput.setAttribute('aria-describedby', helpId);
  }

  if (elements.riskSelect instanceof HTMLSelectElement) {
    elements.riskSelect.setAttribute('aria-describedby', helpId);
  }

  if (elements.sortSelect instanceof HTMLSelectElement) {
    elements.sortSelect.setAttribute('aria-describedby', helpId);
  }
}

function syncSortOptionLabels(sortSelect) {
  if (!(sortSelect instanceof HTMLSelectElement)) {
    return;
  }

  for (const option of sortSelect.options) {
    if (option.value === 'investedAmount') {
      option.textContent = 'Monto invertido (descendente)';
    }

    if (option.value === 'dailyChangePercent') {
      option.textContent = 'Variación diaria (descendente)';
    }
  }
}
