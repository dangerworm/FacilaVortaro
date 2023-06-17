import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { ImageView } from './ImageView';
import { ImageForm } from './ImageForm';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { removePunctuation } from 'Helpers/word-display';

export const WordForm = ({ word, setWord, isNewWord, saveWordEdits, cancelWordEditing, deleteWord }) => {
  const [addingNewImage, setAddingNewImage] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [imageBeingEdited, setImageBeingEdited] = React.useState(null);

  const clearControls = (editIndex = -1) => {
    setAddingNewImage(false);
    setEditIndex(editIndex);
    setImageBeingEdited(null);
  }

  const addNewImage = () => {
    if (addingNewImage) {
      return;
    }

    const blankImage = {
      kapvorto: '',
      vorto: '',
      indekso: word.images?.length ?? 0,
      bilddatumo: '',
      mimetipo: '',
      bildadreso: '',
      atribuo: ''
    };

    setAddingNewImage(true);
    setEditIndex(word.images?.length ?? 0);
    setWord(current => ({
      ...current, images: [...current.images ?? [], blankImage]
    }));
    setImageBeingEdited(blankImage);
  }

  const startEditing = (index) => {
    setEditIndex(index);
    setImageBeingEdited(word.images[index]);
  }

  const saveImageEdits = (index) => {
    setWord(current => ({ ...current, images: current.images.map((image, i) => i === index ? imageBeingEdited : image) }))
    clearControls();
  }

  const cancelEditing = (index) => {
    if (addingNewImage) {
      setWord(current => ({ ...current, images: current.images.filter((_, i) => i !== index) }))
    }

    clearControls();
  }

  const deleteCurrentImage = (index) => {
    setWord(current => ({ 
      ...current,
      images: current.images
        .filter((_, i) => i !== index)
        .map((image, i) => ({ ...image, indekso: i }))
    }));

    clearControls();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ m: 0 }}>
        {isNewWord && (
          <TextField
            fullWidth
            label={'Nova vorto'}
            value={word.vorto}
            onChange={(e) => setWord(current => ({ ...current, vorto: e.target.value }))}
            sx={{ mb: 2 }}
          />
        )}
        {!isNewWord && (
          <h3 style={{ margin: '0.5em 0 0 0.1em' }}>{removePunctuation(word.vorto)}</h3>
        )}
      </Grid>
      <Grid item xs={6} sx={{ textAlign: 'right' }}>
        <Button variant={'outlined'} color={'success'} disabled={imageBeingEdited !== null} sx={{ mr: 2 }} onClick={saveWordEdits}>
          Konservu
        </Button>
        <Button variant={'outlined'} color={'warning'} sx={{ mr: 2 }} onClick={cancelWordEditing}>
          Nuligu
        </Button>
        <Button variant={'outlined'} color={'error'} onClick={deleteWord}>
          Forigu
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, textAlign: 'left' }}>
        <TextField
          fullWidth
          label={'Difino'}
          value={word.difino}
          onChange={(e) => setWord(current => ({ ...current, difino: e.target.value }))}
          sx={{ mb: 2 }}
        />
      </Grid>
      {word.images && word.images.map((image, index) => (
        <>
          {editIndex !== index && (
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <ImageView
                key={index}
                image={image}
                showEditControls={true}
                startEditing={_ => startEditing(index)}
                deleteImage={_ => deleteCurrentImage(index)}
              />
            </Grid>
          )}
          {editIndex === index && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <ImageForm
                image={imageBeingEdited}
                setImage={setImageBeingEdited}
                isNewImage={addingNewImage}
                saveEdits={_ => saveImageEdits(index)}
                cancelEditing={_ => cancelEditing(index)} />
            </Grid>
          )}
        </>
      ))}
      {!addingNewImage && (
        <Grid item xs={6} sx={{ p: 1, textAlign: 'left' }}>
          <Button variant={'outlined'} color={'success'} startIcon={<AddPhotoAlternateIcon />} onClick={addNewImage}>
            Aldonu bildon
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
