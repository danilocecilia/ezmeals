// Helper functions to manage session storage

/**
 * Save data to session storage
 * @param key - The key under which the data will be stored
 * @param value - The data to store
 */
export function saveToSessionStorage(key: string, value: unknown): void {
  const serializedValue = JSON.stringify(value);
  sessionStorage.setItem(key, serializedValue);
}

/**
 * Load data from session storage
 * @param key - The key under which the data is stored
 * @returns The data stored under the given key, or null if the key does not exist
 */
export function loadFromSessionStorage(key: string): unknown {
  if (typeof window === 'undefined') {
    return null;
  }

  const serializedValue = sessionStorage.getItem(key);
  if (serializedValue === null) {
    return null;
  }
  return JSON.parse(serializedValue);
}

/**
 * Remove data from session storage
 * @param key - The key under which the data is stored
 */
export function removeFromSessionStorage(key: string): void {
  sessionStorage.removeItem(key);
}

/**
 * Clear all data from session storage
 */
export function clearSessionStorage(): void {
  sessionStorage.clear();
}
