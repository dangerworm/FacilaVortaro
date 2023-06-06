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
  'SELECT kapvorto, vorto, difino ' +
  'FROM public.difinoj' + 
  'WHERE kapvorto = $1';

const upsertDefinition =
  'INSERT INTO public.difinoj (kapvorto, vorto, difino) ' +
  'VALUES ($1, $2, $3) ' +
  'ON CONFLICT (kapvorto, vorto) DO UPDATE SET difino = excluded.difino';

const deleteWord = 
  'DELETE FROM public.difinoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2;';

const getImages =
  'SELECT kapvorto, vorto, "reteja_adreso", kredito ' +
  'FROM public.bildoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2';

const upsertImage =
  'INSERT INTO public.bildoj (kapvorto, vorto, "reteja_adreso", kredito) ' +
  'VALUES ($1, $2, $3, $4) ' +
  'ON CONFLICT (kapvorto, vorto) DO UPDATE SET "reteja_adreso" = excluded."reteja_adreso", kredito = excluded.kredito';

const deleteImage =
  'DELETE FROM public.bildoj ' +
  'WHERE kapvorto = $1 ' +
  'AND vorto = $2';

module.exports = {
  getWordRoots,
  addWordRoot,
  deleteWordRoot,
  getRelatedWords,
  upsertDefinition,
  deleteWord,
  getImages,
  upsertImage,
  deleteImage,
};