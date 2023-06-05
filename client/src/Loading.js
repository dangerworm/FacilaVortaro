import React from "react"
import { Box, CircularProgress, Grid } from "@mui/material"

export const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '2em'
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
        <Grid item xs={12}>
          Ŝarĝante...
        </Grid>
      </Grid>
    </Box>
  );
}