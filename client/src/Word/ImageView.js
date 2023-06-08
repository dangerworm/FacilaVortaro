import { Grid, Link, Typography } from "@mui/material";
import React from "react";

export const ImageView = ({ image, startEditing }) => {
  const { bilddatumo, mimetipo, bildadreso, kredito } = image;

  return (
    <Grid container spacing={0} sx={{ mb: 2, textAlign: 'left' }}>
      {bilddatumo && mimetipo && (
        <Grid item xs={12}>
          <img src={`data:${mimetipo};base64,${bilddatumo}`} alt={''} style={{ maxWidth: '100%', borderRadius: '1em' }} />
        </Grid>
      )}
      {bildadreso && (
        <Grid item xs={12}>
          <Link href={bildadreso} target="_blank">Fonto</Link>
        </Grid>
      )}
      {kredito && (
        <Grid item xs={12}>
          <Typography variant={'caption'}>{kredito}</Typography>
        </Grid>
      )}
    </Grid>
  )
}
