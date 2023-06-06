import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const WordsContext = createContext(null);

export const WordsContextProvider = ({ children }) => {
  const [loadingWordRoots, setLoadingWordRoots] = useState(false);
  const [wordRoots, setWordRoots] = useState([]);
  const [query, setQuery] = useState("");
  const [wordRoot, setWordRoot] = useState("");
  const [loadingRelatedWords, setLoadingRelatedWords] = useState(false);
  const [relatedWords, setRelatedWords] = useState([]);
  const [addingWordRoot, setAddingWordRoot] = useState(false);
  const [deletingWordRoot, setDeletingWordRoot] = useState(false);
  const [addingWordRootSuccessful, setAddingWordRootSuccessful] = useState(undefined);
  const [wordRootError, setWordRootError] = useState(undefined);
  const [performingUpsert, setPerformingUpsert] = useState(false);
  const [upsertSuccessful, setUpsertSuccessful] = useState(undefined);
  const [deletingWord, setDeletingWord] = useState(false);
  const [deletingWordSuccessful, setDeletingWordSuccessful] = useState(undefined);

  //*
  const baseUrl = process.env.REACT_APP_FACILA_VORTARO_API_BASE_URL_HEROKU;
  /*/
  const baseUrl = "http://localhost:5000/api";
  //*/

  const getWordRoots = async () => {
    setLoadingWordRoots(true);

    axios
      .post(`${baseUrl}/get-word-roots`)
      .then((response) => {
        response.data.sort((a, b) => a.radiko.localeCompare(b.radiko));
        setWordRoots(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingWordRoots(false);
      });
  }

  const getRelatedWords = useCallback(async (radiko) => {
    setLoadingRelatedWords(true);
    setRelatedWords([]);

    axios
      .post(`${baseUrl}/get-related-words`, {
        radiko
      })
      .then((response) => {
        response.data.sort((a, b) => a.vorto.localeCompare(b.vorto));
        setRelatedWords(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingRelatedWords(false);
      });

  }, [baseUrl])

  const addWordRoot = async (radiko) => {
    setAddingWordRoot(true);

    axios
      .post(`${baseUrl}/add-word-root`, {
        radiko
      })
      .then((response) => {
        setAddingWordRootSuccessful(true);
        getWordRoots();
      })
      .catch((error) => {
        setAddingWordRootSuccessful(false);
        setWordRootError(error.response.data.detail)
      })
      .finally(() => {
        setAddingWordRoot(false);
      });
  }

  const deleteWordRoot = async (radiko) => {
    setDeletingWordRoot(true);

    axios
      .post(`${baseUrl}/delete-word-root`, {
        radiko
      })
      .then((response) => {
        getWordRoots();
      })
      .catch((error) => {
        console.log(error);
        setWordRootError(error.response.data.detail)
      })
      .finally(() => {
        setDeletingWordRoot(false);
      });
  }

  const upsertWord = async (radiko, vorto, difino, bildadreso) => {
    setPerformingUpsert(true);
    setUpsertSuccessful(undefined);

    axios
      .post(`${baseUrl}/upsert-definition`, {
        radiko,
        vorto,
        difino,
        bildadreso
      })
      .then((response) => {
        setUpsertSuccessful(true);
        getRelatedWords(radiko);
      })
      .catch((error) => {
        console.log(error);
        setUpsertSuccessful(false);
      })
      .finally(() => {
        setPerformingUpsert(false);
      });
  }

  const deleteWord = async (radiko, vorto) => {
    setDeletingWord(true);
    setDeletingWordSuccessful(undefined);

    axios
      .post(`${baseUrl}/delete-word`, {
        radiko,
        vorto,
      })
      .then((response) => {
        setDeletingWordSuccessful(true);
        getRelatedWords(radiko);
      })
      .catch((error) => {
        console.log(error);
        setDeletingWordSuccessful(false);
      })
      .finally(() => {
        setDeletingWord(false);
      });
  }

  const searchResults = useMemo(() => {
    return wordRoots.filter((word) => {
      return word.radiko?.toLowerCase().substring(0, query.length).includes(query.toLowerCase());
    })
  }, [query, wordRoots]);

  useEffect(() => {
    getWordRoots();
  }, []);

  useEffect(() => {
    if (wordRoot) {
      setRelatedWords([]);
      getRelatedWords(wordRoot);
    }
  }, [getRelatedWords, wordRoot]);

  return (
    <WordsContext.Provider
      value={{
        loadingWordRoots,
        setQuery,
        query,
        searchResults,
        setWordRoot,
        wordRoot,
        getRelatedWords,
        loadingRelatedWords,
        setRelatedWords,
        relatedWords,
        addWordRoot,
        addingWordRoot,
        addingWordRootSuccessful,
        deleteWordRoot,
        wordRootError,
        upsertWord,
        performingUpsert,
        upsertSuccessful,
        deleteWord,
        deletingWord,
        deletingWordSuccessful
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
