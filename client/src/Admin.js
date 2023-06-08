import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDatabaseContext } from './Contexts/DatabaseContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';

export const Admin = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const { addWordRoot, addingWordRootSuccessful, wordRootError } = useDatabaseContext();

  const [wordRoot, setWordRoot] = React.useState('');
  const [showResponse, setShowResponse] = React.useState(false);

  const submitWordRoot = () => {
    setShowResponse(true);
    addWordRoot(wordRoot);

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
              <h3 style={{ margin: 0 }}>Aldonu kapvorton</h3>
            </Grid >
            <Grid item xs={12} sx={{ m: 0, p: 0 }}>
              <>
                <TextField
                  fullWidth
                  id="wordRoot"
                  label="kapvorto"
                  variant="outlined"
                  value={wordRoot}
                  onChange={(e) => setWordRoot(e.target.value)}
                />
                {wordRootError && (
                  <Typography variant={'caption'} sx={{ color: 'red' }}>
                    {wordRootError}
                  </Typography>
                )}
                {showResponse && addingWordRootSuccessful === true && (
                  <Typography variant={'caption'} sx={{ color: 'green' }}>
                    Kapvorto aldonita sukcese
                  </Typography>
                )}
              </>
            </Grid >
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button variant={'outlined'} color={'primary'} onClick={submitWordRoot}>
                Aldonu
              </Button>
            </Grid>
          </>
        )}
      </Grid >
    </Paper >
  );
}
