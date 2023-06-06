import React from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useWordsContext } from './Contexts/WordsContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { Loading } from 'Loading';

export const Word = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const { wordRoot, setWordRoot, loadingRelatedWords, setRelatedWords, getRelatedWords, relatedWords, deleteWordRoot, upsertWord, deleteWord } = useWordsContext();

  const [addingNewWord, setAddingNewWord] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [wordBeingEdited, setWordBeingEdited] = React.useState('');
  const [newDefinition, setNewDefinition] = React.useState('');
  const [newImageAddress, setNewImageAddress] = React.useState('');

  const deleteCurrentWordRoot = () => {
    deleteWordRoot(wordRoot);
    setWordRoot('');
    setEditIndex(-1);
  }

  const addNewWord = () => {
    setAddingNewWord(true);
    setEditIndex(relatedWords.length);
    setRelatedWords(current => [...current, { vorto: '', difino: '', bildadreso: '' }]);
    setNewDefinition('');
    setNewImageAddress('');
  }

  const startEditing = (index, difino, bildadreso) => {
    setEditIndex(index);
    setWordBeingEdited(relatedWords[index].vorto);
    setNewDefinition(difino);
    setNewImageAddress(bildadreso);
  }

  const saveEdits = (vorto, difino, bildadreso) => {
    upsertWord(wordRoot, editIndex > -1 ? wordBeingEdited : vorto, difino, bildadreso);
    setAddingNewWord(false);
    setEditIndex(-1);
    setWordBeingEdited('');
    setNewDefinition('');
    setNewImageAddress('');
  }

  const cancelEditing = () => {
    setAddingNewWord(false);
    setWordBeingEdited('');
    setNewDefinition('');
    setNewImageAddress('');
    setEditIndex(-1);
    getRelatedWords(wordRoot);
  }

  const deleteCurrentWord = (vorto) => {
    deleteWord(wordRoot, vorto);
    setEditIndex(-1);
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
          {loadingRelatedWords && (
            <Grid item xs={12} sx={{ ml: 2, mr: 2, textAlign: 'center' }}>
              <Loading />
            </Grid>
          )}
          {relatedWords && relatedWords.map(({ vorto, difino, bildadreso }, index) => (
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
                  {editIndex === index && addingNewWord && (
                    <TextField
                      fullWidth
                      label={'Vorto'}
                      value={wordBeingEdited}
                      onChange={(e) => setWordBeingEdited(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  {(editIndex !== index || !addingNewWord) && (
                    <h3 style={{ margin: 0 }}>{vorto}</h3>
                  )}
                </Grid>
                {editIndex !== index && (
                  <>
                    {userIsAdmin && editIndex !== index && (
                      <Grid item xs={6} sx={{ pr: 3, marginTop: '-5px', textAlign: 'right' }}>
                        <Button variant={'outlined'} color={'secondary'} onClick={() => startEditing(index, difino, bildadreso)}>
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
                {userIsAdmin && editIndex === index && (
                  <>
                    <Grid item xs={6} sx={{ pr: 3, textAlign: 'right' }}>
                      <Button variant={'outlined'} color={'success'} sx={{ mr: 2 }} onClick={() => saveEdits(vorto, newDefinition, newImageAddress)}>
                        Konservu
                      </Button>
                      <Button variant={'outlined'} color={'warning'} sx={{ mr: 2 }} onClick={() => cancelEditing()}>
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
