export const sortAlphabeticallyInEsperanto = (a, b, key) => {
  return a[key].localeCompare(b[key], 'eo');
}