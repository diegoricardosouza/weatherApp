export const SAVEDCITIES = 'savedCities'

export function getSavedCities() {
  return localStorage.getItem(SAVEDCITIES);
}

export function setSaveCities(value) {
  return localStorage.setItem(SAVEDCITIES, JSON.stringify(value));
}
