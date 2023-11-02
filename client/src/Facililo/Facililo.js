import React, { useCallback, useEffect } from "react";
import { throttle } from "lodash";
import { Alert, Button, Grid, Paper, TextField } from "@mui/material";
import { useFacililoContext } from "Contexts/FacililoContext";
import { Informoj } from "./Informoj";
import { Loading } from "Loading";
import { Alineoj, getColor } from "./Alineoj";

export const Facililujo = () => {
  const {
    treFacilaj,
    facilaj,
    loknomoj,
    bezonasDifinojn,
    neEnVortaro,
  } = useFacililoContext();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [teksto, setTeksto] = React.useState('');

  const alertStyle = {
    borderRadius: '10px',
    color: 'black',
    justifyContent: 'center'
  };

  return (
    <>
      <Paper sx={{ p: 2, pl: 5, pr: 5, pb: 5, minHeight: '50vh' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Facililo</h1>
            Verku facilan tekston laŭ la vortolisto de uea.facila.org.
          </Grid>
          <Grid item xs={12}>
            <Facililo
              rows={10}
              etikedo="Tajpu facilan tekston"
              teksto={teksto}
              setTeksto={setTeksto}
            />
          </Grid>
          <Grid item xs={2}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('treFacila') }}>
              Tre facilaj: {treFacilaj.length}
            </Alert>
          </Grid>
          <Grid item xs={2}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('facila') }}>
              Facilaj: {facilaj.length}
            </Alert>
          </Grid>
          <Grid item xs={3}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('neEnVortaro') }}>
              Malfacilaj vortoj: {neEnVortaro.length}
            </Alert>
          </Grid>
          <Grid item xs={3}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('bezonasDifinon') }}>
              Bezonas difinojn: {bezonasDifinojn.length}
            </Alert>
          </Grid>
          <Grid item xs={2}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('loknomo') }}>
              Loknomoj: {loknomoj.length}
            </Alert>
          </Grid>
        </Grid>
      </Paper>
      <Informoj dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
};

export const Facililo = ({ rows, etikedo, teksto, setTeksto }) => {
  const {
    loading,
    maliksigu,
    kontrolu,
    alineoj
  } = useFacililoContext();

  const processText = throttle((novaTeksto) => {
    novaTeksto = maliksigu(novaTeksto);

    setTeksto(novaTeksto);
    kontrolu(novaTeksto);
  }, 1000);

  const malbari = () => {
    setTeksto('');
  };

  useEffect(() => {
    processText(teksto);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {loading && <Loading />}
        {!loading && (
          <TextField
            fullWidth
            id="tekstujo"
            label={etikedo}
            multiline
            rows={rows}
            value={teksto}
            onChange={(e) => { processText(e.target.value) }}
          />
        )}
      </Grid>
      
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={malbari}>
          Malbari
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Alineoj alineoj={alineoj} />
      </Grid>
    </Grid>
  );
}