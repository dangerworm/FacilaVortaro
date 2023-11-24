import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { vortlisto } from './vortlistoObjecto';

export const Vortlisto = () => {
  return (
    <>
      <Paper sx={{ p: 2, px: 5, pb: 5, minHeight: '50vh' }}>
        <Grid container spacing={2} textAlign={'left'}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant={"h3"}>Vortlisto</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} textAlign={'left'}>
              <Grid item xs={12}>
                <Typography variant={"h5"}>Gramatikaj finaĵoj</Typography>
              </Grid>
              <Grid item xs={12}>
                <table width={'60%'} style={{ textAlign: 'center' }}>
                  <tbody>
                    <tr>
                      <td>-o</td>
                      <td>-as</td>
                      <td>-ant-</td>
                    </tr>
                    <tr>
                      <td>-a</td>
                      <td>-is</td>
                      <td>-int-</td>
                    </tr>
                    <tr>
                      <td>-j</td>
                      <td>-os</td>
                      <td>-ont-</td>
                    </tr>
                    <tr>
                      <td>-e</td>
                      <td>-i</td>
                      <td>-at-</td>
                    </tr>
                    <tr>
                      <td>-n</td>
                      <td>-us</td>
                      <td>-at-</td>
                    </tr>
                    <tr>
                      <td>-it</td>
                      <td>-i</td>
                      <td>-at-</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>-u</td>
                      <td>-ot-</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} textAlign={'left'}>
              <Grid item xs={12}>
                <Typography variant={"h5"}>Pronomoj</Typography>
              </Grid>
              <Grid item xs={12}>
                <table width={'50%'} style={{ textAlign: 'center' }}>
                  <tbody>
                    <tr>
                      <td>mi</td>
                      <td>ni</td>
                    </tr>
                    <tr>
                      <td>vi</td>
                      <td>ili</td>
                    </tr>
                    <tr>
                      <td>li</td>
                      <td>si</td>
                    </tr>
                    <tr>
                      <td>ŝi</td>
                      <td>oni</td>
                    </tr>
                    <tr>
                      <td>ĝi</td>
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} textAlign={'left'}>
              <Grid item xs={12}>
                <Typography variant={"h5"}>Prefiksoj kaj sufiksoj</Typography>
              </Grid>
              <Grid item xs={12}>
                <table width={'75%'} style={{ textAlign: 'center' }}>
                  <tbody>
                    <tr>
                      <td>bo-</td>
                      <td>-aĉ-</td>
                      <td>-end-</td>
                      <td>-ing-</td>
                    </tr>
                    <tr>
                      <td>dis-</td>
                      <td>-ad-</td>
                      <td>-er-</td>
                      <td>-ism-</td>
                    </tr>
                    <tr>
                      <td>ek-</td>
                      <td>-aĵ-</td>
                      <td>-estr-</td>
                      <td>-ist-</td>
                    </tr>
                    <tr>
                      <td>eks-</td>
                      <td>-an-</td>
                      <td>-et-</td>
                      <td>-obl-</td>
                    </tr>
                    <tr>
                      <td>ge-</td>
                      <td>-ar-</td>
                      <td>-id-</td>
                      <td>-on-</td>
                    </tr>
                    <tr>
                      <td>mal-</td>
                      <td>-ebl-</td>
                      <td>-ig-</td>
                      <td>-op-</td>
                    </tr>
                    <tr>
                      <td>mis-</td>
                      <td>-ec-</td>
                      <td>-iĝ-</td>
                      <td>-uj-</td>
                    </tr>
                    <tr>
                      <td>pra-</td>
                      <td>-eg-</td>
                      <td>-il-</td>
                      <td>-ul-</td>
                    </tr>
                    <tr>
                      <td>re-</td>
                      <td>-ej-</td>
                      <td>-in-</td>
                      <td>-um-</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>-em-</td>
                      <td>-ind-</td>
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} textAlign={'left'}>
              <Grid item xs={12}>
                <Typography variant={"h5"}>Tabelvortoj</Typography>
              </Grid>
              <Grid item xs={12}>
                <table width={'100%'} style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ border: '1px solid grey' }}>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</th>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>ki-</th>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>ti-</th>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>i-</th>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>ĉi-</th>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>neni-</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-o</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kio</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tio</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>io</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ĉio</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>nenio</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-u</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kiu</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tiu</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>iu</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ĉiu</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>neniu</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-es</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kies</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ties</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-a</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kia</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tia</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ia</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ĉia</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>nenia</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-am</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kiam</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tiam</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>iam</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ĉiam</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>neniam</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-e</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kie</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tie</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ie</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>ĉie</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>nenie</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-al</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kial</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tial</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-el</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kiel</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tiel</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>iel</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>neniel</td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid grey', padding: '5px' }}>-om</th>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>kiom</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>tiom</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>iom</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>&nbsp;</td>
                      <td style={{ border: '1px solid grey', padding: '5px' }}>neniom</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} textAlign={'left'}>
              <Grid item xs={12}>
                <Typography variant={"h5"}>Aliaj</Typography>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="nombrovortoj"
                    id="nombrovortoj">
                    <Typography variant={"h6"}>Nombrovortoj</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>0: nul(o)</li>
                      <li>1: unu</li>
                      <li>2: du</li>
                      <li>3: tri</li>
                      <li>4: kvar</li>
                      <li>5: kvin</li>
                      <li>6: ses</li>
                      <li>7: sep</li>
                      <li>8: ok</li>
                      <li>9: naŭ</li>
                      <li>10: dek</li>
                      <li>100: cent</li>
                      <li>1000: mil</li>
                      <li>1 000 000: miliono</li>
                      <li>1 000 000 000: miliardo</li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="tagoj-de-la-semajno"
                    id="tagoj-de-la-semajno">
                    <Typography variant={"h6"}>Tagoj de la semajno</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>lundo</li>
                      <li>mardo</li>
                      <li>merkredo</li>
                      <li>ĵaŭdo</li>
                      <li>vendredo</li>
                      <li>sabato</li>
                      <li>dimanĉo</li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="monatoj"
                    id="monatoj">
                    <Typography variant={"h6"}>Monatoj</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>januaro</li>
                      <li>februaro</li>
                      <li>marto</li>
                      <li>aprilo</li>
                      <li>majo</li>
                      <li>junio</li>
                      <li>julio</li>
                      <li>aŭgusto</li>
                      <li>septembro</li>
                      <li>oktobro</li>
                      <li>novembro</li>
                      <li>decembro</li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="kaj"
                    id="kaj">
                    <Typography variant={"h6"}>Aliaj</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>Nomoj de homoj</li>
                      <li>Landonomoj</li>
                      <li>Urbonomoj</li>
                      <li>Lingvoj</li>
                      <li>Popoloj</li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant={"h5"}>Vortlisto</Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 2 }}>
            <table width={'100%'} style={{ textAlign: 'left' }}>
              <tbody>
                {Array.from(Array(132))
                  .map((_, i) => vortlisto.filter((vorto) => vortlisto.indexOf(vorto) % 132 === i))
                  .map((subVortlisto, j) => (
                    <tr key={j}>
                      <td>{subVortlisto[0] ? subVortlisto[0] : ''}</td>
                      <td>{subVortlisto[1] ? subVortlisto[1] : ''}</td>
                      <td>{subVortlisto[2] ? subVortlisto[2] : ''}</td>
                      <td>{subVortlisto[3] ? subVortlisto[3] : ''}</td>
                      <td>{subVortlisto[4] ? subVortlisto[4] : ''}</td>
                      <td>{subVortlisto[5] ? subVortlisto[5] : ''}</td>
                      <td>{subVortlisto[6] ? subVortlisto[6] : ''}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Grid>
        </Grid >
      </Paper >
    </>
  );
}
