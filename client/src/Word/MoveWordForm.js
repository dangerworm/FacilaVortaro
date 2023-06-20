import React, { useMemo } from 'react';
import { Alert, Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useDatabaseContext } from 'Contexts/DatabaseContext';

export const MoveWordForm = ({ word, setMovingWord }) => {
  const { wordRoot, wordRootList, moveWord } = useDatabaseContext();

  const [newWordRootOption, setNewWordRootOption] = React.useState({ id: -1, label: '' });
  const [errorMessage, setErrorMessage] = React.useState('');

  const options = useMemo(() => wordRootList
    .filter(item => item.kapvorto !== wordRoot)
    .map((item, index) => (
      { id: index, label: item.kapvorto }
    )), [wordRootList, wordRoot]);

  const move = () => {
    if (!wordRootList
      .map(w => w.kapvorto)
      .includes(newWordRootOption.label)) {
      setErrorMessage('Tiu kapvorto ne ekzistas en la datumbazo.');
      return;
    }

    moveWord(word, wordRoot, newWordRootOption.label)
    setErrorMessage('');
  };

  return (
    <>
      <Grid item xs={6} sx={{ p: 1, textAlign: 'left' }}>
        <Autocomplete
          id={'word-root-options'}
          fullWidth
          options={options}
          renderInput={(params) =>
            <TextField {...params} label={'Nova kapvorto'} />}
          value={newWordRootOption}
          onChange={(e, value) => setNewWordRootOption(value)}
        />
      </Grid>
      <Grid item xs={6} sx={{ p: 1, textAlign: 'left', mt: 1 }}>
        <Button variant={'outlined'} color={'success'} onClick={move}>
          Movu
        </Button>
        <Button variant={'outlined'} color={'warning'} sx={{ ml: 2 }} onClick={() => setMovingWord(false)}>
          Nuligu
        </Button>
      </Grid>
      {errorMessage && (
        <Grid item xs={12} sx={{ m: 0, p: 0, textAlign: 'left' }}>
          <Alert severity={'error'}>
            {errorMessage}
          </Alert>
        </Grid>
      )}
    </>
  );
}