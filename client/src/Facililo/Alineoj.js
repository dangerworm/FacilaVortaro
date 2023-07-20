import React from "react";
import { Grid, Paper } from "@mui/material";

export const getColor = (nivelo) => {
  switch (nivelo) {
    case 'treFacila':
      return 'rgb(192, 255, 192)';
    case 'facila':
      return 'rgb(192, 220, 255)';
    case 'loknomo':
      return 'rgb(224, 192, 255)';
    case 'bezonasDifinon':
      return 'rgb(255, 200, 84)';
    case 'malfacila':
    case 'neEnVortaro':
      return 'rgb(255, 128, 128)';
    default:
      return 'white';
  }
}

export const Alineoj = ({ alineoj }) => {
  return (
    <>
      {alineoj && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ m: 0, p: 0, fontSize: '14pt', textAlign: 'left' }}>
              {alineoj.map((alineo, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {alineo.map(({ tekstero, nivelo }, j) => (
                    <span
                      key={j}
                      style={{
                        color: 'black',
                        backgroundColor: getColor(nivelo)
                      }}
                    >
                      {tekstero}
                    </span>
                  ))}
                </p>
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}