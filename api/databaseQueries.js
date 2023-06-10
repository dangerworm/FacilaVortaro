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
  'VALUES ($1, $1, \'\') ' +
  'ON CONFLICT (kapvorto, vorto) DO NOTHING;'

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

const deleteWord = 
  'DELETE FROM public.difinoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2;';

const getImages =
  'SELECT kapvorto, vorto, indekso, bilddatumo, mimetipo, bildadreso, atribuo ' +
  'FROM public.bildoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2;';

const upsertImageMetadata =
'INSERT INTO public.bildoj (kapvorto, vorto, bildadreso, atribuo) ' +
'VALUES ($1, $2, $3, $4) ' +
'ON CONFLICT (kapvorto, vorto) DO UPDATE SET ' + 
'bildadreso = excluded.bildadreso, ' +
'atribuo = excluded.atribuo;';

const upsertImage =
  'INSERT INTO public.bildoj (kapvorto, vorto, indekso, bilddatumo, mimetipo, bildadreso, atribuo) ' +
  'VALUES ($1, $2, $3, $4, $5, $6, $7) ' +
  'ON CONFLICT (kapvorto, vorto, indekso) DO UPDATE SET ' + 
  'bilddatumo = excluded.bilddatumo, ' +
  'mimetipo = excluded.mimetipo, ' +
  'bildadreso = excluded.bildadreso, ' +
  'atribuo = excluded.atribuo;';

const deleteRemainingImages =
  'DELETE FROM public.bildoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2 ' +
  'AND indekso >= $3;';

module.exports = {
  getWordList,
  getWordRoot,
  addWordRoot,
  addWordRootWord,
  deleteWordRoot,
  getRelatedWords,
  upsertWord,
  deleteWord,
  getImages,
  upsertImageMetadata,
  upsertImage,
  deleteRemainingImages,
};