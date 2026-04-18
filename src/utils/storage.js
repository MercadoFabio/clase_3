export const FAVORITES_STORAGE_KEY = 'investment-favorites';
export const THEME_STORAGE_KEY = 'investment-theme';

function getBrowserStorage() {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
    return null;
  }

  return globalThis.localStorage;
}

function normalizeFavoriteIds(ids) {
  return [...new Set(ids.filter((id) => typeof id === 'string' && id.trim().length > 0))];
}

export function readFavoriteIds(storage = getBrowserStorage()) {
  if (!storage) {
    return [];
  }

  try {
    const rawValue = storage.getItem(FAVORITES_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? normalizeFavoriteIds(parsedValue) : [];
  } catch {
    return [];
  }
}

export function writeFavoriteIds(ids, storage = getBrowserStorage()) {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalizeFavoriteIds(ids)));
    return true;
  } catch {
    return false;
  }
}

export function toggleFavoriteId(id, storage = getBrowserStorage()) {
  const currentIds = readFavoriteIds(storage);
  const nextIds = currentIds.includes(id)
    ? currentIds.filter((currentId) => currentId !== id)
    : [...currentIds, id];

  writeFavoriteIds(nextIds, storage);

  return nextIds;
}

export function readThemePreference(storage = getBrowserStorage()) {
  if (!storage) {
    return null;
  }

  try {
    const rawValue = storage.getItem(THEME_STORAGE_KEY);
    return rawValue === 'dark' || rawValue === 'light' ? rawValue : null;
  } catch {
    return null;
  }
}

export function writeThemePreference(theme, storage = getBrowserStorage()) {
  if (!storage) {
    return false;
  }

  if (theme !== 'dark' && theme !== 'light') {
    return false;
  }

  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}
