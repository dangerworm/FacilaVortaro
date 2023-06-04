import { Pool } from 'pg';
import { createContext, useContext, useEffect, useState } from "react";

export const WordsContext = createContext();

export const WordsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [wordBases, setWordBases] = useState([]);

  const dbUrl = process.env.REACT_APP_FACILA_VORTARO_POSTGRES_URL;

  const db = new Pool(
    {
      host: dbUrl,
      pool: {
        min: 1,
        max: 2,
        idleTimeoutMillis: 5000,
      }
    });

  const getWordBases = async (query) => {
    setLoading(true);

    const result = await db.query(
      'SELECT vorto, vortbildo, FROM vortoj',
    );

    const rows = result.rows.slice(0, 10);
    console.log(rows);

    setLoading(false);
  }

  const getWordBase = async (vorto) => {
    setLoading(true);

    const result = await db.query(
      'SELECT vorto, vortbildo, FROM vortoj WHERE vorto LIKE $1',
      { params: [`${vorto}%`] }
    );

    const rows = result.rows.slice(0, 10);
    console.log(rows);

    setLoading(false);
  }

  const upsertWordBase = async (vorto, bildadreso) => {
    setLoading(true);

    const result = await db.query(
      'INSERT INTO public.vortoj (vorto, bildadreso) ' +
      'VALUES ($1, $2) ' +
      'ON CONFLICT (vorto) DO UPDATE SET bildadreso = excluded.bildadreso;',
      { params: [vorto, bildadreso] }
    );

    const rows = result.rows.slice(0, 10);
    console.log(rows);

    setLoading(false);
  }

  useEffect(() => {
    getWordBases();
  }, []);

  return (
    <WordsContext.Provider
      value={{
        getWordBases,
        getWordBase,
        upsertWordBase,
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
