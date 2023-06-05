import React from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useWordsContext } from './Contexts/WordsContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';

export const Word = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const { wordRoot, setWordRoot, getRelatedWords, setRelatedWords, relatedWords, deleteWordRoot, upsertWord, deleteWord } = useWordsContext();

  const [addingNewWord, setAddingNewWord] = React.useState(false);
  const [wordBeingEdited, setWordBeingEdited] = React.useState('');
  const [newDefinition, setNewDefinition] = React.useState('');
  const [newImageAddress, setNewImageAddress] = React.useState('');
  
  const deleteCurrentWordRoot = () => {
    deleteWordRoot(wordRoot);
    setWordRoot('');
    setWordBeingEdited('');
    setWordRoot('');
  }

  const addNewWord = () => {
    setRelatedWords(current => [...current, { vorto: '', difino: '', bildadreso: '' }]);
    setAddingNewWord(true);
    setWordBeingEdited('');
    setNewDefinition('');
    setNewImageAddress('');
  }

  const startEditing = (vorto, difino, bildadreso) => {
    setWordBeingEdited(vorto);
    setNewDefinition(difino);
    setNewImageAddress(bildadreso);
  }

  const saveEdits = (vorto, difino, bildadreso) => {
    upsertWord(wordRoot, addingNewWord ? wordBeingEdited : vorto, difino, bildadreso);
    setWordBeingEdited('');
    setNewDefinition('');
    setNewImageAddress('');
    setAddingNewWord(false);
  }

  const deleteCurrentWord = (vorto) => {
    deleteWord(wordRoot, vorto);
  }

  return (
    <Paper sx={{ p: 2, pl: 5, pr: 5, pb: 5, minHeight: '50vh' }}>
      <Grid container spacing={2} textAlign={'left'}>
        <>
          {!wordRoot && (
            <Grid item xs={12} sx={{ ml: 2, mr: 2 }}>
              <h1>Bonvenon!</h1>
              <Typography variant={'subtitle1'}>Bonvolu serĉi kaj elekti vorton per la flanka stango.</Typography>
            </Grid>
          )}
          {wordRoot && (
            <Grid item xs={4}>
              <h1 style={{ marginTop: '1em' }}>{wordRoot}-</h1>
            </Grid>
          )}
          {userIsAdmin && wordRoot && (
            <Grid item xs={8} sx={{ marginTop: '2.5em', textAlign: 'right' }}>
              <Button variant='outlined' color={'primary'} onClick={() => addNewWord()}>
                Aldonu vorton
              </Button>
              <Button variant='outlined' color={'error'} style={{ marginLeft: '1em' }} onClick={() => deleteCurrentWordRoot()}>
                Forigu radikon
              </Button>
            </Grid>
          )}
          {relatedWords && relatedWords.map(({ vorto, difino, bildadreso }) => (
            <Box
              key={vorto}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '2em',
                minWidth: '100px',
                minHeight: '100px',
                borderRadius: 1,
                width: '100%',
              }}
            >
              <Grid key={vorto} container spacing={0} style={{ marginLeft: '1em', textAlign: 'left' }}>
                <Grid item xs={6} sx={{ m: 0 }}>
                  {addingNewWord && (
                    <TextField
                      fullWidth
                      label={'Vorto'}
                      value={wordBeingEdited}
                      onChange={(e) => setWordBeingEdited(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  {!addingNewWord && (
                    <h3 style={{ margin: 0 }}>{vorto}</h3>
                  )}
                </Grid>
                {((!wordBeingEdited || wordBeingEdited !== vorto) && !addingNewWord) && (
                  <>
                    {userIsAdmin && (
                      <Grid item xs={6} sx={{ pr: 3, marginTop: '-5px', textAlign: 'right' }}>
                        <Button variant={'outlined'} color={'secondary'} onClick={() => startEditing(vorto, difino, bildadreso)}>
                          Redaktu
                        </Button>
                      </Grid>
                    )}
                    <Grid item xs={12} sx={{ pr: 3, mt: 1, textAlign: 'left' }}>
                      <p style={{ margin: 0 }}>{difino}</p>
                      {bildadreso && (
                        <>
                          <img src={bildadreso} alt={vorto} style={{ maxWidth: '50%', marginTop: '1em', borderRadius: '1em' }} />
                        </>
                      )}
                    </Grid>
                  </>
                )}
                {(wordBeingEdited === vorto || addingNewWord) && userIsAdmin && (
                  <>
                    <Grid item xs={6} sx={{ pr: 3, textAlign: 'right' }}>
                      <Button variant={'outlined'} color={'success'} sx={{ mr: 2 }} onClick={() => saveEdits(vorto, newDefinition, newImageAddress)}>
                        Konservu
                      </Button>
                      <Button variant={'outlined'} color={'warning'} sx={{ mr: 2 }} onClick={() => setWordBeingEdited('')}>
                        Nuligu
                      </Button>
                      <Button variant={'outlined'} color={'error'} onClick={() => deleteCurrentWord(vorto)}>
                        Forigu
                      </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2, pr: 3, textAlign: 'left' }}>
                      <TextField
                        fullWidth
                        label={'Difino'}
                        value={newDefinition}
                        onChange={(e) => setNewDefinition(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ pr: 3, textAlign: 'left' }}>
                      <TextField
                        fullWidth
                        label={'Bildadreso'}
                        value={newImageAddress}
                        onChange={(e) => setNewImageAddress(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ pr: 3, textAlign: 'center' }}>
                      <img src={newImageAddress} alt={vorto} style={{ maxWidth: '50%', marginTop: '1em', borderRadius: '1em' }} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          ))
          }
        </>
      </Grid>
    </Paper >
  );
}
