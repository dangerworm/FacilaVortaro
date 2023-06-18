const getWordRootList = 
  'SELECT kapvorto ' +
  'FROM public.kapvortoj;';

  const getWordList =
  'SELECT kapvorto, vorto ' +
  'FROM public.difinoj;';

const getWordRoot = 
  'SELECT kapvorto ' +
  'FROM public.kapvortoj ' +
  'WHERE kapvorto = $1;';

const addWordRoot =
  'INSERT INTO public.kapvortoj (kapvorto) ' +
  'VALUES ($1);';

const addWordRootWord =
  'INSERT INTO public.difinoj (kapvorto, vorto, difino) ' +
  'VALUES ($1, $1, \'\');'

const updateWordRoot =
  'UPDATE public.kapvortoj ' +
  'SET kapvorto = $2 ' +
  'WHERE kapvorto = $1;'

const deleteWordRoot =
  'DELETE FROM public.kapvortoj ' +
  'WHERE kapvorto = $1;';

const getRelatedWords =
  'SELECT kapvorto, vorto, difino ' +
  'FROM public.difinoj ' + 
  'WHERE kapvorto = $1;';

const upsertWord =
  'INSERT INTO public.difinoj (kapvorto, vorto, difino) ' +
  'VALUES ($1, $2, $3) ' +
  'ON CONFLICT (kapvorto, vorto) DO UPDATE SET difino = excluded.difino;';

const moveWord = 
  'UPDATE public.difinoj ' +
  'SET kapvorto = $3 ' +
  'WHERE kapvorto = $2 ' +
  'AND vorto = $1;';

const moveImage = 
  'UPDATE public.bildoj ' +
  'SET kapvorto = $3 ' +
  'WHERE kapvorto = $2 ' +
  'AND vorto = $1;';

const deleteWord = 
  'DELETE FROM public.difinoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2;';

const getImages =
  'SELECT kapvorto, vorto, indekso, bilddatumo, mimetipo, bildadreso, atribuo, "larĝo" ' +
  'FROM public.bildoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2;';

const upsertImage =
  'INSERT INTO public.bildoj (kapvorto, vorto, indekso, bilddatumo, mimetipo, bildadreso, atribuo, "larĝo") ' +
  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
  'ON CONFLICT (kapvorto, vorto, indekso) DO UPDATE SET ' + 
  'bilddatumo = excluded.bilddatumo, ' +
  'mimetipo = excluded.mimetipo, ' +
  'bildadreso = excluded.bildadreso, ' +
  'atribuo = excluded.atribuo, ' +
  '"larĝo" = excluded.larĝo;';

const deleteRemainingImages =
  'DELETE FROM public.bildoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2 ' +
  'AND indekso >= $3;';

module.exports = {
  getWordRootList,
  getWordList,
  getWordRoot,
  addWordRoot,
  addWordRootWord,
  updateWordRoot,
  deleteWordRoot,
  getRelatedWords,
  upsertWord,
  moveWord,
  moveImage,
  deleteWord,
  getImages,
  upsertImage,
  deleteRemainingImages,
};