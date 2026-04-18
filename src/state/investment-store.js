import { writeFavoriteIds } from '../utils/storage.js';

const DEFAULT_FILTERS = Object.freeze({
  query: '',
  risk: 'Todos',
  sortBy: 'investedAmount',
});

const VALID_RISK_FILTERS = new Set(['Todos', 'Bajo', 'Medio', 'Alto']);
const VALID_SORT_OPTIONS = new Set(['investedAmount', 'dailyChangePercent']);

let state = createInitialState();
const listeners = new Set();

export function createInitialState() {
  return {
    status: 'loading',
    items: [],
    filters: { ...DEFAULT_FILTERS },
    selectedId: null,
    lastTrigger: null,
    errorMessage: null,
  };
}

export function getState() {
  return cloneState(state);
}

export function subscribe(listener) {
  if (typeof listener !== 'function') {
    return () => {};
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setLoading() {
  state = {
    ...createInitialState(),
    status: 'loading',
  };

  notify();
  return getState();
}

export function setError(message) {
  state = {
    ...createInitialState(),
    status: 'error',
    errorMessage: normalizeErrorMessage(message),
  };

  notify();
  return getState();
}

export function initialize(items) {
  state = {
    ...createInitialState(),
    status: 'ready',
    items: normalizeItems(items),
  };

  notify();
  return getState();
}

export function setFilters(nextFilters = {}) {
  state = {
    ...state,
    filters: {
      query: normalizeQuery(nextFilters.query ?? state.filters.query),
      risk: normalizeRiskFilter(nextFilters.risk ?? state.filters.risk),
      sortBy: normalizeSortBy(nextFilters.sortBy ?? state.filters.sortBy),
    },
  };

  notify();
  return getState();
}

export function toggleFavorite(id) {
  if (typeof id !== 'string' || !id.trim()) {
    return null;
  }

  let updatedFavorite = null;
  const normalizedId = id.trim();

  state = {
    ...state,
    items: state.items.map((item) => {
      if (item.id !== normalizedId) {
        return item;
      }

      updatedFavorite = !item.favorite;

      return {
        ...item,
        favorite: updatedFavorite,
      };
    }),
  };

  if (updatedFavorite === null) {
    return null;
  }

  writeFavoriteIds(state.items.filter((item) => item.favorite).map((item) => item.id));
  notify();

  return updatedFavorite;
}

export function selectItem(id, trigger = null) {
  if (id === null || id === undefined || id === '') {
    return clearSelection();
  }

  const normalizedId = String(id).trim();
  const itemExists = state.items.some((item) => item.id === normalizedId);

  state = {
    ...state,
    selectedId: itemExists ? normalizedId : null,
    lastTrigger: itemExists ? trigger : null,
  };

  notify();
  return getState();
}

export function clearSelection() {
  state = {
    ...state,
    selectedId: null,
    lastTrigger: null,
  };

  notify();
  return getState();
}

export function getVisibleItems(snapshot = state) {
  const normalizedState = snapshot ?? state;
  const query = normalizeQuery(normalizedState.filters?.query ?? '');
  const risk = normalizeRiskFilter(normalizedState.filters?.risk ?? DEFAULT_FILTERS.risk);
  const sortBy = normalizeSortBy(normalizedState.filters?.sortBy ?? DEFAULT_FILTERS.sortBy);

  return normalizeItems(normalizedState.items)
    .filter((item) => matchesQuery(item, query))
    .filter((item) => matchesRisk(item, risk))
    .sort((leftItem, rightItem) => rightItem[sortBy] - leftItem[sortBy]);
}

export const investmentStore = {
  getState,
  subscribe,
  setLoading,
  setError,
  initialize,
  setFilters,
  toggleFavorite,
  selectItem,
  clearSelection,
  getVisibleItems,
};

function notify() {
  const snapshot = getState();
  listeners.forEach((listener) => listener(snapshot));
}

function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => ({
    ...item,
    favorite: Boolean(item.favorite),
  }));
}

function matchesQuery(item, query) {
  if (!query) {
    return true;
  }

  const searchableText = `${item.name} ${item.symbol}`.toLowerCase();
  return searchableText.includes(query.toLowerCase());
}

function matchesRisk(item, risk) {
  return risk === 'Todos' ? true : item.riskLevel === risk;
}

function normalizeQuery(query) {
  return String(query ?? '').trim();
}

function normalizeRiskFilter(risk) {
  const normalizedRisk = String(risk ?? DEFAULT_FILTERS.risk).trim();
  return VALID_RISK_FILTERS.has(normalizedRisk) ? normalizedRisk : DEFAULT_FILTERS.risk;
}

function normalizeSortBy(sortBy) {
  const normalizedSortBy = String(sortBy ?? DEFAULT_FILTERS.sortBy).trim();
  return VALID_SORT_OPTIONS.has(normalizedSortBy) ? normalizedSortBy : DEFAULT_FILTERS.sortBy;
}

function normalizeErrorMessage(message) {
  const normalizedMessage = String(message ?? '').trim();
  return normalizedMessage || 'Ocurrió un problema al cargar las inversiones.';
}

function cloneState(sourceState) {
  return {
    ...sourceState,
    items: normalizeItems(sourceState.items),
    filters: {
      query: sourceState.filters.query,
      risk: sourceState.filters.risk,
      sortBy: sourceState.filters.sortBy,
    },
  };
}
