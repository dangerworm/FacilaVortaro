import { removeAllCharactersExceptLetters, removePunctuation } from "./word-display";

export const incorrectAlphabet = "abĉcdefĝgĥhiĵjklmnoprŝstŭuvz";
export const alphabet = "abcĉdefgĝhĥijĵklmnoprsŝtuŭvz";

const cleanseWord = (word) =>
  removeAllCharactersExceptLetters(removePunctuation(word.toLowerCase()));

const translate = (word, incorrectAlphabet, correctAlphabetOrder) =>
  word.split('').map((letter) => 
    correctAlphabetOrder[incorrectAlphabet.indexOf(letter)] || letter
  ).join('');

export const sortAlphabeticallyInEsperanto = (a, b, key) => {
  const x = cleanseWord(a[key]);
  const y = cleanseWord(b[key]);

  return translate(x, incorrectAlphabet, alphabet)
    .localeCompare(translate(y, incorrectAlphabet, alphabet));
}
