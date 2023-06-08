import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDatabaseContext } from "./Contexts/DatabaseContext";
import { alphabet } from "Helpers/alphabetisation";

const keyboard = "ŝĝertŭuiopĵĥasdfghjklzĉcvbnm";

export const Search = () => {
  const { query, setQuery } = useDatabaseContext();

  const [letterLayout, setLetterLayout] = React.useState(alphabet);

  const toggleLayout = () => {
    if (letterLayout === alphabet) {
      setLetterLayout(keyboard);
    } else {
      setLetterLayout(alphabet);
    }
  }

  const selectLetter = (letter) => {
    setQuery(letter);
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ m: 2 }}>
        <TextField
          fullWidth
          id="serĉu"
          label="Serĉu"
          variant="outlined"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Grid>
      {/* 
      <Grid item xs={12} sx={{ mr: 1, mb: 2, mt: 0, p: 0, fontSize: 'smaller', height: '1em', lineHeight: '1.5', textAlign: 'right' }}>
        <Button size="small" variant="text" onClick={toggleLayout}>baskulu klavaran aranĝon</Button>
      </Grid> 
      */}
      <Grid item xs={12} sx={{ m: 2, mt: 0 }}>
        {Array
          .from({ length: 3 }, (_, i) => i)
          .map((number) => (
            <Grid key={number} item xs={12} sx={{ ml: 2, mr: 2 }}>
              {letterLayout.slice(10 * number, 10 * (number + 1)).split('').map((letter) => (
                <Button 
                  key={letter}
                  variant={query[0] === letter ? "contained" : "outlined"}
                  onClick={() => selectLetter(letter)}
                  sx={{
                    m: "0.1em",
                    p: 0, 
                    fontSize: "12pt",
                    minWidth: "1.5em",
                    textTransform: 'lowercase'
                  }}>
                  <span>{letter}</span>
                </Button>
              ))}
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}