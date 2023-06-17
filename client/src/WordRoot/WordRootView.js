import { Button, Grid } from '@mui/material';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { useDatabaseContext } from 'Contexts/DatabaseContext';
import { removePunctuation } from 'Helpers/word-display';
import React from 'react';

export const WordRootView = ({ addNewWord, editWordRoot }) => {
  const { userIsAdmin } = useAuthenticationContext();
  const {
    wordRoot,
    setWordRoot,
  } = useDatabaseContext();

  return (
    <>
      {!userIsAdmin && (
        <Grid item xs={12}>
          <h1 style={{ marginTop: '1em' }}>{removePunctuation(wordRoot)}</h1>
        </Grid>
      )}
      {userIsAdmin && (
        <>
          <Grid item xs={4}>
            <h1 style={{ marginTop: '1em' }}>{removePunctuation(wordRoot)}</h1>
          </Grid>
          <Grid item xs={8} sx={{ marginTop: '2em', textAlign: 'right' }}>
            <Button variant='outlined' color={'primary'} onClick={addNewWord}>
              Aldonu vorton
            </Button>
            <Button variant={'outlined'} color={'secondary'} style={{ marginLeft: '1em' }} onClick={editWordRoot}>
              Redaktu kapvorton
            </Button>
          </Grid>
        </>
      )}
    </>
  )
}