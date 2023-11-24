import React, { useEffect } from "react";
import { throttle } from "lodash";
import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFacililoContext } from "Contexts/FacililoContext";
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

  const [teksto, setTeksto] = React.useState('');

  const alertStyle = {
    borderRadius: '10px',
    color: 'black',
    justifyContent: 'center'
  };

  return (
    <>
      <Paper sx={{ p: 2, px: 5, pb: 5, minHeight: '50vh' }}>
        <Grid container spacing={2} textAlign={'left'}>
          <Grid item xs={12} sx={{ m: 2 }}>
            <Typography variant={"h3"}>Facililo</Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              Facililo estis kreita de Magnus Henoch por helpi tiujn, kiuj deziras verki facil-lingvajn
              artikolojn.
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              Se vi deziras mem verki artikolon per facila vortprovizo, vi povas aŭ verki ĝin rekte en la
              suba fenestro, aŭ verki ĝin aparte kaj poste englui ĝin.
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              Facililo elstarigas vortojn, kiuj ne estas en la vortlisto de uea.facila. Jen la indikoj:
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              <span style={{ backgroundColor: getColor('treFacila') }}>Verda</span> aŭ&nbsp;
              <span style={{ backgroundColor: getColor('facila') }}>blua</span>: Tiuj vortoj estas facilaj kaj troviĝas en la vortlisto de uea.facila.
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              <span style={{ backgroundColor: getColor('loknomo') }}>Lilakkolora</span>: Tiuj estas la nomoj de landoj kaj lingvoj. Kvankam ili ne aperas en la vortlisto
              de uea.facila, ili povas esti libere uzataj en ties artikoloj, eĉ sen aldonita difino.
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              <span style={{ backgroundColor: getColor('bezonasDifinon') }}>Oranĝkolora</span>:Tiuj estas kunmetaĵoj. Kvankam iliaj elementoj troviĝas en la vortlisto de
              uea.facila, ilia signifo ne nepre estas klara al lernantoj. Tial ili bezonas klarigon, kiu estas trovebla en la Difinaro.
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              <span style={{ backgroundColor: getColor('malFacila') }}>Ruĝa</span>: Tiuj vortoj ne troviĝas en la vortlisto de uea.facila. Se ili aperas en artikolo, necesas
              aldoni difinon. Por multaj el tiuj vortoj, difino estas jam trovebla en la Difinaro, sed ne por
              ĉiuj. Se ne estas preta difino en la Difinaro, necesos verki ĝin.
            </Typography>
            <Typography variant={"body1"} sx={{ my: 2 }}>
              Facililo estis kreita de Magnus Henoch kaj poste modifita de Drew Morgan.
            </Typography>
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
              Tre facila: {treFacilaj.length}
            </Alert>
          </Grid>
          <Grid item xs={2}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('facila') }}>
              Facila: {facilaj.length}
            </Alert>
          </Grid>
          <Grid item xs={2}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('loknomo') }}>
              Loknomo: {loknomoj.length}
            </Alert>
          </Grid>
          <Grid item xs={3}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('bezonasDifinon') }}>
              Bezonas klarigon: {bezonasDifinojn.length}
            </Alert>
          </Grid>
          <Grid item xs={3}>
            <Alert severity="warning" icon={false} style={{ ...alertStyle, backgroundColor: getColor('neEnVortaro') }}>
              Bezonas difinon: {neEnVortaro.length}
            </Alert>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export const Facililo = ({ rows, etikedo, teksto, setTeksto, montruForviŝuButonon = true }) => {
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
  }, [teksto]);

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

      {montruForviŝuButonon && (
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={malbari}>
            Forviŝu
          </Button>
        </Grid>
      )}

      <Grid item xs={12}>
        <Alineoj alineoj={alineoj} />
      </Grid>
    </Grid>
  );
}