import React, { useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useDatabaseContext } from './Contexts/DatabaseContext';
import { Loading } from 'Loading';
import { WordView } from 'Word/WordView';
import { WordForm } from 'Word/WordForm';
import { WordRootView } from 'WordRoot/WordRootView';
import { WordRootForm } from 'WordRoot/WordRootForm';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    if (wordRoot) {
      cancelEditingWordRoot();
      cancelEditing();
    }
  }, [wordRoot])

  return (
    <>
      <Paper sx={{ p: 2, px: 5, pb: 5, minHeight: '50vh' }}>
        <Grid container spacing={2} textAlign={'left'}>
          {!wordRoot && (
            <Grid item xs={12} sx={{ m: 2 }}>
              <Typography variant={"h3"}>Difinaro</Typography>
              <Typography variant={"h5"}>La difinoj de uea.facila</Typography>
              <Typography variant={"body1"} sx={{ my: 2 }}>
                Ĉi tiu Difinaro prezentas ĉiujn difinojn iam aperintajn en artikoloj en la facil-lingva
                retejo <Link to={'https://uea.facila.org/'} target={'_blank'}>uea.facila</Link>. Ili estas verkitaj per simpla
                lingvaĵo, uzante nur vortojn el la <Link to={'/vortlisto'}>vortlisto de uea.facila</Link>
                , laŭeble ankaŭ kun ilustraĵoj. Tial la Difinaro estas utila rimedo por
                lernantoj kaj instruistoj.
              </Typography>
              <Typography variant={"body1"} sx={{ my: 2 }}>
                Por utiligi la Difinaron, kiel ankaŭ por legi artikolojn en uea.facila, lernantoj devas jam
                koni kaj kompreni la bazan vortprovizon, kiu aperas en la vortlisto. Tial la eroj de la
                vortlisto mem ne ricevas difinon, ĉar ni supozas, ke la uzantoj jam konas ilin.
              </Typography>
              <Typography variant={"body1"} sx={{ my: 2 }}>
                Al la Difinaro ĉiusemajne aldoniĝas novaj eroj. Preskaŭ ĉiu nova artikolo en uea.facila
                enhavas vortojn, kiuj ne estas en la vortlisto, kaj kiuj bezonas difinojn verkitajn per simpla
                lingvaĵo. Tial la Difinaro konstante kreskas kaj iom post iom kompletiĝas.
              </Typography>
              <Typography variant={"body1"} sx={{ my: 2 }}>
                Se vi deziras mem verki artikolon por uea.facila, eblas kontroli la enhavon
                per <Link to={'/facililo'}>Facililo</Link>.
              </Typography>
              <Typography variant={"body1"} sx={{ my: 2 }}>
                La Difinaro estis kreita de <Link color="inherit" to="https://twitter.com/dangerworm/" target='_blank'>
                  Drew Morgan
                </Link> kaj <Link color="inherit" to="https://en.wikipedia.org/wiki/Anna_L%C3%B6wenstein" target='_blank'>
                  Anna Lowenstein
                </Link> per subvencio de ESF. Ni dankas ESF pro ĝia subteno.
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
