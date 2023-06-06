const getWordRoots =
  'SELECT kapvorto ' +
  'FROM public.kapvortoj;';

const addWordRoot =
  'INSERT INTO public.kapvortoj (kapvorto) ' +
  'VALUES ($1);';

const deleteWordRoot =
  'DELETE FROM public.kapvortoj ' +
  'WHERE kapvorto = $1;';

const getRelatedWords =
'SELECT kapvorto, vorto, difino, bildadreso ' +
'FROM difinoj ' +
'WHERE vorto LIKE $1;';

const upsertDefinition =
  'INSERT INTO public.difinoj (kapvorto, vorto, difino, bildadreso) ' +
  'VALUES ($1, $2, $3, $4) ' +
  'ON CONFLICT (kapvorto, vorto) DO UPDATE SET difino = excluded.difino, bildadreso = excluded.bildadreso;';

const deleteWord = 
  'DELETE FROM public.difinoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2;';

module.exports = {
  getWordRoots,
  getRelatedWords,
  addWordRoot,
  deleteWordRoot,
  upsertDefinition,
  deleteWord
};