export const cleanseWord = (word) => {
  if (!word) {
    return '';
  }

  return word.toLowerCase();
}
