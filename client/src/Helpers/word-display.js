export const removeAllCharactersExceptLetters = (word) => 
  word.replace(/[^a-zĉĝĥĵŝŭ]/g, '');

export const removePunctuation = (word) => 
  word.replace(/[-]/g, '');
  
export const cleanseWord = (word) => {
  if (!word) {
    return '';
  }

  return removeAllCharactersExceptLetters(removePunctuation(word.toLowerCase()));
}
