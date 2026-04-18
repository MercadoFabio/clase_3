import './styles.css';

import { loadInvestments } from './services/investment-service.js';
import { investmentStore } from './state/investment-store.js';
import { renderDetailPanel } from './ui/render-detail-panel.js';
import { readFiltersFromForm, renderFilters } from './ui/render-filters.js';
import { renderInvestmentList } from './ui/render-investment-list.js';
import { renderSummary } from './ui/render-summary.js';
import { clearElement } from './utils/dom.js';

const regions = getDashboardRegions();

wireDashboardEvents(regions);
bootstrapDashboard(regions);

async function bootstrapDashboard(appRegions) {
  investmentStore.subscribe((state) => {
    renderApp(appRegions, state);
  });

  investmentStore.setLoading();

  try {
    const items = await loadInvestments();
    investmentStore.initialize(items);
  } catch (error) {
    investmentStore.setError(resolveErrorMessage(error));
  }
}

function wireDashboardEvents(appRegions) {
  appRegions.filtersForm.addEventListener('submit', handleFiltersSubmit);
  appRegions.filtersForm.addEventListener('input', () => {
    syncFiltersFromForm(appRegions.filtersForm);
  });
  appRegions.filtersForm.addEventListener('change', () => {
    syncFiltersFromForm(appRegions.filtersForm);
  });

  appRegions.listRegion.addEventListener('click', (event) => {
    handleActionClick(event, appRegions.listRegion);
  });

  appRegions.modalRoot.addEventListener('click', (event) => {
    handleModalClick(event, appRegions);
  });

  document.addEventListener('keydown', (event) => {
    handleDocumentKeydown(event, appRegions);
  });
}

function getDashboardRegions() {
  const appRoot = document.querySelector('#app');
  const summaryRegion = document.querySelector('#summary-region');
  const filtersForm = document.querySelector('#filters-form');
  const listRegion = document.querySelector('#list-region');
  const modalRoot = document.querySelector('#modal-root');
  const loadingState = document.querySelector('#loading-state');
  const errorState = document.querySelector('#error-state');
  const emptyState = document.querySelector('#empty-state');

  const missingRegions = [
    ['#app', appRoot],
    ['#summary-region', summaryRegion],
    ['#filters-form', filtersForm],
    ['#list-region', listRegion],
    ['#modal-root', modalRoot],
    ['#loading-state', loadingState],
    ['#error-state', errorState],
    ['#empty-state', emptyState],
  ]
    .filter(([, element]) => !(element instanceof HTMLElement))
    .map(([selector]) => selector);

  if (missingRegions.length > 0) {
    throw new Error(`Faltan regiones base del dashboard: ${missingRegions.join(', ')}`);
  }

  return {
    appRoot,
    summaryRegion,
    filtersForm,
    listRegion,
    modalRoot,
    loadingState,
    errorState,
    emptyState,
  };
}

function renderApp(appRegions, state) {
  const visibleItems = state.status === 'ready' ? investmentStore.getVisibleItems(state) : [];
  const selectedItem = getSelectedItem(state);

  renderSummary(appRegions.summaryRegion, state.items);
  renderFilters(appRegions.filtersForm, state.filters);
  renderDetailPanel(appRegions.modalRoot, {
    item: selectedItem,
    triggerElement: state.lastTrigger,
  });

  const listResult = renderListRegion(appRegions.listRegion, state, visibleItems);

  syncGlobalVisualState(appRegions, state, listResult.isEmpty);
}

function renderListRegion(listRegion, state, visibleItems) {
  if (state.status !== 'ready') {
    clearElement(listRegion);
    return {
      isEmpty: false,
      count: 0,
    };
  }

  return renderInvestmentList(listRegion, visibleItems);
}

function syncGlobalVisualState(appRegions, state, isEmpty) {
  const isLoading = state.status === 'loading';
  const isError = state.status === 'error';
  const isReady = state.status === 'ready';
  const showEmpty = isReady && isEmpty;

  appRegions.appRoot.dataset.status = state.status;
  appRegions.appRoot.setAttribute('aria-busy', String(isLoading));

  appRegions.loadingState.hidden = !isLoading;
  appRegions.errorState.hidden = !isError;
  appRegions.emptyState.hidden = !showEmpty;
  appRegions.listRegion.hidden = !isReady || showEmpty;

  appRegions.errorState.textContent = state.errorMessage ?? 'No se pudieron cargar las inversiones.';

  setControlsAvailability(appRegions.filtersForm, isReady);
}

function handleFiltersSubmit(event) {
  event.preventDefault();
}

function syncFiltersFromForm(filtersForm) {
  const currentState = investmentStore.getState();

  if (currentState.status !== 'ready') {
    return;
  }

  investmentStore.setFilters(readFiltersFromForm(filtersForm));
}

function handleActionClick(event, listRegion) {
  const actionButton = event.target instanceof Element ? event.target.closest('button[data-action]') : null;

  if (!(actionButton instanceof HTMLButtonElement) || !listRegion.contains(actionButton)) {
    return;
  }

  const currentState = investmentStore.getState();

  if (currentState.status !== 'ready') {
    return;
  }

  if (actionButton.dataset.action === 'toggle-favorite') {
    investmentStore.toggleFavorite(actionButton.dataset.id ?? '');
    return;
  }

  if (actionButton.dataset.action === 'open-detail') {
    investmentStore.selectItem(actionButton.dataset.id ?? '', actionButton);
  }
}

function handleModalClick(event, appRegions) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  if (target.matches('[data-dialog-overlay="true"]')) {
    closeDetail(appRegions);
    return;
  }

  const actionButton = target.closest('button[data-action]');

  if (!(actionButton instanceof HTMLButtonElement) || !appRegions.modalRoot.contains(actionButton)) {
    return;
  }

  if (actionButton.dataset.action === 'toggle-favorite') {
    investmentStore.toggleFavorite(actionButton.dataset.id ?? '');
    return;
  }

  if (actionButton.dataset.action === 'close-detail') {
    closeDetail(appRegions);
  }
}

function handleDocumentKeydown(event, appRegions) {
  if (event.key !== 'Escape') {
    return;
  }

  const currentState = investmentStore.getState();

  if (!currentState.selectedId) {
    return;
  }

  event.preventDefault();
  closeDetail(appRegions);
}

function closeDetail(appRegions) {
  const currentState = investmentStore.getState();

  if (!currentState.selectedId) {
    return;
  }

  const selectedId = currentState.selectedId;

  investmentStore.clearSelection();
  restoreFocus(resolveReturnFocusTarget(appRegions, selectedId));
}

function setControlsAvailability(filtersForm, isEnabled) {
  if (!(filtersForm instanceof HTMLFormElement)) {
    return;
  }

  const controls = filtersForm.querySelectorAll('input, select, button');

  controls.forEach((control) => {
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLButtonElement) {
      control.disabled = !isEnabled;
    }
  });
}

function getSelectedItem(state) {
  if (!state.selectedId) {
    return null;
  }

  return state.items.find((item) => item.id === state.selectedId) ?? null;
}

function resolveReturnFocusTarget(appRegions, selectedId) {
  if (!selectedId) {
    return null;
  }

  const selector = `button[data-action="open-detail"][data-id="${selectedId}"]`;
  const triggerButton = appRegions.listRegion.querySelector(selector);

  return triggerButton instanceof HTMLElement ? triggerButton : null;
}

function restoreFocus(element) {
  if (element instanceof HTMLElement && element.isConnected) {
    element.focus();
  }
}

function resolveErrorMessage(error) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return 'No se pudieron cargar las inversiones. Probá recargar la página.';
}
