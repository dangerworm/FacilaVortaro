export const removeAllCharactersExceptLetters = (word) =>
  word.replace(/[^a-zĉĝĥĵŝŭ]/g, '');

export const removePunctuation = (word) =>
  word.replace(/[-]/g, '');