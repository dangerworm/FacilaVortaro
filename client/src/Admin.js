import React, { useEffect } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDatabaseContext } from './Contexts/DatabaseContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { Loading } from 'Loading';

export const Admin = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const { addWordRoot, addingWordRoot, addingWordRootSuccessful, newWordRootError, setWordRoot } = useDatabaseContext();
  const navigate = useNavigate();

  const [newWordRoot, setNewWordRoot] = React.useState('');
  const [showResponse, setShowResponse] = React.useState(false);

  const onSuccess = () => {
    setWordRoot(newWordRoot);
    navigate(`/`);
  }

  const submitWordRoot = () => {
    addWordRoot(newWordRoot, onSuccess);
  }

  useEffect(() => {
    if (!addingWordRootSuccessful) {
      setShowResponse(true);

      setTimeout(() => {
        setShowResponse(false);
      }, 4000);
    }
  }, [addingWordRootSuccessful]);

  return (
    <Paper sx={{ p: 4, pb: 5, minHeight: '50vh' }}>
      {userIsAdmin && (
        <Grid container spacing={2} textAlign={'left'}>
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
                id="newWordRoot"
                label="kapvorto"
                variant="outlined"
                value={newWordRoot}
                onChange={(e) => setNewWordRoot(e.target.value)}
              />
              {newWordRootError && (
                <Typography variant={'caption'} sx={{ color: 'red' }}>
                  {newWordRootError}
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
          {addingWordRoot && (
            <Grid item xs={12} sx={{ m: 0, p: 0, textAlign: 'center' }}>
              <Loading />
            </Grid >
          )}
        </Grid >
      )}
    </Paper >
  );
}
