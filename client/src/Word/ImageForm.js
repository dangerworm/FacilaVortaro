import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";

export const ImageForm = ({ image, setImage, isNewImage, saveEdits, cancelEditing }) => {

  useEffect(() => {
    if (!image.file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image.file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setImage(current => ({ ...current, bilddatumo: base64String, mimetipo: image.file.type }));
    };
  }, [setImage, image.file]);

  return (
    <Grid container spacing={2} sx={{ p: 1, textAlign: 'left' }}>
      <Grid item xs={6} sx={{ m: 0 }} justifyContent={'left'}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setImage(current => ({ ...current, file: e.target.files[0] }));
            }
          }}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span">
            Alŝutu bildon
          </Button>
        </label>
        {image.file && (
          <p>
            {image.file.name}
          </p>
        )}      </Grid>
      <Grid item xs={6} sx={{ textAlign: 'right' }} justifyContent={'right'}>
        {image.bilddatumo && image.mimetipo && (
          <img src={`data:${image.mimetipo};base64,${image.bilddatumo}`} alt={''} style={{ maxWidth: '75%', borderRadius: '1em' }} />
        )}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'left' }}>
        <TextField
          fullWidth
          label={'Bildadreso'}
          value={image.bildadreso}
          onChange={(e) => setImage(current => ({ ...current, bildadreso: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'left' }}>
        <TextField
          fullWidth
          label={'Atribuo'}
          value={image.atribuo}
          onChange={(e) => setImage(current => ({ ...current, atribuo: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Button
          variant={'outlined'}
          color={'success'}
          onClick={saveEdits}>
          Konservu bildon
        </Button>
        <Button
          variant={'outlined'}
          color={'warning'}
          onClick={cancelEditing}
          sx={{ ml: 2 }}>
          Nuligu
        </Button>
      </Grid>
    </Grid>
  );
}
