import { readFavoriteIds } from '../utils/storage.js';

const VALID_RISK_LEVELS = new Set(['Bajo', 'Medio', 'Alto']);

export const INVESTMENTS_DATA_URL = new URL('../data/investments.json', import.meta.url).toString();

export class InvestmentServiceError extends Error {
  constructor(message, options = {}) {
    super(message, options);
    this.name = 'InvestmentServiceError';
    this.code = options.code ?? 'INVESTMENT_SERVICE_ERROR';
  }
}

export async function loadInvestments({ fetchImpl = globalThis.fetch, storage } = {}) {
  if (typeof fetchImpl !== 'function') {
    throw new InvestmentServiceError('No pudimos cargar las inversiones en este entorno.', {
      code: 'FETCH_UNAVAILABLE',
    });
  }

  let response;

  try {
    response = await fetchImpl(INVESTMENTS_DATA_URL);
  } catch (cause) {
    throw new InvestmentServiceError('No pudimos cargar las inversiones. Probá recargar la página.', {
      code: 'FETCH_FAILED',
      cause,
    });
  }

  if (!response || !response.ok) {
    throw new InvestmentServiceError('No pudimos cargar las inversiones. El archivo de datos no respondió bien.', {
      code: 'FETCH_FAILED',
    });
  }

  let dataset;

  try {
    dataset = await response.json();
  } catch (cause) {
    throw new InvestmentServiceError('No pudimos leer el dataset de inversiones. Revisá el JSON y volvé a intentar.', {
      code: 'PARSE_FAILED',
      cause,
    });
  }

  try {
    const favoriteIds = readFavoriteIds(storage);
    return normalizeInvestments(dataset, { favoriteIds });
  } catch (cause) {
    throw new InvestmentServiceError('Los datos de inversiones tienen un formato inválido. Revisalos y recargá la página.', {
      code: 'INVALID_DATASET',
      cause,
    });
  }
}

export function normalizeInvestments(dataset, options = {}) {
  if (!Array.isArray(dataset)) {
    throw new Error('El dataset debe ser un array de inversiones.');
  }

  const favoriteIds = normalizeFavoriteIds(options.favoriteIds ?? []);
  const favoriteIdSet = new Set(favoriteIds);
  const seenIds = new Set();

  return dataset.map((investment, index) => {
    const normalizedInvestment = normalizeInvestment(investment, index);

    if (seenIds.has(normalizedInvestment.id)) {
      throw new Error(`El id "${normalizedInvestment.id}" está repetido.`);
    }

    seenIds.add(normalizedInvestment.id);

    return {
      ...normalizedInvestment,
      favorite: favoriteIdSet.has(normalizedInvestment.id) || normalizedInvestment.favorite,
    };
  });
}

export function normalizeInvestment(investment, index = 0) {
  if (!investment || typeof investment !== 'object' || Array.isArray(investment)) {
    throw new Error(`La inversión en posición ${index} no es un objeto válido.`);
  }

  const normalizedInvestment = {
    id: readRequiredText(investment.id, 'id', index),
    name: readRequiredText(investment.name, 'name', index),
    symbol: readRequiredText(investment.symbol, 'symbol', index).toUpperCase(),
    category: readRequiredText(investment.category, 'category', index),
    riskLevel: readRiskLevel(investment.riskLevel, index),
    investedAmount: readRequiredNumber(investment.investedAmount, 'investedAmount', index),
    currentValue: readRequiredNumber(investment.currentValue, 'currentValue', index),
    dailyChangePercent: readRequiredNumber(investment.dailyChangePercent, 'dailyChangePercent', index),
    favorite: Boolean(investment.favorite),
    description: readRequiredText(investment.description, 'description', index),
  };

  return normalizedInvestment;
}

function readRequiredText(value, fieldName, index) {
  if (typeof value !== 'string') {
    throw new Error(`El campo "${fieldName}" en posición ${index} debe ser texto.`);
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(`El campo "${fieldName}" en posición ${index} no puede estar vacío.`);
  }

  return normalizedValue;
}

function readRequiredNumber(value, fieldName, index) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    throw new Error(`El campo "${fieldName}" en posición ${index} debe ser numérico.`);
  }

  return numericValue;
}

function readRiskLevel(value, index) {
  const normalizedValue = readRequiredText(value, 'riskLevel', index);

  if (!VALID_RISK_LEVELS.has(normalizedValue)) {
    throw new Error(`El riesgo "${normalizedValue}" en posición ${index} no es válido.`);
  }

  return normalizedValue;
}

function normalizeFavoriteIds(favoriteIds) {
  if (!Array.isArray(favoriteIds)) {
    return [];
  }

  return [...new Set(favoriteIds.filter((id) => typeof id === 'string' && id.trim().length > 0))];
}
