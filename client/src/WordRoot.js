import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useDatabaseContext } from './Contexts/DatabaseContext';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { Loading } from 'Loading';
import { WordView } from 'Word/WordView';
import { WordForm } from 'Word/WordForm';
import { removePunctuation } from 'Helpers/word-display';
import ConfirmationDialog from 'ConfirmationDialog';

export const WordRoot = () => {
  const { userIsAdmin } = useAuthenticationContext();
  const {
    wordRoot,
    setWordRoot,
    loadingRelatedWords,
    setRelatedWords,
    relatedWords,
    deleteWordRoot,
    upsertWord,
    deleteWord } = useDatabaseContext();

  const [addingNewWord, setAddingNewWord] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [wordBeingEdited, setWordBeingEdited] = React.useState({});
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = React.useState(false);

  const deleteCurrentWordRoot = () => {
    deleteWordRoot(wordRoot);
    setWordRoot('');
    setRelatedWords([]);
    setEditIndex(-1);
  }

  const openDeleteConfirmationDialog  = () => {
    setShowDeleteConfirmationDialog(true);
  }

  const closeDeleteConfirmationDialog = () => {
    setShowDeleteConfirmationDialog(false);
  }

  const clearControls = (editIndex = -1) => {
    setAddingNewWord(false);
    setEditIndex(editIndex);
    setWordBeingEdited({});
  }

  const addNewWord = () => {
    if (addingNewWord) {
      return;
    }

    const blankWord = {
      kapvorto: wordRoot,
      vorto: '',
      difino: '',
      bildadreso: '',
      images: []
    };

    setAddingNewWord(true);
    setEditIndex(relatedWords.length);
    setRelatedWords(current => [...current, blankWord]);
    setWordBeingEdited(blankWord);
  }

  const startEditing = (index) => {
    setEditIndex(index);
    setWordBeingEdited(relatedWords[index]);
  }

  const saveEdits = (index) => {
    setRelatedWords(current => current.map((word, i) => i === index ? wordBeingEdited : word));
    upsertWord(wordBeingEdited);
    clearControls();
  }

  const cancelEditing = (index) => {
    if (addingNewWord) {
      setRelatedWords(current => current.map((word, i) => i !== index));
    }
    
    clearControls();
  }

  const deleteCurrentWord = (index) => {
    setRelatedWords(current => current.map((word, i) => i !== index));
    deleteWord(wordRoot, relatedWords[index].vorto);
    clearControls();
  }

  return (
    <>
    <Paper sx={{ p: 2, pl: 5, pr: 5, pb: 5, minHeight: '50vh' }}>
      <Grid container spacing={2} textAlign={'left'}>
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
            <h1 style={{ marginTop: '1em' }}>{removePunctuation(wordRoot)}</h1>
          </Grid>
        )}
        {wordRoot && userIsAdmin && (
          <Grid item xs={8} sx={{ marginTop: '2.5em', textAlign: 'right' }}>
            <Button variant='outlined' color={'primary'} onClick={addNewWord}>
              Aldonu vorton
            </Button>
            <Button variant='outlined' color={'error'} style={{ marginLeft: '1em' }} onClick={openDeleteConfirmationDialog}> {/*deleteCurrentWordRoot}>*/}
              Forigu kapvorton
            </Button>
          </Grid>
        )}
        {loadingRelatedWords && (
          <Grid item xs={12} sx={{ ml: 2, mr: 2, textAlign: 'center' }}>
            <Loading />
          </Grid>
        )}
        {relatedWords && relatedWords.map((word, index) => (
          <>
            {(wordBeingEdited.kapvorto !== wordRoot || editIndex !== index) && (
              <WordView
                key={index}
                word={word}
                startEditing={_ => startEditing(index)} />
            )}
            {wordBeingEdited.kapvorto === wordRoot && editIndex === index && (
              <WordForm
                key={index}
                word={wordBeingEdited}
                setWord={setWordBeingEdited}
                isNewWord={addingNewWord}
                saveWordEdits={saveEdits}
                cancelWordEditing={_ => cancelEditing(index)}
                deleteWord={_ => deleteCurrentWord(index)} />
            )}
          </>
        ))}
      </Grid>
    </Paper >
    <ConfirmationDialog
      open={showDeleteConfirmationDialog}
      title={'Ĉu vi certas?'}
      contentText1={'Ĉi tio forigos ĉi tiun kapvorton, ĉiujn ĝiajn difinojn, kaj ĉiujn rilatajn bildojn.'}
      contentText2={`Ĉu vi vere volas forigi la kapvorton "${wordRoot}"?`}
      cancelButtonText={'Nuligu'}
      confirmButtonText={'Konfirmu'}
      onClose={closeDeleteConfirmationDialog}
      onConfirm={deleteCurrentWordRoot} />
    </>
  );
}
