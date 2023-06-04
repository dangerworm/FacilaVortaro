const getWords =
  'SELECT vorto, bildadreso FROM vortoj;';

const getWord =
  'SELECT vorto, bildadreso FROM vortoj WHERE vorto LIKE $1;';

const upsertWord =
  'INSERT INTO public.vortoj (vorto, bildadreso) ' +
  'VALUES ($1, $2) ' +
  'ON CONFLICT (vorto) DO UPDATE SET bildadreso = excluded.bildadreso;';

module.exports = {
  getWords,
  getWord,
  upsertWord
};