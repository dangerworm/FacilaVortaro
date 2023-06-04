import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const WordsContext = createContext(null);

export const WordsContextProvider = ({ children }) => {
  const [loadingWords, setLoadingWords] = useState(false);
  const [loadingWord, setLoadingWord] = useState(false);
  const [upsertSuccessful, setUpsertSuccessful] = useState(undefined);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [query, setQuery] = useState("");

  const baseUrl = process.env.REACT_APP_FACILA_VORTARO_API_BASE_URL;

  const getWords = async () => {
    setLoadingWords(true);

    axios
      .post(`${baseUrl}/get-word-bases`)
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadingWords(false);
  }

  const getWord = async (vorto) => {
    setLoadingWord(true);

    axios
      .post(`${baseUrl}/get-word-base`, {
        vorto
      }
        .then((response) => {
          setWord(response.data);
        })
        .catch((error) => {
          console.log(error);
        }));

    setLoadingWord(false);
  }

  const upsertWord = async (vorto, bildadreso) => {
    setLoadingWord(true);
    setUpsertSuccessful(undefined);

    axios
      .post(`${baseUrl}/upsert-word-base`, {
        vorto,
        bildadreso
      })
      .then((response) => {
        setUpsertSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
        setUpsertSuccessful(false);
      });

    setLoadingWord(false);
  }

  const searchResults = useMemo(() => {
    return words.filter((word) => {
      return word.vorto.toLowerCase().substring(0, query.length).includes(query.toLowerCase());
    })
  }, [query, words]);

  useEffect(() => {
    getWords();
  }, []);

  return (
    <WordsContext.Provider
      value={{
        loadingWords,
        loadingWord,
        getWords,
        getWord,
        upsertWord,
        words,
        searchResults,
        word,
        setWord,
        query,
        setQuery,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}

export const useWordsContext = () => {
  const context = useContext(WordsContext);
  if (context) return context;

  throw Error("Words context was not registered");
};
