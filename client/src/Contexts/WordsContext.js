import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const WordsContext = createContext(null);

export const WordsContextProvider = ({ children }) => {
  const [loadingWordBases, setLoadingWordBases] = useState(false);
  const [wordBases, setWordBases] = useState([]);
  const [query, setQuery] = useState("");
  const [wordBase, setWordBase] = useState("");
  const [loadingRelatedWords, setLoadingRelatedWords] = useState(false);
  const [relatedWords, setRelatedWords] = useState([]);
  const [addingWordBase, setAddingWordBase] = useState(false);
  const [deletingWordBase, setDeletingWordBase] = useState(false);
  const [addingWordBaseSuccessful, setAddingWordBaseSuccessful] = useState(undefined);
  const [wordBaseError, setWordBaseError] = useState(undefined);
  const [performingUpsert, setPerformingUpsert] = useState(false);
  const [upsertSuccessful, setUpsertSuccessful] = useState(undefined);

  const baseUrl = process.env.REACT_APP_FACILA_VORTARO_API_BASE_URL;

  const getWordBases = async () => {
    setLoadingWordBases(true);

    axios
      .post(`${baseUrl}/get-word-bases`)
      .then((response) => {
        response.data.sort((a, b) => a.vortbazo.localeCompare(b.vortbazo));
        setWordBases(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadingWordBases(false);
  }

  const getRelatedWords = useCallback(async (vortBazo) => {
    setLoadingRelatedWords(true);

    axios
      .post(`${baseUrl}/get-related-words`, {
        vortBazo
      })
      .then((response) => {
        setRelatedWords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadingRelatedWords(false);
  }, [baseUrl])

  const addWordBase = async (vortbazo) => {
    setAddingWordBase(true);

    axios
      .post(`${baseUrl}/add-word-base`, {
        vortbazo
      })
      .then((response) => {
        setAddingWordBaseSuccessful(true);
        getWordBases();
      })
      .catch((error) => {
        setAddingWordBaseSuccessful(false);
        setWordBaseError(error.response.data.detail)
      });

    setAddingWordBase(false);
  }

  const deleteWordBase = async (vortbazo) => {
    setDeletingWordBase(true);

    axios
      .post(`${baseUrl}/delete-word-base`, {
        vortbazo
      })
      .then((response) => {
        getWordBases();
      })
      .catch((error) => {
        console.log(error);
        setWordBaseError(error.response.data.detail)
      });

      setDeletingWordBase(false);
  }

  const upsertWord = async (vorto, difino, bildadreso) => {
    setPerformingUpsert(true);
    setUpsertSuccessful(undefined);

    axios
      .post(`${baseUrl}/upsert-definition`, {
        vorto,
        difino,
        bildadreso
      })
      .then((response) => {
        setUpsertSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
        setUpsertSuccessful(false);
      });

    setPerformingUpsert(false);
  }

  const searchResults = useMemo(() => {
    return wordBases.filter((word) => {
      return word.vortbazo?.toLowerCase().substring(0, query.length).includes(query.toLowerCase());
    })
  }, [query, wordBases]);

  useEffect(() => {
    getWordBases();
  }, []);

  useEffect(() => {
    if (wordBase) {
      getRelatedWords(wordBase);
    }
  }, [getRelatedWords, wordBase]);

  return (
    <WordsContext.Provider
      value={{
        loadingWordBases,
        setQuery,
        query,
        searchResults,
        setWordBase,
        wordBase,
        getRelatedWords,
        loadingRelatedWords,
        relatedWords,
        addWordBase,
        addingWordBase,
        addingWordBaseSuccessful,
        deleteWordBase,
        wordBaseError,
        upsertWord,
        performingUpsert,
        upsertSuccessful,
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
