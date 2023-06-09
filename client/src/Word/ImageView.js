import { EditNote, HideImage } from "@mui/icons-material";
import { Button, Grid, Link, Typography } from "@mui/material";
import React from "react";

export const ImageView = ({ image, showEditControls, startEditing = () => {}, deleteImage = () => {} }) => {
  const { bilddatumo, mimetipo, bildadreso, atribuo } = image;

  return (
    <Grid container spacing={0} sx={{ mb: 2, textAlign: 'left' }}>
      {bilddatumo && mimetipo && (
        <Grid item xs={12}>
          <img src={`data:${mimetipo};base64,${bilddatumo}`} alt={''} style={{ maxWidth: '100%', borderRadius: '1em' }} />
        </Grid>
      )}
      {bildadreso && (
        <>
          <Grid item xs={4} sx={{ pt: 0.5 }}>
            <Link href={bildadreso} target="_blank">Fonto</Link>
          </Grid>
          {showEditControls && (
            <Grid item xs={8} sx={{ textAlign: 'right' }}>
              <Button variant="outlined" color="warning" size="small" startIcon={<EditNote />} onClick={startEditing}>Redaktu</Button>
              <Button variant="outlined" color="error" size="small" startIcon={<HideImage />} onClick={deleteImage} sx={{ ml: 1 }}>Forigu</Button>
            </Grid>
          )}
        </>
      )}
      {atribuo && (
        <Typography variant={'caption'}>{atribuo}</Typography>
      )}
    </Grid>
  )
}
