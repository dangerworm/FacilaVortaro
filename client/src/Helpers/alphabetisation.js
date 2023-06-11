import { cleanseWord } from "./word-display";

export const alphabet = "abcĉdefgĝhĥijĵklmnoprsŝtuŭvz";

const getEsperantoAlphabetIndex = (letter) => {
  const index = alphabet.indexOf(letter);
  return index !== -1 ? index : alphabet.length + letter.charCodeAt(0);
}

const comparer = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const x = getEsperantoAlphabetIndex(a[i]);
    const y = getEsperantoAlphabetIndex(b[i]);

    if (x > y) return 1;
    if (x < y) return -1;
  }

  return a.length - b.length;
}

export const sortAlphabeticallyInEsperanto = (a, b, key) => {
  a = cleanseWord(a[key]);
  b = cleanseWord(b[key]);

  return comparer(a, b);
};
