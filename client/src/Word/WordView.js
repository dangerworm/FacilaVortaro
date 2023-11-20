import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { ImageView } from './ImageView';

export const WordView = ({ word, startEditing }) => {
  const { vorto, difino, images } = word;
  const { userIsAdmin } = useAuthenticationContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ m: 0 }}>
        <Typography variant='h4' sx={{ m: '0.5em 0 0 0.1em', p: 0 }}>
          {vorto}
        </Typography>
      </Grid>
      {userIsAdmin && (
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button variant={'contained'} color={'secondary'} onClick={_ => startEditing()}>
            Redaktu
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sx={{ textAlign: 'left' }}>
        <Typography variant='body1' sx={{ mb: 1 }}>{difino}</Typography>
      </Grid>
      {images && images.map((image, index) => (
        <Grid key={index} item xs={image.larĝo} sx={{ textAlign: 'center' }}>
          <ImageView
            image={image}
            showEditControls={false}
          />
        </Grid>
      ))}
    </Grid>
  );
}
