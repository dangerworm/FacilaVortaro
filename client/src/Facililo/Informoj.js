import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const Informoj = ({ dialogOpen, setDialogOpen }) => {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Facililo</DialogTitle>
      <DialogContent>
        <h2>Kio estas <em>Facililo</em>?</h2>

        <p>Per <em>Facililo</em> eblas kontroli, ĉu la enskribita teksto
          enhavas la radikojn en
          la <a href="https://uea.facila.org/paroli/">vortolisto</a> uzata
          de <a href="https://uea.facila.org">uea.facila.org</a>. Se radiko
          troviĝas en tiu vortlisto, ĝi estos signita verde aŭ blue.</p>

        <noscript><p>Ĝi funkcias plene per Javascript, sed via retumilo ne
          subtenas Javascript, aŭ ĝi estas malŝaltita!  Ŝaltu ruligadon de
          Javascript, aŭ uzu alian retumilon, por povi uzi la
          facililon.</p></noscript>

        <ul>
          <li>Verda signo: la vorto aperas en la listo “Tre facila”. </li>
          <li>Blua signo: la vorto aperas en la listo “Facila”.</li>
          <li>Ruĝa signo: la radiko tute ne aperas en la vortlisto. </li>
        </ul>

        <h2>Se aperos la ruĝa signo</h2>

        <p>Kiam oni verkas tekston por la retejo uea.facila, se vorto estas
          signita ruĝe, necesas ŝanĝi ĝin aŭ aldoni difinon. </p>

        <p>Notu tamen, ke krom la radikoj en la listo, oni ankaŭ rajtas uzi la
          nomojn de homoj, landoj, lingvoj ks. <em>Facililo</em> signas ilin per
          ruĝa signo, ĉar ili ne troviĝas en la listo. Ili tamen estas
          akcepteblaj, kaj ne necesas aldoni por ili apartan difinon.</p>

        <h2><em>Facililo</em> foje miskomprenas</h2>

        <p>Kelkaj kunmetaĵoj erarigas <em>Facililo</em>n. Ekzemple la radiko
          “tropik-” tute ne troviĝas en la listo, sed <em>Facililo</em> signas
          la vorton “tropika” blue, ĉar ĝi aspektas kiel kunmetaĵo de du
          permesataj eroj: “tro” kaj “pik-“.</p>

        <h2><em>Facililo</em> ne kontrolas facilecon de la lingvaĵo</h2>

        <p><em>Facililo</em> nur kontrolas, ĉu eblas konstrui la enskribitajn
          vortojn per la permesataj radikoj. Ĝi foje akceptas sensencajn
          vortojn, kaj tute ne kontrolas la gramatikon.</p>

        <p>Se la radikoj troviĝas en la listo, <em>Facililo</em> signas
          malfacilajn kunmetaĵojn, ekz. “interligiteco”, kiel facilajn. La
          verkanto devas mem decidi, ĉu lernanto senprobleme komprenus tian
          vorton. Facila teksto prefere enhavu simplajn frazojn kaj ne uzu
          pezajn kunmetaĵojn. Tial estas preferinde anstataŭigi ĝin per la
          esprimo “la ligoj inter...”</p>

        <h2>La fontokodo estas libera</h2>

        <p><a href="http://github.com/legoscia/facililo">La fontokodo de la
          facililo</a> estas libere havebla laŭ la permesilo de MIT.  Tio
          signifas ke oni rajtas iel ajn uzi, kopii kaj ŝanĝi ĝin, kondiĉe
          nur ke oni agnoskas mian aŭtorecon.</p>

        <p>Ĝi estas konstruita surbaze de la
          biblioteko <a href="http://knockoutjs.com/">Knockout</a>, kiun vi
          nepre provu se vi programas en Javascript.</p>

        <h2>Ĝi ne estas mia originala ideo</h2>

        <p>Mi ekhavis inspiron de <a href="http://splasho.com/upgoer5/">The
          Up-Goer Five Editor</a>, kiu simile limigas la uzanton al la mil
          plej oftaj vortoj en la angla lingvo.  Ĝi siavice estas inspirita
          la <a href="http://xkcd.com/1133/">komikso "Up Goer Five" de
            xkcd</a>, kiu priskribas la partojn de kosmoŝipo kun la sama
          limigo.</p>

        <h2>Ĉu vi havas demandon, komenton, aŭ proponon?</h2>

        <p>Se vi estas membro de Facebook, vi povas afiŝi komentojn
          ĉe <a href="https://www.facebook.com/Facililo">la paĝo de
            la Facililo</a>.
        </p>

        <p>Se vi trovis eraron, kaj ŝatus prilabori la ilon por solvi la
          problemon, <a href="https://github.com/legoscia/facililo/issues">kreu
            problemraporton ĉe GitHub</a>.
        </p>

        <p>Aŭ vi povas sendi retmesaĝon
          al <a href="mailto:magnus.henoch@gmail.com">magnus.henoch@gmail.com</a>.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          Fermu
        </Button>
      </DialogActions>
    </Dialog>
  );
}