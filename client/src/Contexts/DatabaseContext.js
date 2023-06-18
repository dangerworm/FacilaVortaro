import { sortAlphabeticallyInEsperanto } from "Helpers/alphabetisation";
import { cleanseWord } from "Helpers/word-display";
import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const DatabaseContext = createContext(null);

export const DatabaseContextProvider = ({ children }) => {
  const [loadingWordList, setLoadingWordList] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [addingWordRoot, setAddingWordRoot] = useState(false);
  const [addingWordRootSuccessful, setAddingWordRootSuccessful] = useState(undefined);
  const [updatingWordRoot, setUpdatingWordRoot] = useState(false);
  const [updatingWordRootSuccessful, setUpdatingWordRootSuccessful] = useState(undefined);
  const [deletingWordRoot, setDeletingWordRoot] = useState(false);
  const [wordRootError, setWordRootError] = useState(undefined);
  const [query, setQuery] = useState("");
  const [wordRoot, setWordRoot] = useState("");
  const [loadingRelatedWords, setLoadingRelatedWords] = useState(false);
  const [relatedWords, setRelatedWords] = useState([]);
  const [upsertingWord, setUpsertingWord] = useState(false);
  const [upsertingWordSuccessful, setUpsertingWordSuccessful] = useState(undefined);
  const [deletingWord, setDeletingWord] = useState(false);
  const [deletingWordSuccessful, setDeletingWordSuccessful] = useState(undefined);

  /*
  const baseUrl = "http://localhost:5000/api";
  /*/
  const baseUrl = process.env.REACT_APP_FACILA_VORTARO_API_BASE_URL_HEROKU;
  //*/

  const getWordList = async () => {
    setLoadingWordList(true);

    axios
      .post(`${baseUrl}/get-word-list`)
      .then((response) => {
        response.data.sort((a, b) => sortAlphabeticallyInEsperanto(a, b, 'vorto'));
        setWordList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingWordList(false);
      });
  }

  const addWordRoot = async (kapvorto, onSuccess) => {
    setAddingWordRoot(true);

    axios
      .post(`${baseUrl}/add-word-root`, {
        kapvorto
      })
      .then((response) => {
        setAddingWordRootSuccessful(true);
        getWordList();
        onSuccess && onSuccess();
      })
      .catch((error) => {
        setAddingWordRootSuccessful(false);
        setWordRootError(error.response.data.detail)
      })
      .finally(() => {
        setAddingWordRoot(false);
      });
  }

  const updateWordRoot = async(malnovaKapvorto, novaKapvorto) => {
    setUpdatingWordRoot(true);

    axios
      .post(`${baseUrl}/update-word-root`, {
        malnovaKapvorto,
        novaKapvorto
      })
      .then((response) => {
        setUpdatingWordRootSuccessful(true);
        getWordList();
      })
      .catch((error) => {
        setUpdatingWordRootSuccessful(false);
      })
      .finally(() => {
        setUpdatingWordRoot(false);
      });
  }

  const deleteWordRoot = async (kapvorto) => {
    setDeletingWordRoot(true);

    axios
      .post(`${baseUrl}/delete-word-root`, {
        kapvorto
      })
      .then((response) => {
        getWordList();
      })
      .catch((error) => {
        console.log(error);
        setWordRootError(error.response.data.detail)
      })
      .finally(() => {
        setDeletingWordRoot(false);
      });
  }

  const getRelatedWords = useCallback(async (kapvorto) => {
    setLoadingRelatedWords(true);
    setRelatedWords([]);

    axios
      .post(`${baseUrl}/get-related-words`, {
        kapvorto
      })
      .then((response) => {
        response.data.sort((a, b) => sortAlphabeticallyInEsperanto(a, b, 'vorto'));
        setRelatedWords(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingRelatedWords(false);
      });

  }, [baseUrl])


  const upsertWord = async (word) => {
    const { kapvorto, vorto, difino, images } = word;

    setUpsertingWord(true);
    setUpsertingWordSuccessful(undefined);

    axios
      .post(`${baseUrl}/upsert-word`, {
        kapvorto,
        vorto,
        difino,
        images
      })
      .then((response) => {
        setUpsertingWordSuccessful(true);
        refreshRelatedWords();
      })
      .catch((error) => {
        console.log(error);
        setUpsertingWordSuccessful(false);
      })
      .finally(() => {
        setUpsertingWord(false);
      });
  }

  const deleteWord = async (kapvorto, vorto) => {
    setDeletingWord(true);
    setDeletingWordSuccessful(undefined);

    axios
      .post(`${baseUrl}/delete-word`, {
        kapvorto,
        vorto,
      })
      .then((response) => {
        setDeletingWordSuccessful(true);
        refreshRelatedWords();
      })
      .catch((error) => {
        console.log(error);
        setDeletingWordSuccessful(false);
      })
      .finally(() => {
        setDeletingWord(false);
      });
  }

  const refreshRelatedWords = useCallback(async () => {
    setRelatedWords([]);
    getRelatedWords(wordRoot)
  }, [getRelatedWords, wordRoot])

  const searchResults = useMemo(() => {
    return wordList.filter((word) => {
      return cleanseWord(word.vorto)?.substring(0, query.length).includes(query.toLowerCase());
    })
  }, [query, wordList]);

  useEffect(() => {
    getWordList();
  }, []);

  useEffect(() => {
    if (wordRoot) {
      refreshRelatedWords();
    }
  }, [refreshRelatedWords, wordRoot]);

  return (
    <DatabaseContext.Provider
      value={{
        getWordList,
        loadingWordList,
        setQuery,
        query,
        searchResults,
        setWordRoot,
        wordRoot,
        refreshRelatedWords,
        loadingRelatedWords,
        setRelatedWords,
        relatedWords,
        addWordRoot,
        addingWordRoot,
        addingWordRootSuccessful,
        updateWordRoot,
        updatingWordRoot,
        updatingWordRootSuccessful,
        deleteWordRoot,
        deletingWordRoot,
        wordRootError,
        upsertWord,
        upsertingWord,
        upsertingWordSuccessful,
        deleteWord,
        deletingWord,
        deletingWordSuccessful
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (context) return context;

  throw Error("Words context was not registered");
};
