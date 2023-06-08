import { sortAlphabeticallyInEsperanto } from "Helpers/alphabetisation";
import { removePunctuation } from "Helpers/word-display";
import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const DatabaseContext = createContext(null);

export const DatabaseContextProvider = ({ children }) => {
  const [loadingWordRoots, setLoadingWordRoots] = useState(false);
  const [wordRoots, setWordRoots] = useState([]);
  const [addingWordRoot, setAddingWordRoot] = useState(false);
  const [deletingWordRoot, setDeletingWordRoot] = useState(false);
  const [addingWordRootSuccessful, setAddingWordRootSuccessful] = useState(undefined);
  const [wordRootError, setWordRootError] = useState(undefined);
  const [query, setQuery] = useState("");
  const [wordRoot, setWordRoot] = useState("");
  const [loadingRelatedWords, setLoadingRelatedWords] = useState(false);
  const [relatedWords, setRelatedWords] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState([]);
  const [upsertingWord, setUpsertingWord] = useState(false);
  const [upsertingWordSuccessful, setUpsertingWordSuccessful] = useState(undefined);
  const [deletingWord, setDeletingWord] = useState(false);
  const [deletingWordSuccessful, setDeletingWordSuccessful] = useState(undefined);

  /*
  const baseUrl = process.env.REACT_APP_FACILA_VORTARO_API_BASE_URL_HEROKU;
  /*/
  const baseUrl = "http://localhost:5000/api";
  //*/

  const getWordRoots = async () => {
    setLoadingWordRoots(true);

    axios
      .post(`${baseUrl}/get-word-roots`)
      .then((response) => {
        response.data.sort((a, b) => sortAlphabeticallyInEsperanto(a, b, 'kapvorto'));
        setWordRoots(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingWordRoots(false);
      });
  }

  const addWordRoot = async (kapvorto) => {
    setAddingWordRoot(true);

    axios
      .post(`${baseUrl}/add-word-root`, {
        kapvorto
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

  const deleteWordRoot = async (kapvorto) => {
    setDeletingWordRoot(true);

    axios
      .post(`${baseUrl}/delete-word-root`, {
        kapvorto
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

  const getImages = async (kapvorto, vorto, callback) => {
    axios
      .post(`${baseUrl}/get-images`, {
        kapvorto,
        vorto,
      })
      .then((response) => {
        callback(kapvorto, vorto, response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const refreshRelatedWords = useCallback(async () => {
    setRelatedWords([]);
    getRelatedWords(wordRoot)
  }, [getRelatedWords, wordRoot])

  const searchResults = useMemo(() => {
    return wordRoots.filter((word) => {
      return removePunctuation(word.kapvorto)?.toLowerCase().substring(0, query.length).includes(query.toLowerCase());
    })
  }, [query, wordRoots]);

  useEffect(() => {
    getWordRoots();
  }, []);

  useEffect(() => {
    if (wordRoot) {
      refreshRelatedWords();
    }
  }, [refreshRelatedWords, wordRoot]);

  return (
    <DatabaseContext.Provider
      value={{
        loadingWordRoots,
        setQuery,
        query,
        searchResults,
        setWordRoot,
        wordRoot,
        refreshRelatedWords,
        loadingRelatedWords,
        setRelatedWords,
        relatedWords,
        images,
        addWordRoot,
        addingWordRoot,
        addingWordRootSuccessful,
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
