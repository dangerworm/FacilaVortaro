import React from "react";
import { Grid, Link, Typography } from "@mui/material";

export const Footer = (props) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ position: 'absolute', bottom: 0, m: 2 }}>
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Created by '}
          <Link color="inherit" href="https://en.wikipedia.org/wiki/Anna_L%C3%B6wenstein" target='_blank'>
            Anna Löwenstein
          </Link>
          &nbsp;and&nbsp;
          <Link color="inherit" href="https://twitter.com/dangerworm/" target='_blank'>
            Drew Morgan
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}