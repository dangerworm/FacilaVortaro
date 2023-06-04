import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useWordsContext } from './Contexts/WordsContext';

export const Word = () => {
  const { word } = useWordsContext();

  return (
    <Grid container spacing={2} textAlign={'left'}>
      <Grid item xs={12} sx={{ ml: 2, mr: 2 }}>
        {!word && (
          <>
            <h1>Bonvenon!</h1>
            <Typography variant={'subtitle1'}>Bonvolu serĉi kaj elekti vorton per la flanka stango.</Typography>
          </>
        )}
        {word && (
          <h1>{word}</h1>
        )}
      </Grid>
    </Grid>
  );
}

