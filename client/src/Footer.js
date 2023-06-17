import React from "react";
import { Grid, Link, Typography } from "@mui/material";

export const Footer = (props) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          { 'Vortaro por Lernantoj kreita de '}
          <Link color="inherit" href="https://en.wikipedia.org/wiki/Anna_L%C3%B6wenstein" target='_blank'>
            Anna Löwenstein
          </Link>
          &nbsp;kaj&nbsp;
          <Link color="inherit" href="https://twitter.com/dangerworm/" target='_blank'>
            Drew Morgan
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}