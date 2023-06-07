import { sortAlphabeticallyInEsperanto } from "Helpers/alphabetisation";
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
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState([]);
  const [addingWordRoot, setAddingWordRoot] = useState(false);
  const [deletingWordRoot, setDeletingWordRoot] = useState(false);
  const [addingWordRootSuccessful, setAddingWordRootSuccessful] = useState(undefined);
  const [wordRootError, setWordRootError] = useState(undefined);
  const [performingUpsert, setPerformingUpsert] = useState(false);
  const [upsertSuccessful, setUpsertSuccessful] = useState(undefined);
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


  const upsertWord = async (vorto, difino, bilddatumo, mimetipo, bildadreso, kredito) => {
    setPerformingUpsert(true);
    setUpsertSuccessful(undefined);

    axios
      .post(`${baseUrl}/upsert-definition`, {
        kapvorto: wordRoot,
        vorto,
        difino,
      })
      .then((response) => {
        axios
          .post(`${baseUrl}/upsert-image`, {
            kapvorto: wordRoot,
            vorto,
            bilddatumo,
            mimetipo,
            bildadreso,
            kredito,
          })
          .then((response) => {
            setUpsertSuccessful(true);
          })
          .catch((error) => {
            console.log(error);
            setUpsertSuccessful(false);
          });

        getRelatedWords(wordRoot);
      })
      .catch((error) => {
        console.log(error);
        setUpsertSuccessful(false);
      })
      .finally(() => {
        setPerformingUpsert(false);
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
        getRelatedWords(kapvorto);
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

  const searchResults = useMemo(() => {
    return wordRoots.filter((word) => {
      return word.kapvorto?.toLowerCase().substring(0, query.length).includes(query.toLowerCase());
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

  useEffect(() => {
    if (!relatedWords || relatedWords.length === 0) {
      return;
    }

    setImages([]);
    setLoadingImages(true);

    const fetchData = async () => {
      for (let word of relatedWords) {
        await getImages(word.kapvorto, word.vorto, (kapvorto, vorto, images) => {
          for (let imageData of images) {
            setImages(current => [...current, { kapvorto, vorto, bilddatumo: imageData.bilddatumo, mimetipo: imageData.mime_tipo }]);
          }

          setLoadingImages(false);
        });
      }
    }

    fetchData();
  }, [relatedWords]);

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
        images,
        addWordRoot,
        addingWordRoot,
        addingWordRootSuccessful,
        deleteWordRoot,
        deletingWordRoot,
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
