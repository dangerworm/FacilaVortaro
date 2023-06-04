import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const WordsContext = createContext();

export const WordsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [wordBases, setWordBases] = useState([]);
  
  const gitRepositoryUrl = 'https://raw.githubusercontent.com/dangerworm/FacilaVortaro';
  const wordBasesPath = '/main/LICENSE';

  const getWordBasesList = () => {
    setLoading(true);

    axios
      .get(`${gitRepositoryUrl}${wordBasesPath}`)
      .then((response) => {
        console.log(response);
        setWordBases(response.data);
        setLoading(false);
      });
  }

  useEffect(() => {
    getWordBasesList();
  }, []);

  return (
    <WordsContext.Provider
      value={{
        getWordBasesList,
        loading,
        wordBases
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
