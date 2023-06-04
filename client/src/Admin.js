import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useWordsContext } from './Contexts/WordsContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';

export const Admin = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const { addWordBase, addingWordBaseSuccessful, wordBaseError } = useWordsContext();

  const [wordBase, setWordBase] = React.useState('');
  const [showResponse, setShowResponse] = React.useState(false);

  const submitWordBase = () => {
    setShowResponse(true);
    addWordBase(wordBase);

    setTimeout(() => {
      setShowResponse(false);
    }, 4000);
  }

  return (
    <Paper sx={{ p: 4, pb: 5, minHeight: '50vh' }}>
      <Grid container spacing={2} textAlign={'left'}>
        {userIsAdmin && (
          <>
            <Grid item xs={12} sx={{ m: 0, p: 0 }}>
              <h1>Administrado</h1>
            </Grid >
            <Grid item xs={12} sx={{ m: 0, p: 0 }}>
              <h3 style={{ margin: 0 }}>Aldonu vortbazon</h3>
            </Grid >
            <Grid item xs={12} sx={{ m: 0, p: 0 }}>
              <>
                <TextField
                  fullWidth
                  id="wordBase"
                  label="Vortbazo"
                  variant="outlined"
                  value={wordBase}
                  onChange={(e) => setWordBase(e.target.value)}
                />
                {wordBaseError && (
                  <Typography variant={'caption'} sx={{ color: 'red' }}>
                    {wordBaseError}
                  </Typography>
                )}
                {showResponse && addingWordBaseSuccessful === true && (
                  <Typography variant={'caption'} sx={{ color: 'green' }}>
                    Vortbazo aldonita sukcese
                  </Typography>
                )}
              </>
            </Grid >
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button variant={'outlined'} color={'primary'} onClick={submitWordBase}>
                Aldonu
              </Button>
            </Grid>
          </>
        )}
      </Grid >
    </Paper >
  );
}
