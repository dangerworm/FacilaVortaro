const getWordBases =
  'SELECT vortbazo ' +
  'FROM public.vortbazoj;';

const getRelatedWords =
  'SELECT vorto, difino, bildadreso ' +
  'FROM difinoj ' +
  'WHERE vorto LIKE $1;';

const addWordBase =
  'INSERT INTO public.vortbazoj (vortbazo) ' +
  'VALUES ($1);';

const deleteWordBase =
  'DELETE FROM public.vortbazoj ' +
  'WHERE vortbazo = $1;';

const upsertDefinition =
  'INSERT INTO public.difinoj (vorto, difino, bildadreso) ' +
  'VALUES ($1, $2, $3) ' +
  'ON CONFLICT (vorto) DO UPDATE SET difino = excluded.difino, bildadreso = excluded.bildadreso;';

module.exports = {
  getWordBases,
  getRelatedWords,
  addWordBase,
  deleteWordBase,
  upsertDefinition
};