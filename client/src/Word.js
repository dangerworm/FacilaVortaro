import React, { useEffect } from 'react';
import { Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { useWordsContext } from './Contexts/WordsContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { Loading } from 'Loading';

export const Word = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const {
    wordRoot,
    setWordRoot,
    loadingRelatedWords,
    setRelatedWords,
    getRelatedWords,
    relatedWords,
    images,
    deleteWordRoot,
    upsertWord,
    deleteWord } = useWordsContext();

  const [addingNewWord, setAddingNewWord] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [wordBeingEdited, setWordBeingEdited] = React.useState('');
  const [newDefinition, setNewDefinition] = React.useState('');
  const [newImageAddress, setNewImageAddress] = React.useState('');
  const [newFile, setNewFile] = React.useState(null);
  const [newImageData, setNewImageData] = React.useState(null);
  const [newMimeType, setNewMimeType] = React.useState('');
  const [newCredit, setNewCredit] = React.useState('');

  const deleteCurrentWordRoot = () => {
    deleteWordRoot(wordRoot);
    setWordRoot('');
    setEditIndex(-1);
  }

  const clearControls = (editIndex = -1) => {
    setEditIndex(editIndex);
    setWordBeingEdited('');
    setNewDefinition('');
    setNewImageAddress('');
    setNewImageData(null);
    setNewMimeType('');
    setNewCredit('');
  }

  const addNewWord = () => {
    setAddingNewWord(true);
    setRelatedWords(current => [...current, { vorto: '', difino: '', bildadreso: '' }]);
    clearControls(relatedWords.length);
  }

  const startEditing = (index, difino, images) => {
    setEditIndex(index);
    setWordBeingEdited(relatedWords[index].vorto);
    setNewDefinition(difino);
    setNewImageData(images[0].bilddatumo);
    setNewMimeType(images[0].mimetipo);
    setNewImageAddress(images[0].bildadreso);
    setNewCredit(images[0].kredito);
  }

  const saveEdits = (vorto, difino, bilddatumo, mimetipo, bildadreso, kredito) => {
    upsertWord(
      editIndex > -1 ? wordBeingEdited : vorto,
      difino,
      bilddatumo,
      mimetipo,
      bildadreso,
      kredito);
    setAddingNewWord(false);
    clearControls();
  }

  const cancelEditing = () => {
    setAddingNewWord(false);
    clearControls();

    getRelatedWords(wordRoot);
  }

  const deleteCurrentWord = (vorto) => {
    deleteWord(wordRoot, vorto);
    setEditIndex(-1);
  }

  useEffect(() => {
    if (!newFile) {
      return;
    }

    setNewMimeType(newFile.type);

    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setNewImageData(base64String);
    };
  }, [newFile]);

  return (
    <Paper sx={{ p: 2, pl: 5, pr: 5, pb: 5, minHeight: '50vh' }}>
      <Grid container spacing={2} textAlign={'left'}>
        <>
          {!wordRoot && (
            <Grid item xs={12} sx={{ ml: 2, mr: 2 }}>
              <h1>Bonvenon!</h1>
              <Typography variant={'subtitle1'}>
                Bonvolu serĉi kaj elekti vorton el la listo maldekstre.
              </Typography>
            </Grid>
          )}
          {wordRoot && (
            <Grid item xs={4}>
              <h1 style={{ marginTop: '1em' }}>{wordRoot}</h1>
            </Grid>
          )}
          {userIsAdmin && wordRoot && (
            <Grid item xs={8} sx={{ marginTop: '2.5em', textAlign: 'right' }}>
              <Button variant='outlined' color={'primary'} onClick={() => addNewWord()}>
                Aldonu vorton
              </Button>
              <Button variant='outlined' color={'error'} style={{ marginLeft: '1em' }} onClick={() => deleteCurrentWordRoot()}>
                Forigu kapvorton
              </Button>
            </Grid>
          )}
          {loadingRelatedWords && (
            <Grid item xs={12} sx={{ ml: 2, mr: 2, textAlign: 'center' }}>
              <Loading />
            </Grid>
          )}
          {relatedWords && relatedWords.map(({ vorto, difino }, index) => (
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
                        <Button variant={'outlined'} color={'secondary'} onClick={() => startEditing(index, difino, images)}>
                          Redaktu
                        </Button>
                      </Grid>
                    )}
                    <Grid item xs={12} sx={{ pr: 3, mt: 1, textAlign: 'left' }}>
                      <p style={{ margin: 0 }}>{difino}</p>
                      {images.filter(i => i.bilddatumo).length > 0 && images.map(({ bilddatumo, mimetipo, bildadreso, kredito }) => (
                        <>
                          <img key={index} src={`data:${mimetipo};base64,${bilddatumo}`} alt={vorto} style={{ maxWidth: '50%', marginTop: '1em', borderRadius: '1em' }} />
                          {bildadreso && (
                            <Link href={bildadreso}>{bildadreso}</Link>
                          )}
                          {kredito && (
                            <p>Kredito: {kredito}</p>
                          )}
                        </>
                      ))}
                    </Grid>
                  </>
                )}
                {userIsAdmin && editIndex === index && (
                  <>
                    <Grid item xs={6} sx={{ pr: 3, textAlign: 'right' }}>
                      <Button variant={'outlined'} color={'success'} sx={{ mr: 2 }} onClick={
                        () => saveEdits(
                          vorto,
                          newDefinition,
                          newImageData,
                          newMimeType,
                          newImageAddress,
                          newCredit)
                      }>
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
                    <Grid item xs={3} sx={{ pr: 3, textAlign: 'left' }}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            setNewFile(e.target.files[0]);
                          }
                        }}
                      />
                      <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span" sx={{ mb: 2 }}>
                          Alŝutu bildon
                        </Button>
                      </label>
                    </Grid>
                    {newFile && (
                      <Grid item xs={9} sx={{ pr: 3, mt: 0.6, textAlign: 'left' }}>
                        {newFile.name}
                      </Grid>
                    )}
                    <Grid item xs={12} sx={{ pr: 3, textAlign: 'left' }}>
                      <TextField
                        fullWidth
                        label={'Bildadreso'}
                        value={newImageAddress}
                        onChange={(e) => setNewImageAddress(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ pr: 3, textAlign: 'left' }}>
                      <TextField
                        fullWidth
                        label={'Kredito'}
                        value={newCredit}
                        onChange={(e) => setNewCredit(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ pr: 3, textAlign: 'center' }}>
                      {!newImageData && images.filter(i => i.bilddatumo).length > 0 && images.map(({ bilddatumo, mimetipo }, index) => (
                        <img key={index} src={`data:${mimetipo};base64,${bilddatumo}`} alt={vorto} style={{ maxWidth: '50%', marginTop: '1em', borderRadius: '1em' }} />
                      ))}
                      {newImageData && (
                        <img src={`data:${newMimeType};base64,${newImageData}`} alt={vorto} style={{ maxWidth: '50%', marginTop: '1em', borderRadius: '1em' }} />
                      )}
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
