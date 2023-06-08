import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { ImageView } from './ImageView';
import { removePunctuation } from 'Helpers/word-display';

export const WordView = ({ word, startEditing }) => {
  const { vorto, difino, images } = word;
  const { userIsAdmin } = useAuthenticationContext();

  return (
    <Grid container spacing={2} sx={{ ml: 0, mt: 2, textAlign: 'left' }}>
      <Grid item xs={6} sx={{ m: 0 }}>
        <h3 style={{ margin: '0.5em 0 0 0.1em' }}>{removePunctuation(vorto)}</h3>
      </Grid>
      {userIsAdmin && (
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button variant={'outlined'} color={'secondary'} onClick={_ => startEditing()}>
            Redaktu
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sx={{ textAlign: 'left' }}>
        <Typography variant='body1' sx={{ mb: 1 }}>{difino}</Typography>
      </Grid>
      {images && images.map((image, index) => (
        <Grid key={index} item xs={3} sx={{ textAlign: 'center' }}>
          <ImageView
            image={image}
            startEditing={startEditing} />
        </Grid>
      ))}
    </Grid>
  );
}
