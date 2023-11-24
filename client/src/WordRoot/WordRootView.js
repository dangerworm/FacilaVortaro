import { Button, Grid, Typography } from '@mui/material';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { useDatabaseContext } from 'Contexts/DatabaseContext';
import React from 'react';

export const WordRootView = ({ addNewWord, editWordRoot }) => {
  const { userIsAdmin } = useAuthenticationContext();
  const { wordRoot } = useDatabaseContext();

  return (
    <>
      {!userIsAdmin && (
        <Grid item xs={12}>
          <Typography variant={"h3"} sx={{ mt: 3 }}>
            {wordRoot}
          </Typography>
        </Grid>
      )}
      {userIsAdmin && (
        <>
          <Grid item xs={4}>
            <Typography variant={"h3"} sx={{ mt: 3 }}>
              {wordRoot}
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{ marginTop: '2em', textAlign: 'right' }}>
            <Button variant='contained' color={'primary'} onClick={addNewWord}>
              Aldonu vorton
            </Button>
            <Button variant={'contained'} color={'secondary'} style={{ marginLeft: '1em' }} onClick={editWordRoot}>
              Redaktu kapvorton
            </Button>
          </Grid>
        </>
      )}
    </>
  )
}