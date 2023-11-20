import { EditNote, HideImage } from "@mui/icons-material";
import { Button, Grid, Link, Typography } from "@mui/material";
import React from "react";

export const ImageView = ({ image, showEditControls, startEditing = () => { }, deleteImage = () => { } }) => {
  const { bilddatumo, mimetipo, bildadreso, atribuo } = image;

  return (
    <Grid container spacing={0} sx={{ mb: 2, textAlign: 'left' }}>
      {bilddatumo && mimetipo && (
        <Grid item xs={12}>
          <img src={`data:${mimetipo};base64,${bilddatumo}`} alt={''} style={{ width: '100%', borderRadius: '1em' }} />
        </Grid>
      )}
      {bildadreso && (
        <>
          <Grid item xs={12} sx={{ pt: 0.5 }}>
            <Link href={bildadreso} target="_blank">Fonto</Link>
          </Grid>
          {showEditControls && (
            <>
              <Grid item xs={12} sx={{ textAlign: 'right', mb: 1 }}>
                <Button variant="contained" color="secondary" size="small" startIcon={<EditNote />} onClick={startEditing}>Redaktu</Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained" color="error" size="small" startIcon={<HideImage />} onClick={deleteImage} sx={{ ml: 1 }}>Forigu</Button>
              </Grid>
            </>
          )}
        </>
      )}
      {atribuo && (
        <Grid item xs={12} sx={{ pt: 0.5 }}>
          <Typography variant={'caption'}>{atribuo}</Typography>
        </Grid>
      )}
    </Grid>
  )
}
