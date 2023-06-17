import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useDatabaseContext } from './Contexts/DatabaseContext';
import { Loading } from 'Loading';
import { WordView } from 'Word/WordView';
import { WordForm } from 'Word/WordForm';
import { WordRootView } from 'WordRoot/WordRootView';
import { WordRootForm } from 'WordRoot/WordRootForm';

export const WordRoot = () => {
  const {
    wordRoot,
    setWordRoot,
    updateWordRoot,
    loadingRelatedWords,
    setRelatedWords,
    relatedWords,
    deleteWordRoot,
    upsertWord,
    deleteWord } = useDatabaseContext();

  const [editingWordRoot, setEditingWordRoot] = React.useState(false);
  const [addingNewWord, setAddingNewWord] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [wordBeingEdited, setWordBeingEdited] = React.useState({});


  const clearControls = (editIndex = -1) => {
    setAddingNewWord(false);
    setEditIndex(editIndex);
    setWordBeingEdited({});
  }

  const deleteCurrentWordRoot = () => {
    deleteWordRoot(wordRoot);
    setWordRoot('');
    setRelatedWords([]);
    setEditIndex(-1);
  }

  const editWordRoot = () => {
    setEditingWordRoot(true);
  }

  const saveWordRoot = (malnovaKapvorto, novaKapvorto) => {
    updateWordRoot(malnovaKapvorto, novaKapvorto)
      .then(() => {
        setWordRoot(novaKapvorto);
      });
    setEditingWordRoot(false);
  }

  const cancelEditingWordRoot = () => {
    setEditingWordRoot(false);
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
          {wordRoot && !editingWordRoot && <WordRootView addNewWord={addNewWord} editWordRoot={editWordRoot} />}
          {wordRoot && editingWordRoot && <WordRootForm saveWordRoot={saveWordRoot} cancelEditing={cancelEditingWordRoot} deleteWordRoot={deleteCurrentWordRoot} />}
          {loadingRelatedWords && (
            <Grid item xs={12} sx={{ ml: 2, mr: 2, textAlign: 'center' }}>
              <Loading />
            </Grid>
          )}
          {relatedWords && relatedWords.map((word, index) => (
            <Grid key={index} item xs={12}>
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
            </Grid>
          ))}
        </Grid>
      </Paper >
    </>
  );
}
