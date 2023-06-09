import { cleanseWord } from "./word-display";

export const alphabet = "abcĉdefgĝhĥijĵklmnoprsŝtuŭvz";

const getEsperantoAlphabetIndex = (letter) =>
` ${alphabet}`.indexOf(letter) || letter.charCodeAt(0);

const comparer = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const x = getEsperantoAlphabetIndex(a[i]);
    const y = getEsperantoAlphabetIndex(b[i]);

    if (x > y) return 1;
    if (x < y) return -1;
  }

  return 0;
}

export const sortAlphabeticallyInEsperanto = (a, b, key) => {
  a = cleanseWord(a[key]);
  b = cleanseWord(b[key]);

  return comparer(a, b);
};
