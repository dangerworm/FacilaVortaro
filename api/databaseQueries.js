const getWordRoots =
  'SELECT radiko ' +
  'FROM public.radikoj;';

const addWordRoot =
  'INSERT INTO public.radikoj (radiko) ' +
  'VALUES ($1);';

const deleteWordRoot =
  'DELETE FROM public.radikoj ' +
  'WHERE radiko = $1;';

const getRelatedWords =
'SELECT radiko, vorto, difino, bildadreso ' +
'FROM difinoj ' +
'WHERE vorto LIKE $1;';

const upsertDefinition =
  'INSERT INTO public.difinoj (radiko, vorto, difino, bildadreso) ' +
  'VALUES ($1, $2, $3, $4) ' +
  'ON CONFLICT (radiko, vorto) DO UPDATE SET difino = excluded.difino, bildadreso = excluded.bildadreso;';

const deleteWord = 
  'DELETE FROM public.difinoj ' +
  'WHERE radiko = $1 ' +
  'AND vorto = $2;';

module.exports = {
  getWordRoots,
  getRelatedWords,
  addWordRoot,
  deleteWordRoot,
  upsertDefinition,
  deleteWord
};